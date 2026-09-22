import { useState, useEffect } from 'react';

const FUN_FACTS = [
  {
    emoji: '📚',
    title: 'English has over 1 million words',
    fact: 'The Oxford English Dictionary contains over 170,000 words in current use, with around 47,000 obsolete words. But linguists estimate there are over 1 million total words when you include scientific terms, slang, and jargon!',
    tip: 'Don\'t try to learn them all — focus on the 3,000 most common words which cover 95% of everyday conversation.',
  },
  {
    emoji: '🔤',
    title: '"Set" has the most definitions',
    fact: 'The word "set" has over 430 different definitions in the dictionary — more than any other English word! It can be a verb, noun, or adjective.',
    tip: 'Context is everything in English. The same word can mean completely different things depending on how it\'s used.',
  },
  {
    emoji: '🌍',
    title: 'English is the most studied language',
    fact: 'Over 1 billion people are currently learning English worldwide. It\'s the official language of 67 countries and 27 international organizations.',
    tip: 'You\'re part of a global community! Every minute of practice connects you with millions of other learners.',
  },
  {
    emoji: '✍️',
    title: 'The longest English word',
    fact: 'The longest word in major dictionaries is "pneumonoultramicroscopicsilicovolcanoconiosis" — a 45-letter lung disease. But most English speakers never use it!',
    tip: 'Long words aren\'t always better. Clear, simple communication is the real goal of language learning.',
  },
  {
    emoji: '🎵',
    title: 'English has no official academy',
    fact: 'Unlike French (Académie Française) or Spanish (Real Academia Española), English has no official regulatory body. New words are added based on usage.',
    tip: 'This means English is always evolving. Don\'t be afraid to experiment — if people understand you, you\'re communicating successfully!',
  },
  {
    emoji: '📖',
    title: 'Shakespeare invented 1,700+ words',
    fact: 'William Shakespeare coined or first recorded over 1,700 words we still use today, including "assassination," "bump," "lonely," and "eyeball."',
    tip: 'Language is creative! You can combine existing words to express new ideas. That\'s how English grows.',
  },
  {
    emoji: '🗣️',
    title: 'There are 200+ English dialects',
    fact: 'English varies dramatically around the world — from American to British to Australian to Indian English. Each has unique vocabulary, pronunciation, and grammar.',
    tip: 'There\'s no single "correct" English. Focus on being understood rather than sounding like a specific region.',
  },
  {
    emoji: '💡',
    title: 'The "silent e" rule',
    fact: 'In English, a silent "e" at the end of a word often makes the previous vowel "say its name" — "kit" becomes "kite," "hop" becomes "hope."',
    tip: 'This pattern helps with spelling and pronunciation. When you see a silent e, try making the vowel long!',
  },
];

export default function FunFactsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FUN_FACTS.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FUN_FACTS.length) % FUN_FACTS.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const currentFact = FUN_FACTS[currentIndex];

  return (
    <div className="card" style={{
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      overflow: 'hidden',
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
          💡 Fun Fact of the Moment
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={goPrev}
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#64748B',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.color = '#1E293B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            ←
          </button>
          <button
            onClick={goNext}
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#64748B',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.color = '#1E293B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            →
          </button>
        </div>
      </div>

      <div className="animate-fade-in" key={currentIndex}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '40px',
            lineHeight: 1,
          }}>
            {currentFact.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <h4 className="font-space" style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#1E293B',
              marginBottom: '12px',
            }}>
              {currentFact.title}
            </h4>
            <p style={{
              fontSize: '15px',
              color: '#1E293B',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}>
              {currentFact.fact}
            </p>
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#3b82f6',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
              }}>
                💡 Learning Tip
              </div>
              <p style={{
                fontSize: '14px',
                color: '#1E293B',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {currentFact.tip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '20px',
      }}>
        {FUN_FACTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            style={{
              width: i === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === currentIndex ? '#3b82f6' : 'rgba(59, 130, 246, 0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
