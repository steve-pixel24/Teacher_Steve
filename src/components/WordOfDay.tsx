import { useState } from 'react';

interface WordOfDayProps {
  onAddScore: (points: number) => void;
  onWordSubmission?: () => void;
}

interface WordData {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  pronunciation: string;
}

// Simulated "word of the day" - in production, this would come from an API
const WORDS: WordData[] = [
  {
    word: 'Serendipity',
    partOfSpeech: 'Noun',
    definition: 'The occurrence of events by chance in a happy or beneficial way; a pleasant surprise.',
    example: 'Finding that rare book at the garage sale was pure serendipity.',
    pronunciation: '/ˌser.ənˈdɪp.ə.ti/',
  },
  {
    word: 'Eloquent',
    partOfSpeech: 'Adjective',
    definition: 'Fluent or persuasive in speaking or writing; clearly expressing feelings or meaning.',
    example: 'She gave an eloquent speech that moved the entire audience to tears.',
    pronunciation: '/ˈel.ə.kwənt/',
  },
  {
    word: 'Resilient',
    partOfSpeech: 'Adjective',
    definition: 'Able to recover quickly from difficult conditions; tough and adaptable.',
    example: 'Children are remarkably resilient and can adapt to new situations faster than adults.',
    pronunciation: '/rɪˈzɪl.i.ənt/',
  },
  {
    word: 'Ambiguous',
    partOfSpeech: 'Adjective',
    definition: 'Open to more than one interpretation; not having one obvious meaning.',
    example: 'The ending of the movie was deliberately ambiguous, leaving viewers to decide for themselves.',
    pronunciation: '/æmˈbɪɡ.ju.əs/',
  },
  {
    word: 'Pragmatic',
    partOfSpeech: 'Adjective',
    definition: 'Dealing with things sensibly and realistically; practical rather than idealistic.',
    example: 'We need a pragmatic approach to solve this problem, not just theoretical ideas.',
    pronunciation: '/præɡˈmæt.ɪk/',
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

  return (
    <div className="card" style={{
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 152, 0, 0.2)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <h3 className="font-space" style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#1E293B',
          margin: 0,
        }}>
          📖 Word of the Day
        </h3>
        <div style={{
          padding: '4px 12px',
          background: 'rgba(255, 152, 0, 0.1)',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#E65100',
        }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Word Display */}
      <div style={{
        background: 'rgba(255, 152, 0, 0.05)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        border: '1px solid rgba(255, 152, 0, 0.15)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '12px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}>
          <h2 className="font-space" style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#E65100',
            margin: 0,
          }}>
            {wordData.word}
          </h2>
          <span style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#64748B',
          }}>
            {wordData.partOfSpeech}
          </span>
          <span className="font-mono" style={{
            fontSize: '13px',
            color: '#94A3B8',
          }}>
            {wordData.pronunciation}
          </span>
        </div>

        <p style={{
          fontSize: '16px',
          color: '#1E293B',
          lineHeight: 1.6,
          marginBottom: '12px',
        }}>
          <strong>Definition:</strong> {wordData.definition}
        </p>

        <div style={{
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '10px',
          padding: '12px 16px',
          borderLeft: '3px solid #FF9800',
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#E65100',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '6px',
          }}>
            Example
          </div>
          <p style={{
            fontSize: '14px',
            color: '#1E293B',
            fontStyle: 'italic',
            lineHeight: 1.6,
            margin: 0,
          }}>
            "{wordData.example}"
          </p>
        </div>
      </div>

      {/* Practice Section */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 500,
          color: '#1E293B',
          marginBottom: '8px',
        }}>
          ✍️ Your Turn: Write a sentence using "{wordData.word}"
        </label>
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
            minHeight: '100px',
            padding: '14px 18px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            color: '#1E293B',
            fontSize: '15px',
            lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif',
            resize: 'vertical',
            outline: 'none',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#FF9800';
            e.target.style.boxShadow = '0 0 0 3px rgba(255, 152, 0, 0.1)';
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
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '14px',
              lineHeight: 1.5,
              background: feedback.type === 'success'
                ? 'rgba(16, 185, 129, 0.08)'
                : 'rgba(239, 68, 68, 0.06)',
              border: `1px solid ${feedback.type === 'success'
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(239, 68, 68, 0.15)'}`,
              color: feedback.type === 'success' ? '#10b981' : '#ef4444',
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
            }}
          >
            {hasEarnedPoints && feedback.type === 'success' ? '✓ Points Earned!' : 'Submit Example'}
          </button>
          <button
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Clear
          </button>
        </div>

        {/* Score hint */}
        <p style={{
          fontSize: '12px',
          color: '#94A3B8',
          marginTop: '12px',
          fontStyle: 'italic',
        }}>
          💡 Earn 10 points for each correct sentence you write!
        </p>
      </div>
    </div>
  );
}
