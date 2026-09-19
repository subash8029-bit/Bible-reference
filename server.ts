import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { getCuratedReference } from './src/data/curatedReferences';
import { searchBibleWordsLocally } from './src/data/wordSearchIndex';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Helper for waiting in retries
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Cross-reference generator endpoint using Gemini 3.8 Flash
app.post('/api/cross-reference', async (req, res) => {
  try {
    const { query, type = 'verse' } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required.' });
    }

    // 1. First check if we have a curated instant reference
    const curated = getCuratedReference(query);
    if (curated) {
      return res.json({ data: curated, source: 'curated' });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in server environment.',
      });
    }

    const systemInstruction = `You are a scholarly biblical theologian and linguistics expert specializing in Bible Cross-References, specifically comparing the Telugu BSI Bible (పరిశుద్ధ గ్రంథము, Bible Society of India) and the English KJV (King James Version).
Your task is to provide an exhaustive cross-reference analysis for the specified verse or biblical theme.

CRITICAL TEXTUAL ACCURACY RULES:
1. For English text, provide authentic King James Version (KJV) biblical scripture.
2. For Telugu text, provide authentic Telugu BSI Bible (పరిశుద్ధ గ్రంథము - బైబిల్ సొసైటీ ఆఫ్ ఇండియా) text in accurate Telugu script.
3. For each cross-reference:
   - Classify relationship: "prophetic_fulfillment", "parallel_account", "theological_foundation", "direct_quotation", "thematic_echo", or "practical_application".
   - Provide a concise label in English and Telugu.
   - Provide an insightful theological connection note explaining why and how this verse connects, in both English and Telugu.
   - Provide relevant thematic tags.
4. If a theme was searched, pick the primary anchor verse for that theme and provide 4-6 rich cross references tracing through Old and New Testaments.
5. Provide a clear, uplifting context summary in both English and Telugu.`;

    const prompt = type === 'verse'
      ? `Generate comprehensive cross-references for this Bible verse: "${query}". Include the primary verse text in English KJV and Telugu BSI, along with 4 to 6 connected cross-reference passages from throughout the Old and New Testaments with theological explanation notes in both languages.`
      : `Generate biblical cross-references and thematic scripture progression for this theme: "${query}". Pick the prime anchor scripture verse, then provide 4 to 6 foundational cross-reference verses across the scriptures in English KJV and Telugu BSI, explaining the theological progression in both languages.`;

    let response: any = null;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                primaryVerse: {
                  type: Type.OBJECT,
                  properties: {
                    reference: {
                      type: Type.OBJECT,
                      properties: {
                        bookEn: { type: Type.STRING },
                        bookTe: { type: Type.STRING },
                        chapter: { type: Type.INTEGER },
                        verse: { type: Type.INTEGER },
                        refStringEn: { type: Type.STRING },
                        refStringTe: { type: Type.STRING },
                      },
                      required: ['bookEn', 'bookTe', 'chapter', 'verse', 'refStringEn', 'refStringTe'],
                    },
                    textEn: { type: Type.STRING, description: 'King James Version text' },
                    textTe: { type: Type.STRING, description: 'Telugu BSI Bible text' },
                  },
                  required: ['reference', 'textEn', 'textTe'],
                },
                contextSummaryEn: { type: Type.STRING },
                contextSummaryTe: { type: Type.STRING },
                relatedThemes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      nameEn: { type: Type.STRING },
                      nameTe: { type: Type.STRING },
                    },
                    required: ['id', 'nameEn', 'nameTe'],
                  },
                },
                crossReferences: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      targetRef: {
                        type: Type.OBJECT,
                        properties: {
                          bookEn: { type: Type.STRING },
                          bookTe: { type: Type.STRING },
                          chapter: { type: Type.INTEGER },
                          verse: { type: Type.INTEGER },
                          refStringEn: { type: Type.STRING },
                          refStringTe: { type: Type.STRING },
                        },
                        required: ['bookEn', 'bookTe', 'chapter', 'verse', 'refStringEn', 'refStringTe'],
                      },
                      textEn: { type: Type.STRING, description: 'KJV text' },
                      textTe: { type: Type.STRING, description: 'Telugu BSI text' },
                      relationship: {
                        type: Type.STRING,
                        enum: [
                          'prophetic_fulfillment',
                          'parallel_account',
                          'theological_foundation',
                          'direct_quotation',
                          'thematic_echo',
                          'practical_application',
                        ],
                      },
                      relationshipLabelEn: { type: Type.STRING },
                      relationshipLabelTe: { type: Type.STRING },
                      connectionNoteEn: { type: Type.STRING },
                      connectionNoteTe: { type: Type.STRING },
                      thematicTags: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: [
                      'id',
                      'targetRef',
                      'textEn',
                      'textTe',
                      'relationship',
                      'relationshipLabelEn',
                      'relationshipLabelTe',
                      'connectionNoteEn',
                      'connectionNoteTe',
                    ],
                  },
                },
              },
              required: ['primaryVerse', 'crossReferences', 'relatedThemes'],
            },
          },
        });
        break; // Successfully got response
      } catch (callErr: any) {
        console.warn(`Attempt ${attempts} failed:`, callErr?.message);
        if (attempts < maxAttempts) {
          await wait(1000 * attempts); // wait 1s, 2s
        } else {
          throw callErr;
        }
      }
    }

    const text = response?.text?.trim();
    if (!text) {
      return res.status(500).json({ error: 'No content received from theological engine.' });
    }

    const data = JSON.parse(text);
    return res.json({ data, source: 'ai' });
  } catch (error: any) {
    console.error('Error in /api/cross-reference:', error);
    let message = error?.message || 'Failed to retrieve cross-reference information.';
    try {
      // Clean up nested JSON error messages from API
      const parsed = JSON.parse(message);
      if (parsed?.error?.message) {
        message = parsed.error.message;
      }
    } catch {
      // not json, keep original message
    }
    return res.status(500).json({ error: message });
  }
});

// Bible Word Search endpoint
app.post('/api/word-search', async (req, res) => {
  try {
    const { query, testament = 'all', category = 'all', deep = false } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Search word query is required.' });
    }

    const trimmedQuery = query.trim();

    // 1. First run local concordance search
    const localResult = searchBibleWordsLocally(trimmedQuery, testament, category);

    // If we have plenty of local results and deep search wasn't explicitly requested, return immediately
    if (localResult.occurrences.length >= 4 && !deep) {
      return res.json({ data: localResult, source: 'local' });
    }

    const ai = getGenAI();
    // If AI is not available, return whatever local results we have
    if (!ai) {
      return res.json({ data: localResult, source: 'local' });
    }

    const systemInstruction = `You are an expert biblical concordance linguist specializing in the Telugu BSI Bible (పరిశుద్ధ గ్రంథము - Bible Society of India) and the English KJV (King James Version).
Given a biblical word or phrase in Telugu or English (e.g. "grace", "ప్రేమ", "shepherd", "శాంతి", "faith", "రక్షణ", etc.):
1. Identify 6 to 10 prominent Bible scripture verses throughout the Old and New Testaments where this word or core biblical concept appears.
2. Provide authentic King James Version (KJV) text for English and authentic Telugu BSI Bible text for Telugu.
3. For each verse, identify:
   - Exact book, chapter, and verse citations (in English and Telugu).
   - Testament: "OT" or "NT".
   - Category (e.g. "Law", "Poetry", "Gospels", "Pauline Epistles", etc.).
   - The specific word as it appears in English and in Telugu.
   - A concise context sentence explaining how this word is used in this passage in English and Telugu.
4. Provide the theological definition/meaning of the biblical term in both English and Telugu.`;

    const prompt = `Perform an accurate biblical word concordance search for: "${trimmedQuery}".
Testament filter: "${testament}".
Provide authentic Telugu BSI Bible verses and English King James Version (KJV) verses.`;

    let response: any = null;
    let attempts = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                searchQuery: { type: Type.STRING },
                canonicalWordEn: { type: Type.STRING },
                canonicalWordTe: { type: Type.STRING },
                meaningEn: { type: Type.STRING },
                meaningTe: { type: Type.STRING },
                totalOccurrences: { type: Type.INTEGER },
                otCount: { type: Type.INTEGER },
                ntCount: { type: Type.INTEGER },
                occurrences: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      reference: {
                        type: Type.OBJECT,
                        properties: {
                          bookEn: { type: Type.STRING },
                          bookTe: { type: Type.STRING },
                          chapter: { type: Type.INTEGER },
                          verse: { type: Type.INTEGER },
                          refStringEn: { type: Type.STRING },
                          refStringTe: { type: Type.STRING },
                        },
                        required: ['bookEn', 'bookTe', 'chapter', 'verse', 'refStringEn', 'refStringTe'],
                      },
                      textEn: { type: Type.STRING, description: 'King James Version text' },
                      textTe: { type: Type.STRING, description: 'Telugu BSI Bible text' },
                      testament: { type: Type.STRING, enum: ['OT', 'NT'] },
                      category: { type: Type.STRING },
                      categoryTe: { type: Type.STRING },
                      highlightWordEn: { type: Type.STRING },
                      highlightWordTe: { type: Type.STRING },
                      contextNoteEn: { type: Type.STRING },
                      contextNoteTe: { type: Type.STRING },
                    },
                    required: ['id', 'reference', 'textEn', 'textTe', 'testament'],
                  },
                },
              },
              required: ['searchQuery', 'occurrences'],
            },
          },
        });
        break;
      } catch (err: any) {
        console.warn(`Word search AI attempt ${attempts} failed:`, err?.message);
        if (attempts >= maxAttempts) {
          break;
        }
        await wait(800);
      }
    }

    const text = response?.text?.trim();
    if (text) {
      try {
        const aiData = JSON.parse(text);
        // Merge with local results if any were found
        if (localResult.occurrences.length > 0) {
          const seen = new Set(aiData.occurrences.map((o: any) => o.reference?.refStringEn?.toLowerCase()));
          for (const loc of localResult.occurrences) {
            const key = loc.reference.refStringEn.toLowerCase();
            if (!seen.has(key)) {
              aiData.occurrences.push(loc);
              seen.add(key);
            }
          }
        }

        aiData.totalOccurrences = aiData.occurrences.length;
        aiData.otCount = aiData.occurrences.filter((o: any) => o.testament === 'OT').length;
        aiData.ntCount = aiData.occurrences.filter((o: any) => o.testament === 'NT').length;

        return res.json({ data: aiData, source: 'ai' });
      } catch (parseErr) {
        console.warn('Failed to parse AI word search output, using local fallback:', parseErr);
      }
    }

    return res.json({ data: localResult, source: 'local' });
  } catch (error: any) {
    console.error('Error in /api/word-search:', error);
    // Fallback to local search on unexpected error
    const local = searchBibleWordsLocally(req.body?.query || '');
    return res.json({ data: local, source: 'local_fallback' });
  }
});


// Vite middleware or static dist handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Scripture Cross Reference Server running on port ${PORT}`);
  });
}

startServer();
