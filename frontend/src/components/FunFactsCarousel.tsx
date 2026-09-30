import { useState, useEffect } from 'react';

interface FunFact {
  emoji: string;
  title: string;
  fact: string;
  tip: string;
  category: 'vocabulary' | 'grammar' | 'culture' | 'history' | 'fun';
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
}

const FUN_FACTS: FunFact[] = [
  {
    emoji: '📚',
    title: 'English has over 1 million words',
    fact: 'The Oxford English Dictionary contains over 170,000 words in current use, with around 47,000 obsolete words. But linguists estimate there are over 1 million total words when you include scientific terms, slang, and jargon!',
    tip: 'Don\'t try to learn them all — focus on the 3,000 most common words which cover 95% of everyday conversation.',
    category: 'vocabulary',
    difficulty: 'A2',
  },
  {
    emoji: '🔤',
    title: '"Set" has the most definitions',
    fact: 'The word "set" has over 430 different definitions in the dictionary — more than any other English word! It can be a verb, noun, or adjective.',
    tip: 'Context is everything in English. The same word can mean completely different things depending on how it\'s used.',
    category: 'vocabulary',
    difficulty: 'B1',
  },
  {
    emoji: '🌍',
    title: 'English is the most studied language',
    fact: 'Over 1 billion people are currently learning English worldwide. It\'s the official language of 67 countries and 27 international organizations.',
    tip: 'You\'re part of a global community! Every minute of practice connects you with millions of other learners.',
    category: 'culture',
    difficulty: 'A1',
  },
  {
    emoji: '✍️',
    title: 'The longest English word',
    fact: 'The longest word in major dictionaries is "pneumonoultramicroscopicsilicovolcanoconiosis" — a 45-letter lung disease. But most English speakers never use it!',
    tip: 'Long words aren\'t always better. Clear, simple communication is the real goal of language learning.',
    category: 'fun',
    difficulty: 'C1',
  },
  {
    emoji: '🎵',
    title: 'English has no official academy',
    fact: 'Unlike French (Académie Française) or Spanish (Real Academia Española), English has no official regulatory body. New words are added based on usage.',
    tip: 'This means English is always evolving. Don\'t be afraid to experiment — if people understand you, you\'re communicating successfully!',
    category: 'culture',
    difficulty: 'B2',
  },
  {
    emoji: '📖',
    title: 'Shakespeare invented 1,700+ words',
    fact: 'William Shakespeare coined or first recorded over 1,700 words we still use today, including "assassination," "bump," "lonely," and "eyeball."',
    tip: 'Language is creative! You can combine existing words to express new ideas. That\'s how English grows.',
    category: 'history',
    difficulty: 'B1',
  },
  {
    emoji: '🗣️',
    title: 'There are 200+ English dialects',
    fact: 'English varies dramatically around the world — from American to British to Australian to Indian English. Each has unique vocabulary, pronunciation, and grammar.',
    tip: 'There\'s no single "correct" English. Focus on being understood rather than sounding like a specific region.',
    category: 'culture',
    difficulty: 'B2',
  },
  {
    emoji: '💡',
    title: 'The "silent e" rule',
    fact: 'In English, a silent "e" at the end of a word often makes the previous vowel "say its name" — "kit" becomes "kite," "hop" becomes "hope."',
    tip: 'This pattern helps with spelling and pronunciation. When you see a silent e, try making the vowel long!',
    category: 'grammar',
    difficulty: 'A1',
  },
  {
    emoji: '🎭',
    title: 'English has 3 words for "you"',
    fact: 'Old English had "thou" (singular informal), "you" (plural or formal), and "ye" (plural subject). Modern English simplified to just "you" for all cases.',
    tip: 'This simplification makes English easier to learn! One word for all situations.',
    category: 'history',
    difficulty: 'B2',
  },
  {
    emoji: '🔢',
    title: 'The most common letter is "E"',
    fact: 'The letter "E" appears in about 11% of all English words. The least common letters are Z, Q, X, and J.',
    tip: 'When playing word games or solving puzzles, start with words containing E!',
    category: 'fun',
    difficulty: 'A2',
  },
  {
    emoji: '📝',
    title: 'English has no gender for nouns',
    fact: 'Unlike French, Spanish, or German, English nouns don\'t have grammatical gender. "The table" is neither masculine nor feminine.',
    tip: 'This makes English easier in some ways! No need to memorize gender for every noun.',
    category: 'grammar',
    difficulty: 'A1',
  },
  {
    emoji: '🌐',
    title: 'English borrows from many languages',
    fact: 'About 60% of English words come from Latin or French, 25% from Germanic languages, and the rest from Greek and other languages.',
    tip: 'If you know French, Spanish, or German, you already know many English words!',
    category: 'history',
    difficulty: 'B1',
  },
  {
    emoji: '🎯',
    title: 'The shortest complete sentence',
    fact: '"Go." is the shortest complete sentence in English. It has a subject (you, implied) and a verb.',
    tip: 'Complete sentences need both a subject and a verb, even if the subject is implied.',
    category: 'grammar',
    difficulty: 'A1',
  },
  {
    emoji: '📊',
    title: 'New words are added daily',
    fact: 'The Oxford English Dictionary adds about 1,000 new words every year. Recent additions include "selfie," "tweet," and "google" (as a verb).',
    tip: 'Language is alive! Don\'t be afraid to use new words you encounter.',
    category: 'vocabulary',
    difficulty: 'B1',
  },
  {
    emoji: '🎪',
    title: 'English has pangrams',
    fact: 'A pangram is a sentence that uses every letter of the alphabet. The most famous is: "The quick brown fox jumps over the lazy dog."',
    tip: 'Pangrams are used to test fonts and keyboards. Try creating your own!',
    category: 'fun',
    difficulty: 'B2',
  },
  {
    emoji: '🔤',
    title: 'Contractions make speech natural',
    fact: 'Native speakers use contractions constantly: "I\'m," "you\'re," "don\'t," "can\'t." Without them, you sound robotic!',
    tip: 'Always use contractions in speaking and informal writing. Save full forms for formal contexts.',
    category: 'grammar',
    difficulty: 'A2',
  },
  {
    emoji: '📚',
    title: 'English has compound words',
    fact: 'Compound words combine two words: "bookshelf," "toothbrush," "sunflower." Some are one word, some hyphenated, some separate.',
    tip: 'When in doubt, check a dictionary. Compound words can be tricky!',
    category: 'vocabulary',
    difficulty: 'A2',
  },
  {
    emoji: '🌟',
    title: 'The most common word is "the"',
    fact: '"The" appears in about 5% of all written English. The next most common words are "be," "to," "of," and "and."',
    tip: 'Master these high-frequency words first — they appear everywhere!',
    category: 'vocabulary',
    difficulty: 'A1',
  },
  {
    emoji: '🎨',
    title: 'English spelling is chaotic',
    fact: 'English spelling doesn\'t always match pronunciation. "Through," "though," "thought," and "tough" all look similar but sound different!',
    tip: 'Learn spelling patterns, but accept that English has many exceptions. Reading helps!',
    category: 'grammar',
    difficulty: 'B1',
  },
  {
    emoji: '🗺️',
    title: 'English is a global lingua franca',
    fact: 'More people speak English as a second language than as a first language. It\'s the language of business, science, aviation, and the internet.',
    tip: 'You\'re learning the world\'s most useful language. Keep going!',
    category: 'culture',
    difficulty: 'A2',
  },
];

export default function FunFactsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FUN_FACTS.length);
      setShowTip(false);
    }, 10000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setShowTip(false);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 20000);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FUN_FACTS.length);
    setShowTip(false);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 20000);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FUN_FACTS.length) % FUN_FACTS.length);
    setShowTip(false);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 20000);
  };

  const currentFact = FUN_FACTS[currentIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vocabulary': return { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6' };
      case 'grammar': return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6' };
      case 'culture': return { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#10b981' };
      case 'history': return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b' };
      case 'fun': return { bg: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.3)', text: '#ec4899' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', border: 'rgba(107, 114, 128, 0.3)', text: '#6b7280' };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'A1': return '#10b981';
      case 'A2': return '#3b82f6';
      case 'B1': return '#f59e0b';
      case 'B2': return '#f97316';
      case 'C1': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const categoryColor = getCategoryColor(currentFact.category);
  const difficultyColor = getDifficultyColor(currentFact.difficulty);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 245, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(227, 108, 36, 0.15)',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Decorative gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #E36C24 0%, #FF9800 50%, #FFC107 100%)',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(227, 108, 36, 0.1), rgba(255, 152, 0, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}>
            💡
          </div>
          <div>
            <h3 className="font-heading" style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1F1F1F',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Fun Fact of the Moment
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#6B7280',
              margin: '2px 0 0 0',
            }}>
              Discover something new about English
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={goPrev}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(227, 108, 36, 0.2)',
              borderRadius: '10px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#E36C24',
              transition: 'all 0.2s',
              fontWeight: 700,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(227, 108, 36, 0.1)';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            ←
          </button>
          <button
            onClick={goNext}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(227, 108, 36, 0.2)',
              borderRadius: '10px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#E36C24',
              transition: 'all 0.2s',
              fontWeight: 700,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(227, 108, 36, 0.1)';
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="animate-fade-in" key={currentIndex} style={{ marginBottom: '24px' }}>
        {/* Main Content Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(227, 108, 36, 0.1)',
          marginBottom: '16px',
        }}>
          {/* Category and Difficulty Badges */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}>
            <span style={{
              padding: '6px 12px',
              background: categoryColor.bg,
              border: `1px solid ${categoryColor.border}`,
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 700,
              color: categoryColor.text,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {currentFact.category}
            </span>
            <span style={{
              padding: '6px 12px',
              background: `${difficultyColor}15`,
              border: `1px solid ${difficultyColor}30`,
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 700,
              color: difficultyColor,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Level {currentFact.difficulty}
            </span>
            <span style={{
              fontSize: '12px',
              color: '#9CA3AF',
              marginLeft: 'auto',
            }}>
              {currentIndex + 1} of {FUN_FACTS.length}
            </span>
          </div>

          {/* Emoji and Title */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '16px',
          }}>
            <div style={{
              fontSize: '48px',
              lineHeight: 1,
              flexShrink: 0,
            }}>
              {currentFact.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <h4 className="font-heading" style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1F1F1F',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}>
                {currentFact.title}
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {currentFact.fact}
              </p>
            </div>
          </div>
        </div>

        {/* Learning Tip Section */}
        <div style={{
          background: showTip ? 'rgba(227, 108, 36, 0.08)' : 'rgba(227, 108, 36, 0.04)',
          border: `1px solid ${showTip ? 'rgba(227, 108, 36, 0.3)' : 'rgba(227, 108, 36, 0.15)'}`,
          borderRadius: '12px',
          padding: '16px 20px',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: showTip ? '12px' : '0',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ fontSize: '18px' }}>💡</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#E36C24',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Learning Tip
              </span>
            </div>
            <button
              onClick={() => setShowTip(!showTip)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#E36C24',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(227, 108, 36, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {showTip ? 'Hide' : 'Show'}
            </button>
          </div>
          {showTip && (
            <p style={{
              fontSize: '14px',
              color: '#1F1F1F',
              lineHeight: 1.6,
              margin: 0,
              animation: 'fadeIn 0.3s ease-out',
            }}>
              {currentFact.tip}
            </p>
          )}
        </div>
      </div>

      {/* Progress Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        flexWrap: 'wrap',
      }}>
        {FUN_FACTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            style={{
              width: i === currentIndex ? '32px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === currentIndex 
                ? 'linear-gradient(90deg, #E36C24, #FF9800)' 
                : 'rgba(227, 108, 36, 0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              if (i !== currentIndex) {
                e.currentTarget.style.background = 'rgba(227, 108, 36, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (i !== currentIndex) {
                e.currentTarget.style.background = 'rgba(227, 108, 36, 0.2)';
              }
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
