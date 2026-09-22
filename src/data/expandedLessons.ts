// Expanded Lesson Content with Multi-Section Structure

export interface LessonContent {
  id: string;
  title: string;
  level: string;
  duration: number;
  sections: LessonSection[];
}

export interface LessonSection {
  type: 'introduction' | 'rules' | 'examples' | 'practice' | 'summary';
  title: string;
  content: any;
}

export const EXPANDED_LESSONS: LessonContent[] = [
  {
    id: 'conditionals-expanded',
    title: 'Conditional Sentences - Complete Guide',
    level: 'B2',
    duration: 60,
    sections: [
      {
        type: 'introduction',
        title: 'What Are Conditional Sentences?',
        content: {
          text: 'Conditional sentences express hypothetical situations and their consequences. They consist of two parts: the "if" clause (condition) and the main clause (result).',
          keyPoints: [
            'Used to talk about possibilities and imaginary situations',
            'Always have two clauses: condition + result',
            'Different types for different levels of reality',
          ],
        },
      },
      {
        type: 'rules',
        title: 'The Four Main Types',
        content: {
          types: [
            {
              name: 'Zero Conditional',
              formula: 'If + present simple, present simple',
              use: 'General truths and facts',
              example: 'If you heat ice, it melts.',
            },
            {
              name: 'First Conditional',
              formula: 'If + present simple, will + base verb',
              use: 'Real possibilities in the future',
              example: 'If it rains, I will take an umbrella.',
            },
            {
              name: 'Second Conditional',
              formula: 'If + past simple, would + base verb',
              use: 'Unreal or unlikely present/future',
              example: 'If I won the lottery, I would travel the world.',
            },
            {
              name: 'Third Conditional',
              formula: 'If + past perfect, would have + past participle',
              use: 'Unreal past situations',
              example: 'If I had studied harder, I would have passed the exam.',
            },
          ],
        },
      },
      {
        type: 'examples',
        title: 'Real-World Examples',
        content: {
          dialogues: [
            {
              context: 'Job Interview',
              speaker1: 'If you get this position, what will you do first?',
              speaker2: 'If I got this position, I would reorganize the team structure.',
              note: 'First conditional for real possibility, second for hypothetical',
            },
            {
              context: 'Regretful Conversation',
              speaker1: 'I failed the exam.',
              speaker2: 'If you had studied more, you would have passed.',
              note: 'Third conditional expressing past regret',
            },
          ],
          commonMistakes: [
            '❌ "If I will have time, I will call you." → ✅ "If I have time, I will call you."',
            '❌ "If I was you, I would accept." → ✅ "If I were you, I would accept."',
            '❌ Mixing conditional types in one sentence',
          ],
        },
      },
      {
        type: 'practice',
        title: 'Practice Exercises',
        content: {
          exercises: [
            {
              type: 'multiple-choice',
              question: 'If she _____ harder, she would pass the exam.',
              options: ['studies', 'studied', 'had studied', 'would study'],
              correct: 1,
              explanation: 'Second conditional uses past simple in the if-clause',
            },
            {
              type: 'fill-blank',
              question: 'If I _____ (know) about the party, I would have come.',
              correct: 'had known',
              explanation: 'Third conditional requires past perfect in the if-clause',
            },
            {
              type: 'sentence-reorder',
              words: ['would', 'If', 'rich', 'I', 'were', 'I', 'travel', ','],
              correct: ['If', 'I', 'were', 'rich', ',', 'I', 'would', 'travel'],
              explanation: 'Second conditional structure: If + past simple, would + base verb',
            },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Key Takeaways',
        content: {
          points: [
            'Zero: Facts and general truths (if + present, present)',
            'First: Real future possibilities (if + present, will + verb)',
            'Second: Unreal present/future (if + past, would + verb)',
            'Third: Unreal past (if + past perfect, would have + past participle)',
            'Never use "will" in the if-clause',
            'Use "were" instead of "was" in formal second conditionals',
          ],
        },
      },
    ],
  },
  {
    id: 'phrasal-verbs-expanded',
    title: 'Essential Phrasal Verbs - Complete Guide',
    level: 'B2',
    duration: 45,
    sections: [
      {
        type: 'introduction',
        title: 'Understanding Phrasal Verbs',
        content: {
          text: 'Phrasal verbs are combinations of a verb + particle (preposition or adverb) that create a new meaning different from the individual words.',
          keyPoints: [
            'Verb + particle = new meaning',
            'Can be separable or inseparable',
            'Essential for natural English',
            'Often have multiple meanings',
          ],
        },
      },
      {
        type: 'rules',
        title: 'Types of Phrasal Verbs',
        content: {
          types: [
            {
              name: 'Separable',
              description: 'Object can go between verb and particle',
              example: 'Turn off the light / Turn the light off',
            },
            {
              name: 'Inseparable',
              description: 'Object must come after the particle',
              example: 'Look after the children (NOT: Look the children after)',
            },
            {
              name: 'Intransitive',
              description: 'No object needed',
              example: 'The plane took off.',
            },
          ],
        },
      },
      {
        type: 'examples',
        title: 'Common Phrasal Verbs in Context',
        content: {
          verbs: [
            {
              phrasal: 'come up with',
              meaning: 'to think of or create',
              example: 'She came up with a brilliant solution.',
              british: 'think up',
              american: 'come up with',
            },
            {
              phrasal: 'put off',
              meaning: 'to postpone or delay',
              example: "Don't put off your homework until tomorrow.",
              british: 'put off',
              american: 'put off',
            },
            {
              phrasal: 'figure out',
              meaning: 'to understand or solve',
              example: "I can't figure out how to use this app.",
              british: 'work out',
              american: 'figure out',
            },
          ],
        },
      },
      {
        type: 'practice',
        title: 'Practice Exercises',
        content: {
          exercises: [
            {
              type: 'multiple-choice',
              question: 'I need to _____ my homework before dinner.',
              options: ['do', 'make', 'get', 'take'],
              correct: 0,
              explanation: 'We use "do" with homework, tasks, and jobs',
            },
            {
              type: 'fill-blank',
              question: 'Can you _____ the children while I cook dinner?',
              correct: 'look after',
              explanation: '"Look after" means to take care of someone',
            },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Key Takeaways',
        content: {
          points: [
            'Phrasal verbs = verb + particle with new meaning',
            'Check if separable or inseparable',
            'Learn in context, not just lists',
            'Practice using them in sentences',
            'Many have British/American variations',
          ],
        },
      },
    ],
  },
];
