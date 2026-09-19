import { BibleBook } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // OLD TESTAMENT (పాత నిబంధన) - 39 Books
  // Pentateuch / Law (ధర్మశాస్త్ర గ్రంథములు)
  { id: 'GEN', nameEn: 'Genesis', nameTe: 'ఆదికాండము', abbrEn: 'Gen', abbrTe: 'ఆది', testament: 'OT', chapters: 50, category: 'Law', categoryTe: 'ధర్మశాస్త్రము' },
  { id: 'EXO', nameEn: 'Exodus', nameTe: 'నిర్గమకాండము', abbrEn: 'Exo', abbrTe: 'నిర్గ', testament: 'OT', chapters: 40, category: 'Law', categoryTe: 'ధర్మశాస్త్రము' },
  { id: 'LEV', nameEn: 'Leviticus', nameTe: 'లేవీయకాండము', abbrEn: 'Lev', abbrTe: 'లేవీ', testament: 'OT', chapters: 27, category: 'Law', categoryTe: 'ధర్మశాస్త్రము' },
  { id: 'NUM', nameEn: 'Numbers', nameTe: 'సంఖ్యాకాండము', abbrEn: 'Num', abbrTe: 'సంఖ్యా', testament: 'OT', chapters: 36, category: 'Law', categoryTe: 'ధర్మశాస్త్రము' },
  { id: 'DEU', nameEn: 'Deuteronomy', nameTe: 'ద్వితీయోపదేశకాండము', abbrEn: 'Deu', abbrTe: 'ద్వితీ', testament: 'OT', chapters: 34, category: 'Law', categoryTe: 'ధర్మశాస్త్రము' },
  
  // Historical Books (చరిత్ర గ్రంథములు)
  { id: 'JOS', nameEn: 'Joshua', nameTe: 'యెహోషువ', abbrEn: 'Jos', abbrTe: 'యెహో', testament: 'OT', chapters: 24, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: 'JDG', nameEn: 'Judges', nameTe: 'న్యాయాధిపతులు', abbrEn: 'Jdg', abbrTe: 'న్యాయా', testament: 'OT', chapters: 21, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: 'RUT', nameEn: 'Ruth', nameTe: 'రూతు', abbrEn: 'Rut', abbrTe: 'రూతు', testament: 'OT', chapters: 4, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: '1SA', nameEn: '1 Samuel', nameTe: '1 సమూయేలు', abbrEn: '1Sa', abbrTe: '1 సమూ', testament: 'OT', chapters: 31, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: '2SA', nameEn: '2 Samuel', nameTe: '2 సమూయేలు', abbrEn: '2Sa', abbrTe: '2 సమూ', testament: 'OT', chapters: 24, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: '1KI', nameEn: '1 Kings', nameTe: '1 రాజులు', abbrEn: '1Ki', abbrTe: '1 రాజు', testament: 'OT', chapters: 22, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: '2KI', nameEn: '2 Kings', nameTe: '2 రాజులు', abbrEn: '2Ki', abbrTe: '2 రాజు', testament: 'OT', chapters: 25, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: '1CH', nameEn: '1 Chronicles', nameTe: '1 దినవృత్తాంతములు', abbrEn: '1Ch', abbrTe: '1 దిన', testament: 'OT', chapters: 29, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: '2CH', nameEn: '2 Chronicles', nameTe: '2 దినవృత్తాంతములు', abbrEn: '2Ch', abbrTe: '2 దిన', testament: 'OT', chapters: 36, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: 'EZR', nameEn: 'Ezra', nameTe: 'ఎజ్రా', abbrEn: 'Ezr', abbrTe: 'ఎజ్రా', testament: 'OT', chapters: 10, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: 'NEH', nameEn: 'Nehemiah', nameTe: 'నెహెమ్యా', abbrEn: 'Neh', abbrTe: 'నెహె', testament: 'OT', chapters: 13, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },
  { id: 'EST', nameEn: 'Esther', nameTe: 'ఎస్తేరు', abbrEn: 'Est', abbrTe: 'ఎస్తే', testament: 'OT', chapters: 10, category: 'History', categoryTe: 'చరిత్ర గ్రంథములు' },

  // Poetry & Wisdom (కావ్య / జ్ఞాన గ్రంథములు)
  { id: 'JOB', nameEn: 'Job', nameTe: 'యోబు', abbrEn: 'Job', abbrTe: 'యోబు', testament: 'OT', chapters: 42, category: 'Poetry', categoryTe: 'కావ్య గ్రంథములు' },
  { id: 'PSA', nameEn: 'Psalms', nameTe: 'కీర్తనలు', abbrEn: 'Psa', abbrTe: 'కీర్త', testament: 'OT', chapters: 150, category: 'Poetry', categoryTe: 'కావ్య గ్రంథములు' },
  { id: 'PRO', nameEn: 'Proverbs', nameTe: 'సామెతలు', abbrEn: 'Pro', abbrTe: 'సామె', testament: 'OT', chapters: 31, category: 'Poetry', categoryTe: 'కావ్య గ్రంథములు' },
  { id: 'ECC', nameEn: 'Ecclesiastes', nameTe: 'ప్రసంగి', abbrEn: 'Ecc', abbrTe: 'ప్రసం', testament: 'OT', chapters: 12, category: 'Poetry', categoryTe: 'కావ్య గ్రంథములు' },
  { id: 'SNG', nameEn: 'Song of Solomon', nameTe: 'పరమగీతము', abbrEn: 'Sng', abbrTe: 'పరమ', testament: 'OT', chapters: 8, category: 'Poetry', categoryTe: 'కావ్య గ్రంథములు' },

  // Major Prophets (పెద్ద ప్రవక్తలు)
  { id: 'ISA', nameEn: 'Isaiah', nameTe: 'యెషయా', abbrEn: 'Isa', abbrTe: 'యెష', testament: 'OT', chapters: 66, category: 'Major Prophets', categoryTe: 'పెద్ద ప్రవక్తలు' },
  { id: 'JER', nameEn: 'Jeremiah', nameTe: 'యిర్మీయా', abbrEn: 'Jer', abbrTe: 'యిర్మీ', testament: 'OT', chapters: 52, category: 'Major Prophets', categoryTe: 'పెద్ద ప్రవక్తలు' },
  { id: 'LAM', nameEn: 'Lamentations', nameTe: 'విలాపవాక్యములు', abbrEn: 'Lam', abbrTe: 'విలా', testament: 'OT', chapters: 5, category: 'Major Prophets', categoryTe: 'పెద్ద ప్రవక్తలు' },
  { id: 'EZK', nameEn: 'Ezekiel', nameTe: 'యెహెజ్కేలు', abbrEn: 'Ezk', abbrTe: 'యెహె', testament: 'OT', chapters: 48, category: 'Major Prophets', categoryTe: 'పెద్ద ప్రవక్తలు' },
  { id: 'DAN', nameEn: 'Daniel', nameTe: 'దానియేలు', abbrEn: 'Dan', abbrTe: 'దాని', testament: 'OT', chapters: 12, category: 'Major Prophets', categoryTe: 'పెద్ద ప్రవక్తలు' },

  // Minor Prophets (చిన్న ప్రవక్తలు)
  { id: 'HOS', nameEn: 'Hosea', nameTe: 'హోషేయ', abbrEn: 'Hos', abbrTe: 'హోషే', testament: 'OT', chapters: 14, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'JOL', nameEn: 'Joel', nameTe: 'యోవేలు', abbrEn: 'Jol', abbrTe: 'యోవే', testament: 'OT', chapters: 3, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'AMO', nameEn: 'Amos', nameTe: 'ఆమోసు', abbrEn: 'Amo', abbrTe: 'ఆమో', testament: 'OT', chapters: 9, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'OBA', nameEn: 'Obadiah', nameTe: 'ఓబద్యా', abbrEn: 'Oba', abbrTe: 'ఓబ', testament: 'OT', chapters: 1, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'JON', nameEn: 'Jonah', nameTe: 'యోనా', abbrEn: 'Jon', abbrTe: 'యోనా', testament: 'OT', chapters: 4, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'MIC', nameEn: 'Micah', nameTe: 'మీకా', abbrEn: 'Mic', abbrTe: 'మీకా', testament: 'OT', chapters: 7, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'NAM', nameEn: 'Nahum', nameTe: 'నహూము', abbrEn: 'Nam', abbrTe: 'నహూ', testament: 'OT', chapters: 3, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'HAB', nameEn: 'Habakkuk', nameTe: 'హబక్కూకు', abbrEn: 'Hab', abbrTe: 'హబ', testament: 'OT', chapters: 3, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'ZEP', nameEn: 'Zephaniah', nameTe: 'జెఫన్యా', abbrEn: 'Zep', abbrTe: 'జెఫ', testament: 'OT', chapters: 3, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'HAG', nameEn: 'Haggai', nameTe: 'హగ్గయి', abbrEn: 'Hag', abbrTe: 'హగ్గ', testament: 'OT', chapters: 2, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'ZEC', nameEn: 'Zechariah', nameTe: 'జెకర్యా', abbrEn: 'Zec', abbrTe: 'జెక', testament: 'OT', chapters: 14, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },
  { id: 'MAL', nameEn: 'Malachi', nameTe: 'మలాకీ', abbrEn: 'Mal', abbrTe: 'మలా', testament: 'OT', chapters: 4, category: 'Minor Prophets', categoryTe: 'చిన్న ప్రవక్తలు' },

  // NEW TESTAMENT (క్రొత్త నిబంధన) - 27 Books
  // Gospels (సువార్తలు)
  { id: 'MAT', nameEn: 'Matthew', nameTe: 'మత్తయి', abbrEn: 'Mat', abbrTe: 'మత్త', testament: 'NT', chapters: 28, category: 'Gospels', categoryTe: 'సువార్తలు' },
  { id: 'MRK', nameEn: 'Mark', nameTe: 'మార్కు', abbrEn: 'Mrk', abbrTe: 'మార్కు', testament: 'NT', chapters: 16, category: 'Gospels', categoryTe: 'సువార్తలు' },
  { id: 'LUK', nameEn: 'Luke', nameTe: 'లూకా', abbrEn: 'Luk', abbrTe: 'లూకా', testament: 'NT', chapters: 24, category: 'Gospels', categoryTe: 'సువార్తలు' },
  { id: 'JHN', nameEn: 'John', nameTe: 'యోహాను', abbrEn: 'Jhn', abbrTe: 'యోహా', testament: 'NT', chapters: 21, category: 'Gospels', categoryTe: 'సువార్తలు' },

  // History NT (అపొస్తలుల కార్యములు)
  { id: 'ACT', nameEn: 'Acts', nameTe: 'అపొస్తలుల కార్యములు', abbrEn: 'Act', abbrTe: 'అపొ', testament: 'NT', chapters: 28, category: 'History NT', categoryTe: 'చరిత్ర గ్రంథము' },

  // Pauline Epistles (పౌలు పత్రికలు)
  { id: 'ROM', nameEn: 'Romans', nameTe: 'రోమీయులకు', abbrEn: 'Rom', abbrTe: 'రోమా', testament: 'NT', chapters: 16, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: '1CO', nameEn: '1 Corinthians', nameTe: '1 కొరింథీయులకు', abbrEn: '1Co', abbrTe: '1 కొరిం', testament: 'NT', chapters: 16, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: '2CO', nameEn: '2 Corinthians', nameTe: '2 కొరింథీయులకు', abbrEn: '2Co', abbrTe: '2 కొరిం', testament: 'NT', chapters: 13, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: 'GAL', nameEn: 'Galatians', nameTe: 'గలతీయులకు', abbrEn: 'Gal', abbrTe: 'గలతీ', testament: 'NT', chapters: 6, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: 'EPH', nameEn: 'Ephesians', nameTe: 'ఎఫెసీయులకు', abbrEn: 'Eph', abbrTe: 'ఎఫెసీ', testament: 'NT', chapters: 6, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: 'PHP', nameEn: 'Philippians', nameTe: 'ఫిలిప్పీయులకు', abbrEn: 'Php', abbrTe: 'ఫిలిప్పీ', testament: 'NT', chapters: 4, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: 'COL', nameEn: 'Colossians', nameTe: 'కొలొస్సయులకు', abbrEn: 'Col', abbrTe: 'కొలొస్స', testament: 'NT', chapters: 4, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: '1TH', nameEn: '1 Thessalonians', nameTe: '1 థెస్సలొనీకయులకు', abbrEn: '1Th', abbrTe: '1 థెస్స', testament: 'NT', chapters: 5, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: '2TH', nameEn: '2 Thessalonians', nameTe: '2 థెస్సలొనీకయులకు', abbrEn: '2Th', abbrTe: '2 థెస్స', testament: 'NT', chapters: 3, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: '1TI', nameEn: '1 Timothy', nameTe: '1 తిమోతికి', abbrEn: '1Ti', abbrTe: '1 తిమో', testament: 'NT', chapters: 6, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: '2TI', nameEn: '2 Timothy', nameTe: '2 తిమోతికి', abbrEn: '2Ti', abbrTe: '2 తిమో', testament: 'NT', chapters: 4, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: 'TIT', nameEn: 'Titus', nameTe: 'తీతుకు', abbrEn: 'Tit', abbrTe: 'తీతు', testament: 'NT', chapters: 3, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },
  { id: 'PHM', nameEn: 'Philemon', nameTe: 'ఫిలేమోనుకు', abbrEn: 'Phm', abbrTe: 'ఫిలే', testament: 'NT', chapters: 1, category: 'Pauline Epistles', categoryTe: 'పౌలు పత్రికలు' },

  // General Epistles (సాధారణ పత్రికలు)
  { id: 'HEB', nameEn: 'Hebrews', nameTe: 'హెబ్రీయులకు', abbrEn: 'Heb', abbrTe: 'హెబ్రీ', testament: 'NT', chapters: 13, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },
  { id: 'JAS', nameEn: 'James', nameTe: 'యాకోబు', abbrEn: 'Jas', abbrTe: 'యాకో', testament: 'NT', chapters: 5, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },
  { id: '1PE', nameEn: '1 Peter', nameTe: '1 పేతురు', abbrEn: '1Pe', abbrTe: '1 పేతు', testament: 'NT', chapters: 5, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },
  { id: '2PE', nameEn: '2 Peter', nameTe: '2 పేతురు', abbrEn: '2Pe', abbrTe: '2 పేతు', testament: 'NT', chapters: 3, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },
  { id: '1JN', nameEn: '1 John', nameTe: '1 యోహాను', abbrEn: '1Jn', abbrTe: '1 యోహా', testament: 'NT', chapters: 5, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },
  { id: '2JN', nameEn: '2 John', nameTe: '2 యోహాను', abbrEn: '2Jn', abbrTe: '2 యోహా', testament: 'NT', chapters: 1, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },
  { id: '3JN', nameEn: '3 John', nameTe: '3 యోహాను', abbrEn: '3Jn', abbrTe: '3 యోహా', testament: 'NT', chapters: 1, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },
  { id: 'JUD', nameEn: 'Jude', nameTe: 'యూదా', abbrEn: 'Jud', abbrTe: 'యూదా', testament: 'NT', chapters: 1, category: 'General Epistles', categoryTe: 'సాధారణ పత్రికలు' },

  // Apocalyptic (ప్రకటన గ్రంథము)
  { id: 'REV', nameEn: 'Revelation', nameTe: 'ప్రకటన గ్రంథము', abbrEn: 'Rev', abbrTe: 'ప్రక', testament: 'NT', chapters: 22, category: 'Apocalyptic', categoryTe: 'ప్రకటన గ్రంథము' },
];

export function findBook(query: string): BibleBook | undefined {
  const clean = query.trim().toLowerCase();
  return BIBLE_BOOKS.find(b => 
    b.nameEn.toLowerCase() === clean ||
    b.nameTe.toLowerCase() === clean ||
    b.abbrEn.toLowerCase() === clean ||
    b.abbrTe.toLowerCase() === clean ||
    b.id.toLowerCase() === clean ||
    clean.startsWith(b.nameEn.toLowerCase()) ||
    clean.startsWith(b.nameTe.toLowerCase())
  );
}
