import { useState, useMemo } from 'react';

interface MatchingGameProps {
  instruction: string;
  pairs: { left: string; right: string }[];
  onComplete: () => void;
}

export default function MatchingGame({ instruction, pairs, onComplete }: MatchingGameProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: number; right: number } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const shuffledRight = useMemo(() => {
    const indices = pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [pairs]);

  const handleLeftClick = (index: number) => {
    if (matchedPairs.has(index)) return;
    setSelectedLeft(index);
    setWrongPair(null);

    if (selectedRight !== null) {
      checkMatch(index, selectedRight);
    }
  };

  const handleRightClick = (shuffledIndex: number) => {
    const pairIndex = shuffledRight[shuffledIndex];
    if (matchedPairs.has(pairIndex)) return;
    setSelectedRight(shuffledIndex);
    setWrongPair(null);

    if (selectedLeft !== null) {
      checkMatch(selectedLeft, shuffledIndex);
    }
  };

  const checkMatch = (leftIndex: number, rightShuffledIndex: number) => {
    const rightPairIndex = shuffledRight[rightShuffledIndex];
    setAttempts(prev => prev + 1);

    if (leftIndex === rightPairIndex) {
      setMatchedPairs(prev => new Set([...prev, leftIndex]));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setWrongPair({ left: leftIndex, right: rightShuffledIndex });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 800);
    }
  };

  const allMatched = matchedPairs.size === pairs.length;

  return (
    <div className="animate-fade-in">
      <p className="text-sm text-[var(--text-muted)] mb-6">{instruction}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-xs text-[var(--text-muted)]">
          Matched: <span className="text-[var(--green-light)] font-semibold">{matchedPairs.size}/{pairs.length}</span>
        </div>
        <div className="text-xs text-[var(--text-muted)]">
          Attempts: <span className="text-[var(--blue-light)] font-semibold">{attempts}</span>
        </div>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {/* Left Column */}
        <div className="match-column">
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-space font-semibold mb-2 text-center">
            Term
          </div>
          {pairs.map((pair, i) => {
            const isMatched = matchedPairs.has(i);
            const isSelected = selectedLeft === i;
            const isWrong = wrongPair?.left === i;

            let className = 'match-item';
            if (isMatched) className += ' matched';
            else if (isWrong) className += ' wrong-match';
            else if (isSelected) className += ' selected';

            return (
              <div
                key={i}
                className={className}
                onClick={() => handleLeftClick(i)}
              >
                {pair.left}
                {isMatched && <span className="ml-2">✓</span>}
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="match-column">
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-space font-semibold mb-2 text-center">
            Meaning
          </div>
          {shuffledRight.map((pairIndex, shuffledIndex) => {
            const isMatched = matchedPairs.has(pairIndex);
            const isSelected = selectedRight === shuffledIndex;
            const isWrong = wrongPair?.right === shuffledIndex;

            let className = 'match-item';
            if (isMatched) className += ' matched';
            else if (isWrong) className += ' wrong-match';
            else if (isSelected) className += ' selected';

            return (
              <div
                key={shuffledIndex}
                className={className}
                onClick={() => handleRightClick(shuffledIndex)}
              >
                {pairs[pairIndex].right}
                {isMatched && <span className="ml-2">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion */}
      {allMatched && (
        <div className="card text-center py-6 mt-8 animate-fade-in bg-[rgba(16,185,129,0.05)] border-[rgba(16,185,129,0.2)]">
          <div className="text-3xl mb-2">
            {attempts === pairs.length ? '🎯' : attempts <= pairs.length * 1.5 ? '⭐' : '👍'}
          </div>
          <div className="font-space text-lg font-bold text-[var(--green-light)] mb-1">
            {attempts === pairs.length ? 'Perfect matching!' : 'All matched!'}
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Completed in {attempts} attempt{attempts > 1 ? 's' : ''}
          </p>
          <button onClick={onComplete} className="btn btn-primary">
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
