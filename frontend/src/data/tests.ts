export interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  questionCount: number;
  difficulty: string;
  xpReward: number;
  description: string;
  category: string;
  questions: TestQuestion[];
}

export const tests: Test[] = [
  {
    id: 'grammar-placement',
    title: 'Grammar Placement Quiz',
    questionCount: 20,
    difficulty: 'Mixed (A1-C1)',
    xpReward: 100,
    description: 'Test your grammar knowledge across all levels. This quiz covers tenses, conditionals, modals, articles, and more.',
    category: 'Grammar',
    questions: [
      // A1-A2 Level Questions
      {
        question: 'She _____ to school every day.',
        options: ['go', 'goes', 'going', 'gone'],
        correctAnswer: 1,
        explanation: 'Third person singular (she/he/it) requires -es ending in present simple.'
      },
      {
        question: 'I _____ a student.',
        options: ['is', 'am', 'are', 'be'],
        correctAnswer: 1,
        explanation: '"I" takes "am" as the verb "to be" in present simple.'
      },
      {
        question: 'There _____ many people at the party.',
        options: ['was', 'were', 'is', 'has'],
        correctAnswer: 1,
        explanation: '"Many people" is plural, so we use "were" in past tense.'
      },
      {
        question: 'He _____ TV when I called him.',
        options: ['watched', 'was watching', 'has watched', 'watches'],
        correctAnswer: 1,
        explanation: 'Past continuous (was watching) is used for an action in progress when another action happened.'
      },
      {
        question: 'I have _____ been to Paris.',
        options: ['ever', 'never', 'yet', 'already'],
        correctAnswer: 1,
        explanation: '"Never" is used with present perfect to mean "not at any time."'
      },
      // B1 Level Questions
      {
        question: 'If I _____ more money, I would buy a new car.',
        options: ['have', 'had', 'would have', 'will have'],
        correctAnswer: 1,
        explanation: 'Second conditional uses past simple in the if-clause for unreal present situations.'
      },
      {
        question: 'She asked me where _____.',
        options: ['did I live', 'I lived', 'do I live', 'I live'],
        correctAnswer: 1,
        explanation: 'In reported speech, we use statement word order (subject + verb), not question order.'
      },
      {
        question: 'The book _____ by millions of people.',
        options: ['has read', 'has been read', 'has been reading', 'have read'],
        correctAnswer: 1,
        explanation: 'Passive voice in present perfect: has/have + been + past participle.'
      },
      {
        question: 'I wish I _____ speak French fluently.',
        options: ['can', 'could', 'will', 'would'],
        correctAnswer: 1,
        explanation: '"I wish" + past simple/could is used for unreal present situations.'
      },
      {
        question: 'He\'s the man _____ car was stolen.',
        options: ['who', 'which', 'whose', 'that'],
        correctAnswer: 2,
        explanation: '"Whose" is the relative pronoun for possession.'
      },
      {
        question: 'By this time tomorrow, I _____ my exam.',
        options: ['will finish', 'will have finished', 'will be finishing', 'finish'],
        correctAnswer: 1,
        explanation: 'Future perfect (will have + past participle) is used for actions completed before a future time.'
      },
      {
        question: 'You _____ smoke in here. It\'s forbidden.',
        options: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'needn\'t'],
        correctAnswer: 0,
        explanation: '"Mustn\'t" expresses prohibition (it\'s not allowed).'
      },
      {
        question: 'She enjoys _____ tennis.',
        options: ['play', 'to play', 'playing', 'played'],
        correctAnswer: 2,
        explanation: '"Enjoy" is followed by gerund (-ing form).'
      },
      {
        question: 'I\'ll call you as soon as I _____.',
        options: ['will arrive', 'arrive', 'arrived', 'am arriving'],
        correctAnswer: 1,
        explanation: 'After "as soon as" for future time, we use present simple.'
      },
      // B2-C1 Level Questions
      {
        question: 'Had I known about the meeting, I _____ attended.',
        options: ['would have', 'will have', 'would', 'will'],
        correctAnswer: 0,
        explanation: 'Inverted third conditional: "Had I known" = "If I had known" → would have + past participle.'
      },
      {
        question: 'Not only _____ the exam, but she also got the highest score.',
        options: ['she passed', 'did she pass', 'she did pass', 'passed she'],
        correctAnswer: 1,
        explanation: 'After "Not only" at the start of a sentence, we use inversion (auxiliary + subject + verb).'
      },
      {
        question: 'The project, _____ was completed last week, was very successful.',
        options: ['that', 'which', 'what', 'who'],
        correctAnswer: 1,
        explanation: 'In non-defining relative clauses (with commas), we use "which" for things, not "that."'
      },
      {
        question: 'She suggested _____ to the cinema.',
        options: ['to go', 'going', 'go', 'went'],
        correctAnswer: 1,
        explanation: '"Suggest" is followed by gerund (-ing form).'
      },
      {
        question: '_____ having a headache, she went to the party.',
        options: ['Although', 'Despite', 'Even though', 'However'],
        correctAnswer: 1,
        explanation: '"Despite" is followed by a noun/gerund. "Although/Even though" are followed by a clause.'
      },
      {
        question: 'It\'s high time we _____ home.',
        options: ['go', 'went', 'have gone', 'will go'],
        correctAnswer: 1,
        explanation: '"It\'s high time" is followed by past simple to express that something should happen now.'
      }
    ]
  },
  {
    id: 'ielts-speaking',
    title: 'IELTS Speaking Preparation',
    questionCount: 15,
    difficulty: 'B2-C1',
    xpReward: 150,
    description: 'Practice common IELTS speaking topics and learn how to structure your answers effectively.',
    category: 'Speaking',
    questions: [
      {
        question: 'In IELTS Speaking Part 1, when asked "Do you work or study?", the best approach is to:',
        options: [
          'Give a one-word answer like "work"',
          'Give a short answer with 2-3 sentences of detail',
          'Speak for 2 minutes about your job',
          'Ask the examiner a question back'
        ],
        correctAnswer: 1,
        explanation: 'Part 1 requires short but developed answers (2-3 sentences) with relevant details.'
      },
      {
        question: 'Which phrase is best for expressing an opinion in IELTS Speaking?',
        options: [
          '"I think maybe possibly"',
          '"From my perspective, I believe that..."',
          '"The thing is, you know, like..."',
          '"In my opinion, I think maybe"'
        ],
        correctAnswer: 1,
        explanation: '"From my perspective, I believe that..." is clear, formal, and shows good language control.'
      },
      {
        question: 'For IELTS Speaking Part 2 (2-minute talk), you should:',
        options: [
          'Speak as fast as possible to cover more points',
          'Use the 1-minute preparation time to make notes',
          'Only talk about one point in detail',
          'Memorize a speech beforehand'
        ],
        correctAnswer: 1,
        explanation: 'Use preparation time wisely to organize your thoughts with brief notes.'
      },
      {
        question: 'Which is the best way to show lexical resource in IELTS Speaking?',
        options: [
          'Using the same words repeatedly',
          'Using only simple vocabulary',
          'Using a range of vocabulary with some less common words',
          'Using very difficult words incorrectly'
        ],
        correctAnswer: 2,
        explanation: 'Examiners look for vocabulary range and appropriate use of less common items.'
      },
      {
        question: 'When you don\'t understand a question in the speaking test, you should:',
        options: [
          'Guess and answer anyway',
          'Say nothing',
          'Politely ask the examiner to repeat or clarify',
          'Change the topic'
        ],
        correctAnswer: 2,
        explanation: 'It\'s perfectly acceptable to ask for clarification. This shows communication skills.'
      },
      {
        question: 'Which linking phrase best shows contrast?',
        options: [
          '"In addition"',
          '"On the other hand"',
          '"As a result"',
          '"For example"'
        ],
        correctAnswer: 1,
        explanation: '"On the other hand" introduces a contrasting viewpoint or idea.'
      },
      {
        question: 'In Part 3 (discussion), examiners expect you to:',
        options: [
          'Give only personal opinions',
          'Discuss abstract ideas and give reasons',
          'Talk about your family',
          'Give short answers'
        ],
        correctAnswer: 1,
        explanation: 'Part 3 requires discussion of abstract topics with justification and examples.'
      },
      {
        question: 'Which response shows the best grammatical range?',
        options: [
          '"I like music. Music is good."',
          '"Although I enjoy pop music, I\'ve been listening to more classical pieces lately."',
          '"I listen music every day."',
          '"Music good. I like."'
        ],
        correctAnswer: 1,
        explanation: 'This response uses a complex sentence with a subordinate clause and present perfect continuous.'
      },
      {
        question: 'To extend your answer in Speaking Part 1, you can:',
        options: [
          'Repeat the same information',
          'Give a reason, example, or personal detail',
          'Ask the examiner questions',
          'Change the subject'
        ],
        correctAnswer: 1,
        explanation: 'Extending with reasons, examples, or details shows fluency and coherence.'
      },
      {
        question: 'Which phrase is appropriate for buying time to think?',
        options: [
          '"Umm... err... like..."',
          '"That\'s an interesting question. Let me think about that..."',
          '"I don\'t know"',
          '"Next question please"'
        ],
        correctAnswer: 1,
        explanation: 'This phrase is natural, polite, and shows you\'re thinking seriously about the question.'
      },
      {
        question: 'For fluency, it\'s better to:',
        options: [
          'Speak very slowly with many pauses',
          'Speak at a natural pace with some hesitation',
          'Rush through answers as fast as possible',
          'Memorize and recite prepared answers'
        ],
        correctAnswer: 1,
        explanation: 'Natural pace with some hesitation is more authentic than rushing or speaking too slowly.'
      },
      {
        question: 'Which topic is NOT typically asked in IELTS Speaking Part 1?',
        options: [
          'Your hometown',
          'Your hobbies',
          'Your opinion on climate change',
          'Your work or studies'
        ],
        correctAnswer: 2,
        explanation: 'Part 1 covers familiar, personal topics. Abstract topics like climate change are for Part 3.'
      },
      {
        question: 'To show pronunciation skill, you should focus on:',
        options: [
          'Speaking with a perfect British accent',
          'Clear individual sounds, word stress, and intonation',
          'Speaking as fast as native speakers',
          'Using American pronunciation only'
        ],
        correctAnswer: 1,
        explanation: 'IELTS assesses clarity and intelligibility, not a specific accent.'
      },
      {
        question: 'When describing a past experience, which tense is most appropriate?',
        options: [
          'Present simple',
          'Past simple and past continuous',
          'Future tense',
          'Present perfect only'
        ],
        correctAnswer: 1,
        explanation: 'Past experiences require past tenses. Mix past simple and continuous for richer answers.'
      },
      {
        question: 'The best way to prepare for IELTS Speaking is to:',
        options: [
          'Memorize model answers',
          'Practice speaking regularly on various topics',
          'Only study grammar rules',
          'Learn difficult vocabulary lists'
        ],
        correctAnswer: 1,
        explanation: 'Regular practice on various topics builds fluency, confidence, and adaptability.'
      }
    ]
  },
  {
    id: 'vocab-challenge',
    title: 'Advanced Vocabulary Challenge',
    questionCount: 20,
    difficulty: 'B2-C1',
    xpReward: 120,
    description: 'Test your knowledge of advanced English vocabulary including academic words, collocations, and idiomatic expressions.',
    category: 'Vocabulary',
    questions: [
      {
        question: 'What does "ubiquitous" mean?',
        options: ['Rare and unusual', 'Present everywhere', 'Very dangerous', 'Extremely beautiful'],
        correctAnswer: 1,
        explanation: '"Ubiquitous" means present, appearing, or found everywhere.'
      },
      {
        question: 'Choose the correct collocation: "make a _____"',
        options: ['homework', 'research', 'decision', 'knowledge'],
        correctAnswer: 2,
        explanation: 'We say "make a decision" (not "do a decision"). "Do homework" and "do research" are correct.'
      },
      {
        question: 'What does the idiom "hit the nail on the head" mean?',
        options: ['To hurt yourself', 'To be exactly right', 'To work very hard', 'To fail completely'],
        correctAnswer: 1,
        explanation: 'This idiom means to describe exactly what is causing a situation or problem; to be exactly right.'
      },
      {
        question: 'Which word means "to make something less severe"?',
        options: ['Exacerbate', 'Mitigate', 'Aggravate', 'Intensify'],
        correctAnswer: 1,
        explanation: '"Mitigate" means to make something less severe, serious, or painful.'
      },
      {
        question: '"She has a _____ for languages" - what word fits best?',
        options: ['talent', 'knack', 'skill', 'All of the above work'],
        correctAnswer: 3,
        explanation: 'All three words can be used, though "knack" suggests a natural ability.'
      },
      {
        question: 'What does "pragmatic" mean?',
        options: ['Theoretical and abstract', 'Dealing with things sensibly and realistically', 'Extremely optimistic', 'Very pessimistic'],
        correctAnswer: 1,
        explanation: '"Pragmatic" means dealing with things in a practical, realistic way rather than following ideas or theories.'
      },
      {
        question: 'Choose the correct phrase: "I\'m looking forward _____ you."',
        options: ['to see', 'to seeing', 'seeing', 'for seeing'],
        correctAnswer: 1,
        explanation: '"Look forward to" is followed by a gerund (-ing form), not an infinitive.'
      },
      {
        question: 'What does "to beat around the bush" mean?',
        options: ['To exercise in nature', 'To avoid talking about what is important', 'To clean the garden', 'To win a competition'],
        correctAnswer: 1,
        explanation: 'This idiom means to avoid talking about what is important; to speak indirectly.'
      },
      {
        question: 'Which word means "brief and to the point"?',
        options: ['Verbose', 'Concise', 'Ambiguous', 'Redundant'],
        correctAnswer: 1,
        explanation: '"Concise" means giving a lot of information clearly and in a few words; brief but comprehensive.'
      },
      {
        question: '"The project was _____ due to lack of funding." Choose the best word:',
        options: ['abandoned', 'aborted', 'cancelled', 'All could work'],
        correctAnswer: 3,
        explanation: 'All three words could work in this context, though they have slightly different nuances.'
      },
      {
        question: 'What does "to burn the midnight oil" mean?',
        options: ['To waste resources', 'To work late into the night', 'To start a fire', 'To cook dinner'],
        correctAnswer: 1,
        explanation: 'This idiom means to study or work late into the night.'
      },
      {
        question: 'Which is the correct form?',
        options: ['I suggest that he goes', 'I suggest that he go', 'I suggest that he will go', 'I suggest he going'],
        correctAnswer: 1,
        explanation: 'After "suggest that," we use the subjunctive (base form) in formal English.'
      },
      {
        question: 'What does "ephemeral" mean?',
        options: ['Lasting forever', 'Lasting for a very short time', 'Very large', 'Extremely small'],
        correctAnswer: 1,
        explanation: '"Ephemeral" means lasting for a very short time; transient.'
      },
      {
        question: 'Choose the correct preposition: "She\'s good _____ mathematics."',
        options: ['in', 'at', 'on', 'with'],
        correctAnswer: 1,
        explanation: 'We say "good at" something (a skill or subject).'
      },
      {
        question: 'What does "to let the cat out of the bag" mean?',
        options: ['To release a pet', 'To reveal a secret', 'To make a mistake', 'To go shopping'],
        correctAnswer: 1,
        explanation: 'This idiom means to reveal a secret carelessly or by mistake.'
      },
      {
        question: 'Which word means "able to be trusted"?',
        options: ['Reliable', 'Reliant', 'Relative', 'Related'],
        correctAnswer: 0,
        explanation: '"Reliable" means consistently good in quality or performance; able to be trusted.'
      },
      {
        question: '"Despite _____ hard, he failed the exam." Choose the correct form:',
        options: ['studying', 'to study', 'he studied', 'study'],
        correctAnswer: 0,
        explanation: '"Despite" is followed by a noun or gerund (-ing form).'
      },
      {
        question: 'What does "a blessing in disguise" mean?',
        options: ['A religious ceremony', 'A good thing that seemed bad at first', 'A hidden treasure', 'A secret prayer'],
        correctAnswer: 1,
        explanation: 'This idiom means a good thing that seemed bad at first.'
      },
      {
        question: 'Which phrase means "to postpone"?',
        options: ['Call off', 'Put off', 'Take off', 'Get off'],
        correctAnswer: 1,
        explanation: '"Put off" means to postpone or delay something.'
      },
      {
        question: 'What does "meticulous" mean?',
        options: ['Careless and sloppy', 'Showing great attention to detail', 'Very fast', 'Extremely lazy'],
        correctAnswer: 1,
        explanation: '"Meticulous" means showing great attention to detail; very careful and precise.'
      }
    ]
  },
  {
    id: 'business-english',
    title: 'Business English Assessment',
    questionCount: 18,
    difficulty: 'B2-C1',
    xpReward: 140,
    description: 'Test your knowledge of professional English used in business contexts including meetings, emails, presentations, and negotiations.',
    category: 'Business',
    questions: [
      {
        question: 'In a business email, which opening is most formal?',
        options: ['Hi there!', 'Dear Mr. Smith,', 'Hey John,', 'What\'s up?'],
        correctAnswer: 1,
        explanation: '"Dear Mr. Smith," is the most formal and appropriate for professional correspondence.'
      },
      {
        question: 'What does "to touch base" mean in business?',
        options: ['To play baseball', 'To make brief contact or update someone', 'To finalize a contract', 'To end a meeting'],
        correctAnswer: 1,
        explanation: '"Touch base" means to make brief contact or have a short update meeting.'
      },
      {
        question: 'Which phrase is best for starting a presentation?',
        options: ['"So, anyway..."', '"Good morning. Today I\'d like to discuss..."', '"Hey everyone, listen up!"', '"Whatever, let\'s start."'],
        correctAnswer: 1,
        explanation: 'This is professional, clear, and sets expectations for the audience.'
      },
      {
        question: '"Let\'s circle back to that point" means:',
        options: ['Let\'s draw a circle', 'Let\'s return to that topic later', 'Let\'s forget about it', 'Let\'s end the meeting'],
        correctAnswer: 1,
        explanation: '"Circle back" means to return to a topic at a later time.'
      },
      {
        question: 'In a meeting, how do you politely disagree?',
        options: ['"You\'re wrong."', '"I see your point, but I have a different perspective."', '"That\'s stupid."', '"No way."'],
        correctAnswer: 1,
        explanation: 'This acknowledges the other person\'s view while expressing your own respectfully.'
      },
      {
        question: 'What does "ROI" stand for?',
        options: ['Rate of Interest', 'Return on Investment', 'Risk of Inflation', 'Revenue over Income'],
        correctAnswer: 1,
        explanation: 'ROI = Return on Investment, a key business metric.'
      },
      {
        question: 'Which closing is most appropriate for a formal business email?',
        options: ['"See ya!"', '"Best regards,"', '"Bye bye"', '"Later"'],
        correctAnswer: 1,
        explanation: '"Best regards," is professional and appropriate for formal business emails.'
      },
      {
        question: '"To get the ball rolling" means:',
        options: ['To play sports', 'To start something', 'To finish a project', 'To delay a decision'],
        correctAnswer: 1,
        explanation: 'This idiom means to start an activity or process.'
      },
      {
        question: 'In a negotiation, "We need to find a win-win solution" means:',
        options: ['One side must win', 'Both sides should benefit', 'Nobody should win', 'The deal should be cancelled'],
        correctAnswer: 1,
        explanation: 'A win-win solution benefits all parties involved.'
      },
      {
        question: 'Which phrase shows you\'re taking notes in a meeting?',
        options: ['"I\'m writing this down."', '"Let me jot that down."', '"I\'m drawing pictures."', '"I\'m not listening."'],
        correctAnswer: 1,
        explanation: '"Jot down" is a common business phrase meaning to write something quickly.'
      },
      {
        question: 'What does "KPI" mean?',
        options: ['Key Performance Indicator', 'Known Product Information', 'Known Price Index', 'Key Profit Income'],
        correctAnswer: 0,
        explanation: 'KPI = Key Performance Indicator, a measurable value showing how effectively a company achieves objectives.'
      },
      {
        question: '"Let\'s take this offline" means:',
        options: ['Let\'s go outside', 'Let\'s discuss this privately after the meeting', 'Let\'s disconnect from the internet', 'Let\'s cancel the meeting'],
        correctAnswer: 1,
        explanation: 'This phrase means to discuss something privately or in a separate meeting.'
      },
      {
        question: 'Which is the most professional way to ask for clarification?',
        options: ['"What?"', '"I don\'t understand."', '"Could you please elaborate on that point?"', '"Say what?"'],
        correctAnswer: 2,
        explanation: 'This is polite, professional, and specific about what you need.'
      },
      {
        question: '"To think outside the box" means:',
        options: ['To be confused', 'To think creatively and unconventionally', 'To pack items', 'To work in a small space'],
        correctAnswer: 1,
        explanation: 'This idiom means to think creatively, from a new perspective.'
      },
      {
        question: 'In a report, "Executive Summary" refers to:',
        options: ['The longest section', 'A brief overview of key points for busy readers', 'The bibliography', 'The appendix'],
        correctAnswer: 1,
        explanation: 'An executive summary provides a concise overview of the main points for decision-makers.'
      },
      {
        question: 'Which phrase means "to meet a deadline"?',
        options: ['To miss the date', 'To complete something on time', 'To extend the deadline', 'To ignore the deadline'],
        correctAnswer: 1,
        explanation: '"Meet a deadline" means to complete something by the required time.'
      },
      {
        question: '"We need to leverage our resources" means:',
        options: ['We need to lift heavy objects', 'We need to use our resources effectively', 'We need to get rid of resources', 'We need to buy more resources'],
        correctAnswer: 1,
        explanation: '"Leverage" in business means to use something to maximum advantage.'
      },
      {
        question: 'What does "B2B" stand for?',
        options: ['Back to Business', 'Business to Business', 'Better than Best', 'Before the Break'],
        correctAnswer: 1,
        explanation: 'B2B = Business to Business, referring to transactions between companies rather than with consumers.'
      }
    ]
  },
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension Test',
    questionCount: 12,
    difficulty: 'B1-B2',
    xpReward: 100,
    description: 'Test your reading comprehension skills with passages on various topics and questions that check understanding.',
    category: 'Reading',
    questions: [
      {
        question: 'Read this: "Despite the heavy rain, the outdoor concert continued as planned. The performers wore waterproof clothing and the audience held umbrellas." What can we conclude?',
        options: [
          'The concert was cancelled',
          'Both performers and audience were prepared for rain',
          'The rain stopped during the concert',
          'The audience went home'
        ],
        correctAnswer: 1,
        explanation: 'The text states the concert continued and describes how both groups were prepared.'
      },
      {
        question: '"The company\'s profits soared by 200% this quarter, far exceeding analysts\' expectations." What does "soared" mean here?',
        options: ['Decreased slightly', 'Remained the same', 'Increased dramatically', 'Fell unexpectedly'],
        correctAnswer: 2,
        explanation: '"Soared" means to rise or increase dramatically.'
      },
      {
        question: 'Read: "While many people believe that technology isolates us, research suggests that social media actually helps maintain long-distance relationships." What is the main idea?',
        options: [
          'Technology always isolates people',
          'Social media has no effect on relationships',
          'Technology may help maintain distant relationships despite common beliefs',
          'Long-distance relationships always fail'
        ],
        correctAnswer: 2,
        explanation: 'The passage presents a contrast between belief and research findings about technology and relationships.'
      },
      {
        question: '"The CEO resigned abruptly, citing personal reasons. However, rumors suggest disagreements with the board over the company\'s direction." What is implied?',
        options: [
          'The CEO left for a better job',
          'The stated reason might not be the complete truth',
          'The board asked the CEO to leave',
          'The company is closing down'
        ],
        correctAnswer: 1,
        explanation: 'The word "however" and "rumors suggest" imply there may be more to the story than stated.'
      },
      {
        question: 'Read: "Urban gardening has gained popularity in recent years, with city dwellers transforming rooftops, balconies, and vacant lots into productive green spaces." What is happening?',
        options: [
          'People are leaving cities',
          'City residents are creating gardens in urban areas',
          'Farming is becoming less popular',
          'Rooftops are being demolished'
        ],
        correctAnswer: 1,
        explanation: 'The passage describes city dwellers creating gardens in various urban locations.'
      },
      {
        question: '"The study\'s findings were inconclusive, prompting researchers to conduct further investigations." What does "inconclusive" mean?',
        options: ['Definitive and clear', 'Not providing a definite answer', 'Completely wrong', 'Extremely important'],
        correctAnswer: 1,
        explanation: '"Inconclusive" means not leading to a firm conclusion; not definite or decisive.'
      },
      {
        question: 'Read: "Although the restaurant received mixed reviews, its unique fusion cuisine attracted food enthusiasts from across the city." What can we infer?',
        options: [
          'Everyone loved the restaurant',
          'Nobody liked the restaurant',
          'Opinions varied, but it still attracted customers',
          'The restaurant closed down'
        ],
        correctAnswer: 2,
        explanation: '"Mixed reviews" means varying opinions, but the restaurant still attracted people.'
      },
      {
        question: '"The government implemented stringent measures to combat pollution, including hefty fines for violators." What does "stringent" mean?',
        options: ['Lenient and relaxed', 'Strict and precise', 'Expensive', 'Temporary'],
        correctAnswer: 1,
        explanation: '"Stringent" means strict, precise, and exacting.'
      },
      {
        question: 'Read: "Despite initial skepticism, the new teaching method proved effective, with students showing marked improvement in test scores." What happened?',
        options: [
          'The method failed as expected',
          'People doubted it at first, but it worked well',
          'Students got worse scores',
          'The method was never tried'
        ],
        correctAnswer: 1,
        explanation: '"Initial skepticism" means doubt at first, but "proved effective" shows it worked.'
      },
      {
        question: '"The artist\'s work transcends cultural boundaries, resonating with audiences worldwide." What does "transcends" mean?',
        options: ['Stays within limits', 'Goes beyond or rises above', 'Copies exactly', 'Ignores completely'],
        correctAnswer: 1,
        explanation: '"Transcends" means to go beyond the limits of something.'
      },
      {
        question: 'Read: "The company pivoted its strategy in response to changing market conditions, shifting focus from physical retail to e-commerce." What did the company do?',
        options: [
          'Closed down completely',
          'Changed its business approach',
          'Opened more physical stores',
          'Ignored market changes'
        ],
        correctAnswer: 1,
        explanation: '"Pivoted" means to fundamentally change direction or strategy.'
      },
      {
        question: '"While the proposal has merit, its implementation would require substantial resources that we currently lack." What is the speaker saying?',
        options: [
          'The idea is bad and should be rejected',
          'The idea is good but we can\'t afford it now',
          'We have plenty of resources',
          'The proposal needs to be rewritten'
        ],
        correctAnswer: 1,
        explanation: '"Has merit" = good idea, but "require substantial resources that we lack" = can\'t afford it.'
      }
    ]
  },
  {
    id: 'listening-skills',
    title: 'Listening & Comprehension Skills',
    questionCount: 15,
    difficulty: 'B1',
    xpReward: 100,
    description: 'Practice comprehension skills typically tested in listening exercises. Read dialogues and answer questions about them.',
    category: 'Listening',
    questions: [
      {
        question: 'Read this dialogue: A: "Could you pass me the salt, please?" B: "Sure, here you go." A: "Thanks." What is happening?',
        options: [
          'They are arguing',
          'A is making a polite request and B is helping',
          'They are saying goodbye',
          'B is refusing to help'
        ],
        correctAnswer: 1,
        explanation: 'This is a polite request-response sequence common at meals.'
      },
      {
        question: 'A: "I\'m afraid I can\'t make it to the meeting tomorrow." B: "That\'s okay. We can reschedule." What does "can\'t make it" mean?',
        options: [
          'Cannot build it',
          'Cannot attend',
          'Cannot understand',
          'Cannot create it'
        ],
        correctAnswer: 1,
        explanation: '"Can\'t make it" is an idiom meaning unable to attend or be present.'
      },
      {
        question: 'A: "The movie starts at 7:30. We should leave by 7:00 to get there on time." B: "Good idea. I\'ll grab my coat." When do they plan to leave?',
        options: [
          '7:30',
          '7:00',
          '8:00',
          '6:30'
        ],
        correctAnswer: 1,
        explanation: 'Speaker A explicitly says "We should leave by 7:00."'
      },
      {
        question: 'A: "How was your weekend?" B: "It was okay, but I caught a cold. I spent most of it in bed." How does B feel?',
        options: [
          'Energetic and happy',
          'Not feeling well',
          'Very excited',
          'Angry'
        ],
        correctAnswer: 1,
        explanation: 'B caught a cold and spent time in bed, indicating illness.'
      },
      {
        question: 'A: "Would you like tea or coffee?" B: "I\'m fine with either. Whatever you\'re having." What does B mean?',
        options: [
          'B only wants tea',
          'B only wants coffee',
          'B doesn\'t have a preference',
          'B doesn\'t want any drink'
        ],
        correctAnswer: 2,
        explanation: '"Either" and "whatever you\'re having" show B has no preference.'
      },
      {
        question: 'A: "I\'ve been working here for five years now." B: "Really? So you started in 2019?" When is this conversation likely taking place?',
        options: [
          '2019',
          '2020',
          '2024',
          '2015'
        ],
        correctAnswer: 2,
        explanation: 'If they started in 2019 and have worked for 5 years, the current year is 2024.'
      },
      {
        question: 'A: "The restaurant was expensive, but the food was amazing." B: "I\'m glad you enjoyed it. Was the service good too?" What does A think about the restaurant?',
        options: [
          'It was cheap and good',
          'It was expensive but the food was excellent',
          'It was bad in every way',
          'It was average'
        ],
        correctAnswer: 1,
        explanation: 'A says it was expensive (negative) but food was amazing (positive).'
      },
      {
        question: 'A: "I\'ll have the bill, please." B: "No, it\'s on me. You paid last time." What does "it\'s on me" mean?',
        options: [
          'The bill is on the table',
          'I will pay for it',
          'We should split the bill',
          'The bill is wrong'
        ],
        correctAnswer: 1,
        explanation: '"It\'s on me" is an idiom meaning "I will pay for it."'
      },
      {
        question: 'A: "Have you seen my keys?" B: "I think they\'re on the kitchen counter." Where are the keys probably located?',
        options: [
          'In the bedroom',
          'In the kitchen',
          'Outside the house',
          'In the car'
        ],
        correctAnswer: 1,
        explanation: 'B says they\'re on the kitchen counter, so they\'re in the kitchen.'
      },
      {
        question: 'A: "The flight has been delayed by two hours." B: "Oh no! What time does it arrive now?" A: "Instead of 3 PM, it will land at 5 PM." How long is the delay?',
        options: [
          'One hour',
          'Two hours',
          'Three hours',
          'Five hours'
        ],
        correctAnswer: 1,
        explanation: 'The text explicitly states the flight was delayed by two hours.'
      },
      {
        question: 'A: "I\'m thinking of changing jobs." B: "Really? What\'s wrong with your current position?" A: "The commute is too long. It takes me two hours each way." Why does A want to change jobs?',
        options: [
          'Low salary',
          'Bad boss',
          'Long travel time to work',
          'Boring work'
        ],
        correctAnswer: 2,
        explanation: 'A mentions the commute takes two hours each way (4 hours total daily travel).'
      },
      {
        question: 'A: "Shall we meet at the café at 4?" B: "Actually, could we make it 4:30? I have a meeting until then." A: "Sure, 4:30 works for me." When will they meet?',
        options: [
          '4:00',
          '4:30',
          '5:00',
          '3:30'
        ],
        correctAnswer: 1,
        explanation: 'B suggested 4:30 and A agreed, so they will meet at 4:30.'
      },
      {
        question: 'A: "I heard you got promoted!" B: "Yes, I\'m now team lead. It comes with more responsibility, but also a better salary." What changed for B?',
        options: [
          'B got a new job at a different company',
          'B got a higher position with more responsibility and pay',
          'B was fired',
          'B took a pay cut'
        ],
        correctAnswer: 1,
        explanation: 'B was promoted to team lead with more responsibility and better salary.'
      },
      {
        question: 'A: "The weather forecast says it\'s going to rain all weekend." B: "That\'s a shame. We were planning a picnic." What will probably happen to their plans?',
        options: [
          'They will have the picnic in the rain',
          'They will likely change or cancel their plans',
          'The weather forecast is always wrong',
          'They will go anyway'
        ],
        correctAnswer: 1,
        explanation: 'B expresses disappointment ("that\'s a shame"), suggesting they\'ll need to change plans.'
      },
      {
        question: 'A: "I can\'t believe it\'s already December!" B: "I know! This year has flown by." What does "flown by" mean?',
        options: [
          'The year was very slow',
          'The year passed very quickly',
          'They flew on an airplane',
          'The year was boring'
        ],
        correctAnswer: 1,
        explanation: '"Time flies" or "flown by" means time passed very quickly.'
      }
    ]
  }
];
