import { useState } from 'react';

interface Flashcard {
  front: string;
  back: string;
  example?: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
  onComplete: () => void;
}

export default function Flashcards({ cards, onComplete }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());

  const card = cards[currentIndex];

  const flip = () => setIsFlipped(!isFlipped);

  const markKnown = () => {
    setKnownCards(prev => new Set([...prev, currentIndex]));
    goNext();
  };

  const markUnknown = () => { goNext(); };

  const goNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) setCurrentIndex(prev => prev + 1);
    }, 200);
  };

  const goPrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    }, 200);
  };

  const allDone = knownCards.size === cards.length;

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748B' }}>Card {currentIndex + 1} of {cards.length}</span>
          <span className="streak-fire">🔥 {knownCards.size} learned</span>
        </div>
        <div style={{ flex: 1, maxWidth: '200px', height: '6px', background: 'rgba(255,255,255,0.5)', borderRadius: '999px', overflow: 'hidden', marginLeft: '16px' }}>
          <div style={{ height: '100%', background: '#10b981', borderRadius: '999px', transition: 'width 0.3s', width: `${(knownCards.size / cards.length) * 100}%` }} />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flashcard-container" onClick={flip}>
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tap to flip</div>
            <div className="font-space" style={{ fontSize: '24px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
              {card.front}
            </div>
            {card.example && (
              <div style={{ fontSize: '14px', color: '#64748B', fontStyle: 'italic', marginTop: '16px', padding: '0 16px' }}>
                "{card.example}"
              </div>
            )}
          </div>
          <div className="flashcard-back">
            <div style={{ fontSize: '12px', color: '#E65100', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Definition</div>
            <div style={{ fontSize: '18px', fontWeight: 500, color: '#1E293B', marginBottom: '12px' }}>
              {card.back}
            </div>
            {card.example && (
              <div style={{ fontSize: '14px', color: '#64748B', fontStyle: 'italic', marginTop: '8px', padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                Example: "{card.example}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
        <button onClick={goPrev} disabled={currentIndex === 0} className="btn btn-secondary" style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}>
          ← Prev
        </button>
        {isFlipped && (
          <>
            <button onClick={(e) => { e.stopPropagation(); markUnknown(); }} className="btn btn-secondary" style={{ borderColor: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>
              Still Learning
            </button>
            <button onClick={(e) => { e.stopPropagation(); markKnown(); }} className="btn" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
              ✓ Got It!
            </button>
          </>
        )}
        <button onClick={goNext} disabled={currentIndex === cards.length - 1} className="btn btn-secondary" style={{ opacity: currentIndex === cards.length - 1 ? 0.3 : 1 }}>
          Next →
        </button>
      </div>

      {/* Card indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            transition: 'all 0.2s',
            background: i === currentIndex ? '#FF9800' : knownCards.has(i) ? '#10b981' : 'rgba(30,41,59,0.15)',
            ...(i === currentIndex ? { width: '24px', borderRadius: '4px' } : {}),
          }} />
        ))}
      </div>

      {/* Completion */}
      {allDone && (
        <div className="card" style={{ textAlign: 'center', padding: '24px', marginTop: '24px', background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
          <div className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>All cards learned!</div>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>Great job! You've reviewed all the vocabulary.</p>
          <button onClick={onComplete} className="btn btn-primary">Continue →</button>
        </div>
      )}
    </div>
  );
}
