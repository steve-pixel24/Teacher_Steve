export interface Game {
  id: string;
  title: string;
  icon: string;
  description: string;
  highScore?: number;
  category: string;
}

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
    id: 'pronunciation-quest',
    title: 'Pronunciation Quest',
    icon: '🎤',
    description: 'Practice pronunciation with interactive audio challenges.',
    category: 'Speaking'
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
