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
    if (selectedRight !== null) checkMatch(index, selectedRight);
  };

  const handleRightClick = (shuffledIndex: number) => {
    const pairIndex = shuffledRight[shuffledIndex];
    if (matchedPairs.has(pairIndex)) return;
    setSelectedRight(shuffledIndex);
    setWrongPair(null);
    if (selectedLeft !== null) checkMatch(selectedLeft, shuffledIndex);
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
      setTimeout(() => { setWrongPair(null); setSelectedLeft(null); setSelectedRight(null); }, 800);
    }
  };

  const allMatched = matchedPairs.size === pairs.length;

  return (
    <div className="animate-fade-in">
      <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>{instruction}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: '#64748B' }}>
          Matched: <span style={{ color: '#10b981', fontWeight: 600 }}>{matchedPairs.size}/{pairs.length}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#64748B' }}>
          Attempts: <span style={{ color: '#FF9800', fontWeight: 600 }}>{attempts}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div>
          <div className="font-space" style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '10px', textAlign: 'center' }}>Term</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pairs.map((pair, i) => {
              const isMatched = matchedPairs.has(i);
              const isSelected = selectedLeft === i;
              const isWrong = wrongPair?.left === i;
              let className = 'match-item';
              if (isMatched) className += ' matched';
              else if (isWrong) className += ' wrong-match';
              else if (isSelected) className += ' selected';
              return (
                <div key={i} className={className} onClick={() => handleLeftClick(i)}>
                  {pair.left} {isMatched && <span style={{ marginLeft: '8px' }}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="font-space" style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '10px', textAlign: 'center' }}>Meaning</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {shuffledRight.map((pairIndex, shuffledIndex) => {
              const isMatched = matchedPairs.has(pairIndex);
              const isSelected = selectedRight === shuffledIndex;
              const isWrong = wrongPair?.right === shuffledIndex;
              let className = 'match-item';
              if (isMatched) className += ' matched';
              else if (isWrong) className += ' wrong-match';
              else if (isSelected) className += ' selected';
              return (
                <div key={shuffledIndex} className={className} onClick={() => handleRightClick(shuffledIndex)}>
                  {pairs[pairIndex].right} {isMatched && <span style={{ marginLeft: '8px' }}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {allMatched && (
        <div className="card" style={{ textAlign: 'center', padding: '24px', marginTop: '32px', background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>{attempts === pairs.length ? '🎯' : '⭐'}</div>
          <div className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>
            {attempts === pairs.length ? 'Perfect matching!' : 'All matched!'}
          </div>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>Completed in {attempts} attempt{attempts > 1 ? 's' : ''}</p>
          <button onClick={onComplete} className="btn btn-primary">Continue →</button>
        </div>
      )}
    </div>
  );
}
