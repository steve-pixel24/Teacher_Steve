import React, { useState, useEffect } from 'react';
import { idioms } from '../data/games';
import { completeItem } from '../utils/progress';

interface IdiomMatchProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

export const IdiomMatch: React.FC<IdiomMatchProps> = ({ onBack, onComplete }) => {
  const [selectedIdiom, setSelectedIdiom] = useState<number | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<{ idiom: number; meaning: number } | null>(null);
  const [shuffledMeanings, setShuffledMeanings] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Shuffle meanings on mount
  useEffect(() => {
    const indices = idioms.map((_, i) => i);
    const shuffled = [...indices].sort(() => Math.random() - 0.5);
    setShuffledMeanings(shuffled);
  }, []);

  const handleIdiomClick = (index: number) => {
    if (matchedPairs.includes(index)) return;
    setSelectedIdiom(index);
    setWrongPair(null);

    if (selectedMeaning !== null) {
      checkMatch(index, selectedMeaning);
    }
  };

  const handleMeaningClick = (shuffledIndex: number) => {
    const originalIndex = shuffledMeanings[shuffledIndex];
    if (matchedPairs.includes(originalIndex)) return;
    setSelectedMeaning(shuffledIndex);
    setWrongPair(null);

    if (selectedIdiom !== null) {
      checkMatch(selectedIdiom, shuffledIndex);
    }
  };

  const checkMatch = (idiomIndex: number, meaningShuffledIndex: number) => {
    const meaningOriginalIndex = shuffledMeanings[meaningShuffledIndex];
    setAttempts(attempts + 1);

    if (idiomIndex === meaningOriginalIndex) {
      // Correct match
      setMatchedPairs([...matchedPairs, idiomIndex]);
      setScore(score + 1);
      setSelectedIdiom(null);
      setSelectedMeaning(null);

      // Check if game is complete
      if (matchedPairs.length + 1 === idioms.length) {
        setGameComplete(true);
        const xpEarned = Math.min(100, Math.round((idioms.length / attempts) * 100));
        completeItem('game', 'idiom-match', xpEarned);
        onComplete(xpEarned);
      }
    } else {
      // Wrong match
      setWrongPair({ idiom: idiomIndex, meaning: meaningShuffledIndex });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedIdiom(null);
        setSelectedMeaning(null);
      }, 1000);
    }
  };

  if (gameComplete) {
    const xpEarned = Math.min(100, Math.round((idioms.length / attempts) * 100));
    return (
      <div style={{ minHeight: '100vh', background: 'var(--brand-sand)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '12px',
            padding: '48px',
            boxShadow: 'var(--card-shadow)',
            textAlign: 'center',
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 800,
              color: 'var(--brand-charcoal)',
              marginBottom: '24px',
              fontFamily: 'Montserrat, sans-serif',
            }}>
              Congratulations!
            </h1>

            <div style={{
              fontSize: '64px',
              marginBottom: '16px',
            }}>
              🎉
            </div>

            <p style={{
              fontSize: '18px',
              color: 'var(--gray-600)',
              marginBottom: '16px',
            }}>
              You matched all {idioms.length} idioms!
            </p>

            <p style={{
              fontSize: '16px',
              color: 'var(--gray-500)',
              marginBottom: '32px',
            }}>
              Attempts: {attempts}
            </p>

            <div style={{
              background: 'var(--brand-light-sand)',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '32px',
            }}>
              <p style={{ fontSize: '16px', color: 'var(--brand-charcoal)', marginBottom: '8px' }}>
                <strong>XP Earned:</strong>
              </p>
              <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--brand-orange)' }}>
                +{xpEarned} XP
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={onBack} className="btn btn-secondary">
                ← Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--brand-sand)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn btn-secondary">
            ← Back to Games
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-orange)' }}>
              Matched: {matchedPairs.length}/{idioms.length}
            </span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gray-600)' }}>
              Attempts: {attempts}
            </span>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--brand-charcoal)',
            marginBottom: '8px',
            textAlign: 'center',
          }}>
            💡 Match the Idioms
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--gray-500)',
            marginBottom: '32px',
            textAlign: 'center',
          }}>
            Click an idiom, then click its meaning
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }}>
            {/* Idioms Column */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--gray-600)',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Idioms
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {idioms.map((idiom, index) => {
                  const isMatched = matchedPairs.includes(index);
                  const isSelected = selectedIdiom === index;
                  const isWrong = wrongPair?.idiom === index;

                  let bgColor = 'var(--white)';
                  let borderColor = 'var(--gray-300)';
                  let textColor = 'var(--brand-charcoal)';

                  if (isMatched) {
                    bgColor = 'rgba(16, 185, 129, 0.1)';
                    borderColor = 'var(--green)';
                    textColor = 'var(--green)';
                  } else if (isWrong) {
                    bgColor = 'rgba(239, 68, 68, 0.1)';
                    borderColor = 'var(--red)';
                    textColor = 'var(--red)';
                  } else if (isSelected) {
                    bgColor = 'var(--brand-orange-light)';
                    borderColor = 'var(--brand-orange)';
                    textColor = 'var(--brand-orange)';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleIdiomClick(index)}
                      disabled={isMatched}
                      style={{
                        padding: '16px',
                        background: bgColor,
                        color: textColor,
                        border: `2px solid ${borderColor}`,
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: isMatched ? 'default' : 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                      }}
                    >
                      {idiom.idiom} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Meanings Column */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--gray-600)',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Meanings
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {shuffledMeanings.map((originalIndex, shuffledIndex) => {
                  const isMatched = matchedPairs.includes(originalIndex);
                  const isSelected = selectedMeaning === shuffledIndex;
                  const isWrong = wrongPair?.meaning === shuffledIndex;

                  let bgColor = 'var(--white)';
                  let borderColor = 'var(--gray-300)';
                  let textColor = 'var(--brand-charcoal)';

                  if (isMatched) {
                    bgColor = 'rgba(16, 185, 129, 0.1)';
                    borderColor = 'var(--green)';
                    textColor = 'var(--green)';
                  } else if (isWrong) {
                    bgColor = 'rgba(239, 68, 68, 0.1)';
                    borderColor = 'var(--red)';
                    textColor = 'var(--red)';
                  } else if (isSelected) {
                    bgColor = 'var(--brand-orange-light)';
                    borderColor = 'var(--brand-orange)';
                    textColor = 'var(--brand-orange)';
                  }

                  return (
                    <button
                      key={shuffledIndex}
                      onClick={() => handleMeaningClick(shuffledIndex)}
                      disabled={isMatched}
                      style={{
                        padding: '16px',
                        background: bgColor,
                        color: textColor,
                        border: `2px solid ${borderColor}`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        cursor: isMatched ? 'default' : 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        lineHeight: 1.4,
                      }}
                    >
                      {idioms[originalIndex].meaning} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
