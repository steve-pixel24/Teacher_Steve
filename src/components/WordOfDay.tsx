import { useState } from 'react';

interface WordOfDayProps {
  onAddScore: (points: number) => void;
  onWordSubmission?: () => void;
}

interface WordData {
  word: string;
  partOfSpeech: string;
  definition: string;
  examples: string[];
  pronunciation: string;
  synonyms: string[];
  antonyms: string[];
  relatedWords: string[];
  etymology: string;
  collocations: string[];
  usageNote: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: string;
}

// Enhanced word data with rich content
const WORDS: WordData[] = [
  {
    word: 'Serendipity',
    partOfSpeech: 'Noun',
    definition: 'The occurrence of events by chance in a happy or beneficial way; a pleasant surprise.',
    examples: [
      'Finding that rare book at the garage sale was pure serendipity.',
      'Their meeting was a moment of serendipity that changed both their lives.',
      'Many scientific discoveries have been the result of serendipity.',
    ],
    pronunciation: '/ˌser.ənˈdɪp.ə.ti/',
    synonyms: ['luck', 'fortune', 'chance', 'fate', 'providence'],
    antonyms: ['misfortune', 'bad luck'],
    relatedWords: ['serendipitous', 'serendipitously'],
    etymology: 'Coined by Horace Walpole in 1754, based on the Persian fairy tale "The Three Princes of Serendip"',
    collocations: ['pure serendipity', 'moment of serendipity', 'happy serendipity'],
    usageNote: 'Often used to describe fortunate accidental discoveries or meetings',
    difficulty: 'B2',
    category: 'Abstract Concepts',
  },
  {
    word: 'Eloquent',
    partOfSpeech: 'Adjective',
    definition: 'Fluent or persuasive in speaking or writing; clearly expressing feelings or meaning.',
    examples: [
      'She gave an eloquent speech that moved the entire audience to tears.',
      'His eloquent argument convinced everyone in the room.',
      'The poet\'s eloquent words captured the beauty of nature.',
    ],
    pronunciation: '/ˈel.ə.kwənt/',
    synonyms: ['articulate', 'fluent', 'expressive', 'persuasive', 'silver-tongued'],
    antonyms: ['inarticulate', 'tongue-tied', 'halting'],
    relatedWords: ['eloquence', 'eloquently'],
    etymology: 'From Latin "eloquens" (speaking out), from "e-" (out) + "loqui" (to speak)',
    collocations: ['eloquent speech', 'eloquent argument', 'eloquent silence'],
    usageNote: 'Can describe both spoken and written communication, as well as non-verbal expressions',
    difficulty: 'B2',
    category: 'Communication',
  },
  {
    word: 'Resilient',
    partOfSpeech: 'Adjective',
    definition: 'Able to recover quickly from difficult conditions; tough and adaptable.',
    examples: [
      'Children are remarkably resilient and can adapt to new situations faster than adults.',
      'The resilient economy recovered quickly from the recession.',
      'She proved herself resilient after facing numerous setbacks.',
    ],
    pronunciation: '/rɪˈzɪl.i.ənt/',
    synonyms: ['tough', 'strong', 'adaptable', 'flexible', 'hardy'],
    antonyms: ['fragile', 'weak', 'vulnerable'],
    relatedWords: ['resilience', 'resiliently'],
    etymology: 'From Latin "resilire" (to leap back, rebound)',
    collocations: ['resilient person', 'resilient economy', 'emotionally resilient'],
    usageNote: 'Often used in psychology and business contexts to describe recovery from adversity',
    difficulty: 'B1',
    category: 'Personal Qualities',
  },
  {
    word: 'Ambiguous',
    partOfSpeech: 'Adjective',
    definition: 'Open to more than one interpretation; not having one obvious meaning.',
    examples: [
      'The ending of the movie was deliberately ambiguous, leaving viewers to decide for themselves.',
      'His ambiguous response made it unclear whether he agreed or not.',
      'The contract contained several ambiguous clauses that led to disputes.',
    ],
    pronunciation: '/æmˈbɪɡ.ju.əs/',
    synonyms: ['unclear', 'vague', 'equivocal', 'cryptic', 'open to interpretation'],
    antonyms: ['clear', 'unambiguous', 'definite', 'explicit'],
    relatedWords: ['ambiguity', 'ambiguously'],
    etymology: 'From Latin "ambiguus" (wavering, uncertain), from "ambigere" (to go around)',
    collocations: ['ambiguous statement', 'ambiguous meaning', 'morally ambiguous'],
    usageNote: 'Can be used negatively (confusing) or positively (open to interpretation)',
    difficulty: 'B2',
    category: 'Communication',
  },
  {
    word: 'Pragmatic',
    partOfSpeech: 'Adjective',
    definition: 'Dealing with things sensibly and realistically; practical rather than idealistic.',
    examples: [
      'We need a pragmatic approach to solve this problem, not just theoretical ideas.',
      'She\'s known for her pragmatic leadership style.',
      'The pragmatic solution was to compromise rather than fight.',
    ],
    pronunciation: '/præɡˈmæt.ɪk/',
    synonyms: ['practical', 'realistic', 'sensible', 'rational', 'down-to-earth'],
    antonyms: ['idealistic', 'impractical', 'unrealistic'],
    relatedWords: ['pragmatism', 'pragmatically', 'pragmatist'],
    etymology: 'From Greek "pragmatikos" (relating to fact), from "pragma" (deed, act)',
    collocations: ['pragmatic approach', 'pragmatic solution', 'pragmatic view'],
    usageNote: 'Often used in business and politics to describe realistic, non-idealistic approaches',
    difficulty: 'B2',
    category: 'Thinking & Approach',
  },
  {
    word: 'Ubiquitous',
    partOfSpeech: 'Adjective',
    definition: 'Present, appearing, or found everywhere; very common.',
    examples: [
      'Smartphones have become ubiquitous in modern society.',
      'Coffee shops are ubiquitous in this city.',
      'The ubiquitous nature of social media has changed how we communicate.',
    ],
    pronunciation: '/juːˈbɪk.wɪ.təs/',
    synonyms: ['omnipresent', 'pervasive', 'universal', 'widespread', 'common'],
    antonyms: ['rare', 'scarce', 'uncommon'],
    relatedWords: ['ubiquity', 'ubiquitously'],
    etymology: 'From Latin "ubique" (everywhere), from "ubi" (where)',
    collocations: ['ubiquitous presence', 'ubiquitous technology', 'become ubiquitous'],
    usageNote: 'Often used to describe technology, trends, or phenomena that are everywhere',
    difficulty: 'C1',
    category: 'Abstract Concepts',
  },
];

export default function WordOfDay({ onAddScore, onWordSubmission }: WordOfDayProps) {
  // Use date to pick a consistent "word of the day"
  const dayIndex = new Date().getDate() % WORDS.length;
  const wordData = WORDS[dayIndex];

  const [userSentence, setUserSentence] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({ type: '', message: '' });
  const [hasEarnedPoints, setHasEarnedPoints] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLearned, setIsLearned] = useState(false);

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

  const handleSubmit = () => {
    if (!userSentence.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please write a sentence before submitting.',
      });
      return;
    }

    // Simple validation: check if the word is used in the sentence
    const sentenceLower = userSentence.toLowerCase();
    const wordLower = wordData.word.toLowerCase();

    if (sentenceLower.includes(wordLower)) {
      // Check minimum length (at least 5 words)
      const wordCount = userSentence.trim().split(/\s+/).length;
      if (wordCount >= 5) {
        setFeedback({
          type: 'success',
          message: `Excellent! You used "${wordData.word}" correctly in your sentence. +10 points! 🎉`,
        });
        if (!hasEarnedPoints) {
          onAddScore(10);
          setHasEarnedPoints(true);
          if (onWordSubmission) {
            onWordSubmission();
          }
        }
      } else {
        setFeedback({
          type: 'error',
          message: 'Good try! Your sentence is a bit short. Try to write at least 5 words.',
        });
      }
    } else {
      setFeedback({
        type: 'error',
        message: `Your sentence doesn't include the word "${wordData.word}". Try again!`,
      });
    }
  };

  const handleReset = () => {
    setUserSentence('');
    setFeedback({ type: '', message: '' });
  };

  const handleMarkLearned = () => {
    setIsLearned(!isLearned);
    if (!isLearned) {
      onAddScore(5);
    }
  };

  const difficultyColor = getDifficultyColor(wordData.difficulty);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 245, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(227, 108, 36, 0.15)',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative gradient bar */}
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
            📖
          </div>
          <div>
            <h3 className="font-heading" style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1F1F1F',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Word of the Day
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#6B7280',
              margin: '2px 0 0 0',
            }}>
              Expand your vocabulary daily
            </p>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
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
            Level {wordData.difficulty}
          </span>
          <span style={{
            padding: '6px 12px',
            background: 'rgba(227, 108, 36, 0.08)',
            border: '1px solid rgba(227, 108, 36, 0.2)',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#E36C24',
          }}>
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Word Display Card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '20px',
        border: '1px solid rgba(227, 108, 36, 0.1)',
      }}>
        {/* Word and pronunciation */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}>
          <h2 className="font-heading" style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#E36C24',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            {wordData.word}
          </h2>
          <span style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#6B7280',
            padding: '4px 12px',
            background: 'rgba(107, 114, 128, 0.08)',
            borderRadius: '6px',
          }}>
            {wordData.partOfSpeech}
          </span>
          <span className="font-mono" style={{
            fontSize: '14px',
            color: '#9CA3AF',
          }}>
            {wordData.pronunciation}
          </span>
        </div>

        {/* Category badge */}
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          background: 'rgba(227, 108, 36, 0.08)',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#E36C24',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {wordData.category}
        </div>

        {/* Definition */}
        <div style={{
          marginBottom: '20px',
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}>
            Definition
          </div>
          <p style={{
            fontSize: '16px',
            color: '#1F1F1F',
            lineHeight: 1.7,
            margin: 0,
          }}>
            {wordData.definition}
          </p>
        </div>

        {/* Examples */}
        <div style={{
          background: 'rgba(227, 108, 36, 0.04)',
          borderRadius: '12px',
          padding: '16px 20px',
          borderLeft: '4px solid #E36C24',
          marginBottom: '20px',
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#E36C24',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}>
            Examples
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {wordData.examples.map((example, index) => (
              <p key={index} style={{
                fontSize: '14px',
                color: '#4B5563',
                fontStyle: 'italic',
                lineHeight: 1.6,
                margin: 0,
                paddingLeft: '12px',
                borderLeft: index > 0 ? '2px solid rgba(227, 108, 36, 0.2)' : 'none',
              }}>
                "{example}"
              </p>
            ))}
          </div>
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(227, 108, 36, 0.2)',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#E36C24',
            cursor: 'pointer',
            transition: 'all 0.2s',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(227, 108, 36, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span>{showDetails ? 'Hide' : 'Show'} More Details</span>
          <span style={{ fontSize: '16px' }}>{showDetails ? '▲' : '▼'}</span>
        </button>

        {showDetails && (
          <div className="animate-fade-in" style={{
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {/* Synonyms & Antonyms */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}>
              <div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#10b981',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                }}>
                  Synonyms
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}>
                  {wordData.synonyms.map((syn, i) => (
                    <span key={i} style={{
                      padding: '4px 10px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#10b981',
                      fontWeight: 500,
                    }}>
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ef4444',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                }}>
                  Antonyms
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}>
                  {wordData.antonyms.map((ant, i) => (
                    <span key={i} style={{
                      padding: '4px 10px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#ef4444',
                      fontWeight: 500,
                    }}>
                      {ant}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Etymology */}
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}>
                Etymology
              </div>
              <p style={{
                fontSize: '13px',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
                fontStyle: 'italic',
              }}>
                {wordData.etymology}
              </p>
            </div>

            {/* Collocations */}
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}>
                Common Collocations
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}>
                {wordData.collocations.map((col, i) => (
                  <span key={i} style={{
                    padding: '4px 10px',
                    background: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#3b82f6',
                    fontWeight: 500,
                  }}>
                    {col}
                  </span>
                ))}
              </div>
            </div>

            {/* Usage Note */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.04)',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              borderRadius: '8px',
              padding: '12px 16px',
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#3b82f6',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
              }}>
                💡 Usage Note
              </div>
              <p style={{
                fontSize: '13px',
                color: '#1F1F1F',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {wordData.usageNote}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Practice Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(227, 108, 36, 0.1)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}>
          <label style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#1F1F1F',
            margin: 0,
          }}>
            ✍️ Your Turn: Write a sentence using "{wordData.word}"
          </label>
          <button
            onClick={handleMarkLearned}
            style={{
              background: isLearned ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
              border: `1px solid ${isLearned ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.2)'}`,
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: isLearned ? '#10b981' : '#6B7280',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isLearned ? '✓ Learned' : 'Mark as Learned'}
          </button>
        </div>

        <textarea
          value={userSentence}
          onChange={(e) => {
            setUserSentence(e.target.value);
            if (feedback.type) {
              setFeedback({ type: '', message: '' });
            }
          }}
          placeholder="Type your sentence here..."
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            color: '#1F1F1F',
            fontSize: '15px',
            lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif',
            resize: 'vertical',
            outline: 'none',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#E36C24';
            e.target.style.boxShadow = '0 0 0 3px rgba(227, 108, 36, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        />

        {/* Feedback */}
        {feedback.message && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: '12px',
              padding: '14px 18px',
              borderRadius: '12px',
              fontSize: '14px',
              lineHeight: 1.5,
              background: feedback.type === 'success'
                ? 'rgba(16, 185, 129, 0.08)'
                : 'rgba(239, 68, 68, 0.06)',
              border: `1px solid ${feedback.type === 'success'
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(239, 68, 68, 0.15)'}`,
              color: feedback.type === 'success' ? '#10b981' : '#ef4444',
              fontWeight: 500,
            }}
          >
            {feedback.message}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '16px',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={hasEarnedPoints && feedback.type === 'success'}
            style={{
              opacity: hasEarnedPoints && feedback.type === 'success' ? 0.5 : 1,
              cursor: hasEarnedPoints && feedback.type === 'success' ? 'not-allowed' : 'pointer',
              flex: 1,
            }}
          >
            {hasEarnedPoints && feedback.type === 'success' ? '✓ Points Earned!' : 'Submit Example (+10 XP)'}
          </button>
          <button
            onClick={handleReset}
            className="btn btn-secondary"
            style={{
              minWidth: '100px',
            }}
          >
            Clear
          </button>
        </div>

        {/* Score hint */}
        <p style={{
          fontSize: '12px',
          color: '#9CA3AF',
          marginTop: '12px',
          fontStyle: 'italic',
          textAlign: 'center',
        }}>
          💡 Earn 10 XP for correct sentences + 5 XP for marking as learned
        </p>
      </div>
    </div>
  );
}
