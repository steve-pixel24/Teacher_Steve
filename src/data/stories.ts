export interface Story {
  id: string;
  title: string;
  level: string;
  readTime: number;
  summary: string;
  genre: string;
  content: string;
}

export const stories: Story[] = [
  {
    id: 'warframe-lotus',
    title: 'The Lotus\'s Whisper',
    level: 'B2',
    readTime: 8,
    summary: 'A sci-fi tale set in the Warframe universe, exploring themes of identity and purpose.',
    genre: 'Sci-Fi / Gaming',
    content: 'In the depths of the Origin System, the Lotus spoke in riddles...'
  },
  {
    id: 'travel-tokyo',
    title: 'Lost in Tokyo',
    level: 'B1',
    readTime: 6,
    summary: 'A traveler\'s adventure through the bustling streets of Tokyo, discovering culture and connection.',
    genre: 'Travel',
    content: 'The neon lights of Shibuya crossing blurred together as Mark checked his map...'
  },
  {
    id: 'mystery-library',
    title: 'The Midnight Library',
    level: 'B2',
    readTime: 10,
    summary: 'A mysterious library that appears only at midnight, holding secrets of parallel lives.',
    genre: 'Mystery / Fantasy',
    content: 'When the clock struck twelve, the old library doors creaked open...'
  },
  {
    id: 'tech-startup',
    title: 'Code & Coffee',
    level: 'B1',
    readTime: 7,
    summary: 'The journey of a startup founder building their dream app in a small café.',
    genre: 'Technology / Business',
    content: 'Sarah stared at her laptop screen, the code finally compiling after hours of debugging...'
  },
  {
    id: 'cooking-disaster',
    title: 'The Great Bake-Off',
    level: 'A2',
    readTime: 5,
    summary: 'A humorous tale of a cooking competition that goes hilariously wrong.',
    genre: 'Comedy / Lifestyle',
    content: 'Everything was going perfectly until Jamie accidentally grabbed salt instead of sugar...'
  },
];
