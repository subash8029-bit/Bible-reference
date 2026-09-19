import { VerseCrossReferenceData } from '../types';

export const CURATED_VERSES: Record<string, VerseCrossReferenceData> = {
  // JOHN 3:16 / యోహాను 3:16
  'john 3:16': {
    primaryVerse: {
      reference: {
        bookEn: 'John',
        bookTe: 'యోహాను',
        chapter: 3,
        verse: 16,
        refStringEn: 'John 3:16',
        refStringTe: 'యోహాను 3:16',
      },
      textEn: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      textTe: 'దేవుడు లోకమును ఎంతో ప్రేమించెను. కాగా ఆయన తన అద్వితీయకుమారునిగా పుట్టిన వానియందు విశ్వాసముంచు ప్రతివాడును నశింపక నిత్యజీవము పొందునట్లు ఆయనను అనుగ్రహించెను.',
    },
    contextSummaryEn: 'The supreme declaration of the Gospel: God\'s unconditional sacrificial love demonstrated by giving His only Son to rescue humanity from perishing and grant eternal life through faith.',
    contextSummaryTe: 'సువార్త యొక్క అత్యున్నత సత్యము: మానవాళిని నాశనము నుండి రక్షించి, విశ్వాసము ద్వారా నిత్యజీవము ప్రసాదించుటకు దేవుడు తన అద్వితీయ కుమారుని అనుగ్రహించిన నిరుపమానమైన ప్రేమ.',
    relatedThemes: [
      { id: 'love', nameEn: 'Divine Love', nameTe: 'దైవిక ప్రేమ' },
      { id: 'salvation', nameEn: 'Salvation', nameTe: 'రక్షణ' },
      { id: 'eternal_life', nameEn: 'Eternal Life', nameTe: 'నిత్యజీవము' },
      { id: 'faith', nameEn: 'Faith & Belief', nameTe: 'విశ్వాసము' },
    ],
    crossReferences: [
      {
        id: 'cr-rom-5-8',
        targetRef: {
          bookEn: 'Romans',
          bookTe: 'రోమీయులకు',
          chapter: 5,
          verse: 8,
          refStringEn: 'Romans 5:8',
          refStringTe: 'రోమీయులకు 5:8',
        },
        textEn: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
        textTe: 'అయితే దేవుడు మనయెడల తన ప్రేమను వెల్లడిపరచుచున్నాడు; ఏలయనగా మనమింకను పాపులమై యుండగానే క్రీస్తు మనకొరకు చనిపోయెను.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Demonstration of Love',
        relationshipLabelTe: 'ప్రేమ యొక్క ప్రత్యక్ష నిదర్శనము',
        connectionNoteEn: 'Paul elaborates on the depth of God\'s love mentioned in John 3:16, emphasizing that Christ died for us while we were undeserving sinners.',
        connectionNoteTe: 'యోహాను 3:16 లోని ప్రేమ యొక్క లోతును పౌలు వివరిస్తూ, మనం అర్హతలేని పాపులమై ఉండగానే క్రీస్తు మన కొరకు ప్రాణమిచ్చెనని స్పష్టం చేయుచున్నాడు.',
        thematicTags: ['Love', 'Grace', 'Atonement'],
      },
      {
        id: 'cr-1jn-4-9-10',
        targetRef: {
          bookEn: '1 John',
          bookTe: '1 యోహాను',
          chapter: 4,
          verse: 9,
          verseEnd: 10,
          refStringEn: '1 John 4:9-10',
          refStringTe: '1 యోహాను 4:9-10',
        },
        textEn: 'In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him. Herein is love, not that we loved God, but that he loved us, and sent his Son to be the propitiation for our sins.',
        textTe: 'మనము ఆయన ద్వారా జీవించునట్లు, దేవుడు తన అద్వితీయకుమారుని లోకములోనికి పంపెను; దీనివలన దేవుడు మనయందుంచిన ప్రేమ ప్రత్యక్షపరచబడెను. మనము దేవుని ప్రేమించితిమని కాదు, తానే మనలను ప్రేమించి, మన పాపములకు ప్రాయశ్చిత్తమై యుండుటకు తన కుమారుని పంపెను; ఇందులో ప్రేమ యున్నది.',
        relationship: 'parallel_account',
        relationshipLabelEn: 'Johannine Parallel',
        relationshipLabelTe: 'యోహాను పత్రిక సమాంతర వచనము',
        connectionNoteEn: 'The apostle John directly re-states the theology of John 3:16, defining divine love as God initiating the sacrifice of His Son for our sins.',
        connectionNoteTe: 'అపొస్తలుడైన యోహాను స్వయంగా యోహాను 3:16 మూలార్థాన్ని వివరిస్తూ, దేవుడే మొదట మనలను ప్రేమించి ప్రాయశ్చిత్తార్థ బలిగా తన కుమారుని పంపెనని పునరుద్ఘాటించాడు.',
        thematicTags: ['Love', 'Propitiation', 'Incarnation'],
      },
      {
        id: 'cr-gen-22-2',
        targetRef: {
          bookEn: 'Genesis',
          bookTe: 'ఆదికాండము',
          chapter: 22,
          verse: 2,
          refStringEn: 'Genesis 22:2',
          refStringTe: 'ఆదికాండము 22:2',
        },
        textEn: 'And he said, Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering upon one of the mountains which I will tell thee of.',
        textTe: 'ఆయననీవు ప్రేమించు నీ యేకకుమారుడైన ఇస్సాకును తీసికొని, మోరీయా దేశమునకు వెళ్లి అక్కడ నేను నీతో చెప్పబోవు పర్వతములలో ఒకదానిమీద దహనబలిగా అతని నర్పించుమని చెప్పెను.',
        relationship: 'prophetic_fulfillment',
        relationshipLabelEn: 'Old Testament Shadow & Type',
        relationshipLabelTe: 'పాత నిబంధన ఛాయారూప ప్రవచనము',
        connectionNoteEn: 'Abraham offering his only beloved son Isaac on Mount Moriah is the vivid Old Testament foreshadowing of God the Father offering His only begotten Son at Calvary.',
        connectionNoteTe: 'అబ్రాహాము తన ఏకైక ప్రియకుమారుడైన ఇస్సాకును బలిగా అర్పించుట, పరలోక తండ్రి కల్వరి గిరిపై తన అద్వితీయ కుమారుని అర్పించుటకు ప్రవచన ఛాయగా ఉన్నది.',
        thematicTags: ['Sacrifice', 'Only Begotten Son', 'Faith'],
      },
      {
        id: 'cr-jhn-1-12',
        targetRef: {
          bookEn: 'John',
          bookTe: 'యోహాను',
          chapter: 1,
          verse: 12,
          refStringEn: 'John 1:12',
          refStringTe: 'యోహాను 1:12',
        },
        textEn: 'But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.',
        textTe: 'తన్ను ఎందరైతే చేర్చుకొనిరో, అనగా తన నామమునందు విశ్వాసముంచినవారికి, దేవుని పిల్లలగుటకు ఆయన అధికారము ఇచ్చెను.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'Sonship through Believing',
        relationshipLabelTe: 'విశ్వాసము ద్వారా దైవ పుత్రత్వము',
        connectionNoteEn: 'Links "whosoever believeth" to the divine right of becoming children of God in John\'s prologue.',
        connectionNoteTe: 'యోహాను 3:16 లోని "విశ్వాసముంచు ప్రతివాడు" అను మాటకు, దేవుని కుమారులగుటకు లభించే ఆశీర్వాదపు హక్కును యోహాను 1:12 జతచేయుచున్నది.',
        thematicTags: ['Faith', 'Adoption', 'Grace'],
      },
      {
        id: 'cr-num-21-9',
        targetRef: {
          bookEn: 'Numbers',
          bookTe: 'సంఖ్యాకాండము',
          chapter: 21,
          verse: 9,
          refStringEn: 'Numbers 21:9',
          refStringTe: 'సంఖ్యాకాండము 21:9',
        },
        textEn: 'And Moses made a serpent of brass, and put it upon a pole, and it came to pass, that if a serpent had bitten any man, when he beheld the serpent of brass, he lived.',
        textTe: 'మోషే యిత్తడి సర్పమొకటి చేసి స్తంభముమీద దానిని పెట్టెను. అప్పుడు సర్పపుకాటు తినిన ప్రతివాడు ఆ యిత్తడి సర్పమును నిదానించి చూచి బ్రదికెను.',
        relationship: 'prophetic_fulfillment',
        relationshipLabelEn: 'Look and Live (Immediate Context)',
        relationshipLabelTe: 'చూచి బ్రదుకుట (సందర్భోచిత మూలం)',
        connectionNoteEn: 'In John 3:14-15, Jesus specifically cites the bronze serpent on the pole as the type of His crucifixion: looking in faith brings life instead of death.',
        connectionNoteTe: 'యోహాను 3:14-15 లో యేసు స్వయంగా మోషే ఎత్తిన ఇత్తడి సర్పమును ప్రస్తావించారు. విశ్వాసముతో సిలువ వేయబడిన క్రీస్తు వైపు చూచువాడు మరణించక జీవించును.',
        thematicTags: ['Healing', 'Cross', 'Faith'],
      }
    ]
  },

  // ROMANS 8:28 / రోమీయులకు 8:28
  'romans 8:28': {
    primaryVerse: {
      reference: {
        bookEn: 'Romans',
        bookTe: 'రోమీయులకు',
        chapter: 8,
        verse: 28,
        refStringEn: 'Romans 8:28',
        refStringTe: 'రోమీయులకు 8:28',
      },
      textEn: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
      textTe: 'దేవుని ప్రేమించువారికి, అనగా ఆయన సంకల్పముచొప్పున పిలువబడినవారికి, సమస్తమును సమకూడి మేలుకొరకై జరుగుచున్నవని యెరుగుదుము.',
    },
    contextSummaryEn: 'A mighty assurance of divine sovereignty and providence: God orchestrates every circumstance in the believer\'s life towards ultimate eternal good and conformity to the image of His Son.',
    contextSummaryTe: 'దేవుని సార్వభౌమాధికారము మరియు సంరక్షణపై తిరుగులేని వాగ్దానము: దేవుని ప్రేమించి పిలువబడిన విశ్వాసి జీవితంలో ప్రతి పరిస్థితిని ఆయన అంతిమ మేలుకొరకు సమకూర్చును.',
    relatedThemes: [
      { id: 'sovereignty', nameEn: 'Sovereignty & Providence', nameTe: 'దేవుని సార్వభౌమత్వము' },
      { id: 'comfort', nameEn: 'Comfort in Trials', nameTe: 'శ్రమలలో ఆదరణ' },
      { id: 'purpose', nameEn: 'Calling & Purpose', nameTe: 'దైవిక సంకల్పము' },
      { id: 'hope', nameEn: 'Hope & Endurance', nameTe: 'నిరీక్షణ' },
    ],
    crossReferences: [
      {
        id: 'cr-gen-50-20',
        targetRef: {
          bookEn: 'Genesis',
          bookTe: 'ఆదికాండము',
          chapter: 50,
          verse: 20,
          refStringEn: 'Genesis 50:20',
          refStringTe: 'ఆదికాండము 50:20',
        },
        textEn: 'But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive.',
        textTe: 'మీరు నాకు కీడుచేయ నుద్దేశించితిరి గాని నేటిదినమున జరుగుచున్నట్లు, అనగా బహుజనులను బ్రదికించునట్లుగా అది మేలుకే పరిణమించునని దేవుడు ఉద్దేశించెను.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'Providence in Joseph\'s Life',
        relationshipLabelTe: 'యోసేపు జీవితంలో దైవ సంకల్పము',
        connectionNoteEn: 'Joseph\'s declaration is the ultimate narrative illustration of Romans 8:28—human malice overruled by divine grace to bring salvation and blessing.',
        connectionNoteTe: 'రోమీయులకు 8:28 కి యోసేపు జీవితమే సజీవ సాక్ష్యం. మనుష్యులు కీడుగా తలంచినప్పటికీ, దేవుడు అనేకమంది రక్షణ కొరకు దానిని మేలుగా మార్చెను.',
        thematicTags: ['Providence', 'Forgiveness', 'Sovereignty'],
      },
      {
        id: 'cr-jer-29-11',
        targetRef: {
          bookEn: 'Jeremiah',
          bookTe: 'యిర్మీయా',
          chapter: 29,
          verse: 11,
          refStringEn: 'Jeremiah 29:11',
          refStringTe: 'యిర్మీయా 29:11',
        },
        textEn: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
        textTe: 'నేను మిమ్మునుగూర్చి ఉద్దేశించిన సంగతులను నేను ఎరుగుదును, రాబోవు కాలమందు మీకు నిరీక్షణ కలుగునట్లుగా అవి సమాధానకరమైన ఉద్దేశములే గాని హానికరమైనవి కావు; ఇదే యెహోవా వాక్కు.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'God\'s Thoughts of Peace',
        relationshipLabelTe: 'సమాధానకరమైన దైవ సంకల్పములు',
        connectionNoteEn: 'Reiterates God\'s intentional, unwavering plans for a hopeful future for His covenant people even during painful captivity.',
        connectionNoteTe: 'శ్రమలలోను చెరలోను ఉన్న ప్రజలకు దేవుని తలంపులు ఎల్లప్పుడూ సమాధానకరమైనవని, నిరీక్షణతో కూడిన ముగింపునిచ్చునని ధృవపరుస్తున్నది.',
        thematicTags: ['Hope', 'Peace', 'Future'],
      },
      {
        id: 'cr-rom-8-29-30',
        targetRef: {
          bookEn: 'Romans',
          bookTe: 'రోమీయులకు',
          chapter: 8,
          verse: 29,
          verseEnd: 30,
          refStringEn: 'Romans 8:29-30',
          refStringTe: 'రోమీయులకు 8:29-30',
        },
        textEn: 'For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren. Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified.',
        textTe: 'ఎందుకనగా తన కుమారుడు అనేక సహోదరులలో జ్యేష్టుడగునట్లు, దేవుడెవరిని ముందు ఎరిగెనో, వారు తన కుమారునితో సారూప్యము గలవారవుటకు వారిని ముందుగా నిర్ణయించెను. మరియు ఎవరిని ముందుగా నిర్ణయించెనో వారిని పిలిచెను; ఎవరిని పిలిచెనో వారిని నీతిమంతులుగా తీర్చెను; ఎవరిని నీతిమంతులుగా తీర్చెను వారిని మహిమపరచెను.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'The Golden Chain of Redemption',
        relationshipLabelTe: 'రక్షణ యొక్క సువర్ణ శృంఖలము',
        connectionNoteEn: 'The immediate context defining "the good" of Romans 8:28—not worldly ease, but ultimate conformity to Christ and future glory.',
        connectionNoteTe: 'రోమీయులకు 8:28 లో "మేలు" అనగా లౌకిక సుఖము కాదు, క్రీస్తు సారూప్యములోనికి మారడం మరియు నిత్య మహిమ పొందడమే అని స్పష్టం చేస్తున్నది.',
        thematicTags: ['Calling', 'Justification', 'Glorification'],
      }
    ]
  },

  // GENESIS 1:1 / ఆదికాండము 1:1
  'genesis 1:1': {
    primaryVerse: {
      reference: {
        bookEn: 'Genesis',
        bookTe: 'ఆదికాండము',
        chapter: 1,
        verse: 1,
        refStringEn: 'Genesis 1:1',
        refStringTe: 'ఆదికాండము 1:1',
      },
      textEn: 'In the beginning God created the heaven and the earth.',
      textTe: 'ఆదియందు దేవుడు భూమ్యాకాశములను సృజించెను.',
    },
    contextSummaryEn: 'The opening foundation of the entire Bible: establishes God as the uncreated, transcendent Creator of time, space, and all material reality.',
    contextSummaryTe: 'పరిశుద్ధ గ్రంథమునకు ఆది పునాది: కాలము, ఆకాశము, భూమి మరియు సర్వ సృష్టికి దేవుడే స్వయంభువైన సృష్టికర్త అని స్థిరపరచుచున్నది.',
    relatedThemes: [
      { id: 'creation', nameEn: 'Creation & Origin', nameTe: 'సృష్టి మరియు మూలము' },
      { id: 'sovereignty', nameEn: 'Sovereignty of God', nameTe: 'సర్వాధిపత్యము' },
      { id: 'word', nameEn: 'The Living Word', nameTe: 'సజీవ వాక్యము' },
    ],
    crossReferences: [
      {
        id: 'cr-jhn-1-1-3',
        targetRef: {
          bookEn: 'John',
          bookTe: 'యోహాను',
          chapter: 1,
          verse: 1,
          verseEnd: 3,
          refStringEn: 'John 1:1-3',
          refStringTe: 'యోహాను 1:1-3',
        },
        textEn: 'In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made.',
        textTe: 'ఆదియందు వాక్యము ఉండెను, వాక్యము దేవునియొద్ద ఉండెను, వాక్యము దేవుడై యుండెను. ఆయన ఆదియందు దేవునియొద్ద ఉండెను. సమస్తమును ఆయన మూలముగా కలిగెను, కలిగియున్నదేదియు ఆయన లేకుండ కలుగలేదు.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Christ the Creator Word',
        relationshipLabelTe: 'సృష్టికర్తయైన క్రీస్తు వాక్యము',
        connectionNoteEn: 'John intentionally echoes Genesis 1:1, revealing that Jesus Christ is the eternal Word (Logos) who was with God and through whom the cosmos was made.',
        connectionNoteTe: 'యోహాను సువార్త ఉద్దేశపూర్వకంగా ఆదికాండము 1:1 శైలిని తీసుకుని, యేసుక్రీస్తు నిత్య వాక్యమై సమస్త సృష్టికి కారణభూతుడని వెల్లడించెను.',
        thematicTags: ['Christology', 'Creation', 'Eternity'],
      },
      {
        id: 'cr-col-1-16-17',
        targetRef: {
          bookEn: 'Colossians',
          bookTe: 'కొలొస్సయులకు',
          chapter: 1,
          verse: 16,
          verseEnd: 17,
          refStringEn: 'Colossians 1:16-17',
          refStringTe: 'కొలొస్సయులకు 1:16-17',
        },
        textEn: 'For by him were all things created, that are in heaven, and that are in earth, visible and invisible... all things were created by him, and for him: And he is before all things, and by him all things consist.',
        textTe: 'ఏలయనగా ఆకాశమందున్నవియు భూమిమీద ఉన్నవియు, దృశ్యమైనవిగాని అదృశ్యమైనవిగాని... సర్వమును ఆయనయందు సృజింపబడెను. సర్వమును ఆయన ద్వారాను ఆయనను బట్టియు సృజింపబడెను. ఆయన అన్నిటికంటె ముందుగా ఉన్నవాడు, ఆయనయందే సమస్తమును నిలిచియున్నది.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Supremacy of Christ over Creation',
        relationshipLabelTe: 'సృష్టిపై క్రీస్తు యొక్క సర్వోన్నతత్వము',
        connectionNoteEn: 'Paul outlines the cosmic agency and purpose of Christ as both Creator and sustainer of all existing things.',
        connectionNoteTe: 'సమస్త సృష్టి క్రీస్తు ద్వారా, ఆయన కొరకే సృజింపబడినదని మరియు ఆయనయందే సర్వము నిలిచియున్నదని పౌలు విశదీకరిస్తున్నాడు.',
        thematicTags: ['Sovereignty', 'Christology', 'Cosmology'],
      },
      {
        id: 'cr-heb-11-3',
        targetRef: {
          bookEn: 'Hebrews',
          bookTe: 'హెబ్రీయులకు',
          chapter: 11,
          verse: 3,
          refStringEn: 'Hebrews 11:3',
          refStringTe: 'హెబ్రీయులకు 11:3',
        },
        textEn: 'Through faith we understand that the worlds were framed by the word of God, so that things which are seen were not made of things which do appear.',
        textTe: 'ప్రపంచములు దేవుని వాక్యమువలన నిర్మాణమైనవనియు, అందునుబట్టి దృశ్యమైనది కనబడే పదార్థములవలన కలగలేదనియు విశ్వాసముచేత గ్రహించుకొనుచున్నాము.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'Creation Ex Nihilo by Faith',
        relationshipLabelTe: 'విశ్వాసముతో గ్రహించే వాక్య సృష్టి',
        connectionNoteEn: 'Affirms that God created the visible universe out of nothing by the sheer power of His spoken word.',
        connectionNoteTe: 'కనిపించే ఈ విశ్వము ఏ భౌతిక పదార్థము నుండి కాక, కేవలం దేవుని సజీవ వాక్కు చేత శూన్యము నుండి సృజింపబడినదని విశ్వాసము ద్వారా తెలుసుకొనుచున్నాము.',
        thematicTags: ['Faith', 'Creation', 'Power of the Word'],
      }
    ]
  },

  // PSALM 23:1 / కీర్తనలు 23:1
  'psalms 23:1': {
    primaryVerse: {
      reference: {
        bookEn: 'Psalms',
        bookTe: 'కీర్తనలు',
        chapter: 23,
        verse: 1,
        refStringEn: 'Psalms 23:1',
        refStringTe: 'కీర్తనలు 23:1',
      },
      textEn: 'The LORD is my shepherd; I shall not want.',
      textTe: 'యెహోవా నా కాపరి; నాకు లేమి కలుగదు.',
    },
    contextSummaryEn: 'David\'s beloved confession of total contentment and security in Yahweh, our caring, watchful Shepherd who provides, protects, and guides.',
    contextSummaryTe: 'యెహోవా తన సంరక్షకుడైన కాపరి అని, ఆయన యొద్ద తనకు ఎట్టి కొరతయు ఉండబోదని దావీదు పలికిన మధురమైన విశ్వాస ప్రకటన.',
    relatedThemes: [
      { id: 'shepherd', nameEn: 'The Good Shepherd', nameTe: 'మంచి కాపరి' },
      { id: 'provision', nameEn: 'Divine Provision', nameTe: 'దైవిక పోషణ' },
      { id: 'peace', nameEn: 'Peace & Rest', nameTe: 'శాంతి మరియు నెమ్మది' },
    ],
    crossReferences: [
      {
        id: 'cr-jhn-10-11',
        targetRef: {
          bookEn: 'John',
          bookTe: 'యోహాను',
          chapter: 10,
          verse: 11,
          refStringEn: 'John 10:11',
          refStringTe: 'యోహాను 10:11',
        },
        textEn: 'I am the good shepherd: the good shepherd giveth his life for the sheep.',
        textTe: 'నేనే మంచి కాపరిని; మంచి కాపరి గొఱ్ఱెలకొరకు తన ప్రాణము పెట్టును.',
        relationship: 'prophetic_fulfillment',
        relationshipLabelEn: 'Jesus the Good Shepherd',
        relationshipLabelTe: 'యేసే ఆ మంచి కాపరి',
        connectionNoteEn: 'Jesus takes the title of Yahweh in Psalm 23 upon Himself, revealing that the Shepherd who provides is also the Shepherd who lays down His life.',
        connectionNoteTe: 'కీర్తన 23 లో దావీదు కీర్తించిన యెహోవా కాపరి యేసుక్రీస్తే అని, ఆయన గొఱ్ఱెల కొరకు తన ప్రాణమునే అర్పించెనని ప్రకటించెను.',
        thematicTags: ['Good Shepherd', 'Sacrifice', 'Love'],
      },
      {
        id: 'cr-isa-40-11',
        targetRef: {
          bookEn: 'Isaiah',
          bookTe: 'యెషయా',
          chapter: 40,
          verse: 11,
          refStringEn: 'Isaiah 40:11',
          refStringTe: 'యెషయా 40:11',
        },
        textEn: 'He shall feed his flock like a shepherd: he shall gather the lambs with his arm, and carry them in his bosom, and shall gently lead those that are with young.',
        textTe: 'గొఱ్ఱెలకాపరివలె ఆయన తన మందను మేపును, గొఱ్ఱెపిల్లలను తన బాహువుతో కూర్చి తన రొమ్మున మోయును, పాలిచ్చువాటిని ఆయన మెల్లగా నడిపించును.',
        relationship: 'prophetic_fulfillment',
        relationshipLabelEn: 'The Tender Care of the Shepherd',
        relationshipLabelTe: 'కాపరి యొక్క వాత్సల్య సంరక్షణ',
        connectionNoteEn: 'Prophesies the tender, nurturing care of Messiah carrying the weak and weary in His bosom.',
        connectionNoteTe: 'బలహీనమైన గొర్రెపిల్లలను తన చేతులలోకి తీసుకుని గుండెలపై మోసే దేవుని వాత్సల్యమును యెషయా వర్ణించుచున్నాడు.',
        thematicTags: ['Care', 'Tenderness', 'Guidance'],
      },
      {
        id: 'cr-php-4-19',
        targetRef: {
          bookEn: 'Philippians',
          bookTe: 'ఫిలిప్పీయులకు',
          chapter: 4,
          verse: 19,
          refStringEn: 'Philippians 4:19',
          refStringTe: 'ఫిలిప్పీయులకు 4:19',
        },
        textEn: 'But my God shall supply all your need according to his riches in glory by Christ Jesus.',
        textTe: 'దేవుడు తన ఐశ్వర్యముచొప్పున క్రీస్తుయేసునందు మహిమలో మీ ప్రతి అవసరమును తీర్చును.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'All Needs Supplied in Christ',
        relationshipLabelTe: 'క్రీస్తునందు ప్రతి అవసరత తీర్చబడుట',
        connectionNoteEn: 'Paul echoes "I shall not want" into the New Covenant promise of God supplying every need according to His riches in Christ.',
        connectionNoteTe: '"నాకు లేమి కలుగదు" అను మాటకు క్రొత్త నిబంధనలో పౌలు క్రీస్తునందు దేవుడు మన ప్రతి కొరతను తీర్చునని ధైర్యము చెప్పుచున్నాడు.',
        thematicTags: ['Provision', 'Faithfulness', 'Contentment'],
      }
    ]
  },

  // ISAIAH 53:5 / యెషయా 53:5
  'isaiah 53:5': {
    primaryVerse: {
      reference: {
        bookEn: 'Isaiah',
        bookTe: 'యెషయా',
        chapter: 53,
        verse: 5,
        refStringEn: 'Isaiah 53:5',
        refStringTe: 'యెషయా 53:5',
      },
      textEn: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.',
      textTe: 'మన యతిక్రమక్రియలనుబట్టి అతడు గాయపరచబడెను మన దోషములనుబట్టి నలుగగొట్టబడెను మన సమాధానార్థమైన శిక్ష అతనిమీద పడెను అతడు పొందిన దెబ్బలచేత మనకు స్వస్థత కలుగుచున్నది.',
    },
    contextSummaryEn: 'The heart of the Suffering Servant prophecy: the substitutionary atonement where Christ bore our sins and wounds so that we might have peace and healing.',
    contextSummaryTe: 'శ్రమనొందిన దాసుని ప్రవచనపు కేంద్రబిందువు: మన అతిక్రమములను బట్టి క్రీస్తు సిలువలో గాయపడి, మనకు సమాధానమును ఆత్మీయ స్వస్థతను కలుగజేసిన ప్రాయశ్చిత్త బలి.',
    relatedThemes: [
      { id: 'atonement', nameEn: 'Substitutionary Atonement', nameTe: 'ప్రాయశ్చిత్త బలి' },
      { id: 'cross', nameEn: 'The Cross of Christ', nameTe: 'క్రీస్తు సిలువ' },
      { id: 'healing', nameEn: 'Healing & Restoration', nameTe: 'స్వస్థత మరియు సమాధానము' },
    ],
    crossReferences: [
      {
        id: 'cr-1pe-2-24',
        targetRef: {
          bookEn: '1 Peter',
          bookTe: '1 పేతురు',
          chapter: 2,
          verse: 24,
          refStringEn: '1 Peter 2:24',
          refStringTe: '1 పేతురు 2:24',
        },
        textEn: 'Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed.',
        textTe: 'మనము పాపములవిషయమై చనిపోయి, నీతివిషయమై జీవించునట్లు, ఆయన తానే తన శరీరమందు మన పాపములను మ్రానుమీద మోసుకొనెను; ఆయన పొందిన దెబ్బలచేత మీరు స్వస్థత నొందితిరి.',
        relationship: 'direct_quotation',
        relationshipLabelEn: 'Apostolic Quotation of Isaiah 53',
        relationshipLabelTe: 'పేతురు అపొస్తలుని ప్రత్యక్ష ఉల్లేఖనం',
        connectionNoteEn: 'Peter explicitly quotes Isaiah 53:5, showing its definitive fulfillment in Jesus bearing our sins on the cross at Calvary.',
        connectionNoteTe: 'పేతురు అపొస్తలుడు యెషయా 53:5 ను నేరుగా ఉటంకిస్తూ, క్రీస్తు సిలువ మ్రానుపై మన పాపములను మోసి స్వస్థపరచెనని రూఢిపరచెను.',
        thematicTags: ['Fulfillment', 'Healing', 'Sin-bearer'],
      },
      {
        id: 'cr-2co-5-21',
        targetRef: {
          bookEn: '2 Corinthians',
          bookTe: '2 కొరింథీయులకు',
          chapter: 5,
          verse: 21,
          refStringEn: '2 Corinthians 5:21',
          refStringTe: '2 కొరింథీయులకు 5:21',
        },
        textEn: 'For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.',
        textTe: 'ఎందుకనగా మనమాయనయందు దేవుని నీతియగునట్లు, పాపమెరుగని ఆయనను మనకోసము పాపముగా చేసెను.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'The Great Divine Exchange',
        relationshipLabelTe: 'గొప్ప దైవిక మార్పిడి',
        connectionNoteEn: 'The theological definition of substitution: the sinless Son takes our sin, and we receive His righteousness.',
        connectionNoteTe: 'పాపము లేని క్రీస్తు మన పాపమును భరించి, తన దివ్య నీతిని మనకు బహుమతిగా ఇచ్చినట్లు పౌలు వివరించెను.',
        thematicTags: ['Righteousness', 'Atonement', 'Justification'],
      },
      {
        id: 'cr-rom-5-1',
        targetRef: {
          bookEn: 'Romans',
          bookTe: 'రోమీయులకు',
          chapter: 5,
          verse: 1,
          refStringEn: 'Romans 5:1',
          refStringTe: 'రోమీయులకు 5:1',
        },
        textEn: 'Therefore being justified by faith, we have peace with God through our Lord Jesus Christ.',
        textTe: 'కాబట్టి విశ్వాసమువలన మనం నీతిమంతులుగా తీర్చబడి, మన ప్రభువైన యేసుక్రీస్తు ద్వారా దేవునితో సమాధానము కలిగియుందము.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'Peace Established through Christ',
        relationshipLabelTe: 'క్రీస్తు వలన కలిగిన దైవ సమాధానము',
        connectionNoteEn: 'Directly mirrors the "chastisement of our peace": Christ\'s suffering resulted in our peace with God.',
        connectionNoteTe: 'యెషయా 53 లోని "మన సమాధానార్థమైన శిక్ష" ఫలితంగా మనకు దేవునితో సమాధానము దొరికినదని రోమా 5:1 స్పష్టం చేయుచున్నది.',
        thematicTags: ['Peace', 'Justification', 'Reconciliation'],
      }
    ]
  },

  // EPHESIANS 2:8 / ఎఫెసీయులకు 2:8-9
  'ephesians 2:8': {
    primaryVerse: {
      reference: {
        bookEn: 'Ephesians',
        bookTe: 'ఎఫెసీయులకు',
        chapter: 2,
        verse: 8,
        verseEnd: 9,
        refStringEn: 'Ephesians 2:8-9',
        refStringTe: 'ఎఫెసీయులకు 2:8-9',
      },
      textEn: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.',
      textTe: 'మీరు విశ్వాసముద్వారా కృపచేతనే రక్షింపబడియున్నారు; ఇది మీవలన కలిగినది కాదు, దేవుని వరమే; అది క్రియలవలన కలిగినది కాదు గనుక ఎవడును అతిశయపడవీలులేదు.',
    },
    contextSummaryEn: 'The charter of Christian salvation: eternal redemption is an unearned gift of pure sovereign grace, received through faith alone, totally excluding human boasting.',
    contextSummaryTe: 'క్రైస్తవ రక్షణ సిద్ధాంతపు మూలస్తంభము: రక్షణ అనేది మనుష్యుల క్రియల ద్వారా కాదు, కేవలం విశ్వాసము ద్వారా లభించే ఉచిత దైవిక కృపావరం.',
    relatedThemes: [
      { id: 'grace', nameEn: 'Sovereign Grace', nameTe: 'ఉచిత కృప' },
      { id: 'faith', nameEn: 'Justifying Faith', nameTe: 'రక్షించే విశ్వాసము' },
      { id: 'works', nameEn: 'Grace vs Works', nameTe: 'కృప మరియు క్రియలు' },
    ],
    crossReferences: [
      {
        id: 'cr-tit-3-5',
        targetRef: {
          bookEn: 'Titus',
          bookTe: 'తీతుకు',
          chapter: 3,
          verse: 5,
          refStringEn: 'Titus 3:5',
          refStringTe: 'తీతుకు 3:5',
        },
        textEn: 'Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost;',
        textTe: 'మనము నీతినిబట్టి చేసిన క్రియలమూలముగా కాక, తన కనికరముచొప్పుననే పునర్జన్మసంబంధమైన స్నానము ద్వారాను, పరిశుద్ధాత్మ మనకు నూతనస్వభావము కలుగజేయుట ద్వారాను మనలను రక్షించెను.',
        relationship: 'parallel_account',
        relationshipLabelEn: 'Saved by Mercy, Not Works',
        relationshipLabelTe: 'క్రియల వలన కాక కనికరము చేత రక్షణ',
        connectionNoteEn: 'Paul restates the same theological truth in Titus: human righteousness is powerless to save; salvation is through divine mercy and the Holy Spirit.',
        connectionNoteTe: 'మనుష్యుల నీతి క్రియల వలన రక్షణ రాదని, కేవలం దేవుని కనికరము మరియు పరిశుద్ధాత్మ నూతనపరచుట వలననే రక్షణ కలుగునని పౌలు తీతుకు రాశాడు.',
        thematicTags: ['Mercy', 'Regeneration', 'Holy Spirit'],
      },
      {
        id: 'cr-rom-3-24',
        targetRef: {
          bookEn: 'Romans',
          bookTe: 'రోమీయులకు',
          chapter: 3,
          verse: 24,
          refStringEn: 'Romans 3:24',
          refStringTe: 'రోమీయులకు 3:24',
        },
        textEn: 'Being justified freely by his grace through the redemption that is in Christ Jesus:',
        textTe: 'కాబట్టి నమ్మువారు ఆయన కృపచేతనే, క్రీస్తుయేసునందలి విమోచనముద్వారా ఉచితముగా నీతిమంతులుగా తీర్చబడుచున్నారు.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Freely Justified by Grace',
        relationshipLabelTe: 'కృపచేత ఉచితముగా నీతిమంతులుగా తీర్చబడుట',
        connectionNoteEn: 'Reiterates that justification is given freely (without cost or merit on our part) through Christ\'s redemption.',
        connectionNoteTe: 'మన అర్హతను బట్టి కాక, క్రీస్తు విమోచన క్రయధనమును బట్టి దేవుడు మనలను ఉచితముగా నీతిమంతులుగా తీర్చుచున్నాడని స్పష్టపరుస్తున్నది.',
        thematicTags: ['Grace', 'Justification', 'Redemption'],
      }
    ]
  },

  // PROVERBS 3:5 / సామెతలు 3:5-6
  'proverbs 3:5': {
    primaryVerse: {
      reference: {
        bookEn: 'Proverbs',
        bookTe: 'సామెతలు',
        chapter: 3,
        verse: 5,
        verseEnd: 6,
        refStringEn: 'Proverbs 3:5-6',
        refStringTe: 'సామెతలు 3:5-6',
      },
      textEn: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
      textTe: 'నీ స్వబుద్ధిని ఆధారము చేసికొనక నీ పూర్ణహృదయముతో యెహోవాయందు నమ్మకముంచుము. నీ ప్రవర్తన అంతటియందు ఆయన అధికారమునకు ఒప్పుకొనుము, అప్పుడు ఆయన నీ త్రోవలను సరాళము చేయును.',
    },
    contextSummaryEn: 'A foundational principle of biblical wisdom: wholehearted, humble dependence on God\'s direction rather than human pride or flawed understanding.',
    contextSummaryTe: 'దైవిక జ్ఞానమునకు మూలస్తంభము: స్వకీయ జ్ఞానముపై ఆధారపడక, సమస్త మార్గములలో దేవుని సార్వభౌమత్వమును అంగీకరిస్తూ ఆయన నడిపింపును పొందుట.',
    relatedThemes: [
      { id: 'faith', nameEn: 'Faith & Trust', nameTe: 'విశ్వాసము మరియు నమ్మకము' },
      { id: 'wisdom', nameEn: 'Biblical Wisdom', nameTe: 'దైవిక జ్ఞానము' },
      { id: 'guidance', nameEn: 'Divine Guidance', nameTe: 'దేవుని నడిపింపు' },
    ],
    crossReferences: [
      {
        id: 'cr-psa-37-5',
        targetRef: {
          bookEn: 'Psalms',
          bookTe: 'కీర్తనలు',
          chapter: 37,
          verse: 5,
          refStringEn: 'Psalms 37:5',
          refStringTe: 'కీర్తనలు 37:5',
        },
        textEn: 'Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.',
        textTe: 'నీ మార్గమును యెహోవాకు అప్పగింపుము, ఆయనయందు నమ్మకముంచుము ఆయనయే సమకూర్చును.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'Commit Your Way to the Lord',
        relationshipLabelTe: 'నీ మార్గమును యెహోవాకు అప్పగించుము',
        connectionNoteEn: 'David re-articulates Solomon\'s wisdom: entrusting all plans and steps completely to the faithful hands of God.',
        connectionNoteTe: 'మన ప్రణాళికలు మరియు భవిష్యత్తును సంపూర్ణముగా దేవునికి సమర్పించినప్పుడు ఆయనయే సమస్తమును నెరవేర్చును.',
        thematicTags: ['Trust', 'Providence', 'Peace'],
      },
      {
        id: 'cr-jer-10-23',
        targetRef: {
          bookEn: 'Jeremiah',
          bookTe: 'యిర్మీయా',
          chapter: 10,
          verse: 23,
          refStringEn: 'Jeremiah 10:23',
          refStringTe: 'యిర్మీయా 10:23',
        },
        textEn: 'O LORD, I know that the way of man is not in himself: it is not in man that walketh to direct his steps.',
        textTe: 'యెహోవా, తమ మార్గమును ఏర్పరచుకొనుట నరులవశములో లేదనియు, తమ అడుగులను చక్కపరచుకొనుట నడుచువాని వశములో లేదనియు నేనెరుగుదును.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Human Limitation & Divine Sovereignty',
        relationshipLabelTe: 'మానవ అశక్తత మరియు దైవ సార్వభౌమత్వము',
        connectionNoteEn: 'Jeremiah admits the fatal insufficiency of human intellect to guide life without divine wisdom.',
        connectionNoteTe: 'మనిషి తన స్వబుద్ధితో తన జీవిత మార్గమును సరిచేసుకోలేడని, దేవుని మార్గదర్శకత్వమే ఆవశ్యకమని యిర్మీయా ఒప్పుకొనెను.',
        thematicTags: ['Humility', 'Wisdom', 'Guidance'],
      }
    ]
  },

  // PHILIPPIANS 4:6 / ఫిలిప్పీయులకు 4:6-7
  'philippians 4:6': {
    primaryVerse: {
      reference: {
        bookEn: 'Philippians',
        bookTe: 'ఫిలిప్పీయులకు',
        chapter: 4,
        verse: 6,
        verseEnd: 7,
        refStringEn: 'Philippians 4:6-7',
        refStringTe: 'ఫిలిప్పీయులకు 4:6-7',
      },
      textEn: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
      textTe: 'దేనినిగూర్చియు చింతపడకుడి గాని ప్రతి విషయములోను ప్రార్థన విజ్ఞాపనములచేత కృతజ్ఞతాపూర్వకముగా మీ విన్నపములు దేవునికి తెలియజేయుడి. అప్పుడు సమస్త జ్ఞానమునకు మించిన దేవుని సమాధానము యేసుక్రీస్తువలన మీ హృదయములకును మీ తలంపులకును కావలియుండును.',
    },
    contextSummaryEn: 'The divine antidote to anxiety: replacing worldly worry with grateful prayer, which unlocks God\'s supernatural peace as a fortress around mind and heart.',
    contextSummaryTe: 'ఆందోళన మరియు చింతలకు దైవిక పరిష్కారము: కృతజ్ఞతాపూర్వక ప్రార్థన ద్వారా చింతలను విడిచి, సమస్త జ్ఞానమునకు మించిన దేవుని సమాధానమును కాపుదలగా పొందుట.',
    relatedThemes: [
      { id: 'prayer', nameEn: 'Prayer & Supplication', nameTe: 'ప్రార్థన మరియు విజ్ఞాపన' },
      { id: 'peace', nameEn: 'Supernatural Peace', nameTe: 'దైవ సమాధానము' },
      { id: 'trust', nameEn: 'Freedom from Anxiety', nameTe: 'చింతల నుండి విడుదల' },
    ],
    crossReferences: [
      {
        id: 'cr-1pe-5-7',
        targetRef: {
          bookEn: '1 Peter',
          bookTe: '1 పేతురు',
          chapter: 5,
          verse: 7,
          refStringEn: '1 Peter 5:7',
          refStringTe: '1 పేతురు 5:7',
        },
        textEn: 'Casting all your care upon him; for he careth for you.',
        textTe: 'ఆయన మిమ్మునుగూర్చి చింతించుచున్నాడు గనుక మీ చింత యావత్తు ఆయనమీద వేయుడి.',
        relationship: 'practical_application',
        relationshipLabelEn: 'Casting All Cares upon God',
        relationshipLabelTe: 'చింత యావత్తు ఆయనపై మోపుట',
        connectionNoteEn: 'Peter reinforces Paul\'s instruction: we can relinquish our burdens because God tenderly cares for us personally.',
        connectionNoteTe: 'దేవుడు మనపై వాత్సల్యము కలిగి మనలను గూర్చి చింతించుచున్నాడు గనుక మన భారమంతటిని ఆయనపై వేయవచ్చు.',
        thematicTags: ['Care', 'Rest', 'Humility'],
      },
      {
        id: 'cr-isa-26-3',
        targetRef: {
          bookEn: 'Isaiah',
          bookTe: 'యెషయా',
          chapter: 26,
          verse: 3,
          refStringEn: 'Isaiah 26:3',
          refStringTe: 'యెషయా 26:3',
        },
        textEn: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.',
        textTe: 'ఎవని మనస్సు నీమీద ఆనుకొనునో వానిని నీవు పూర్ణశాంతిగలవానిగా కాపాడుదువు, ఏలయనగా అతడు నీయందు విశ్వాసముంచియున్నాడు.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Perfect Peace for the Steadfast Mind',
        relationshipLabelTe: 'దేవునిపై ఆనుకొనువానికి పూర్ణశాంతి',
        connectionNoteEn: 'The Old Testament anchor for peace: keeping our mind fixed on God yields unshakable shalom.',
        connectionNoteTe: 'మనస్సును దేవునిపై నిలిపి నమ్మికయుంచినప్పుడు లభించే సంపూర్ణ శాంతిని యెషయా వర్ణించుచున్నాడు.',
        thematicTags: ['Peace', 'Mind', 'Trust'],
      }
    ]
  },

  // GALATIANS 2:20 / గలతీయులకు 2:20
  'galatians 2:20': {
    primaryVerse: {
      reference: {
        bookEn: 'Galatians',
        bookTe: 'గలతీయులకు',
        chapter: 2,
        verse: 20,
        refStringEn: 'Galatians 2:20',
        refStringTe: 'గలతీయులకు 2:20',
      },
      textEn: 'I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.',
      textTe: 'నేను క్రీస్తుతోకూడ సిలువ వేయబడియున్నాను; ఇకను జీవించువాడను నేను కాను, క్రీస్తే నాయందు జీవించుచున్నాడు. నేను ఇప్పుడు శరీరమందు జీవించుచున్న ఈ జీవితము నన్ను ప్రేమించి, నా కొరకు తన్నుతాను అప్పగించుకొనిన దేవుని కుమారునియందలి విశ్వాసమువలన జీవించుచున్నాను.',
    },
    contextSummaryEn: 'The profound reality of the believer\'s co-crucifixion and union with Christ: the old self has died, and the indwelling resurrected Christ now lives through the believer.',
    contextSummaryTe: 'క్రీస్తుతో ఐక్యమైన క్రైస్తవ జీవితపు మర్మము: పాత స్వభావము సిలువ వేయబడి, తనను ప్రేమించి ప్రాణమిచ్చిన దేవుని కుమారునియందలి విశ్వాసము ద్వారా క్రీస్తే మనలో జీవించుట.',
    relatedThemes: [
      { id: 'union', nameEn: 'Union with Christ', nameTe: 'క్రీస్తుతో ఐక్యత' },
      { id: 'sanctification', nameEn: 'Crucified Life', nameTe: 'సిలువ వేయబడిన జీవితం' },
      { id: 'faith', nameEn: 'Living by Faith', nameTe: 'విశ్వాస జీవనము' },
    ],
    crossReferences: [
      {
        id: 'cr-rom-6-6',
        targetRef: {
          bookEn: 'Romans',
          bookTe: 'రోమీయులకు',
          chapter: 6,
          verse: 6,
          refStringEn: 'Romans 6:6',
          refStringTe: 'రోమీయులకు 6:6',
        },
        textEn: 'Knowing this, that our old man is crucified with him, that the body of sin might be destroyed, that henceforth we should not serve sin.',
        textTe: 'ఏమనగా మనమింకను పాపమునకు దాసులము కాకుండునట్లు, పాపశరీరము నిరర్థకమగునట్లు మన ప్రాచీనస్వభావము ఆయనతోకూడ సిలువవేయబడెనని యెరుగుదుము.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Crucifixion of the Old Nature',
        relationshipLabelTe: 'ప్రాచీన స్వభావము సిలువ వేయబడుట',
        connectionNoteEn: 'Paul systematically unpacks the theological framework of Galatians 2:20 in Romans 6.',
        connectionNoteTe: 'పాపమునకు బానిసత్వము నుండి విడుదల పొందుట కొరకు మన ప్రాచీన స్వభావము క్రీస్తుతో పాటు సిలువ వేయబడెనని స్పష్టం చేయుచున్నది.',
        thematicTags: ['Death to Sin', 'Freedom', 'New Life'],
      },
      {
        id: 'cr-col-3-3-4',
        targetRef: {
          bookEn: 'Colossians',
          bookTe: 'కొలొస్సయులకు',
          chapter: 3,
          verse: 3,
          verseEnd: 4,
          refStringEn: 'Colossians 3:3-4',
          refStringTe: 'కొలొస్సయులకు 3:3-4',
        },
        textEn: 'For ye are dead, and your life is hid with Christ in God. When Christ, who is our life, shall appear, then shall ye also appear with him in glory.',
        textTe: 'ఏలయనగా మీరు చనిపోతిరి, మీ జీవము క్రీస్తుతోకూడ దేవునియందు దాచబడియున్నది. మనకు జీవమైయున్న క్రీస్తు ప్రత్యక్షమైనప్పుడు మీరును ఆయనతోకూడ మహిమయందు ప్రత్యక్షపరచబడుదురు.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'Life Hidden with Christ in God',
        relationshipLabelTe: 'క్రీస్తుతో కూడా దేవునియందు దాచబడిన జీవము',
        connectionNoteEn: 'Confirms that the believer\'s true identity is bound up permanently in the life and glory of Christ.',
        connectionNoteTe: 'విశ్వాసి యొక్క జీవితము క్రీస్తునందు భద్రముగా దాచబడినదని, క్రీస్తు ప్రత్యక్షమైనప్పుడు మహిమ పొందుదురని తెలియజేయుచున్నది.',
        thematicTags: ['Glory', 'Hidden Life', 'Security'],
      }
    ]
  },

  // HEBREWS 11:1 / హెబ్రీయులకు 11:1
  'hebrews 11:1': {
    primaryVerse: {
      reference: {
        bookEn: 'Hebrews',
        bookTe: 'హెబ్రీయులకు',
        chapter: 11,
        verse: 1,
        refStringEn: 'Hebrews 11:1',
        refStringTe: 'హెబ్రీయులకు 11:1',
      },
      textEn: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
      textTe: 'విశ్వాసమనునది నిరీక్షింపబడువాటియొక్క నిజస్వరూపమును, అదృశ్యమైన సంగతులు ఉన్నవనుటకు రుజువునై యున్నది.',
    },
    contextSummaryEn: 'The definitive biblical description of faith: supernatural confidence giving present reality to eternal promises and unseen spiritual facts.',
    contextSummaryTe: 'విశ్వాసము యొక్క సర్వోత్కృష్ట బైబిల్ నిర్వచనము: కంటికి కనబడని నిత్య సత్యములను, రాబోయే వాగ్దానములను నిజమైన రుజువుగా నిలబెట్టే దివ్య విశ్వాసము.',
    relatedThemes: [
      { id: 'faith', nameEn: 'Nature of Faith', nameTe: 'విశ్వాస స్వరూపము' },
      { id: 'hope', nameEn: 'Hope in the Unseen', nameTe: 'అదృశ్యమైన వాటిపై నిరీక్షణ' },
      { id: 'assurance', nameEn: 'Spiritual Assurance', nameTe: 'ఆత్మీయ నిశ్చయత' },
    ],
    crossReferences: [
      {
        id: 'cr-2co-4-18',
        targetRef: {
          bookEn: '2 Corinthians',
          bookTe: '2 కొరింథీయులకు',
          chapter: 4,
          verse: 18,
          refStringEn: '2 Corinthians 4:18',
          refStringTe: '2 కొరింథీయులకు 4:18',
        },
        textEn: 'While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.',
        textTe: 'ఏలయనగా దృశ్యమైనవి అనిత్యములు, అదృశ్యమైనవి నిత్యములు; గనుక మేము దృశ్యమైనవాటిని చూడక అదృశ్యమైనవాటినే నిదానించి చూచుచున్నాము.',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Looking at Eternal Unseen Realities',
        relationshipLabelTe: 'అదృశ్యమైన నిత్య సత్యములను చూచుట',
        connectionNoteEn: 'Paul teaches the same posture: temporal visible circumstances pale in contrast to eternal unseen realities.',
        connectionNoteTe: 'కనిపించే లోక సంబంధమైనవి తాత్కాలికమైనవని, కనిపించని దేవుని వాగ్దానములే శాశ్వతమైనవని వివరిస్తున్నది.',
        thematicTags: ['Eternity', 'Vision', 'Faith'],
      },
      {
        id: 'cr-rom-8-24-25',
        targetRef: {
          bookEn: 'Romans',
          bookTe: 'రోమీయులకు',
          chapter: 8,
          verse: 24,
          verseEnd: 25,
          refStringEn: 'Romans 8:24-25',
          refStringTe: 'రోమీయులకు 8:24-25',
        },
        textEn: 'For we are saved by hope: but hope that is seen is not hope... But if we hope for that we see not, then do we with patience wait for it.',
        textTe: 'ఏలయనగా మనము నిరీక్షణకలిగి రక్షింపబడితివిు. నిరీక్షింపబడునది కనబడునప్పుడు నిరీక్షణతో పనియుండదు... మనము చూడనిదానికొరకు నిరీక్షించినయెడల ఓపికతో దానికొరకు కనిపెట్టుదుము.',
        relationship: 'thematic_echo',
        relationshipLabelEn: 'Patient Hope for the Unseen',
        relationshipLabelTe: 'చూడనిదాని కొరకు ఓపికతో కనిపెట్టుట',
        connectionNoteEn: 'Hope and faith operate together in patient anticipation of God\'s future fulfillment.',
        connectionNoteTe: 'విశ్వాసము మరియు నిరీక్షణ రెండూ కలిసి చూడని మహిమ కొరకు సహనముతో కనిపెట్టేలా చేయును.',
        thematicTags: ['Hope', 'Patience', 'Endurance'],
      }
    ]
  },

  // REVELATION 21:4 / ప్రకటన 21:4
  'revelation 21:4': {
    primaryVerse: {
      reference: {
        bookEn: 'Revelation',
        bookTe: 'ప్రకటన గ్రంథము',
        chapter: 21,
        verse: 4,
        refStringEn: 'Revelation 21:4',
        refStringTe: 'ప్రకటన గ్రంథము 21:4',
      },
      textEn: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.',
      textTe: 'ఆయన వారి కన్నుల ప్రతి బాష్పబిందువును తుడిచివేయును, ఇకను మరణము ఉండదు, దుఃఖమైనను ఏడ్పైనను వేదనయైనను ఇక ఉండదు; మొదటి సంగతులు గతించిపోయెనని చెప్పెను.',
    },
    contextSummaryEn: 'The glorious consummation of human redemption in the New Jerusalem: the permanent abolition of death, grief, tears, and suffering in the eternal presence of God.',
    contextSummaryTe: 'నూతన యెరూషలేములో రక్షణ యొక్క పరిపూర్ణత: దేవుని నిత్య సాన్నిధ్యములో కన్నీరు, మరణము, దుఃఖము మరియు వేదన శాశ్వతముగా తుడిచివేయబడును.',
    relatedThemes: [
      { id: 'eternal_life', nameEn: 'New Heavens & New Earth', nameTe: 'నూతన ఆకాశము, నూతన భూమి' },
      { id: 'comfort', nameEn: 'Final Consolation', nameTe: 'అంతిమ ఆదరణ' },
      { id: 'victory', nameEn: 'Death Swallowed Up', nameTe: 'మరణముపై విజయం' },
    ],
    crossReferences: [
      {
        id: 'cr-isa-25-8',
        targetRef: {
          bookEn: 'Isaiah',
          bookTe: 'యెషయా',
          chapter: 25,
          verse: 8,
          refStringEn: 'Isaiah 25:8',
          refStringTe: 'యెషయా 25:8',
        },
        textEn: 'He will swallow up death in victory; and the Lord GOD will wipe away tears from off all faces; and the rebuke of his people shall he take away from off all the earth: for the LORD hath spoken it.',
        textTe: 'మరణమును ఆయన సదాకాలమునకు మింగివేయును; ప్రభువైన యెహోవా ప్రతి ముఖముమీది బాష్పబిందువులను తుడిచివేయును, భూమిమీదనుండి తన ప్రజల నిందను తీసివేయును; యెహోవా ఆలాగు సెలవిచ్చియున్నాడు.',
        relationship: 'prophetic_fulfillment',
        relationshipLabelEn: 'Fulfillment of Isaiah\'s Prophecy',
        relationshipLabelTe: 'యెషయా ప్రవచనము యొక్క నెరవేర్పు',
        connectionNoteEn: 'John in Revelation 21:4 directly cites Isaiah 25:8, showing the ancient prophecy fulfilled in the New Creation.',
        connectionNoteTe: 'యోహాను యెషయా 25:8 ప్రవచనమును నేరుగా ఉటంకిస్తూ, నూతన సృష్టిలో దేవుడే ప్రతి కన్నీటిని తుడిచివేయునని ప్రకటించెను.',
        thematicTags: ['Victory', 'Resurrection', 'Eschatology'],
      },
      {
        id: 'cr-1co-15-54-55',
        targetRef: {
          bookEn: '1 Corinthians',
          bookTe: '1 కొరింథీయులకు',
          chapter: 15,
          verse: 54,
          verseEnd: 55,
          refStringEn: '1 Corinthians 15:54-55',
          refStringTe: '1 కొరింథీయులకు 15:54-55',
        },
        textEn: 'So when this corruptible shall have put on incorruption... then shall be brought to pass the saying that is written, Death is swallowed up in victory. O death, where is thy sting? O grave, where is thy victory?',
        textTe: 'ఈ క్షయమైనది అక్షయతను ధరించుకొనినప్పుడు, ఈ మర్త్యమైనది అమర్త్యతను ధరించుకొనినప్పుడు—విజయమందు మరణము మ్రింగివేయబడెను అని వ్రాయబడిన వాక్యము నెరవేరును. ఓ మరణమా, నీ విజయమెక్కడ? ఓ మరణమా, నీ ముల్లెక్కడ?',
        relationship: 'theological_foundation',
        relationshipLabelEn: 'Apostolic Song of Victory Over Death',
        relationshipLabelTe: 'మరణముపై అపొస్తలుని విజయ గీతము',
        connectionNoteEn: 'Paul celebrates the annihilation of death secured through Christ\'s resurrection, pointing forward to the final state in Revelation.',
        connectionNoteTe: 'క్రీస్తు పునరుత్థానము ద్వారా మరణపు ముల్లు విరువబడినదని, అంతిమంగా మరణమే మ్రింగివేయబడునని విజయము చాటెను.',
        thematicTags: ['Resurrection', 'Victory', 'Consummation'],
      }
    ]
  }
};

// Aliases helper
export function getCuratedReference(query: string): VerseCrossReferenceData | undefined {
  const q = query.trim().toLowerCase().replace(/\s+/g, ' ');
  
  // Direct lookup
  if (CURATED_VERSES[q]) return CURATED_VERSES[q];

  // Variations
  const cleanQ = q.replace(/[:.]/g, ':');
  for (const [key, data] of Object.entries(CURATED_VERSES)) {
    if (cleanQ.includes(key) || key.includes(cleanQ)) {
      return data;
    }
  }

  // Check Telugu matches
  for (const data of Object.values(CURATED_VERSES)) {
    const p = data.primaryVerse.reference;
    const teMatch = `${p.bookTe.toLowerCase()} ${p.chapter}:${p.verse}`;
    if (cleanQ.includes(teMatch) || teMatch.includes(cleanQ)) {
      return data;
    }
  }

  return undefined;
}
