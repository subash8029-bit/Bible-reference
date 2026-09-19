import { BibleWordOccurrence, BibleWordSearchResult, BibleReference } from '../types';
import { BIBLE_BOOKS } from './bibleBooks';
import { CURATED_VERSES } from './curatedReferences';
import { THEMATIC_TOPICS } from './thematicChains';
import { DAILY_VERSES } from './dailyVerses';

export interface PopularBibleWord {
  id: string;
  wordEn: string;
  wordTe: string;
  category: 'Spiritual Pillars' | 'Peace & Comfort' | 'Spiritual Life' | 'Divine Attributes';
  categoryTe: 'ఆధ్యాత్మిక పునాదులు' | 'శాంతి & ఆదరణ' | 'ఆధ్యాత్మిక జీవితం' | 'దైవిక లక్షణాలు';
  meaningEn: string;
  meaningTe: string;
  keyVerse: string;
}

export const POPULAR_BIBLE_WORDS: PopularBibleWord[] = [
  {
    id: 'love',
    wordEn: 'Love',
    wordTe: 'ప్రేమ',
    category: 'Spiritual Pillars',
    categoryTe: 'ఆధ్యాత్మిక పునాదులు',
    meaningEn: 'Agape - unconditional, sacrificial, self-giving divine love.',
    meaningTe: 'అగాపే - నిస్వార్థమైన, నిరుపమానమైన, త్యాగపూరితమైన దైవిక ప్రేమ.',
    keyVerse: 'John 3:16',
  },
  {
    id: 'faith',
    wordEn: 'Faith',
    wordTe: 'విశ్వాసము',
    category: 'Spiritual Pillars',
    categoryTe: 'ఆధ్యాత్మిక పునాదులు',
    meaningEn: 'Pistis - firm trust, unwavering assurance in God and His promises.',
    meaningTe: 'పిస్టిస్ - అదృశ్యమైన వాటిని నిశ్చయముగా నమ్ము దృఢమైన విశ్వాసము.',
    keyVerse: 'Hebrews 11:1',
  },
  {
    id: 'grace',
    wordEn: 'Grace',
    wordTe: 'కృప',
    category: 'Spiritual Pillars',
    categoryTe: 'ఆధ్యాత్మిక పునాదులు',
    meaningEn: 'Charis - God\'s unmerited favor and supernatural empowerment.',
    meaningTe: 'ఖారిస్ - మానవ అర్హత లేకపోయినా దేవుడు ఉచితముగా అనుగ్రహించిన అపార దయ.',
    keyVerse: 'Ephesians 2:8',
  },
  {
    id: 'peace',
    wordEn: 'Peace',
    wordTe: 'శాంతి / సమాధానము',
    category: 'Peace & Comfort',
    categoryTe: 'శాంతి & ఆదరణ',
    meaningEn: 'Shalom / Eirene - wholeness, tranquility, and divine reconciliation.',
    meaningTe: 'షలోమ్ - సమస్త బుద్ధికి మించిన దైవిక సమాధానము మరియు స్వస్థత.',
    keyVerse: 'Philippians 4:7',
  },
  {
    id: 'hope',
    wordEn: 'Hope',
    wordTe: 'నిరీక్షణ',
    category: 'Peace & Comfort',
    categoryTe: 'శాంతి & ఆదరణ',
    meaningEn: 'Elpis - confident, joyful expectation of eternal good in God.',
    meaningTe: 'ఎల్పిస్ - దేవుని వాగ్దానములపై ఆధారపడిన సునిశ్చితమైన భవిష్యత్ నిరీక్షణ.',
    keyVerse: 'Romans 15:13',
  },
  {
    id: 'salvation',
    wordEn: 'Salvation',
    wordTe: 'రక్షణ',
    category: 'Spiritual Pillars',
    categoryTe: 'ఆధ్యాత్మిక పునాదులు',
    meaningEn: 'Soteria - deliverance from sin, judgment, and eternal destruction.',
    meaningTe: 'సోటీరియా - పాపము మరియు నిత్య మరణము నుండి క్రీస్తు రక్తం ద్వారా విడుదల.',
    keyVerse: 'Romans 1:16',
  },
  {
    id: 'prayer',
    wordEn: 'Prayer',
    wordTe: 'ప్రార్థన',
    category: 'Spiritual Life',
    categoryTe: 'ఆధ్యాత్మిక జీవితం',
    meaningEn: 'Intimate communion, petition, and intercession with the Father.',
    meaningTe: 'పరలోక తండ్రితో ఆత్మీయ సంభాషణ, విజ్ఞాపన మరియు సహవాసము.',
    keyVerse: 'Philippians 4:6',
  },
  {
    id: 'light',
    wordEn: 'Light',
    wordTe: 'వెలుగు',
    category: 'Divine Attributes',
    categoryTe: 'దైవిక లక్షణాలు',
    meaningEn: 'Purity, divine truth, righteousness, and revelation piercing darkness.',
    meaningTe: 'పరిశుద్ధత, చీకటిని పారద్రోలు దైవిక సత్యము మరియు ప్రత్యక్షత.',
    keyVerse: 'Psalm 119:105',
  },
  {
    id: 'shepherd',
    wordEn: 'Shepherd',
    wordTe: 'కాపరి',
    category: 'Divine Attributes',
    categoryTe: 'దైవిక లక్షణాలు',
    meaningEn: 'The tender, protective, guiding providential care of the Lord.',
    meaningTe: 'తమ గొఱ్ఱెల కొరకు ప్రాణమిచ్చు మంచి కాపరియైన ప్రభువు సంరక్షణ.',
    keyVerse: 'Psalm 23:1',
  },
  {
    id: 'strength',
    wordEn: 'Strength',
    wordTe: 'బలము',
    category: 'Peace & Comfort',
    categoryTe: 'శాంతి & ఆదరణ',
    meaningEn: 'Divine power, fortress, and endurance for the weary.',
    meaningTe: 'అలసిన వారికి బలమిచ్చు దేవుని సర్వశక్తి మరియు ఆశ్రయదుర్గము.',
    keyVerse: 'Isaiah 40:29',
  },
  {
    id: 'forgiveness',
    wordEn: 'Forgiveness',
    wordTe: 'క్షమాపణ',
    category: 'Spiritual Life',
    categoryTe: 'ఆధ్యాత్మిక జీవితం',
    meaningEn: 'Pardon of transgressions, blotting out guilt through Christ.',
    meaningTe: 'క్రీస్తు ప్రాయశ్చిత్తము ద్వారా పాపములను జ్ఞాపకము చేసుకొనకుండుట.',
    keyVerse: '1 John 1:9',
  },
  {
    id: 'righteousness',
    wordEn: 'Righteousness',
    wordTe: 'నీతి',
    category: 'Spiritual Pillars',
    categoryTe: 'ఆధ్యాత్మిక పునాదులు',
    meaningEn: 'Conformity to God\'s holy will and justification through Christ.',
    meaningTe: 'దేవుని పరిశుద్ధ చిత్తమునకు అనుగుణ్యత మరియు విశ్వాసము వలన వచ్చు నీతి.',
    keyVerse: 'Romans 3:22',
  },
  {
    id: 'holy spirit',
    wordEn: 'Holy Spirit',
    wordTe: 'పరిశుద్ధాత్మ',
    category: 'Divine Attributes',
    categoryTe: 'దైవిక లక్షణాలు',
    meaningEn: 'Ruach / Pneuma - The Comforter, Advocate, and Sanctifier.',
    meaningTe: 'ఆదరణకర్త, సత్యస్వరూపియైన ఆత్మ మరియు పరిశుద్ధపరచు దేవుడు.',
    keyVerse: 'John 14:26',
  },
  {
    id: 'covenant',
    wordEn: 'Covenant',
    wordTe: 'నిబంధన',
    category: 'Spiritual Pillars',
    categoryTe: 'ఆధ్యాత్మిక పునాదులు',
    meaningEn: 'Berith / Diatheke - God\'s unbreakable binding promise with humanity.',
    meaningTe: 'దేవుడు మానవాళితో చేసిన మార్పులేని నిత్య నిబంధన.',
    keyVerse: 'Jeremiah 31:31',
  },
  {
    id: 'joy',
    wordEn: 'Joy',
    wordTe: 'సంతోషము / ఆనందము',
    category: 'Peace & Comfort',
    categoryTe: 'శాంతి & ఆదరణ',
    meaningEn: 'Chara - Deep spiritual gladness rooted in God, beyond circumstance.',
    meaningTe: 'పరిస్థితులతో సంబంధం లేని, ప్రభువు నందు కలిగే నిత్య ఆనందము.',
    keyVerse: 'Nehemiah 8:10',
  },
  {
    id: 'life',
    wordEn: 'Life',
    wordTe: 'జీవము',
    category: 'Spiritual Life',
    categoryTe: 'ఆధ్యాత్మిక జీవితం',
    meaningEn: 'Zoe - Spiritual, abundant, and everlasting vitality from God.',
    meaningTe: 'జోయే - దేవుని యొద్దనుండి వచ్చు సంవృద్ధియైన మరియు నిత్య జీవము.',
    keyVerse: 'John 10:10',
  },
];

// Helper to look up Testament and Category by Book name
function getBookInfo(bookName: string): { testament: 'OT' | 'NT'; category: string; categoryTe: string } {
  const norm = bookName.toLowerCase().trim();
  const found = BIBLE_BOOKS.find(
    (b) =>
      b.nameEn.toLowerCase() === norm ||
      b.nameTe === bookName ||
      b.abbrEn.toLowerCase() === norm ||
      b.abbrTe === bookName ||
      b.id.toLowerCase() === norm
  );
  if (found) {
    return {
      testament: found.testament,
      category: found.category,
      categoryTe: found.categoryTe,
    };
  }

  // Fallback heuristic based on common NT books
  const ntBooks = [
    'matthew', 'mark', 'luke', 'john', 'acts', 'romans', 'corinthians',
    'galatians', 'ephesians', 'philippians', 'colossians', 'thessalonians',
    'timothy', 'titus', 'philemon', 'hebrews', 'james', 'peter', 'jude', 'revelation',
    'మత్తయి', 'మార్కు', 'లూకా', 'యోహాను', 'అపొస్తలుల', 'రోమీయులకు', 'కొరింథీయులకు',
    'గలతీయులకు', 'ఎఫెసీయులకు', 'ఫిలిప్పీయులకు', 'కొలొస్సయులకు', 'థెస్సలొనీకయులకు',
    'తిమోతికి', 'తీతుకు', 'ఫిలేమోనుకు', 'హెబ్రీయులకు', 'యాకోబు', 'పేతురు', 'యూదా', 'ప్రకటన'
  ];
  const isNT = ntBooks.some((b) => norm.includes(b));
  return {
    testament: isNT ? 'NT' : 'OT',
    category: isNT ? 'New Testament' : 'Old Testament',
    categoryTe: isNT ? 'క్రొత్త నిబంధన' : 'పాత నిబంధన',
  };
}

// Master indexed list of Bible verses collected from curated database
let cachedMasterVerses: BibleWordOccurrence[] | null = null;

export function getMasterVerseIndex(): BibleWordOccurrence[] {
  if (cachedMasterVerses) {
    return cachedMasterVerses;
  }

  const list: BibleWordOccurrence[] = [];
  const seenRefs = new Set<string>();

  const addVerse = (
    ref: BibleReference,
    textEn: string,
    textTe: string,
    contextEn?: string,
    contextTe?: string
  ) => {
    const key = `${ref.bookEn} ${ref.chapter}:${ref.verse}`.toLowerCase();
    if (seenRefs.has(key)) return;
    seenRefs.add(key);

    const info = getBookInfo(ref.bookEn);
    list.push({
      id: `idx-${ref.bookEn.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${ref.chapter}-${ref.verse}`,
      reference: ref,
      textEn,
      textTe,
      testament: info.testament,
      category: info.category,
      categoryTe: info.categoryTe,
      contextNoteEn: contextEn,
      contextNoteTe: contextTe,
    });
  };

  // 1. Ingest Curated Verses
  for (const entry of Object.values(CURATED_VERSES)) {
    if (entry.primaryVerse) {
      addVerse(
        entry.primaryVerse.reference,
        entry.primaryVerse.textEn,
        entry.primaryVerse.textTe,
        entry.contextSummaryEn,
        entry.contextSummaryTe
      );
    }
    if (entry.crossReferences) {
      for (const cr of entry.crossReferences) {
        addVerse(
          cr.targetRef,
          cr.textEn,
          cr.textTe,
          cr.connectionNoteEn,
          cr.connectionNoteTe
        );
      }
    }
  }

  // 2. Ingest Thematic Chains
  for (const topic of THEMATIC_TOPICS) {
    for (const step of topic.verses) {
      // Parse refEn e.g. "John 3:16" or "Romans 8:28"
      const parts = step.refEn.split(' ');
      const lastPart = parts[parts.length - 1];
      const [chapStr, verseStr] = lastPart.split(':');
      const bookEn = parts.slice(0, parts.length - 1).join(' ');
      const chapNum = parseInt(chapStr, 10) || 1;
      const verseNum = parseInt(verseStr, 10) || 1;

      const teParts = step.refTe.split(' ');
      const bookTe = teParts.slice(0, teParts.length - 1).join(' ') || bookEn;

      addVerse(
        {
          bookEn,
          bookTe,
          chapter: chapNum,
          verse: verseNum,
          refStringEn: step.refEn,
          refStringTe: step.refTe,
        },
        step.textEn,
        step.textTe,
        step.theologicalNoteEn,
        step.theologicalNoteTe
      );
    }
  }

  // 3. Ingest Daily Verses
  for (const dv of DAILY_VERSES) {
    const parts = dv.refEn.split(' ');
    const lastPart = parts[parts.length - 1];
    const [chapStr, verseStr] = lastPart.split(':');
    const bookEn = parts.slice(0, parts.length - 1).join(' ');
    const chapNum = parseInt(chapStr, 10) || 1;
    const verseNum = parseInt(verseStr, 10) || 1;

    const teParts = dv.refTe.split(' ');
    const bookTe = teParts.slice(0, teParts.length - 1).join(' ') || bookEn;

    addVerse(
      {
        bookEn,
        bookTe,
        chapter: chapNum,
        verse: verseNum,
        refStringEn: dv.refEn,
        refStringTe: dv.refTe,
      },
      dv.textEn,
      dv.textTe,
      dv.reflectionEn,
      dv.reflectionTe
    );
  }

  cachedMasterVerses = list;
  return list;
}

// Word normalization helper
function normalizeTelugu(text: string): string {
  return text.trim().toLowerCase();
}

function normalizeEnglish(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();
}

/**
 * Searches the local concordance index of verses.
 */
export function searchBibleWordsLocally(
  query: string,
  testamentFilter: 'all' | 'OT' | 'NT' = 'all',
  categoryFilter: string = 'all'
): BibleWordSearchResult {
  const q = query.trim();
  if (!q) {
    return {
      searchQuery: '',
      totalOccurrences: 0,
      otCount: 0,
      ntCount: 0,
      occurrences: [],
    };
  }

  // Detect whether query is Telugu or English or both
  const hasTelugu = /[\u0C00-\u0C7F]/.test(q);
  const hasEnglish = /[a-zA-Z]/.test(q);
  const detectedLang = hasTelugu && hasEnglish ? 'both' : hasTelugu ? 'te' : 'en';

  // Check if query matches any popular keyword to get canonical synonyms
  const matchedKeyword = POPULAR_BIBLE_WORDS.find((kw) => {
    const matchEn = kw.wordEn.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(kw.wordEn.toLowerCase());
    const matchTe = kw.wordTe.includes(q) || q.includes(kw.wordTe);
    return matchEn || matchTe;
  });

  const masterList = getMasterVerseIndex();

  // Search terms to check
  const termsToCheck: string[] = [q.toLowerCase()];
  if (matchedKeyword) {
    termsToCheck.push(matchedKeyword.wordEn.toLowerCase());
    termsToCheck.push(matchedKeyword.wordTe);
  }

  const results: BibleWordOccurrence[] = [];

  for (const item of masterList) {
    // Apply testament filter
    if (testamentFilter !== 'all' && item.testament !== testamentFilter) {
      continue;
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      const catMatch =
        item.category?.toLowerCase() === categoryFilter.toLowerCase() ||
        item.categoryTe?.toLowerCase() === categoryFilter.toLowerCase();
      if (!catMatch) {
        continue;
      }
    }

    // Check text matches
    const textEnNorm = item.textEn.toLowerCase();
    const textTeNorm = item.textTe;

    let matched = false;
    let highlightEn = '';
    let highlightTe = '';

    for (const term of termsToCheck) {
      if (!term) continue;
      if (textEnNorm.includes(term.toLowerCase())) {
        matched = true;
        highlightEn = term;
      }
      if (textTeNorm.includes(term)) {
        matched = true;
        highlightTe = term;
      }
    }

    if (matched) {
      results.push({
        ...item,
        highlightWordEn: highlightEn || (matchedKeyword?.wordEn ?? q),
        highlightWordTe: highlightTe || (matchedKeyword?.wordTe ?? q),
      });
    }
  }

  const otCount = results.filter((r) => r.testament === 'OT').length;
  const ntCount = results.filter((r) => r.testament === 'NT').length;

  return {
    searchQuery: q,
    canonicalWordEn: matchedKeyword?.wordEn,
    canonicalWordTe: matchedKeyword?.wordTe,
    detectedLanguage: detectedLang,
    meaningEn: matchedKeyword?.meaningEn,
    meaningTe: matchedKeyword?.meaningTe,
    totalOccurrences: results.length,
    otCount,
    ntCount,
    occurrences: results,
  };
}
