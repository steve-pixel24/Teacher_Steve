export interface Test {
  id: string;
  title: string;
  questionCount: number;
  difficulty: string;
  xpReward: number;
  description: string;
  category: string;
}

export const tests: Test[] = [
  {
    id: 'ielts-speaking',
    title: 'IELTS Speaking Mock',
    questionCount: 12,
    difficulty: 'B2-C1',
    xpReward: 150,
    description: 'Practice IELTS speaking test format with common topics and questions.',
    category: 'Speaking'
  },
  {
    id: 'grammar-placement',
    title: 'Grammar Placement Quiz',
    questionCount: 20,
    difficulty: 'Mixed',
    xpReward: 100,
    description: 'Determine your grammar level with this comprehensive assessment.',
    category: 'Grammar'
  },
  {
    id: 'vocab-challenge',
    title: 'Vocabulary Challenge',
    questionCount: 25,
    difficulty: 'B1-B2',
    xpReward: 120,
    description: 'Test your vocabulary with advanced word usage and definitions.',
    category: 'Vocabulary'
  },
  {
    id: 'listening-comprehension',
    title: 'Listening Comprehension',
    questionCount: 15,
    difficulty: 'B1',
    xpReward: 100,
    description: 'Improve your listening skills with real-world audio scenarios.',
    category: 'Listening'
  },
  {
    id: 'reading-speed',
    title: 'Reading Speed Test',
    questionCount: 10,
    difficulty: 'B2',
    xpReward: 80,
    description: 'Measure and improve your reading comprehension speed.',
    category: 'Reading'
  },
  {
    id: 'business-english',
    title: 'Business English Assessment',
    questionCount: 18,
    difficulty: 'B2-C1',
    xpReward: 140,
    description: 'Professional English for workplace communication and meetings.',
    category: 'Business'
  },
];
