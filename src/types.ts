export type Testament = 'OT' | 'NT';

export type BookCategory = 
  | 'Law' 
  | 'History' 
  | 'Poetry' 
  | 'Major Prophets' 
  | 'Minor Prophets' 
  | 'Gospels' 
  | 'History NT' 
  | 'Pauline Epistles' 
  | 'General Epistles' 
  | 'Apocalyptic';

export interface BibleBook {
  id: string;
  nameEn: string;
  nameTe: string;
  abbrEn: string;
  abbrTe: string;
  testament: Testament;
  chapters: number;
  category: BookCategory;
  categoryTe: string;
}

export interface VerseReference {
  bookEn: string;
  bookTe: string;
  chapter: number;
  verse: number;
  verseEnd?: number;
  refStringEn: string;
  refStringTe: string;
}

export interface VerseContent {
  reference: VerseReference;
  textEn: string; // KJV
  textTe: string; // Telugu BSI
}

export type CrossRefRelationship = 
  | 'prophetic_fulfillment'
  | 'parallel_account'
  | 'theological_foundation'
  | 'direct_quotation'
  | 'thematic_echo'
  | 'practical_application';

export interface CrossReferenceItem {
  id: string;
  targetRef: VerseReference;
  textEn: string;
  textTe: string;
  relationship: CrossRefRelationship;
  relationshipLabelEn: string;
  relationshipLabelTe: string;
  connectionNoteEn: string;
  connectionNoteTe: string;
  thematicTags: string[];
}

export interface VerseCrossReferenceData {
  primaryVerse: VerseContent;
  crossReferences: CrossReferenceItem[];
  relatedThemes: Array<{
    id: string;
    nameEn: string;
    nameTe: string;
  }>;
  contextSummaryEn?: string;
  contextSummaryTe?: string;
}

export interface ThematicChainStep {
  refEn: string;
  refTe: string;
  stageEn: string; // e.g. "Old Testament Shadow / Foundation"
  stageTe: string; // e.g. "పాత నిబంధన పునాది / ఛాయ"
  textEn: string;
  textTe: string;
  theologicalNoteEn: string;
  theologicalNoteTe: string;
}

export interface ThematicTopic {
  id: string;
  titleEn: string;
  titleTe: string;
  descriptionEn: string;
  descriptionTe: string;
  category: string;
  iconName: string;
  verses: ThematicChainStep[];
}

export type ViewMode = 'verse' | 'word' | 'theme' | 'network' | 'saved' | 'notes';
export type LanguageView = 'dual' | 'telugu' | 'english';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl';

export type BibleReference = VerseReference;

export interface BibleWordOccurrence {
  id: string;
  reference: VerseReference;
  textEn: string;
  textTe: string;
  testament: 'OT' | 'NT';
  category?: string;
  categoryTe?: string;
  highlightWordEn?: string;
  highlightWordTe?: string;
  contextNoteEn?: string;
  contextNoteTe?: string;
}

export interface BibleWordSearchResult {
  searchQuery: string;
  canonicalWordEn?: string;
  canonicalWordTe?: string;
  detectedLanguage?: 'en' | 'te' | 'both';
  meaningEn?: string;
  meaningTe?: string;
  totalOccurrences: number;
  otCount: number;
  ntCount: number;
  occurrences: BibleWordOccurrence[];
}

export type AppTheme = 'parchment' | 'light' | 'dark';

export interface AppSettings {
  theme: AppTheme;
  defaultLang: LanguageView;
  fontSize: FontSize;
  showConnectionNotes: boolean;
  showBadges: boolean;
  showThematicTags: boolean;
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  verseRefEn?: string;
  verseRefTe?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  color?: string;
}
