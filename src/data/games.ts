export interface Game {
  id: string;
  title: string;
  icon: string;
  description: string;
  highScore?: number;
  category: string;
}

export interface GameWord {
  word: string;
  definition: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
}

export interface IdiomData {
  idiom: string;
  meaning: string;
  example: string;
}

export interface GrammarQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface SentenceData {
  words: string[];
  correct: string[];
  hint: string;
  translation?: string;
}

// Word Scramble - Real words organized by difficulty
export const scrambleWords: GameWord[] = [
  // A1 Level - Basic words
  { word: 'HOUSE', definition: 'A building where people live', level: 'A1' },
  { word: 'WATER', definition: 'A clear liquid we drink', level: 'A1' },
  { word: 'BOOK', definition: 'Something we read', level: 'A1' },
  { word: 'FRIEND', definition: 'A person you like and know well', level: 'A1' },
  { word: 'SCHOOL', definition: 'A place where children learn', level: 'A1' },
  { word: 'MORNING', definition: 'The early part of the day', level: 'A1' },
  { word: 'FAMILY', definition: 'Parents and children', level: 'A1' },
  { word: 'FOOTBALL', definition: 'A popular sport with a round ball', level: 'A1' },
  
  // A2 Level - Everyday vocabulary
  { word: 'BEAUTIFUL', definition: 'Very attractive or pleasing', level: 'A2' },
  { word: 'COMPUTER', definition: 'An electronic device for processing data', level: 'A2' },
  { word: 'HOLIDAY', definition: 'A time of rest from work or school', level: 'A2' },
  { word: 'KITCHEN', definition: 'A room where food is prepared', level: 'A2' },
  { word: 'WEATHER', definition: 'The condition of the atmosphere', level: 'A2' },
  { word: 'JOURNEY', definition: 'An act of traveling from one place to another', level: 'A2' },
  { word: 'RESTAURANT', definition: 'A place where you go to eat meals', level: 'A2' },
  { word: 'APARTMENT', definition: 'A set of rooms for living in', level: 'A2' },
  
  // B1 Level - Intermediate vocabulary
  { word: 'ADVENTURE', definition: 'An unusual and exciting experience', level: 'B1' },
  { word: 'ENVIRONMENT', definition: 'The natural world around us', level: 'B1' },
  { word: 'EXPERIENCE', definition: 'Knowledge or skill from doing something', level: 'B1' },
  { word: 'IMPORTANT', definition: 'Of great significance or value', level: 'B1' },
  { word: 'DIFFICULT', definition: 'Not easy to do or understand', level: 'B1' },
  { word: 'EDUCATION', definition: 'The process of receiving instruction', level: 'B1' },
  { word: 'TRANSPORT', definition: 'Systems for moving people or goods', level: 'B1' },
  { word: 'COMMUNICATION', definition: 'The act of sharing information', level: 'B1' },
  
  // B2 Level - Upper intermediate
  { word: 'ACCOMMODATION', definition: 'A place to stay or live', level: 'B2' },
  { word: 'OPPORTUNITY', definition: 'A chance to do something', level: 'B2' },
  { word: 'RESPONSIBILITY', definition: 'A duty or obligation', level: 'B2' },
  { word: 'ACHIEVEMENT', definition: 'Something accomplished successfully', level: 'B2' },
  { word: 'INDEPENDENT', definition: 'Not depending on others', level: 'B2' },
  { word: 'CONVERSATION', definition: 'An informal talk between people', level: 'B2' },
  { word: 'DISAPPOINTED', definition: 'Sad because something didn\'t happen', level: 'B2' },
  { word: 'ENTHUSIASTIC', definition: 'Very excited and interested', level: 'B2' },
  
  // C1 Level - Advanced vocabulary
  { word: 'CONTEMPORARY', definition: 'Belonging to the present time', level: 'C1' },
  { word: 'SOPHISTICATED', definition: 'Developed to a high degree of complexity', level: 'C1' },
  { word: 'PHENOMENON', definition: 'A fact or situation that is observed to exist', level: 'C1' },
  { word: 'MISUNDERSTANDING', definition: 'A failure to understand correctly', level: 'C1' },
  { word: 'CONSCIENTIOUS', definition: 'Wishing to do what is right', level: 'C1' },
  { word: 'PERSEVERANCE', definition: 'Continued effort despite difficulties', level: 'C1' },
  { word: 'AMBIDEXTROUS', definition: 'Able to use both hands equally well', level: 'C1' },
  { word: 'METAMORPHOSIS', definition: 'A transformation or marked change', level: 'C1' },
];

// Idiom Match - Real English idioms
export const idioms: IdiomData[] = [
  {
    idiom: 'Break the ice',
    meaning: 'To start a conversation in a social situation',
    example: 'He told a joke to break the ice at the meeting.'
  },
  {
    idiom: 'Hit the nail on the head',
    meaning: 'To describe exactly what is causing a problem',
    example: 'You hit the nail on the head with that analysis.'
  },
  {
    idiom: 'Once in a blue moon',
    meaning: 'Very rarely',
    example: 'I only eat fast food once in a blue moon.'
  },
  {
    idiom: 'Piece of cake',
    meaning: 'Something very easy to do',
    example: 'The exam was a piece of cake.'
  },
  {
    idiom: 'Under the weather',
    meaning: 'Feeling ill or sick',
    example: 'I\'m feeling under the weather today.'
  },
  {
    idiom: 'Cost an arm and a leg',
    meaning: 'To be very expensive',
    example: 'That car costs an arm and a leg.'
  },
  {
    idiom: 'Let the cat out of the bag',
    meaning: 'To reveal a secret accidentally',
    example: 'She let the cat out of the bag about the surprise party.'
  },
  {
    idiom: 'Burn the midnight oil',
    meaning: 'To work or study late into the night',
    example: 'I had to burn the midnight oil to finish the project.'
  },
  {
    idiom: 'The ball is in your court',
    meaning: 'It\'s your decision or responsibility now',
    example: 'I\'ve made my offer. The ball is in your court.'
  },
  {
    idiom: 'Bite the bullet',
    meaning: 'To endure a painful or difficult situation',
    example: 'I decided to bite the bullet and go to the dentist.'
  },
  {
    idiom: 'Spill the beans',
    meaning: 'To reveal secret information',
    example: 'Don\'t spill the beans about the surprise!'
  },
  {
    idiom: 'Kill two birds with one stone',
    meaning: 'To accomplish two things at the same time',
    example: 'I killed two birds with one stone by shopping on the way home.'
  },
  {
    idiom: 'When pigs fly',
    meaning: 'Something that will never happen',
    example: 'He\'ll clean his room when pigs fly!'
  },
  {
    idiom: 'Better late than never',
    meaning: 'It\'s better to do something late than not at all',
    example: 'You finally called! Better late than never.'
  },
  {
    idiom: 'Actions speak louder than words',
    meaning: 'What you do is more important than what you say',
    example: 'He says he\'ll help, but actions speak louder than words.'
  },
  {
    idiom: 'The early bird catches the worm',
    meaning: 'Success comes to those who start early',
    example: 'I arrived at 6 AM. The early bird catches the worm!'
  },
  {
    idiom: 'Don\'t judge a book by its cover',
    meaning: 'Don\'t judge something by its appearance',
    example: 'The restaurant looked small, but don\'t judge a book by its cover.'
  },
  {
    idiom: 'Every cloud has a silver lining',
    meaning: 'There\'s something good in every bad situation',
    example: 'I lost my job, but every cloud has a silver lining.'
  },
  {
    idiom: 'When in Rome, do as the Romans do',
    meaning: 'Follow the customs of the place you\'re visiting',
    example: 'I tried the local food. When in Rome, do as the Romans do.'
  },
  {
    idiom: 'A penny for your thoughts',
    meaning: 'Asking someone what they\'re thinking about',
    example: 'You\'re very quiet. A penny for your thoughts?'
  }
];

// Grammar Dash - Real grammar questions
export const grammarQuestions: GrammarQuestion[] = [
  {
    question: 'She _____ to the gym every morning.',
    options: ['go', 'goes', 'going', 'gone'],
    correct: 1,
    explanation: 'Third person singular (she) requires -es in present simple.'
  },
  {
    question: 'I _____ my homework yesterday.',
    options: ['do', 'does', 'did', 'doing'],
    correct: 2,
    explanation: 'Past simple requires "did" for past actions.'
  },
  {
    question: 'They _____ been waiting for two hours.',
    options: ['has', 'have', 'are', 'were'],
    correct: 1,
    explanation: '"They" is plural, so we use "have" in present perfect continuous.'
  },
  {
    question: 'If I _____ rich, I would travel the world.',
    options: ['am', 'was', 'were', 'would be'],
    correct: 2,
    explanation: 'Second conditional uses "were" for all subjects (formal English).'
  },
  {
    question: 'The book _____ by millions of people.',
    options: ['has read', 'has been read', 'is reading', 'reads'],
    correct: 1,
    explanation: 'Passive voice in present perfect: has/have + been + past participle.'
  },
  {
    question: 'She asked me where _____.',
    options: ['did I live', 'I lived', 'do I live', 'I live'],
    correct: 1,
    explanation: 'Reported speech uses statement word order (subject + verb).'
  },
  {
    question: 'I enjoy _____ tennis on weekends.',
    options: ['play', 'to play', 'playing', 'played'],
    correct: 2,
    explanation: '"Enjoy" is followed by gerund (-ing form).'
  },
  {
    question: 'By next year, I _____ my degree.',
    options: ['will finish', 'will have finished', 'will be finishing', 'finish'],
    correct: 1,
    explanation: 'Future perfect for actions completed before a future time.'
  },
  {
    question: 'He _____ smoke in here. It\'s forbidden.',
    options: ['mustn\'t', 'doesn\'t have to', 'shouldn\'t', 'needn\'t'],
    correct: 0,
    explanation: '"Mustn\'t" expresses prohibition (not allowed).'
  },
  {
    question: 'The man _____ car was stolen called the police.',
    options: ['who', 'which', 'whose', 'that'],
    correct: 2,
    explanation: '"Whose" is the relative pronoun for possession.'
  },
  {
    question: 'I wish I _____ speak French fluently.',
    options: ['can', 'could', 'will', 'would'],
    correct: 1,
    explanation: '"I wish" + past simple/could for unreal present situations.'
  },
  {
    question: 'She suggested _____ to the cinema.',
    options: ['to go', 'going', 'go', 'went'],
    correct: 1,
    explanation: '"Suggest" is followed by gerund (-ing form).'
  },
  {
    question: '_____ having a headache, she went to work.',
    options: ['Although', 'Despite', 'Even though', 'However'],
    correct: 1,
    explanation: '"Despite" is followed by noun/gerund, not a clause.'
  },
  {
    question: 'It\'s high time we _____ home.',
    options: ['go', 'went', 'have gone', 'will go'],
    correct: 1,
    explanation: '"It\'s high time" is followed by past simple.'
  },
  {
    question: 'Not only _____ the exam, but she also got top marks.',
    options: ['she passed', 'did she pass', 'she did pass', 'passed she'],
    correct: 1,
    explanation: 'After "Not only" at sentence start, use inversion.'
  },
  {
    question: 'I\'ll call you as soon as I _____.',
    options: ['will arrive', 'arrive', 'arrived', 'am arriving'],
    correct: 1,
    explanation: 'After "as soon as" for future, use present simple.'
  },
  {
    question: 'He _____ have called me. I was worried!',
    options: ['could', 'should', 'might', 'would'],
    correct: 1,
    explanation: '"Should have" expresses criticism about past actions.'
  },
  {
    question: 'The project, _____ was completed last week, was successful.',
    options: ['that', 'which', 'what', 'who'],
    correct: 1,
    explanation: 'Non-defining relative clauses use "which" for things.'
  },
  {
    question: 'You _____ wear a seatbelt. It\'s the law.',
    options: ['must', 'should', 'could', 'might'],
    correct: 0,
    explanation: '"Must" expresses strong obligation or legal requirement.'
  },
  {
    question: 'She _____ English for five years now.',
    options: ['studies', 'studied', 'has been studying', 'is studying'],
    correct: 2,
    explanation: 'Present perfect continuous for actions starting in past and continuing.'
  }
];

// Sentence Builder - Real sentences to build
export const sentenceBuilderData: SentenceData[] = [
  // A1-A2 Level
  {
    words: ['I', 'like', 'to', 'play', 'football'],
    correct: ['I', 'like', 'to', 'play', 'football'],
    hint: 'Express a hobby or preference',
    translation: 'Me gusta jugar al fútbol'
  },
  {
    words: ['She', 'is', 'reading', 'a', 'book'],
    correct: ['She', 'is', 'reading', 'a', 'book'],
    hint: 'Describe what someone is doing now',
    translation: 'Ella está leyendo un libro'
  },
  {
    words: ['We', 'went', 'to', 'the', 'cinema', 'yesterday'],
    correct: ['We', 'went', 'to', 'the', 'cinema', 'yesterday'],
    hint: 'Talk about a past activity',
    translation: 'Fuimos al cine ayer'
  },
  {
    words: ['They', 'have', 'three', 'children'],
    correct: ['They', 'have', 'three', 'children'],
    hint: 'Describe family',
    translation: 'Ellos tienen tres hijos'
  },
  
  // B1 Level
  {
    words: ['If', 'it', 'rains', 'tomorrow', 'I', 'will', 'stay', 'home'],
    correct: ['If', 'it', 'rains', 'tomorrow', ',', 'I', 'will', 'stay', 'home'],
    hint: 'First conditional - real possibility',
    translation: 'Si llueve mañana, me quedaré en casa'
  },
  {
    words: ['She', 'has', 'been', 'working', 'here', 'for', 'five', 'years'],
    correct: ['She', 'has', 'been', 'working', 'here', 'for', 'five', 'years'],
    hint: 'Present perfect continuous',
    translation: 'Ella ha estado trabajando aquí durante cinco años'
  },
  {
    words: ['The', 'book', 'was', 'written', 'by', 'a', 'famous', 'author'],
    correct: ['The', 'book', 'was', 'written', 'by', 'a', 'famous', 'author'],
    hint: 'Passive voice in past simple',
    translation: 'El libro fue escrito por un autor famoso'
  },
  {
    words: ['I', 'would', 'travel', 'the', 'world', 'if', 'I', 'had', 'more', 'money'],
    correct: ['I', 'would', 'travel', 'the', 'world', 'if', 'I', 'had', 'more', 'money'],
    hint: 'Second conditional - unreal present',
    translation: 'Viajaría por el mundo si tuviera más dinero'
  },
  
  // B2 Level
  {
    words: ['Had', 'I', 'known', 'about', 'the', 'meeting', 'I', 'would', 'have', 'attended'],
    correct: ['Had', 'I', 'known', 'about', 'the', 'meeting', ',', 'I', 'would', 'have', 'attended'],
    hint: 'Third conditional - inverted form',
    translation: 'Si hubiera sabido sobre la reunión, habría asistido'
  },
  {
    words: ['Not', 'only', 'did', 'she', 'pass', 'the', 'exam', 'but', 'she', 'also', 'got', 'top', 'marks'],
    correct: ['Not', 'only', 'did', 'she', 'pass', 'the', 'exam', ',', 'but', 'she', 'also', 'got', 'top', 'marks'],
    hint: 'Inversion with "not only"',
    translation: 'No solo aprobó el examen, sino que también obtuvo las mejores notas'
  },
  {
    words: ['Despite', 'having', 'a', 'headache', 'she', 'went', 'to', 'work'],
    correct: ['Despite', 'having', 'a', 'headache', ',', 'she', 'went', 'to', 'work'],
    hint: 'Using "despite" with gerund',
    translation: 'A pesar de tener dolor de cabeza, fue al trabajo'
  },
  {
    words: ['The', 'project', 'which', 'was', 'completed', 'last', 'week', 'was', 'very', 'successful'],
    correct: ['The', 'project', ',', 'which', 'was', 'completed', 'last', 'week', ',', 'was', 'very', 'successful'],
    hint: 'Non-defining relative clause',
    translation: 'El proyecto, que se completó la semana pasada, fue muy exitoso'
  },
  
  // C1 Level
  {
    words: ['Under', 'no', 'circumstances', 'should', 'you', 'open', 'this', 'door'],
    correct: ['Under', 'no', 'circumstances', 'should', 'you', 'open', 'this', 'door'],
    hint: 'Negative inversion for emphasis',
    translation: 'Bajo ninguna circunstancia debes abrir esta puerta'
  },
  {
    words: ['So', 'exhausted', 'was', 'she', 'that', 'she', 'fell', 'asleep', 'immediately'],
    correct: ['So', 'exhausted', 'was', 'she', 'that', 'she', 'fell', 'asleep', 'immediately'],
    hint: 'Inversion with "so...that"',
    translation: 'Estaba tan agotada que se durmió inmediatamente'
  }
];

// Flashcard Master - Vocabulary pairs for matching
export const flashcardPairs = [
  // Set 1: Basic vocabulary
  [
    { front: 'Happy', back: 'Feeling pleasure and enjoyment' },
    { front: 'Sad', back: 'Feeling unhappy or sorrowful' },
    { front: 'Angry', back: 'Feeling strong displeasure' },
    { front: 'Tired', back: 'Needing rest or sleep' },
    { front: 'Hungry', back: 'Feeling a need to eat' },
    { front: 'Thirsty', back: 'Feeling a need to drink' },
  ],
  // Set 2: Work vocabulary
  [
    { front: 'Meeting', back: 'A gathering for discussion' },
    { front: 'Deadline', back: 'The latest time by which something must be done' },
    { front: 'Colleague', back: 'A person you work with' },
    { front: 'Manager', back: 'A person in charge of a team' },
    { front: 'Project', back: 'A planned piece of work' },
    { front: 'Salary', back: 'Regular payment for work' },
  ],
  // Set 3: Travel vocabulary
  [
    { front: 'Airport', back: 'A place where planes take off and land' },
    { front: 'Passport', back: 'An official document for travel' },
    { front: 'Luggage', back: 'Bags and suitcases for travel' },
    { front: 'Reservation', back: 'An advance booking' },
    { front: 'Destination', back: 'The place you are traveling to' },
    { front: 'Itinerary', back: 'A planned route or journey' },
  ],
  // Set 4: Food vocabulary
  [
    { front: 'Recipe', back: 'Instructions for cooking' },
    { front: 'Ingredient', back: 'A component used in cooking' },
    { front: 'Delicious', back: 'Very tasty' },
    { front: 'Appetizer', back: 'A small dish before the main course' },
    { front: 'Dessert', back: 'A sweet dish at the end of a meal' },
    { front: 'Vegetarian', back: 'Someone who doesn\'t eat meat' },
  ],
  // Set 5: Academic vocabulary
  [
    { front: 'Research', back: 'Systematic investigation' },
    { front: 'Analysis', back: 'Detailed examination of something' },
    { front: 'Conclusion', back: 'The end or finish of something' },
    { front: 'Hypothesis', back: 'A proposed explanation' },
    { front: 'Evidence', back: 'Information supporting a claim' },
    { front: 'Theory', back: 'A system of ideas to explain something' },
  ],
];

// Games list
export const games: Game[] = [
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    icon: '🔤',
    description: 'Unscramble letters to form English words. Race against the clock!',
    highScore: 2450,
    category: 'Vocabulary'
  },
  {
    id: 'grammar-dash',
    title: 'Grammar Dash',
    icon: '⚡',
    description: 'Quick-fire grammar questions. How many can you answer correctly?',
    highScore: 1890,
    category: 'Grammar'
  },
  {
    id: 'flashcard-master',
    title: 'Flashcard Master',
    icon: '🎴',
    description: 'Match words with definitions in this memory challenge game.',
    highScore: 3200,
    category: 'Vocabulary'
  },
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    icon: '🧩',
    description: 'Arrange words in the correct order to form proper sentences.',
    highScore: 1650,
    category: 'Grammar'
  },
  {
    id: 'idiom-match',
    title: 'Idiom Match',
    icon: '💡',
    description: 'Match English idioms with their correct meanings.',
    highScore: 2100,
    category: 'Vocabulary'
  },
];
