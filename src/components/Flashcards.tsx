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

  const markUnknown = () => {
    goNext();
  };

  const goNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 200);
  };

  const goPrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }, 200);
  };

  const allDone = knownCards.size === cards.length;

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span className="streak-fire">
            🔥 {knownCards.size} learned
          </span>
        </div>
        <div className="flex-1 max-w-[200px] h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden ml-4">
          <div
            className="h-full bg-[var(--green)] rounded-full transition-all duration-300"
            style={{ width: `${(knownCards.size / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flashcard-container" onClick={flip}>
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <div className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-wider">Tap to flip</div>
            <div className="font-space text-2xl font-bold text-[var(--text)] mb-2">
              {card.front}
            </div>
            {card.example && (
              <div className="text-sm text-[var(--text-muted)] italic mt-4 px-4">
                "{card.example}"
              </div>
            )}
          </div>
          <div className="flashcard-back">
            <div className="text-xs text-[var(--blue-light)] mb-3 uppercase tracking-wider">Definition</div>
            <div className="text-lg font-medium text-[var(--text)] mb-3">
              {card.back}
            </div>
            {card.example && (
              <div className="text-sm text-[var(--text-muted)] italic mt-2 px-4 border-t border-[rgba(255,255,255,0.1)] pt-3">
                Example: "{card.example}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="btn btn-secondary disabled:opacity-30"
        >
          ← Prev
        </button>

        {isFlipped && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); markUnknown(); }}
              className="btn btn-secondary"
              style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#f87171' }}
            >
              Still Learning
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); markKnown(); }}
              className="btn btn-success"
            >
              ✓ Got It!
            </button>
          </>
        )}

        <button
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
          className="btn btn-secondary disabled:opacity-30"
        >
          Next →
        </button>
      </div>

      {/* Card indicators */}
      <div className="flex justify-center gap-1.5 mt-6">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? 'bg-[var(--blue)] w-6' :
              knownCards.has(i) ? 'bg-[var(--green)]' :
              'bg-[rgba(255,255,255,0.15)]'
            }`}
          />
        ))}
      </div>

      {/* Completion */}
      {allDone && (
        <div className="card text-center py-6 mt-6 animate-fade-in bg-[rgba(16,185,129,0.05)] border-[rgba(16,185,129,0.2)]">
          <div className="text-3xl mb-2">🎉</div>
          <div className="font-space text-lg font-bold text-[var(--green-light)] mb-1">
            All cards learned!
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Great job! You've reviewed all the vocabulary.
          </p>
          <button onClick={onComplete} className="btn btn-primary">
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
