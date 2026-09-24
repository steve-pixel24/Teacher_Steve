// Spelling Practice Data
export interface SpellingWord {
  word: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: string;
  definition: string;
  example: string;
  commonMistakes: string[];
  tips: string[];
}

export const SPELLING_WORDS: SpellingWord[] = [
  // Easy Words (A1-A2)
  {
    word: 'beautiful',
    difficulty: 'easy',
    category: 'Adjectives',
    definition: 'Pleasing to the senses or mind',
    example: 'The sunset was absolutely beautiful.',
    commonMistakes: ['beutiful', 'beatiful', 'beautifull'],
    tips: ['Remember: beau-ti-ful (3 syllables)', 'Think: "beauty" + "ful"']
  },
  {
    word: 'restaurant',
    difficulty: 'easy',
    category: 'Places',
    definition: 'A place where people pay to sit and eat meals',
    example: 'We had dinner at a nice restaurant.',
    commonMistakes: ['restarant', 'resturaunt', 'resturant'],
    tips: ['Break it down: rest-au-rant', 'Remember the "au" in the middle']
  },
  {
    word: 'Wednesday',
    difficulty: 'easy',
    category: 'Time',
    definition: 'The day of the week between Tuesday and Thursday',
    example: 'I have a meeting every Wednesday.',
    commonMistakes: ['Wensday', 'Wednsday', 'Wendesday'],
    tips: ['Remember: Wed-nes-day', 'The "d" comes before the "n"']
  },
  {
    word: 'because',
    difficulty: 'easy',
    category: 'Conjunctions',
    definition: 'For the reason that; since',
    example: 'I stayed home because it was raining.',
    commonMistakes: ['becuse', 'becaus', 'beacuse'],
    tips: ['Remember: be-cause', 'Think: "big elephants can always understand small animals"']
  },
  {
    word: 'different',
    difficulty: 'easy',
    category: 'Adjectives',
    definition: 'Not the same as another; unlike',
    example: 'These two books are very different.',
    commonMistakes: ['diferent', 'diffrent', 'differant'],
    tips: ['Remember: dif-fer-ent (3 syllables)', 'Double "f" in the middle']
  },
  
  // Medium Words (B1)
  {
    word: 'accommodation',
    difficulty: 'medium',
    category: 'Travel',
    definition: 'A place to live or stay',
    example: 'We booked accommodation for our holiday.',
    commonMistakes: ['accomodation', 'acommodation', 'accomadation'],
    tips: ['Double "c" and double "m"', 'Think: "a company" has double letters too']
  },
  {
    word: 'necessary',
    difficulty: 'medium',
    category: 'Adjectives',
    definition: 'Required to be done; essential',
    example: 'It\'s necessary to study every day.',
    commonMistakes: ['neccessary', 'necesary', 'neccesary'],
    tips: ['One "c", two "s"\'s', 'Remember: "Never Eat Cake; Eat Salad Sandwiches And Remain Young"']
  },
  {
    word: 'occasionally',
    difficulty: 'medium',
    category: 'Adverbs',
    definition: 'Sometimes but not often',
    example: 'I occasionally go to the cinema.',
    commonMistakes: ['occasionaly', 'ocasionally', 'occasionnally'],
    tips: ['Double "c", double "l"', 'Break it down: oc-ca-sion-al-ly']
  },
  {
    word: 'embarrassment',
    difficulty: 'medium',
    category: 'Emotions',
    definition: 'A feeling of being ashamed or foolish',
    example: 'He felt embarrassment when he tripped.',
    commonMistakes: ['embarassment', 'embarrasment', 'embarrassmant'],
    tips: ['Double "r" and double "s"', 'Remember: "em-BAR-rass-ment"']
  },
  {
    word: 'conscience',
    difficulty: 'medium',
    category: 'Abstract',
    definition: 'An inner feeling of right and wrong',
    example: 'His conscience told him to return the money.',
    commonMistakes: ['conscience', 'consience', 'consciense'],
    tips: ['Remember: "science" is inside', 'con-SCI-ENCE']
  },
  
  // Hard Words (B2)
  {
    word: 'phenomenon',
    difficulty: 'hard',
    category: 'Science',
    definition: 'A fact or event that is observed to exist',
    example: 'The northern lights are a natural phenomenon.',
    commonMistakes: ['phenomenom', 'phenomonon', 'phenomenom'],
    tips: ['Ends with "-enon" not "-omon"', 'phe-NOM-e-non']
  },
  {
    word: 'bureaucracy',
    difficulty: 'hard',
    category: 'Government',
    definition: 'A system of government with many complicated rules',
    example: 'The bureaucracy made the process very slow.',
    commonMistakes: ['burocracy', 'bureacracy', 'bureaucrasy'],
    tips: ['Remember: "bureau" + "cracy"', 'bureau-CRACY']
  },
  {
    word: 'acquaintance',
    difficulty: 'hard',
    category: 'People',
    definition: 'A person one knows slightly',
    example: 'She\'s an acquaintance from work.',
    commonMistakes: ['aquaintance', 'acquaintence', 'acquantance'],
    tips: ['Remember: "acquaint" + "ance"', 'ac-QUAINT-ance']
  },
  {
    word: 'miscellaneous',
    difficulty: 'hard',
    category: 'General',
    definition: 'Of various types or from different sources',
    example: 'The box contained miscellaneous items.',
    commonMistakes: ['misceleaneous', 'miscellanious', 'miscelaneous'],
    tips: ['Double "l", ends with "-eous"', 'mis-CELL-ane-ous']
  },
  {
    word: 'rhythm',
    difficulty: 'hard',
    category: 'Music',
    definition: 'A strong, regular, repeated pattern of movement or sound',
    example: 'The song has a catchy rhythm.',
    commonMistakes: ['rythm', 'rhythem', 'rhytm'],
    tips: ['Remember: "Rhythm Helps Your Two Hips Move"']
  },
  
  // Expert Words (C1)
  {
    word: 'onomatopoeia',
    difficulty: 'expert',
    category: 'Literature',
    definition: 'The formation of a word from a sound associated with what is named',
    example: '"Buzz" and "hiss" are examples of onomatopoeia.',
    commonMistakes: ['onomatapia', 'onomatopeia', 'onomatopoea'],
    tips: ['ono-mat-o-POE-ia', 'Remember the "oe" in the middle']
  },
  {
    word: 'conscientious',
    difficulty: 'expert',
    category: 'Character',
    definition: 'Wishing to do what is right; thorough and careful',
    example: 'She is a conscientious worker.',
    commonMistakes: ['conscientous', 'consciencious', 'consciencous'],
    tips: ['con-sci-EN-tious', 'Remember: "science" + "conscientious"']
  },
  {
    word: 'paraphernalia',
    difficulty: 'expert',
    category: 'General',
    definition: 'A collection of miscellaneous objects or equipment',
    example: 'He packed all his camping paraphernalia.',
    commonMistakes: ['paraphenalia', 'paraphernala', 'paraphenalia'],
    tips: ['para-pher-NAL-ia', 'Remember the double "ph"']
  },
  {
    word: 'idiosyncrasy',
    difficulty: 'expert',
    category: 'Character',
    definition: 'A mode of behavior peculiar to an individual',
    example: 'Everyone has their own idiosyncrasies.',
    commonMistakes: ['idiosyncracy', 'idiosyncrasy', 'idiosynchrasy'],
    tips: ['idio-syn-CRA-sy', 'Ends with "-sy" not "-cy"']
  },
  {
    word: 'schizophrenia',
    difficulty: 'expert',
    category: 'Medical',
    definition: 'A mental disorder characterized by abnormal social behavior',
    example: 'Schizophrenia affects how a person thinks and feels.',
    commonMistakes: ['schitzophrenia', 'schizophernia', 'schizofrenia'],
    tips: ['schiz-o-PHREN-ia', 'Remember: "phren" relates to the mind']
  }
];

export const SPELLING_CATEGORIES = [
  { id: 'all', name: 'All Words', icon: '📝' },
  { id: 'easy', name: 'Easy', icon: '🌱' },
  { id: 'medium', name: 'Medium', icon: '🌿' },
  { id: 'hard', name: 'Hard', icon: '🌳' },
  { id: 'expert', name: 'Expert', icon: '🏔️' },
  { id: 'Adjectives', name: 'Adjectives', icon: '✨' },
  { id: 'Places', name: 'Places', icon: '📍' },
  { id: 'Time', name: 'Time', icon: '⏰' },
  { id: 'Conjunctions', name: 'Conjunctions', icon: '🔗' },
  { id: 'Travel', name: 'Travel', icon: '✈️' },
  { id: 'Emotions', name: 'Emotions', icon: '💭' },
  { id: 'Science', name: 'Science', icon: '🔬' },
  { id: 'Music', name: 'Music', icon: '🎵' },
  { id: 'Literature', name: 'Literature', icon: '📚' },
  { id: 'Character', name: 'Character', icon: '👤' },
  { id: 'Medical', name: 'Medical', icon: '🏥' }
];

export function getWordsByDifficulty(difficulty: string): SpellingWord[] {
  if (difficulty === 'all') return SPELLING_WORDS;
  return SPELLING_WORDS.filter(w => w.difficulty === difficulty);
}

export function getWordsByCategory(category: string): SpellingWord[] {
  if (category === 'all') return SPELLING_WORDS;
  if (['easy', 'medium', 'hard', 'expert'].includes(category)) {
    return getWordsByDifficulty(category);
  }
  return SPELLING_WORDS.filter(w => w.category === category);
}

export function getRandomWords(count: number, difficulty?: string): SpellingWord[] {
  const words = difficulty ? getWordsByDifficulty(difficulty) : SPELLING_WORDS;
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, words.length));
}
