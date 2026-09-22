export type LessonType = 'grammar' | 'vocabulary' | 'conversation' | 'mixed';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: Level;
  type: LessonType;
  duration: number; // minutes
  icon: string;
  color: string;
  sections: LessonSection[];
}

export interface LessonSection {
  id: string;
  title: string;
  type: 'content' | 'quiz' | 'flashcards' | 'matching' | 'wordOrder' | 'story' | 'discussion';
  duration: number;
  content?: ContentSection;
  quiz?: QuizSection;
  flashcards?: FlashcardSection;
  matching?: MatchingSection;
  wordOrder?: WordOrderSection;
  story?: StorySection;
  discussion?: DiscussionSection;
}

export interface ContentSection {
  tag: string;
  tagColor: string;
  subtitle: string;
  blocks: ContentBlock[];
}

export type ContentBlock = 
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; variant: 'blue' | 'amber' | 'green' | 'purple'; content: string }
  | { type: 'scale'; items: { label: string; value: number; color: string }[] }
  | { type: 'text'; content: string }
  | { type: 'comparison'; items: { label: string; left: string; right: string }[] };

export interface QuizSection {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface FlashcardSection {
  cards: { front: string; back: string; example?: string }[];
}

export interface MatchingSection {
  instruction: string;
  pairs: { left: string; right: string }[];
}

export interface WordOrderSection {
  sentences: {
    correct: string[];
    hint: string;
    translation?: string;
  }[];
}

export interface StorySection {
  text: string;
  questions: string[];
}

export interface DiscussionSection {
  questions: string[];
  tips?: string[];
}

export const lessons: Lesson[] = [
  {
    id: 'conditionals-b2',
    title: 'Conditionals, Probability & Modal Verbs',
    description: 'Master the subtle differences between conditional types and learn to express probability with precision.',
    level: 'B2',
    type: 'grammar',
    duration: 50,
    icon: '🔀',
    color: 'blue',
    sections: [
      {
        id: 'cond-intro',
        title: 'Conditionals — Degrees of Reality',
        type: 'content',
        duration: 15,
        content: {
          tag: 'Part 1 · Grammar',
          tagColor: 'blue',
          subtitle: 'At B2, you already know the conditionals. Today we look at the fine differences — how they signal how likely or real something is.',
          blocks: [
            {
              type: 'table',
              headers: ['Type', 'Formula', 'Reality Level', 'Example'],
              rows: [
                ['Zero', 'If + present → present', 'Always true / facts', 'If you heat ice, it melts.'],
                ['First', 'If + present → will', 'Real & possible', "If I get the job, I'll move to Madrid."],
                ['Second', 'If + past → would', 'Unlikely / imaginary', "If I won the lottery, I'd retire."],
                ['Third', 'If + past perfect → would have', 'Impossible — past regret', 'If I had studied, I would have passed.'],
                ['Mixed', 'If + past perfect → would', 'Past cause → present result', "If I had taken the job, I'd be rich now."],
              ]
            },
            {
              type: 'callout',
              variant: 'blue',
              content: '<strong>The key insight:</strong> The conditional type tells the listener exactly how seriously you believe the situation could happen. It\'s not just grammar — it\'s meaning.'
            },
            {
              type: 'callout',
              variant: 'amber',
              content: '<strong>Compare these:</strong><br/><br/><strong>First:</strong> "If it rains, I\'ll take an umbrella." → I think it might rain.<br/><br/><strong>Second:</strong> "If it rained, I\'d take an umbrella." → Probably won\'t rain, just imagining.<br/><br/><strong>Third:</strong> "If it had rained, I would have taken an umbrella." → It didn\'t rain.'
            }
          ]
        }
      },
      {
        id: 'cond-quiz',
        title: 'Test Your Knowledge',
        type: 'quiz',
        duration: 10,
        quiz: {
          questions: [
            { question: "_____ I had more time, I would learn Japanese.", options: ["If", "When", "Unless", "Although"], answer: 0, explanation: "'If' introduces the second conditional — an imaginary present situation." },
            { question: "You _____ have told me about the meeting! I missed it.", options: ["could", "should", "might", "would"], answer: 1, explanation: "'Should have' expresses criticism — you expected it but it didn't happen." },
            { question: "There's a significant chance the flight _____ be delayed.", options: ["will", "should", "might", "must"], answer: 2, explanation: "'Might' expresses uncertainty — around 50% probability." },
            { question: "If she had applied earlier, she _____ got the job.", options: ["would", "will have", "would have", "should"], answer: 2, explanation: "Third conditional: If + past perfect → would have + past participle." },
            { question: "If water reaches 100°C, it _____.", options: ["would boil", "will boil", "boils", "boiled"], answer: 2, explanation: "Zero conditional uses present simple — for scientific facts." },
          ]
        }
      },
      {
        id: 'cond-discuss',
        title: 'Discussion Practice',
        type: 'discussion',
        duration: 10,
        discussion: {
          questions: [
            "Make a First Conditional sentence about something you're planning this week.",
            "Make a Second Conditional — something unlikely but fun to imagine.",
            "Make a Third Conditional — something you regret or wish had gone differently.",
            "Think of a decision you made. How would your life be different if you had chosen differently? (Use mixed conditional)",
          ],
          tips: [
            "Focus on the meaning, not just the form",
            "Try to use different conditional types in your answers",
            "Notice how the conditional changes the feeling of your sentence"
          ]
        }
      }
    ]
  },
  {
    id: 'phrasal-verbs-b2',
    title: 'Essential Phrasal Verbs for Daily Life',
    description: 'Learn the most common phrasal verbs native speakers use every day — with context and practice.',
    level: 'B2',
    type: 'vocabulary',
    duration: 45,
    icon: '📚',
    color: 'purple',
    sections: [
      {
        id: 'pv-flashcards',
        title: 'Learn the Phrasal Verbs',
        type: 'flashcards',
        duration: 15,
        flashcards: {
          cards: [
            { front: 'come up with', back: 'to think of / create an idea or plan', example: "She came up with a brilliant solution." },
            { front: 'look forward to', back: 'to feel excited about something in the future', example: "I'm looking forward to the weekend." },
            { front: 'put off', back: 'to postpone / delay something', example: "Stop putting off your homework!" },
            { front: 'figure out', back: 'to understand or solve something', example: "I can't figure out how to use this app." },
            { front: 'get along with', back: 'to have a good relationship with someone', example: "I get along with all my colleagues." },
            { front: 'run out of', back: 'to have no more of something left', example: "We've run out of milk." },
            { front: 'break down', back: 'to stop working (machines) / to lose emotional control', example: "My car broke down on the highway." },
            { front: 'turn down', back: 'to refuse / reject something; to lower volume', example: "She turned down the job offer." },
          ]
        }
      },
      {
        id: 'pv-matching',
        title: 'Match the Meaning',
        type: 'matching',
        duration: 10,
        matching: {
          instruction: 'Match each phrasal verb with its correct meaning',
          pairs: [
            { left: 'come up with', right: 'create an idea' },
            { left: 'put off', right: 'postpone' },
            { left: 'figure out', right: 'solve / understand' },
            { left: 'run out of', right: 'have none left' },
            { left: 'turn down', right: 'refuse' },
            { left: 'break down', right: 'stop working' },
          ]
        }
      },
      {
        id: 'pv-wordorder',
        title: 'Build the Sentence',
        type: 'wordOrder',
        duration: 10,
        wordOrder: {
          sentences: [
            { correct: ['She', 'came', 'up', 'with', 'a', 'great', 'idea'], hint: 'She had a creative thought' },
            { correct: ['I', 'am', 'looking', 'forward', 'to', 'the', 'holiday'], hint: 'I feel excited about the holiday' },
            { correct: ['Don\'t', 'put', 'off', 'your', 'work', 'until', 'tomorrow'], hint: 'Don\'t delay your tasks' },
            { correct: ['We', 'have', 'run', 'out', 'of', 'coffee'], hint: 'There is no more coffee' },
          ]
        }
      },
      {
        id: 'pv-discuss',
        title: 'Use Them in Context',
        type: 'discussion',
        duration: 10,
        discussion: {
          questions: [
            "Tell me about a time you came up with a creative solution to a problem.",
            "What are you looking forward to this month?",
            "Do you often put things off? What do you procrastinate about?",
            "Have you ever run out of something important at a bad moment?",
            "Describe someone you get along with really well. Why?",
          ]
        }
      }
    ]
  },
  {
    id: 'job-interview-b2',
    title: 'Job Interview English',
    description: 'Prepare for English job interviews with key phrases, common questions, and role-play practice.',
    level: 'B2',
    type: 'conversation',
    duration: 50,
    icon: '💼',
    color: 'green',
    sections: [
      {
        id: 'ji-content',
        title: 'Key Interview Phrases',
        type: 'content',
        duration: 15,
        content: {
          tag: 'Essential Phrases',
          tagColor: 'green',
          subtitle: 'These are the phrases that make you sound professional and confident in an English interview.',
          blocks: [
            {
              type: 'comparison',
              items: [
                { label: 'Introducing yourself', left: '❌ "My name is... I am from..."', right: '✅ "I\'m a [role] with X years of experience in..."' },
                { label: 'Talking about strengths', left: '❌ "I\'m a hard worker"', right: '✅ "One of my key strengths is my ability to..."' },
                { label: 'Discussing weaknesses', left: '❌ "I work too hard"', right: '✅ "I\'ve been working on improving my..."' },
                { label: 'Why this company?', left: '❌ "I need a job"', right: '✅ "I\'m drawn to your company because..."' },
                { label: 'Closing', left: '❌ "That\'s all"', right: '✅ "I\'m very excited about this opportunity and I believe..."' },
              ]
            },
            {
              type: 'callout',
              variant: 'green',
              content: '<strong>Pro tip:</strong> Use the STAR method for behavioral questions:<br/>• <strong>S</strong>ituation — set the scene<br/>• <strong>T</strong>ask — what was required<br/>• <strong>A</strong>ction — what YOU did<br/>• <strong>R</strong>esult — the outcome'
            },
            {
              type: 'callout',
              variant: 'blue',
              content: '<strong>Power phrases:</strong><br/>• "In my previous role, I was responsible for..."<br/>• "One achievement I\'m particularly proud of is..."<br/>• "I\'m passionate about..."<br/>• "I thrive in environments where..."'
            }
          ]
        }
      },
      {
        id: 'ji-quiz',
        title: 'Choose the Best Response',
        type: 'quiz',
        duration: 10,
        quiz: {
          questions: [
            { question: "Interviewer: 'Tell me about yourself.' Best response:", options: ["My name is Juan and I'm 28 years old.", "I'm a software developer with 5 years of experience specializing in full-stack development.", "I like football and music.", "I'm looking for a job."], answer: 1, explanation: "Professional summaries should focus on relevant experience and skills." },
            { question: "Interviewer: 'What's your biggest weakness?' Best approach:", options: ["I don't have any weaknesses.", "I work too hard sometimes.", "I sometimes struggle with public speaking, but I've been taking courses to improve.", "Why do you want to know that?"], answer: 2, explanation: "Show self-awareness and proactive improvement — never say you have no weaknesses." },
            { question: "Interviewer: 'Why should we hire you?' Best response:", options: ["Because I need this job.", "Because I'm the best candidate.", "Based on my experience in X and my ability to Y, I believe I can contribute to your team by Z.", "My friend works here and said it's a good company."], answer: 2, explanation: "Connect your skills directly to what the company needs." },
            { question: "Which is the best way to describe a past achievement?", options: ["We did a good project once.", "I led a team of 5 to deliver a project 2 weeks ahead of schedule, resulting in 15% cost savings.", "I'm good at my job.", "My boss liked my work."], answer: 1, explanation: "Use specific numbers and results — the STAR method in action!" },
          ]
        }
      },
      {
        id: 'ji-roleplay',
        title: 'Role Play Practice',
        type: 'discussion',
        duration: 20,
        discussion: {
          questions: [
            "🎭 ROLE PLAY: I'm the interviewer. 'Good morning! Thank you for coming in today. Could you start by telling me a little about yourself?'",
            "🎭 'That's interesting! Can you tell me about a challenging situation at work and how you handled it?'",
            "🎭 'Where do you see yourself in 5 years?'",
            "🎭 'Do you have any questions for us?' (Prepare 2-3 questions you could ask!)",
          ],
          tips: [
            "Speak slowly and clearly — it's better to be understood than fast",
            "Use pauses naturally — they make you sound thoughtful",
            "If you don't understand a question, ask for clarification: 'Could you rephrase that?'",
            "End your answers with a clear conclusion, not just trailing off"
          ]
        }
      }
    ]
  },
  {
    id: 'connecting-words-b1',
    title: 'Linking Words & Connectors',
    description: 'Learn to connect your ideas smoothly with linking words — essential for fluent speaking and writing.',
    level: 'B1',
    type: 'grammar',
    duration: 45,
    icon: '🔗',
    color: 'amber',
    sections: [
      {
        id: 'lw-content',
        title: 'Categories of Connectors',
        type: 'content',
        duration: 15,
        content: {
          tag: 'Part 1 · Grammar',
          tagColor: 'amber',
          subtitle: 'Linking words help your ideas flow. Without them, speech sounds choppy and disconnected.',
          blocks: [
            {
              type: 'table',
              headers: ['Function', 'Connectors', 'Example'],
              rows: [
                ['Adding info', 'also, moreover, furthermore, in addition', 'I love cooking. Moreover, I enjoy baking.'],
                ['Contrasting', 'however, although, on the other hand, nevertheless', "Although it rained, we went out."],
                ['Cause/Effect', 'because, therefore, as a result, consequently', "It rained heavily. As a result, the match was cancelled."],
                ['Sequencing', 'first, then, finally, meanwhile, subsequently', 'First, preheat the oven. Then, mix the ingredients.'],
                ['Giving examples', 'for instance, such as, namely, in particular', 'I enjoy outdoor activities, such as hiking and cycling.'],
                ['Summarizing', 'in conclusion, to sum up, overall, all in all', 'Overall, it was a successful event.'],
              ]
            },
            {
              type: 'callout',
              variant: 'amber',
              content: '<strong>Common mistake:</strong> Don\'t overuse connectors! One or two per paragraph is enough. Too many makes your speech sound unnatural and robotic.'
            },
            {
              type: 'callout',
              variant: 'green',
              content: '<strong>Speaking tip:</strong> In conversation, use simpler connectors: "actually," "by the way," "speaking of which," "on top of that." Save formal connectors like "furthermore" for writing.'
            }
          ]
        }
      },
      {
        id: 'lw-quiz',
        title: 'Choose the Right Connector',
        type: 'quiz',
        duration: 10,
        quiz: {
          questions: [
            { question: "The restaurant was expensive. _____, the food was amazing.", options: ["Because", "However", "Therefore", "For example"], answer: 1, explanation: "'However' shows contrast — expensive BUT amazing." },
            { question: "She studied hard for months. _____, she passed the exam with flying colors.", options: ["Although", "However", "As a result", "For instance"], answer: 2, explanation: "'As a result' shows the effect of studying hard." },
            { question: "I enjoy many sports, _____ tennis and swimming.", options: ["however", "such as", "therefore", "moreover"], answer: 1, explanation: "'Such as' introduces specific examples." },
            { question: "_____ it was raining, they decided to go for a walk.", options: ["Because", "Although", "Therefore", "Moreover"], answer: 1, explanation: "'Although' introduces a contrast — rain didn't stop them." },
            { question: "He forgot his keys. _____, he had to call his roommate to let him in.", options: ["However", "Although", "Consequently", "For example"], answer: 2, explanation: "'Consequently' shows the result of forgetting keys." },
          ]
        }
      },
      {
        id: 'lw-wordorder',
        title: 'Build Connected Sentences',
        type: 'wordOrder',
        duration: 10,
        wordOrder: {
          sentences: [
            { correct: ['Although', 'it', 'was', 'late', 'she', 'kept', 'working'], hint: 'Contrast: late but still working' },
            { correct: ['He', 'studied', 'hard', 'therefore', 'he', 'passed', 'the', 'exam'], hint: 'Cause and effect' },
            { correct: ['I', 'enjoy', 'outdoor', 'activities', 'such', 'as', 'hiking'], hint: 'Giving examples' },
            { correct: ['The', 'movie', 'was', 'long', 'however', 'it', 'was', 'interesting'], hint: 'Contrast between long and interesting' },
          ]
        }
      },
      {
        id: 'lw-discuss',
        title: 'Practice in Conversation',
        type: 'discussion',
        duration: 10,
        discussion: {
          questions: [
            "Tell me about your last vacation. Use at least 3 linking words.",
            "Describe your daily routine. Use sequencing words (first, then, after that, finally).",
            "Talk about a challenge you overcame. Use cause/effect connectors.",
            "Compare city life and country life. Use contrast connectors (however, on the other hand, although).",
          ]
        }
      }
    ]
  },
  {
    id: 'past-tenses-b1',
    title: 'Past Tenses — Telling Stories',
    description: 'Master the past simple, past continuous, and past perfect to tell engaging stories in English.',
    level: 'B1',
    type: 'grammar',
    duration: 50,
    icon: '⏰',
    color: 'cyan',
    sections: [
      {
        id: 'pt-content',
        title: 'The Three Past Tenses',
        type: 'content',
        duration: 15,
        content: {
          tag: 'Part 1 · Grammar',
          tagColor: 'cyan',
          subtitle: 'Each past tense paints a different picture of time. Learn when to use each one.',
          blocks: [
            {
              type: 'table',
              headers: ['Tense', 'Form', 'Use', 'Example'],
              rows: [
                ['Past Simple', 'verb + ed (or irregular)', 'Completed action in the past', 'I arrived at 8pm.'],
                ['Past Continuous', 'was/were + verb-ing', 'Action in progress at a past moment', 'I was cooking when she called.'],
                ['Past Perfect', 'had + past participle', 'Action before another past action', 'I had already eaten when they arrived.'],
              ]
            },
            {
              type: 'callout',
              variant: 'blue',
              content: '<strong>The timeline trick:</strong><br/>• Past Perfect → happened FIRST<br/>• Past Continuous → was IN PROGRESS<br/>• Past Simple → happened AT THAT MOMENT<br/><br/>"I <strong>had finished</strong> my homework (first) when my friend <strong>called</strong> (at that moment). I <strong>was watching</strong> TV (in progress) when the power went out."'
            },
            {
              type: 'callout',
              variant: 'purple',
              content: '<strong>Storytelling formula:</strong><br/>"It was a dark night. I <em>was walking</em> home (setting the scene) when suddenly I <em>heard</em> a noise (interruption). I <em>had never felt</em> so scared before (earlier experience relevant to now)."'
            }
          ]
        }
      },
      {
        id: 'pt-story',
        title: 'Story Analysis',
        type: 'story',
        duration: 10,
        story: {
          text: "It was a rainy evening and Maria <em>was driving</em> home from work. She <em>had had</em> a long day at the office and just wanted to relax. Suddenly, she <em>saw</em> something on the road — a small dog, shivering in the rain. She <em>stopped</em> the car immediately. The dog <em>was shaking</em> and looked very scared. Maria <em>had never seen</em> an animal so alone. She <em>picked</em> it up gently and <em>put</em> it in the car. While she <em>was driving</em> home, the dog <em>fell</em> asleep on her lap. By the time she <em>arrived</em>, she <em>had already decided</em> to keep him.",
          questions: [
            "Which tense is used to set the scene (background)?",
            "Which tense describes the interruption (sudden event)?",
            "Which tense shows something that happened BEFORE the main story?",
            "Retell this story in your own words, using all three past tenses.",
          ]
        }
      },
      {
        id: 'pt-quiz',
        title: 'Test Your Understanding',
        type: 'quiz',
        duration: 10,
        quiz: {
          questions: [
            { question: "When I arrived, they _____ dinner.", options: ["cooked", "were cooking", "had cooked"], answer: 1, explanation: "Past continuous — the action was in progress when I arrived." },
            { question: "She _____ to Paris three times before she moved there.", options: ["traveled", "was traveling", "had traveled"], answer: 2, explanation: "Past perfect — the traveling happened BEFORE she moved." },
            { question: "I _____ TV when the phone rang.", options: ["watched", "was watching", "had watched"], answer: 1, explanation: "Past continuous — the action was in progress when interrupted." },
            { question: "After he _____ his homework, he went out to play.", options: ["finished", "was finishing", "had finished"], answer: 2, explanation: "Past perfect — finishing happened BEFORE going out." },
            { question: "While we _____ in the park, it started to rain.", options: ["walked", "were walking", "had walked"], answer: 1, explanation: "Past continuous with 'while' — action in progress." },
          ]
        }
      },
      {
        id: 'pt-discuss',
        title: 'Tell Your Story',
        type: 'discussion',
        duration: 10,
        discussion: {
          questions: [
            "Tell me about the best vacation you ever had. Use all three past tenses.",
            "Describe a time something unexpected happened to you.",
            "Tell me about a decision that changed your life. What had happened before you made it?",
            "Describe your morning today — what were you doing at 8am? What had you already done by 9am?",
          ],
          tips: [
            "Start with past continuous to set the scene",
            "Use past simple for the main events",
            "Use past perfect to mention things that happened even earlier",
            "Don't worry about being perfect — focus on telling a good story!"
          ]
        }
      }
    ]
  }
];
