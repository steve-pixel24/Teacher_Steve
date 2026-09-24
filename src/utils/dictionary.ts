// Dictionary with British/American English comparisons

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  synonyms: string[];
  example: string;
  british?: {
    spelling?: string;
    pronunciation?: string;
    usage?: string;
  };
  american?: {
    spelling?: string;
    pronunciation?: string;
    usage?: string;
  };
  hasComparison: boolean;
}

export const DICTIONARY: DictionaryEntry[] = [
  {
    word: 'color',
    phonetic: '/ˈkʌl.ər/',
    partOfSpeech: 'noun',
    definition: 'The property of objects that produces different sensations on the eye',
    synonyms: ['hue', 'shade', 'tint', 'tone'],
    example: 'The color of the sky changes throughout the day.',
    british: { spelling: 'colour', usage: 'British spelling uses "ou"' },
    american: { spelling: 'color', usage: 'American spelling omits "u"' },
    hasComparison: true,
  },
  {
    word: 'organize',
    phonetic: '/ˈɔː.ɡə.naɪz/',
    partOfSpeech: 'verb',
    definition: 'To arrange into a structured whole; to order systematically',
    synonyms: ['arrange', 'coordinate', 'plan', 'structure'],
    example: 'She organized the files alphabetically.',
    british: { spelling: 'organise', usage: 'British spelling uses "s"' },
    american: { spelling: 'organize', usage: 'American spelling uses "z"' },
    hasComparison: true,
  },
  {
    word: 'elevator',
    phonetic: '/ˈel.ə.veɪ.tər/',
    partOfSpeech: 'noun',
    definition: 'A platform or compartment housed in a shaft for raising and lowering people or things',
    synonyms: ['lift', 'hoist', 'raising device'],
    example: 'Take the elevator to the 10th floor.',
    british: { spelling: 'lift', usage: 'British English uses "lift"' },
    american: { spelling: 'elevator', usage: 'American English uses "elevator"' },
    hasComparison: true,
  },
  {
    word: 'apartment',
    phonetic: '/əˈpɑːrt.mənt/',
    partOfSpeech: 'noun',
    definition: 'A suite of rooms forming one residence, typically on one floor of a building',
    synonyms: ['flat', 'condominium', 'unit', 'residence'],
    example: 'They rented a small apartment in the city center.',
    british: { spelling: 'flat', usage: 'British English uses "flat"' },
    american: { spelling: 'apartment', usage: 'American English uses "apartment"' },
    hasComparison: true,
  },
  {
    word: 'chips',
    phonetic: '/tʃɪps/',
    partOfSpeech: 'noun',
    definition: 'Thin slices of potato fried until crisp',
    synonyms: ['fries', 'french fries', 'crisps'],
    example: 'I ordered fish and chips for dinner.',
    british: { spelling: 'chips', usage: 'British "chips" = thick-cut fried potatoes' },
    american: { spelling: 'fries', usage: 'American "fries" = thin-cut fried potatoes; "chips" = crispy snacks' },
    hasComparison: true,
  },
  {
    word: 'resilient',
    phonetic: '/rɪˈzɪl.i.ənt/',
    partOfSpeech: 'adjective',
    definition: 'Able to recover quickly from difficult conditions; tough and adaptable',
    synonyms: ['strong', 'tough', 'hardy', 'adaptable'],
    example: 'Children are remarkably resilient and can adapt to new situations.',
    hasComparison: false,
  },
  {
    word: 'serendipity',
    phonetic: '/ˌser.ənˈdɪp.ə.ti/',
    partOfSpeech: 'noun',
    definition: 'The occurrence of events by chance in a happy or beneficial way',
    synonyms: ['luck', 'fortune', 'chance', 'fate'],
    example: 'Finding that rare book was pure serendipity.',
    hasComparison: false,
  },
  {
    word: 'pragmatic',
    phonetic: '/præɡˈmæt.ɪk/',
    partOfSpeech: 'adjective',
    definition: 'Dealing with things sensibly and realistically; practical',
    synonyms: ['practical', 'realistic', 'sensible', 'rational'],
    example: 'We need a pragmatic approach to solve this problem.',
    hasComparison: false,
  },
];

// Search dictionary
export function searchDictionary(query: string): DictionaryEntry[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  return DICTIONARY.filter(entry => 
    entry.word.toLowerCase().includes(lowerQuery) ||
    entry.british?.spelling?.toLowerCase().includes(lowerQuery) ||
    entry.american?.spelling?.toLowerCase().includes(lowerQuery) ||
    entry.definition.toLowerCase().includes(lowerQuery)
  );
}

// Get word details
export function getWordDetails(word: string): DictionaryEntry | null {
  const lowerWord = word.toLowerCase();
  return DICTIONARY.find(entry => 
    entry.word.toLowerCase() === lowerWord ||
    entry.british?.spelling?.toLowerCase() === lowerWord ||
    entry.american?.spelling?.toLowerCase() === lowerWord
  ) || null;
}

// Check if word has UK/US comparison
export function hasComparison(word: string): boolean {
  const entry = getWordDetails(word);
  return entry?.hasComparison || false;
}
