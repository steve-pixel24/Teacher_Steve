// Comprehensive Grammar Rules Database

export interface GrammarRule {
  id: string;
  title: string;
  level: string;
  explanation: string;
  formula?: string;
  examples: string[];
  commonMistakes?: string[];
  tips?: string[];
  ukUsDifference?: { uk: string; us: string };
}

export interface GrammarCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  level: string;
  ruleCount: number;
  rules: GrammarRule[];
}

export const grammarCategories: GrammarCategory[] = [
  // ===== VERB TENSES =====
  {
    id: 'present-tenses',
    title: 'Present Tenses',
    icon: '🕐',
    description: 'Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous',
    level: 'A1-B2',
    ruleCount: 4,
    rules: [
      {
        id: 'present-simple',
        title: 'Present Simple',
        level: 'A1',
        explanation: 'Used for habits, routines, general truths, and permanent situations.',
        formula: 'Subject + base verb (+ s/es for he/she/it)',
        examples: [
          'I work in an office.',
          'She speaks three languages.',
          'The sun rises in the east.',
          'Water boils at 100°C.'
        ],
        commonMistakes: [
          '❌ "He work here." → ✅ "He works here." (add -s for he/she/it)',
          '❌ "I am working every day." → ✅ "I work every day." (not continuous for habits)'
        ],
        tips: [
          'Use with adverbs of frequency: always, usually, often, sometimes, never',
          'For schedules and timetables: "The train leaves at 9 AM."'
        ]
      },
      {
        id: 'present-continuous',
        title: 'Present Continuous',
        level: 'A1',
        explanation: 'Used for actions happening now, temporary situations, and future arrangements.',
        formula: 'Subject + am/is/are + verb-ing',
        examples: [
          'I am studying English right now.',
          'She is living in London this year.',
          'We are meeting John tomorrow.',
          'It is raining outside.'
        ],
        commonMistakes: [
          '❌ "I am knowing the answer." → ✅ "I know the answer." (stative verbs)',
          '❌ "He is always late." → ✅ "He is always being late." (for annoyance)'
        ],
        tips: [
          'Stative verbs (know, love, believe, understand) are rarely used in continuous',
          'For future arrangements with a specific time: "I\'m seeing the doctor at 3 PM."'
        ]
      },
      {
        id: 'present-perfect',
        title: 'Present Perfect',
        level: 'A2',
        explanation: 'Used for past actions with present relevance, experiences, and unfinished time periods.',
        formula: 'Subject + have/has + past participle',
        examples: [
          'I have visited Paris three times.',
          'She has just finished her homework.',
          'We have lived here since 2010.',
          'Have you ever eaten sushi?'
        ],
        commonMistakes: [
          '❌ "I have seen him yesterday." → ✅ "I saw him yesterday." (specific past time = past simple)',
          '❌ "I have went there." → ✅ "I have gone there." (past participle, not past simple)'
        ],
        tips: [
          'Use with: ever, never, just, already, yet, since, for',
          'For life experiences: "I have been to Japan." (sometime in my life)',
          'For unfinished time: "I have written three emails today." (today isn\'t over)'
        ]
      },
      {
        id: 'present-perfect-continuous',
        title: 'Present Perfect Continuous',
        level: 'B1',
        explanation: 'Used for actions that started in the past and continue to the present, emphasizing duration.',
        formula: 'Subject + have/has + been + verb-ing',
        examples: [
          'I have been studying for three hours.',
          'She has been working here since January.',
          'It has been raining all day.',
          'They have been waiting for us.'
        ],
        commonMistakes: [
          '❌ "I have been knowing him for years." → ✅ "I have known him for years." (stative verbs)',
          '❌ "I have been reading this book." → ✅ "I have read this book." (if completed)'
        ],
        tips: [
          'Emphasizes the duration or ongoing nature of an action',
          'Often used with: for, since, all day, how long',
          'Can explain present results: "You\'re tired because you\'ve been running."'
        ]
      }
    ]
  },
  {
    id: 'past-tenses',
    title: 'Past Tenses',
    icon: '🕑',
    description: 'Past Simple, Past Continuous, Past Perfect, Past Perfect Continuous',
    level: 'A1-B2',
    ruleCount: 4,
    rules: [
      {
        id: 'past-simple',
        title: 'Past Simple',
        level: 'A1',
        explanation: 'Used for completed actions in the past at a specific time.',
        formula: 'Subject + past tense verb (regular: -ed / irregular)',
        examples: [
          'I visited London last year.',
          'She studied hard and passed the exam.',
          'They didn\'t come to the party.',
          'Did you see the movie?'
        ],
        commonMistakes: [
          '❌ "I didn\'t went there." → ✅ "I didn\'t go there." (base verb after didn\'t)',
          '❌ "I have seen him yesterday." → ✅ "I saw him yesterday." (specific past time)'
        ],
        tips: [
          'Use with specific past time markers: yesterday, last week, in 2010, ago',
          'For a sequence of past events: "I woke up, had breakfast, and went to work."'
        ]
      },
      {
        id: 'past-continuous',
        title: 'Past Continuous',
        level: 'A2',
        explanation: 'Used for actions in progress at a specific past time, or interrupted actions.',
        formula: 'Subject + was/were + verb-ing',
        examples: [
          'I was watching TV at 8 PM last night.',
          'They were playing football when it started to rain.',
          'While I was cooking, the phone rang.',
          'What were you doing yesterday afternoon?'
        ],
        commonMistakes: [
          '❌ "I was knowing the answer." → ✅ "I knew the answer." (stative verbs)',
          '❌ "When I arrived, she was left." → ✅ "When I arrived, she was leaving."'
        ],
        tips: [
          'Often used with "when" (interruption) and "while" (parallel action)',
          'For setting the scene in stories: "The sun was shining and birds were singing."'
        ]
      },
      {
        id: 'past-perfect',
        title: 'Past Perfect',
        level: 'B1',
        explanation: 'Used for an action that happened before another past action.',
        formula: 'Subject + had + past participle',
        examples: [
          'I had finished my homework before dinner.',
          'She had already left when I arrived.',
          'They had never seen snow before they moved to Canada.',
          'If I had known, I would have helped.'
        ],
        commonMistakes: [
          '❌ "When I arrived, she had left." (if she left AFTER you arrived) → ✅ "When I arrived, she left."',
          'Using past perfect when not needed - only use when clearly showing earlier past action'
        ],
        tips: [
          'Use to show which of two past actions happened first',
          'Common in third conditionals: "If I had studied, I would have passed."',
          'Often used with: already, just, never, before, after, by the time'
        ]
      },
      {
        id: 'past-perfect-continuous',
        title: 'Past Perfect Continuous',
        level: 'B2',
        explanation: 'Used for an action that was in progress before another past action, emphasizing duration.',
        formula: 'Subject + had + been + verb-ing',
        examples: [
          'I had been waiting for two hours when the bus finally came.',
          'She was tired because she had been working all day.',
          'They had been living there for five years before they moved.',
          'How long had you been studying English before you came to the UK?'
        ],
        commonMistakes: [
          '❌ "I had been knowing him for years." → ✅ "I had known him for years." (stative verbs)',
          'Using it when simple past perfect is sufficient'
        ],
        tips: [
          'Emphasizes the duration of an action before another past event',
          'Often explains a past state or result: "The road was wet because it had been raining."',
          'Use with: for, since, all day, how long'
        ]
      }
    ]
  },
  {
    id: 'future-tenses',
    title: 'Future Tenses',
    icon: '🕒',
    description: 'Future Simple, Future Continuous, Future Perfect, Going To, Present for Future',
    level: 'A1-B2',
    ruleCount: 5,
    rules: [
      {
        id: 'future-simple',
        title: 'Future Simple (will)',
        level: 'A1',
        explanation: 'Used for predictions, spontaneous decisions, promises, and offers.',
        formula: 'Subject + will + base verb',
        examples: [
          'I will help you with your homework.',
          'It will rain tomorrow.',
          'She will be a great doctor.',
          'I\'ll have the chicken, please.'
        ],
        commonMistakes: [
          '❌ "I will going to the party." → ✅ "I will go to the party."',
          'Using "will" for planned actions → use "going to" or present continuous'
        ],
        tips: [
          'For spontaneous decisions: "The phone is ringing. I\'ll get it!"',
          'For promises: "I will always love you."',
          'For predictions without evidence: "I think it will snow."'
        ]
      },
      {
        id: 'going-to',
        title: 'Going To (Future)',
        level: 'A1',
        explanation: 'Used for planned intentions and predictions based on present evidence.',
        formula: 'Subject + am/is/are + going to + base verb',
        examples: [
          'I am going to visit my parents this weekend.',
          'Look at those clouds! It\'s going to rain.',
          'She is going to study medicine at university.',
          'We\'re going to have a party on Saturday.'
        ],
        commonMistakes: [
          '❌ "I going to visit Paris." → ✅ "I am going to visit Paris."',
          'Using "going to" for spontaneous decisions → use "will"'
        ],
        tips: [
          'For plans made before speaking: "I\'m going to learn Spanish."',
          'For predictions with evidence: "He\'s going to fall!" (you can see he\'s unstable)',
          'Often contracted: "I\'m gonna" (informal)'
        ]
      },
      {
        id: 'future-continuous',
        title: 'Future Continuous',
        level: 'B1',
        explanation: 'Used for actions that will be in progress at a specific future time.',
        formula: 'Subject + will + be + verb-ing',
        examples: [
          'This time tomorrow, I will be flying to Paris.',
          'Don\'t call at 8 PM. I will be watching the game.',
          'She will be working late tonight.',
          'Will you be using the car later?'
        ],
        commonMistakes: [
          '❌ "I will be knowing the result." → ✅ "I will know the result." (stative verbs)',
          'Using it for simple future facts → use future simple'
        ],
        tips: [
          'For actions in progress at a specific future time',
          'For polite inquiries: "Will you be using the conference room?"',
          'Often used with: this time tomorrow, at 8 PM, when you arrive'
        ]
      },
      {
        id: 'future-perfect',
        title: 'Future Perfect',
        level: 'B2',
        explanation: 'Used for actions that will be completed before a specific future time.',
        formula: 'Subject + will + have + past participle',
        examples: [
          'By next year, I will have graduated.',
          'She will have finished the report by 5 PM.',
          'They will have been married for 25 years next month.',
          'Will you have eaten by the time I arrive?'
        ],
        commonMistakes: [
          '❌ "I will have finished until tomorrow." → ✅ "I will have finished by tomorrow."',
          'Confusing with future perfect continuous'
        ],
        tips: [
          'Use with "by" + future time: "by tomorrow", "by 2030", "by the time"',
          'Emphasizes completion before a future moment',
          'Often used with: by, by the time, before'
        ]
      },
      {
        id: 'present-for-future',
        title: 'Present Tenses for Future',
        level: 'A2',
        explanation: 'Present Continuous for arrangements, Present Simple for schedules.',
        formula: 'Present Continuous: Subject + am/is/are + verb-ing\nPresent Simple: Subject + base verb',
        examples: [
          'I am meeting Sarah tomorrow. (arrangement)',
          'The train leaves at 9 AM. (schedule)',
          'We are flying to Rome on Friday. (arrangement)',
          'The conference starts next Monday. (schedule)'
        ],
        commonMistakes: [
          '❌ "The train is leaving at 9 AM." → ✅ "The train leaves at 9 AM." (timetables)',
          'Using present simple for personal arrangements → use present continuous'
        ],
        tips: [
          'Present Continuous: for fixed arrangements with other people/places',
          'Present Simple: for timetables, schedules, programs',
          'Both are more natural than "will" for planned future events'
        ]
      }
    ]
  },
  // ===== CONDITIONALS =====
  {
    id: 'conditionals',
    title: 'Conditional Sentences',
    icon: '🔀',
    description: 'Zero, First, Second, Third, and Mixed Conditionals',
    level: 'A2-C1',
    ruleCount: 5,
    rules: [
      {
        id: 'zero-conditional',
        title: 'Zero Conditional',
        level: 'A2',
        explanation: 'Used for general truths, scientific facts, and things that are always true.',
        formula: 'If + present simple, present simple',
        examples: [
          'If you heat ice, it melts.',
          'If it rains, the grass gets wet.',
          'I get hungry if I don\'t eat breakfast.',
          'Plants die if they don\'t get water.'
        ],
        commonMistakes: [
          '❌ "If you will heat ice, it melts." → ✅ "If you heat ice, it melts." (no "will" in if-clause)',
          'Using it for specific situations → use first conditional'
        ],
        tips: [
          '"If" can be replaced with "when" or "whenever" without changing meaning',
          'Used for scientific facts, rules, and habits',
          'Both clauses use present simple'
        ]
      },
      {
        id: 'first-conditional',
        title: 'First Conditional',
        level: 'A2',
        explanation: 'Used for real and possible situations in the future.',
        formula: 'If + present simple, will + base verb',
        examples: [
          'If it rains tomorrow, I will stay home.',
          'If you study hard, you will pass the exam.',
          'She will be angry if you don\'t call her.',
          'What will you do if you miss the bus?'
        ],
        commonMistakes: [
          '❌ "If it will rain, I will stay home." → ✅ "If it rains, I will stay home." (no "will" in if-clause)',
          '❌ "If I study, I pass." → ✅ "If I study, I will pass." (need "will" in main clause)'
        ],
        tips: [
          'Can use other modals instead of "will": can, may, might, should',
          '"If I study, I might pass" = less certain',
          'For likely/possible future situations',
          'Can use present continuous in if-clause: "If you\'re coming, let me know."'
        ]
      },
      {
        id: 'second-conditional',
        title: 'Second Conditional',
        level: 'B1',
        explanation: 'Used for unreal or imaginary situations in the present or future.',
        formula: 'If + past simple, would + base verb',
        examples: [
          'If I won the lottery, I would travel the world.',
          'If I were you, I would accept the job.',
          'She would be happier if she changed jobs.',
          'What would you do if you saw a ghost?'
        ],
        commonMistakes: [
          '❌ "If I was you..." → ✅ "If I were you..." (use "were" for all subjects in formal English)',
          '❌ "If I would win..." → ✅ "If I won..." (no "would" in if-clause)',
          'Using it for likely situations → use first conditional'
        ],
        tips: [
          'Use "were" instead of "was" in formal English: "If I were rich..."',
          'Can use "could" instead of "would": "If I had more time, I could learn French."',
          'For unlikely or impossible present/future situations',
          'Often used for advice: "If I were you, I would..."'
        ]
      },
      {
        id: 'third-conditional',
        title: 'Third Conditional',
        level: 'B1',
        explanation: 'Used for unreal situations in the past - things that didn\'t happen.',
        formula: 'If + past perfect, would + have + past participle',
        examples: [
          'If I had studied harder, I would have passed the exam.',
          'If she had known, she would have helped.',
          'I would have called you if I had had your number.',
          'What would you have done if you had missed the flight?'
        ],
        commonMistakes: [
          '❌ "If I would have known..." → ✅ "If I had known..." (no "would" in if-clause)',
          '❌ "If I had known, I would helped." → ✅ "If I had known, I would have helped."',
          'Using it for present situations → use second conditional'
        ],
        tips: [
          'Used for regrets and criticism about the past',
          'Can use "could have" or "might have" instead of "would have"',
          '"If I had studied, I could have passed" = it was possible',
          'Often used with "wouldn\'t have" for negative results'
        ]
      },
      {
        id: 'mixed-conditional',
        title: 'Mixed Conditional',
        level: 'B2',
        explanation: 'Used for unreal past situations with present results, or unreal present situations with past results.',
        formula: 'Type 1: If + past perfect, would + base verb (past cause → present result)\nType 2: If + past simple, would + have + past participle (present situation → past result)',
        examples: [
          'If I had studied medicine, I would be a doctor now. (past → present)',
          'If she weren\'t afraid of flying, she would have traveled to America. (present → past)',
          'If I had taken that job, I would be rich now.',
          'If he were more careful, he wouldn\'t have had that accident.'
        ],
        commonMistakes: [
          'Confusing which type to use',
          'Mixing up the time references'
        ],
        tips: [
          'Type 1: Past action → present result (If I had done X, I would be Y now)',
          'Type 2: Present situation → past result (If I were X, I would have done Y)',
          'Think about the time relationship: which action is past, which is present?',
          'Often used with "now" or "today" to show present result'
        ]
      }
    ]
  },
  // ===== MODAL VERBS =====
  {
    id: 'modal-verbs',
    title: 'Modal Verbs',
    icon: '🔧',
    description: 'Can, Could, May, Might, Must, Should, Would, Need to, Have to',
    level: 'A1-B2',
    ruleCount: 8,
    rules: [
      {
        id: 'can-could-ability',
        title: 'Can / Could (Ability)',
        level: 'A1',
        explanation: 'Used to express ability in present (can) and past (could).',
        formula: 'Subject + can/could + base verb',
        examples: [
          'I can speak three languages.',
          'She can swim very well.',
          'I could run fast when I was young.',
          'Could you help me when you were a child?'
        ],
        commonMistakes: [
          '❌ "I can to swim." → ✅ "I can swim." (no "to" after modals)',
          '❌ "He cans speak French." → ✅ "He can speak French." (no -s)'
        ],
        tips: [
          '"Can" for present ability, "could" for past ability',
          '"Be able to" can be used in all tenses: "I will be able to come."',
          '"Could" is also used for polite requests: "Could you open the window?"'
        ]
      },
      {
        id: 'may-might-possibility',
        title: 'May / Might (Possibility)',
        level: 'A2',
        explanation: 'Used to express possibility. "May" is slightly more formal than "might".',
        formula: 'Subject + may/might + base verb',
        examples: [
          'It may rain later.',
          'She might come to the party.',
          'They may be at home.',
          'I might go to France next year.'
        ],
        commonMistakes: [
          '❌ "It may rains." → ✅ "It may rain." (base verb, no -s)',
          '❌ "He may to come." → ✅ "He may come." (no "to")'
        ],
        tips: [
          '"May" = about 50% possibility, "might" = about 30% possibility',
          'Both are less certain than "will"',
          'For past possibility: "may/might + have + past participle": "He may have forgotten."'
        ]
      },
      {
        id: 'must-obligation',
        title: 'Must / Have to (Obligation)',
        level: 'A2',
        explanation: 'Used to express strong obligation or necessity. "Must" is internal obligation, "have to" is external.',
        formula: 'Subject + must/have to + base verb',
        examples: [
          'You must wear a seatbelt. (law/rule)',
          'I have to work tomorrow. (external obligation)',
          'Students must submit their essays on time.',
          'Do you have to wear a uniform?'
        ],
        commonMistakes: [
          '❌ "I must to go." → ✅ "I must go." (no "to" after must)',
          '❌ "He musts work." → ✅ "He must work." (no -s)',
          'Confusing "mustn\'t" (prohibition) with "don\'t have to" (no obligation)'
        ],
        tips: [
          '"Must" = speaker feels it\'s important (internal)',
          '"Have to" = external rules/laws/situations',
          '"Mustn\'t" = prohibition (don\'t do it)',
          '"Don\'t have to" = no obligation (you can if you want)',
          '"Have to" can be used in all tenses; "must" only present'
        ]
      },
      {
        id: 'should-advice',
        title: 'Should / Ought to (Advice)',
        level: 'A2',
        explanation: 'Used to give advice, make recommendations, or express expectation.',
        formula: 'Subject + should/ought to + base verb',
        examples: [
          'You should see a doctor.',
          'We ought to leave now.',
          'She should pass the exam. (expectation)',
          'You shouldn\'t eat so much sugar.'
        ],
        commonMistakes: [
          '❌ "You should to go." → ✅ "You should go." (no "to" after should)',
          '❌ "You should goes." → ✅ "You should go." (base verb)',
          'Using "should" for strong obligation → use "must" or "have to"'
        ],
        tips: [
          '"Should" and "ought to" have the same meaning',
          '"Ought to" is more formal and less common',
          'For past advice: "should/ought to + have + past participle": "You should have studied."',
          'For expectation: "The train should arrive at 9." (= I expect it to)'
        ]
      },
      {
        id: 'would-requests',
        title: 'Would (Polite Requests & Offers)',
        level: 'A2',
        explanation: 'Used for polite requests, offers, and preferences.',
        formula: 'Would + subject + base verb? / Subject + would + base verb',
        examples: [
          'Would you like some coffee?',
          'Would you mind opening the window?',
          'I would prefer the vegetarian option.',
          'Would you help me with this?'
        ],
        commonMistakes: [
          '❌ "Would you to help me?" → ✅ "Would you help me?" (no "to")',
          'Using "would" for present habits → use "used to" or present simple'
        ],
        tips: [
          'More polite than "will" or "can"',
          '"Would like" = polite way to say "want"',
          '"Would rather" = preference: "I would rather stay home."',
          '"Would" is also used in second conditional and past habits'
        ]
      },
      {
        id: 'need-to-necessity',
        title: 'Need to / Need (Necessity)',
        level: 'A2',
        explanation: 'Used to express necessity. "Need to" is followed by a verb, "need" can be followed by a noun.',
        formula: 'Subject + need to + base verb / Subject + need + noun',
        examples: [
          'I need to buy some milk.',
          'You need to see a doctor.',
          'Do you need any help?',
          'She doesn\'t need to work on weekends.'
        ],
        commonMistakes: [
          '❌ "I need buy milk." → ✅ "I need to buy milk." (need "to" before verb)',
          '❌ "I needn\'t to go." → ✅ "I don\'t need to go." (use "don\'t need to")'
        ],
        tips: [
          '"Need to" + verb, "need" + noun',
          '"Needn\'t" is possible but formal: "You needn\'t worry."',
          '"Don\'t need to" = no necessity (more common than "needn\'t")',
          'Can be used in all tenses: "I needed to go", "I will need to go"'
        ]
      },
      {
        id: 'must-might-deduction',
        title: 'Must / Can\'t / Might (Deduction)',
        level: 'B1',
        explanation: 'Used to make deductions about present situations based on evidence.',
        formula: 'Subject + must/can\'t/might + base verb',
        examples: [
          'He must be tired. He\'s been working all day. (90% certain)',
          'She can\'t be at home. Her car isn\'t here. (90% certain it\'s impossible)',
          'They might be lost. They look confused. (50% possible)',
          'It must be late. I\'m hungry.'
        ],
        commonMistakes: [
          '❌ "He must is tired." → ✅ "He must be tired." (base verb)',
          'Using "must" for obligation when you mean deduction'
        ],
        tips: [
          '"Must" = almost certain (90%)',
          '"Can\'t" = almost certain impossible (90%)',
          '"Might/may/could" = possible (50%)',
          'For past deduction: "must/can\'t/might + have + past participle": "He must have forgotten."'
        ]
      },
      {
        id: 'modals-past',
        title: 'Modal Verbs in the Past',
        level: 'B1',
        explanation: 'Using modals to talk about past actions: should have, could have, must have, etc.',
        formula: 'Subject + modal + have + past participle',
        examples: [
          'You should have called me. (past advice/criticism)',
          'I could have won if I had tried. (past possibility)',
          'She must have been tired. (past deduction)',
          'They might have forgotten. (past possibility)'
        ],
        commonMistakes: [
          '❌ "You should called me." → ✅ "You should have called me."',
          '❌ "I could to have gone." → ✅ "I could have gone." (no "to")',
          'Forgetting "have" in the structure'
        ],
        tips: [
          '"Should have" = criticism/regret about the past',
          '"Could have" = past possibility that didn\'t happen',
          '"Must have" = deduction about the past (almost certain)',
          '"Might/may have" = possibility about the past',
          '"Needn\'t have" = did something that wasn\'t necessary'
        ]
      }
    ]
  },
  // ===== ARTICLES =====
  {
    id: 'articles',
    title: 'Articles',
    icon: '📄',
    description: 'A, An, The, and Zero Article',
    level: 'A1-B2',
    ruleCount: 4,
    rules: [
      {
        id: 'indefinite-articles',
        title: 'A / An (Indefinite Articles)',
        level: 'A1',
        explanation: 'Used with singular countable nouns when mentioning something for the first time or when it\'s not specific.',
        formula: 'A + consonant sound / An + vowel sound',
        examples: [
          'I saw a dog in the park.',
          'She is an engineer.',
          'I need a university degree. (pronounced "yoo-niversity")',
          'He\'s an honest person. (silent "h")'
        ],
        commonMistakes: [
          '❌ "An university" → ✅ "A university" (sound, not letter)',
          '❌ "A hour" → ✅ "An hour" (silent "h")',
          'Using with plural or uncountable nouns: ❌ "a waters" → ✅ "some water"'
        ],
        tips: [
          'Choose based on SOUND, not spelling: "a university" (yoo-), "an hour" (our-)',
          'Use for first mention: "I saw a cat. The cat was black."',
          'Use for jobs: "She is a teacher."',
          'Use for "one of many": "I need a pen" (any pen)'
        ]
      },
      {
        id: 'definite-article',
        title: 'The (Definite Article)',
        level: 'A1',
        explanation: 'Used when both speaker and listener know which specific thing is being referred to.',
        formula: 'The + noun (singular, plural, countable, uncountable)',
        examples: [
          'The book on the table is mine. (specific book)',
          'I love the music of the Beatles. (specific music)',
          'The children are playing outside. (my children)',
          'She lives in the United States. (unique names)'
        ],
        commonMistakes: [
          '❌ "The people are friendly." (general) → ✅ "People are friendly."',
          '❌ "I love the chocolate." (general) → ✅ "I love chocolate."',
          'Using "the" with proper nouns: ❌ "the London" → ✅ "London"'
        ],
        tips: [
          'Use when something is unique: "the sun", "the moon", "the internet"',
          'Use with superlatives: "the best", "the most expensive"',
          'Use with ordinals: "the first", "the second"',
          'Use for things already mentioned: "I saw a dog. The dog was big."',
          'Use with musical instruments: "I play the piano."'
        ]
      },
      {
        id: 'zero-article',
        title: 'Zero Article (No Article)',
        level: 'A2',
        explanation: 'No article is used with plural/uncountable nouns in general, proper nouns, and certain expressions.',
        formula: 'No article + plural/uncountable noun (general)',
        examples: [
          'Dogs are friendly animals. (dogs in general)',
          'I love music. (music in general)',
          'She lives in Paris. (cities)',
          'I go to work by car. (transport)'
        ],
        commonMistakes: [
          '❌ "The dogs are friendly." (general) → ✅ "Dogs are friendly."',
          '❌ "The life is beautiful." → ✅ "Life is beautiful."',
          '❌ "I go to the school." (regular activity) → ✅ "I go to school."'
        ],
        tips: [
          'No article for general plural/uncountable nouns',
          'No article with: meals (breakfast, lunch, dinner)',
          'No article with: school, work, home, bed (when talking about purpose)',
          'No article with: countries (most), cities, streets, lakes, mountains (most)',
          'No article with: sports, subjects, languages'
        ]
      },
      {
        id: 'articles-geographical',
        title: 'Articles with Geographical Names',
        level: 'B1',
        explanation: 'Specific rules for using articles with countries, cities, rivers, mountains, etc.',
        formula: 'Depends on the type of geographical name',
        examples: [
          'I live in France. (most countries: no article)',
          'She visited the United States. (plural countries: the)',
          'They climbed Mount Everest. (single mountains: no article)',
          'The Alps are beautiful. (mountain ranges: the)'
        ],
        commonMistakes: [
          '❌ "The France" → ✅ "France"',
          '❌ "United States" → ✅ "The United States"',
          '❌ "Amazon river" → ✅ "The Amazon" or "The Amazon River"'
        ],
        tips: [
          'No article: most countries, cities, single mountains, lakes',
          'Use "the": countries with "States/Kingdom/Republic", plural countries, rivers, seas, oceans, mountain ranges, deserts',
          'Exceptions: "the Netherlands", "the Philippines", "the Czech Republic"',
          'Use "the" with: the North, the South, the East, the West (regions)'
        ]
      }
    ]
  },
  
  // ===== PREPOSITIONS =====
  {
    id: 'prepositions-time',
    title: 'Prepositions of Time',
    icon: '⏰',
    description: 'In, On, At for time expressions',
    level: 'A1',
    ruleCount: 3,
    rules: [
      {
        id: 'at-time',
        title: 'AT (Specific Times)',
        level: 'A1',
        explanation: 'Used for specific times of day, mealtimes, and festivals.',
        formula: 'at + time/meal/festival',
        examples: [
          'at 3 o\'clock',
          'at noon / at midnight',
          'at the weekend (UK) / on the weekend (US)',
          'at Christmas / at Easter'
        ],
        tips: [
          'Use "at" for precise times',
          'Exception: "at night" (not "in night")',
          'UK: "at the weekend" / US: "on the weekend"'
        ]
      },
      {
        id: 'on-time',
        title: 'ON (Days & Dates)',
        level: 'A1',
        explanation: 'Used for days of the week, dates, and specific days.',
        formula: 'on + day/date',
        examples: [
          'on Monday',
          'on my birthday',
          'on July 4th',
          'on Christmas Day'
        ],
        tips: [
          'Use "on" for specific days',
          'Use "on" with dates: "on March 15th"',
          'Use "on" with "morning/afternoon/evening" when specified: "on Tuesday morning"'
        ]
      },
      {
        id: 'in-time',
        title: 'IN (Longer Periods)',
        level: 'A1',
        explanation: 'Used for months, years, seasons, centuries, and parts of the day.',
        formula: 'in + month/year/season/century/part of day',
        examples: [
          'in January',
          'in 2024',
          'in summer',
          'in the morning / in the afternoon / in the evening'
        ],
        tips: [
          'Use "in" for longer time periods',
          'Use "in" for centuries: "in the 21st century"',
          'Exception: "at night" (not "in the night" for general time)'
        ]
      }
    ]
  },
  {
    id: 'prepositions-place',
    title: 'Prepositions of Place',
    icon: '📍',
    description: 'In, On, At for locations',
    level: 'A1',
    ruleCount: 3,
    rules: [
      {
        id: 'at-place',
        title: 'AT (Specific Points)',
        level: 'A1',
        explanation: 'Used for specific points, addresses, and events.',
        formula: 'at + specific point/address/event',
        examples: [
          'at the bus stop',
          'at 123 Main Street',
          'at the party',
          'at work / at school / at home'
        ],
        tips: [
          'Use "at" for specific points or locations',
          'Use "at" for events: "at a concert", "at a meeting"',
          'Use "at" with buildings when thinking of them as points: "at the cinema"'
        ]
      },
      {
        id: 'on-place',
        title: 'ON (Surfaces & Lines)',
        level: 'A1',
        explanation: 'Used for surfaces, floors, streets, and public transport.',
        formula: 'on + surface/floor/street/transport',
        examples: [
          'on the table',
          'on the first floor',
          'on Main Street',
          'on the bus / on the train / on a plane'
        ],
        tips: [
          'Use "on" for surfaces',
          'Use "on" for public transport (but "in a car/taxi")',
          'Use "on" for floors: "on the second floor"',
          'Use "on" for streets without numbers: "on Oxford Street"'
        ]
      },
      {
        id: 'in-place',
        title: 'IN (Enclosed Spaces)',
        level: 'A1',
        explanation: 'Used for enclosed spaces, cities, countries, and buildings.',
        formula: 'in + enclosed space/city/country/building',
        examples: [
          'in the room',
          'in London',
          'in France',
          'in the car / in a taxi'
        ],
        tips: [
          'Use "in" for enclosed spaces',
          'Use "in" for cities, countries, continents',
          'Use "in" for private transport: "in a car", "in a taxi"',
          'Use "in" for buildings when inside: "in the library"'
        ]
      }
    ]
  },
  // ===== PASSIVE VOICE =====
  {
    id: 'passive-present',
    title: 'Passive Voice - Present',
    icon: '🔄',
    description: 'Present Simple and Present Continuous Passive',
    level: 'B1',
    ruleCount: 2,
    rules: [
      {
        id: 'present-simple-passive',
        title: 'Present Simple Passive',
        level: 'B1',
        explanation: 'Used when the action is more important than who does it, or when the doer is unknown.',
        formula: 'Subject + am/is/are + past participle',
        examples: [
          'English is spoken here.',
          'The rooms are cleaned every day.',
          'Cars are made in Japan.',
          'This book is written by a famous author.'
        ],
        tips: [
          'Use when the doer is unknown or unimportant',
          'Use for general truths and facts',
          'Common in formal writing and news reports',
          'Can add "by + agent" if needed: "The book is written by Rowling."'
        ]
      },
      {
        id: 'present-continuous-passive',
        title: 'Present Continuous Passive',
        level: 'B1',
        explanation: 'Used for actions happening now in passive form.',
        formula: 'Subject + am/is/are + being + past participle',
        examples: [
          'The house is being painted.',
          'New roads are being built.',
          'My car is being repaired at the moment.',
          'The project is being developed by our team.'
        ],
        tips: [
          'Use for actions in progress now',
          'The "being" shows it\'s continuous',
          'Often used for temporary situations',
          'Common for describing ongoing work or changes'
        ]
      }
    ]
  },
  {
    id: 'passive-past',
    title: 'Passive Voice - Past',
    icon: '🔄',
    description: 'Past Simple and Past Perfect Passive',
    level: 'B1',
    ruleCount: 2,
    rules: [
      {
        id: 'past-simple-passive',
        title: 'Past Simple Passive',
        level: 'B1',
        explanation: 'Used for completed past actions in passive form.',
        formula: 'Subject + was/were + past participle',
        examples: [
          'The letter was sent yesterday.',
          'The pyramids were built thousands of years ago.',
          'My bike was stolen last week.',
          'The decision was made by the manager.'
        ],
        tips: [
          'Use for completed past actions',
          'Use when the doer is unknown or unimportant',
          'Common in news reports and historical texts',
          'Can add "by + agent" if needed'
        ]
      },
      {
        id: 'past-perfect-passive',
        title: 'Past Perfect Passive',
        level: 'B2',
        explanation: 'Used for actions completed before another past action.',
        formula: 'Subject + had + been + past participle',
        examples: [
          'The work had been finished before I arrived.',
          'The house had been sold by the time we saw it.',
          'The documents had been prepared before the meeting.',
          'The problem had been solved before the deadline.'
        ],
        tips: [
          'Use for actions completed before another past action',
          'Shows the sequence of past events',
          'Common in narratives and reports',
          'Emphasizes completion before a past moment'
        ]
      }
    ]
  },
  // ===== REPORTED SPEECH =====
  {
    id: 'reported-statements',
    title: 'Reported Statements',
    icon: '💬',
    description: 'Reporting what someone said',
    level: 'B1',
    ruleCount: 2,
    rules: [
      {
        id: 'reporting-statements',
        title: 'Reporting Statements',
        level: 'B1',
        explanation: 'When we report what someone said, we usually change the tense back one step.',
        formula: 'Subject + said (that) + reported clause',
        examples: [
          'Direct: "I am tired." → Reported: He said (that) he was tired.',
          'Direct: "I like coffee." → Reported: She said (that) she liked coffee.',
          'Direct: "I will help you." → Reported: He said (that) he would help me.',
          'Direct: "I have finished." → Reported: She said (that) she had finished.'
        ],
        tips: [
          'Change present → past',
          'Change past → past perfect',
          'Change will → would',
          'Change pronouns: I → he/she, you → I/me, etc.',
          '"That" is optional in reported speech'
        ]
      },
      {
        id: 'reporting-questions',
        title: 'Reporting Questions',
        level: 'B1',
        explanation: 'When reporting questions, we use statement word order (not question order).',
        formula: 'Subject + asked + (if/wh-word) + subject + verb',
        examples: [
          'Direct: "Where do you live?" → Reported: He asked where I lived.',
          'Direct: "Are you happy?" → Reported: She asked if I was happy.',
          'Direct: "What time is it?" → Reported: He asked what time it was.',
          'Direct: "Can you help me?" → Reported: She asked if I could help her.'
        ],
        tips: [
          'Use "if" or "whether" for yes/no questions',
          'Use wh-words (what, where, when, why, how) for information questions',
          'Change to statement word order: subject + verb (not verb + subject)',
          'Don\'t use "do/does/did" in reported questions',
          'Change tenses back one step as with statements'
        ]
      }
    ]
  },
  // ===== RELATIVE CLAUSES =====
  {
    id: 'defining-relative',
    title: 'Defining Relative Clauses',
    icon: '🔗',
    description: 'Clauses that define which person/thing we\'re talking about',
    level: 'B1',
    ruleCount: 2,
    rules: [
      {
        id: 'defining-who-which-that',
        title: 'Who / Which / That',
        level: 'B1',
        explanation: 'Used to give essential information about a person or thing. Cannot be removed without changing the meaning.',
        formula: 'Noun + who/which/that + clause',
        examples: [
          'The woman who lives next door is a doctor.',
          'The book which I read was interesting.',
          'The car that he bought is very fast.',
          'People who exercise regularly are healthier.'
        ],
        tips: [
          'Use "who" for people',
          'Use "which" for things',
          'Use "that" for people or things (more informal)',
          'These clauses are essential - don\'t use commas',
          'Can omit "who/which/that" when it\'s the object: "The book (that) I read"'
        ]
      },
      {
        id: 'defining-whose-where',
        title: 'Whose / Where',
        level: 'B1',
        explanation: 'Used to show possession or place in defining clauses.',
        formula: 'Noun + whose + noun + clause / Noun + where + clause',
        examples: [
          'The man whose car was stolen called the police.',
          'That\'s the girl whose brother is famous.',
          'This is the house where I grew up.',
          'I know a restaurant where they serve great pizza.'
        ],
        tips: [
          'Use "whose" to show possession (whose car, whose brother)',
          'Use "where" for places',
          'These are defining clauses - no commas',
          '"Whose" can be used for people and things'
        ]
      }
    ]
  },
  {
    id: 'non-defining-relative',
    title: 'Non-Defining Relative Clauses',
    icon: '🔗',
    description: 'Clauses that add extra information (not essential)',
    level: 'B2',
    ruleCount: 2,
    rules: [
      {
        id: 'non-defining-commas',
        title: 'Using Commas',
        level: 'B2',
        explanation: 'Non-defining clauses add extra information and are separated by commas. They can be removed without changing the main meaning.',
        formula: 'Noun, + who/which + clause, + rest of sentence',
        examples: [
          'My mother, who is a teacher, lives in London.',
          'Paris, which is the capital of France, is beautiful.',
          'John, who I met yesterday, is very friendly.',
          'The Eiffel Tower, which was built in 1889, is famous.'
        ],
        tips: [
          'Always use commas before and after the clause',
          'Cannot use "that" in non-defining clauses',
          'The information is extra, not essential',
          'Used with proper nouns (names) and unique things',
          'The sentence still makes sense without the clause'
        ]
      },
      {
        id: 'non-defining-whose-where',
        title: 'Whose / Where in Non-Defining',
        level: 'B2',
        explanation: 'Using whose and where in non-defining relative clauses.',
        formula: 'Noun, + whose/where + clause, + rest of sentence',
        examples: [
          'Sarah, whose father is a pilot, wants to be a doctor.',
          'London, where I was born, is a big city.',
          'The museum, whose collection is impressive, is worth visiting.',
          'Japan, where I lived for two years, has amazing food.'
        ],
        tips: [
          'Use commas before and after',
          '"Whose" shows possession',
          '"Where" refers to places',
          'The clause adds extra information',
          'Cannot be replaced with "that"'
        ]
      }
    ]
  },
  // ===== GERUNDS & INFINITIVES =====
  {
    id: 'verbs-gerund',
    title: 'Verbs + Gerund (-ing)',
    icon: '🔤',
    description: 'Verbs followed by -ing form',
    level: 'B1',
    ruleCount: 2,
    rules: [
      {
        id: 'verbs-enjoy-avoid',
        title: 'Common Verbs + -ing',
        level: 'B1',
        explanation: 'Some verbs are always followed by the -ing form (gerund).',
        formula: 'Verb + -ing',
        examples: [
          'I enjoy swimming.',
          'She avoids eating junk food.',
          'They finished doing the project.',
          'He suggested going to the cinema.'
        ],
        tips: [
          'Common verbs: enjoy, avoid, finish, suggest, consider, mind, practice, imagine, deny, risk',
          'Also: keep, can\'t stand, can\'t help, feel like',
          'These verbs CANNOT be followed by "to + infinitive"',
          '❌ "I enjoy to swim" → ✅ "I enjoy swimming"'
        ]
      },
      {
        id: 'prepositions-gerund',
        title: 'Prepositions + -ing',
        level: 'B1',
        explanation: 'After prepositions, we always use the -ing form.',
        formula: 'Preposition + -ing',
        examples: [
          'I\'m interested in learning Spanish.',
          'She\'s good at playing tennis.',
          'Thank you for helping me.',
          'He\'s afraid of flying.'
        ],
        tips: [
          'Always use -ing after prepositions',
          'Common prepositions: in, at, for, of, about, without, before, after',
          '❌ "I\'m interested in to learn" → ✅ "I\'m interested in learning"',
          'Also after expressions: "look forward to + -ing", "be used to + -ing"'
        ]
      }
    ]
  },
  {
    id: 'verbs-infinitive',
    title: 'Verbs + Infinitive (to)',
    icon: '🔤',
    description: 'Verbs followed by to + base form',
    level: 'B1',
    ruleCount: 2,
    rules: [
      {
        id: 'verbs-want-decide',
        title: 'Common Verbs + to',
        level: 'B1',
        explanation: 'Some verbs are always followed by "to + infinitive".',
        formula: 'Verb + to + base verb',
        examples: [
          'I want to travel.',
          'She decided to study abroad.',
          'They promised to help us.',
          'He hopes to get the job.'
        ],
        tips: [
          'Common verbs: want, decide, promise, hope, plan, expect, agree, refuse, learn, offer',
          'Also: would like, would love, would prefer',
          'These verbs CANNOT be followed by -ing',
          '❌ "I want traveling" → ✅ "I want to travel"'
        ]
      },
      {
        id: 'verbs-both',
        title: 'Verbs + -ing OR to (same meaning)',
        level: 'B2',
        explanation: 'Some verbs can be followed by either -ing or to + infinitive with no change in meaning.',
        formula: 'Verb + -ing OR Verb + to + base verb',
        examples: [
          'I like swimming. = I like to swim.',
          'She loves reading. = She loves to read.',
          'They started working. = They started to work.',
          'It began raining. = It began to rain.'
        ],
        tips: [
          'Common verbs: like, love, hate, prefer, start, begin, continue, intend',
          'Both forms are correct with these verbs',
          '-ing is more common in British English',
          'to + infinitive is more common in American English',
          'No difference in meaning'
        ]
      }
    ]
  },
  // ===== COMPARATIVES & SUPERLATIVES =====
  {
    id: 'comparatives',
    title: 'Comparatives',
    icon: '📊',
    description: 'Comparing two things',
    level: 'A1',
    ruleCount: 2,
    rules: [
      {
        id: 'short-adjectives-comparative',
        title: 'Short Adjectives (1-2 syllables)',
        level: 'A1',
        explanation: 'For short adjectives, add -er (or -ier if ending in -y).',
        formula: 'Adjective + -er + than',
        examples: [
          'tall → taller than',
          'big → bigger than (double consonant)',
          'happy → happier than (change y to i)',
          'fast → faster than'
        ],
        tips: [
          'Add -er for most short adjectives',
          'Double the final consonant if: CVC pattern (big → bigger)',
          'Change -y to -i and add -er (happy → happier)',
          'Always use "than" after the comparative',
          '❌ "taller that" → ✅ "taller than"'
        ]
      },
      {
        id: 'long-adjectives-comparative',
        title: 'Long Adjectives (3+ syllables)',
        level: 'A1',
        explanation: 'For long adjectives, use "more" before the adjective.',
        formula: 'more + adjective + than',
        examples: [
          'beautiful → more beautiful than',
          'interesting → more interesting than',
          'expensive → more expensive than',
          'comfortable → more comfortable than'
        ],
        tips: [
          'Use "more" for adjectives with 3+ syllables',
          'Don\'t add -er to long adjectives',
          '❌ "beautifuler" → ✅ "more beautiful"',
          'Some 2-syllable adjectives can use either: "cleverer" or "more clever"',
          'Always use "than" after the comparative'
        ]
      }
    ]
  },
  {
    id: 'superlatives',
    title: 'Superlatives',
    icon: '📊',
    description: 'Comparing three or more things',
    level: 'A1',
    ruleCount: 2,
    rules: [
      {
        id: 'short-adjectives-superlative',
        title: 'Short Adjectives (1-2 syllables)',
        level: 'A1',
        explanation: 'For short adjectives, add -est (or -iest if ending in -y).',
        formula: 'the + adjective + -est',
        examples: [
          'tall → the tallest',
          'big → the biggest (double consonant)',
          'happy → the happiest (change y to i)',
          'fast → the fastest'
        ],
        tips: [
          'Always use "the" before superlatives',
          'Add -est for most short adjectives',
          'Double the final consonant if: CVC pattern',
          'Change -y to -i and add -est',
          'Used when comparing 3+ things or saying something is #1'
        ]
      },
      {
        id: 'long-adjectives-superlative',
        title: 'Long Adjectives (3+ syllables)',
        level: 'A1',
        explanation: 'For long adjectives, use "the most" before the adjective.',
        formula: 'the most + adjective',
        examples: [
          'beautiful → the most beautiful',
          'interesting → the most interesting',
          'expensive → the most expensive',
          'comfortable → the most comfortable'
        ],
        tips: [
          'Use "the most" for adjectives with 3+ syllables',
          'Always use "the" before superlatives',
          'Don\'t add -est to long adjectives',
          '❌ "the beautifulest" → ✅ "the most beautiful"',
          'Some 2-syllable adjectives can use either: "the cleverest" or "the most clever"'
        ]
      }
    ]
  },
  // ===== QUANTIFIERS =====
  {
    id: 'some-any',
    title: 'Some / Any',
    icon: '🔢',
    description: 'Using some and any with countable and uncountable nouns',
    level: 'A1',
    ruleCount: 2,
    rules: [
      {
        id: 'some-usage',
        title: 'Using SOME',
        level: 'A1',
        explanation: 'Use "some" in positive sentences and offers/requests.',
        formula: 'some + plural countable / uncountable noun',
        examples: [
          'I have some friends in London. (positive)',
          'Would you like some coffee? (offer)',
          'Can I have some water? (request)',
          'There are some books on the table. (positive)'
        ],
        tips: [
          'Use in positive sentences',
          'Use in offers: "Would you like some...?"',
          'Use in requests: "Can I have some...?"',
          '❌ "I don\'t have some money" → ✅ "I don\'t have any money"',
          'Can be used with both countable and uncountable nouns'
        ]
      },
      {
        id: 'any-usage',
        title: 'Using ANY',
        level: 'A1',
        explanation: 'Use "any" in negative sentences and questions.',
        formula: 'any + plural countable / uncountable noun',
        examples: [
          'I don\'t have any money. (negative)',
          'Do you have any brothers or sisters? (question)',
          'There aren\'t any eggs left. (negative)',
          'Is there any milk in the fridge? (question)'
        ],
        tips: [
          'Use in negative sentences',
          'Use in questions',
          '❌ "I have any friends" → ✅ "I have some friends"',
          'Can be used with both countable and uncountable nouns',
          'Exception: "any" in positive sentences means "it doesn\'t matter which": "Any student can answer"'
        ]
      }
    ]
  },
  {
    id: 'much-many',
    title: 'Much / Many / A lot of',
    icon: '🔢',
    description: 'Quantifiers for large quantities',
    level: 'A2',
    ruleCount: 3,
    rules: [
      {
        id: 'much-uncountable',
        title: 'MUCH (Uncountable)',
        level: 'A2',
        explanation: 'Use "much" with uncountable nouns, mainly in questions and negatives.',
        formula: 'much + uncountable noun',
        examples: [
          'How much money do you have?',
          'I don\'t have much time.',
          'There isn\'t much traffic today.',
          'Did you spend much money?'
        ],
        tips: [
          'Only with uncountable nouns',
          'Mainly in questions and negatives',
          '❌ "I have much friends" → ✅ "I have many friends"',
          'In positive sentences, use "a lot of" instead: "I have a lot of time"',
          'Common in questions: "How much...?"'
        ]
      },
      {
        id: 'many-countable',
        title: 'MANY (Countable)',
        level: 'A2',
        explanation: 'Use "many" with plural countable nouns, mainly in questions and negatives.',
        formula: 'many + plural countable noun',
        examples: [
          'How many brothers do you have?',
          'I don\'t have many friends here.',
          'There aren\'t many cars on the road.',
          'Did you take many photos?'
        ],
        tips: [
          'Only with plural countable nouns',
          'Mainly in questions and negatives',
          '❌ "I have many money" → ✅ "I have much money"',
          'In positive sentences, use "a lot of": "I have a lot of friends"',
          'Common in questions: "How many...?"'
        ]
      },
      {
        id: 'a-lot-of',
        title: 'A LOT OF (Both)',
        level: 'A2',
        explanation: 'Use "a lot of" with both countable and uncountable nouns, especially in positive sentences.',
        formula: 'a lot of + noun',
        examples: [
          'I have a lot of friends. (countable)',
          'She has a lot of money. (uncountable)',
          'There are a lot of cars here.',
          'We spent a lot of time on this.'
        ],
        tips: [
          'Can be used with both countable and uncountable nouns',
          'Common in positive sentences',
          'More informal than "much/many"',
          'Can be used in questions and negatives too',
          'Also: "lots of" (same meaning, more informal)'
        ]
      }
    ]
  },
  // ===== QUESTION FORMS =====
  {
    id: 'yes-no-questions',
    title: 'Yes/No Questions',
    icon: '❓',
    description: 'Forming questions with auxiliary verbs',
    level: 'A1',
    ruleCount: 2,
    rules: [
      {
        id: 'auxiliary-questions',
        title: 'Using Auxiliary Verbs',
        level: 'A1',
        explanation: 'Most questions use auxiliary verbs (do/does/did, am/is/are, have/has, can, will, etc.)',
        formula: 'Auxiliary + subject + main verb?',
        examples: [
          'Do you like coffee?',
          'Does she work here?',
          'Are they coming?',
          'Can you help me?'
        ],
        tips: [
          'Use "do/does" for present simple',
          'Use "did" for past simple',
          'Use "am/is/are" for present continuous',
          'Use modals directly: "Can you...?", "Will you...?"',
          'Word order: Auxiliary + Subject + Verb'
        ]
      },
      {
        id: 'be-questions',
        title: 'Questions with BE',
        level: 'A1',
        explanation: 'With the verb "be", we don\'t use "do/does/did" - just invert subject and be.',
        formula: 'Am/Is/Are/Was/Were + subject?',
        examples: [
          'Are you a student?',
          'Is she happy?',
          'Were they at home?',
          'Am I late?'
        ],
        tips: [
          'Don\'t use "do/does/did" with "be"',
          'Just invert: "You are" → "Are you?"',
          'Works for all tenses of "be"',
          '❌ "Do you be happy?" → ✅ "Are you happy?"',
          'Same for past: "Were you there?"'
        ]
      }
    ]
  },
  {
    id: 'wh-questions',
    title: 'Wh- Questions',
    icon: '❓',
    description: 'Questions with what, where, when, why, who, how',
    level: 'A1',
    ruleCount: 2,
    rules: [
      {
        id: 'wh-question-words',
        title: 'Question Words',
        level: 'A1',
        explanation: 'Wh- words are used to ask for specific information.',
        formula: 'Wh- word + auxiliary + subject + verb?',
        examples: [
          'What do you do? (job)',
          'Where do you live? (place)',
          'When did you arrive? (time)',
          'Why are you late? (reason)'
        ],
        tips: [
          'What = thing/action',
          'Where = place',
          'When = time',
          'Why = reason',
          'Who = person',
          'How = manner/method',
          'Which = choice'
        ]
      },
      {
        id: 'wh-subject-questions',
        title: 'Subject Questions',
        level: 'A2',
        explanation: 'When "who" or "what" is the subject, we don\'t use an auxiliary verb.',
        formula: 'Who/What + verb + object?',
        examples: [
          'Who called you? (not "Who did call you?")',
          'What happened? (not "What did happen?")',
          'Who lives here?',
          'What caused the accident?'
        ],
        tips: [
          'Use when asking about the subject (who/what did the action)',
          'No auxiliary verb needed',
          'Word order is the same as a statement',
          'Compare: "Who called you?" (subject) vs. "Who did you call?" (object)',
          'The verb agrees with "who/what" as third person singular'
        ]
      }
    ]
  },
  // ===== CONJUNCTIONS =====
  {
    id: 'coordinating-conjunctions',
    title: 'Coordinating Conjunctions',
    icon: '🔌',
    description: 'And, But, Or, So, Yet, For, Nor (FANBOYS)',
    level: 'A2',
    ruleCount: 2,
    rules: [
      {
        id: 'and-but-or',
        title: 'And / But / Or',
        level: 'A2',
        explanation: 'Basic conjunctions to connect words, phrases, or clauses.',
        formula: 'Clause + and/but/or + clause',
        examples: [
          'I like coffee and tea. (addition)',
          'She\'s tired but happy. (contrast)',
          'Do you want coffee or tea? (choice)',
          'I studied hard, so I passed. (result)'
        ],
        tips: [
          '"And" = addition',
          '"But" = contrast',
          '"Or" = choice/alternative',
          '"So" = result/consequence',
          'Can connect words, phrases, or full clauses'
        ]
      },
      {
        id: 'so-yet-for',
        title: 'So / Yet / For',
        level: 'B1',
        explanation: 'More conjunctions for result, contrast, and reason.',
        formula: 'Clause + so/yet/for + clause',
        examples: [
          'It was raining, so we stayed home. (result)',
          'He\'s rich, yet he\'s not happy. (contrast - surprising)',
          'I went to bed, for I was tired. (reason - formal)',
          'She was tired, yet she continued working.'
        ],
        tips: [
          '"So" = result (informal, common)',
          '"Yet" = contrast (surprising, like "but")',
          '"For" = reason (formal, literary)',
          '"Yet" is more formal than "but"',
          '"For" as a conjunction is rare in modern English'
        ]
      }
    ]
  },
  {
    id: 'subordinating-conjunctions',
    title: 'Subordinating Conjunctions',
    icon: '🔌',
    description: 'Because, Although, While, If, When, etc.',
    level: 'B1',
    ruleCount: 3,
    rules: [
      {
        id: 'because-since-as',
        title: 'Because / Since / As (Reason)',
        level: 'B1',
        explanation: 'Used to give reasons or causes.',
        formula: 'Because/Since/As + clause',
        examples: [
          'I stayed home because it was raining.',
          'Since you\'re here, let\'s start.',
          'As I was tired, I went to bed early.',
          'Because he studied hard, he passed.'
        ],
        tips: [
          '"Because" = most common, neutral',
          '"Since" = slightly more formal',
          '"As" = formal, often at beginning',
          'All three mean the same thing',
          'Can start or middle of sentence'
        ]
      },
      {
        id: 'although-though',
        title: 'Although / Though (Contrast)',
        level: 'B1',
        explanation: 'Used to show contrast or unexpected results.',
        formula: 'Although/Though + clause',
        examples: [
          'Although it was raining, we went out.',
          'Though she was tired, she finished the work.',
          'Although he\'s young, he\'s very smart.',
          'I liked it, though it was expensive.'
        ],
        tips: [
          '"Although" = more formal',
          '"Though" = more informal',
          'Shows contrast or surprise',
          'Similar to "but" but starts a dependent clause',
          '❌ "Although... but..." → ✅ "Although..." OR "...but..."'
        ]
      },
      {
        id: 'while-when',
        title: 'While / When (Time)',
        level: 'B1',
        explanation: 'Used to talk about time and simultaneous actions.',
        formula: 'While/When + clause',
        examples: [
          'While I was cooking, the phone rang.',
          'When I arrived, she was leaving.',
          'While we were talking, it started to rain.',
          'I was reading when he called.'
        ],
        tips: [
          '"While" = during a period of time (continuous action)',
          '"When" = at a specific moment',
          '"While" often used with continuous tenses',
          '"When" can be used with any tense',
          'Both can start or be in the middle of a sentence'
        ]
      }
    ]
  },
  // ===== SUBJECT-VERB AGREEMENT =====
  {
    id: 'basic-agreement',
    title: 'Basic Subject-Verb Agreement',
    icon: '🤝',
    description: 'Matching singular/plural subjects with verbs',
    level: 'A1',
    ruleCount: 2,
    rules: [
      {
        id: 'singular-plural',
        title: 'Singular vs. Plural Subjects',
        level: 'A1',
        explanation: 'Singular subjects take singular verbs; plural subjects take plural verbs.',
        formula: 'Singular subject + singular verb / Plural subject + plural verb',
        examples: [
          'The dog barks. (singular)',
          'The dogs bark. (plural)',
          'She is happy. (singular)',
          'They are happy. (plural)'
        ],
        tips: [
          'Third person singular adds -s/-es in present simple',
          'Use "is/was" for singular, "are/were" for plural',
          'Use "has" for singular, "have" for plural',
          'Use "does" for singular, "do" for plural',
          'This is the most basic grammar rule!'
        ]
      },
      {
        id: 'compound-subjects',
        title: 'Compound Subjects with AND',
        level: 'A2',
        explanation: 'When two subjects are joined by "and", use a plural verb.',
        formula: 'Subject + and + subject + plural verb',
        examples: [
          'Tom and Jerry are friends.',
          'My brother and I live together.',
          'The cat and the dog are playing.',
          'Reading and writing are important skills.'
        ],
        tips: [
          'Two subjects + "and" = plural verb',
          'Even if both subjects are singular',
          'Exception: when subjects form a single unit: "Bread and butter is my favorite"',
          'Same rule for "or" and "neither...nor" with plural subjects'
        ]
      }
    ]
  }
];

// Export all grammar categories
export const allGrammarCategories: GrammarCategory[] = grammarCategories;
