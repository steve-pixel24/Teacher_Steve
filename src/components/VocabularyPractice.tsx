import React, { useState } from 'react';
import { VocabSubcategory, VocabWord } from '../data/vocabulary';
import { completeItem, updateItemProgress } from '../utils/progress';

interface VocabularyPracticeProps {
  subcategory: VocabSubcategory;
  onBack: () => void;
  onComplete: (xpReward: number) => void;
}

type PracticeMode = 'learn' | 'quiz' | 'matching';

export const VocabularyPractice: React.FC<VocabularyPracticeProps> = ({ subcategory, onBack, onComplete }) => {
  const [mode, setMode] = useState<PracticeMode>('learn');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(subcategory.words.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [matchingPairs, setMatchingPairs] = useState<{ left: number | null; right: number | null; matched: Set<number> }>({
    left: null,
    right: null,
    matched: new Set(),
  });

  const currentWord = subcategory.words[currentWordIndex];

  // Shuffle array for matching game
  const shuffledRight = React.useMemo(() => {
    const indices = subcategory.words.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [subcategory.words]);

  const handleQuizAnswer = (wordIndex: number, optionIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[wordIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correct = quizAnswers.filter((a, i) => {
      const word = subcategory.words[i];
      const options = generateQuizOptions(word);
      return a === options.indexOf(word.definition);
    }).length;
    const xpReward = Math.round((correct / subcategory.words.length) * 50);
    completeItem('vocabulary', subcategory.id, xpReward);
    onComplete(xpReward);
  };

  const generateQuizOptions = (word: VocabWord): string[] => {
    const correct = word.definition;
    const others = subcategory.words
      .filter(w => w.word !== word.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.definition);
    const options = [correct, ...others].sort(() => Math.random() - 0.5);
    return options;
  };

  const handleMatchingClick = (side: 'left' | 'right', index: number) => {
    if (matchingPairs.matched.has(index)) return;

    if (side === 'left') {
      setMatchingPairs(prev => ({ ...prev, left: index }));
      if (matchingPairs.right !== null) {
        const rightWordIndex = shuffledRight[matchingPairs.right];
        if (index === rightWordIndex) {
          const newMatched = new Set(matchingPairs.matched);
          newMatched.add(index);
          setMatchingPairs({ left: null, right: null, matched: newMatched });
          if (newMatched.size === subcategory.words.length) {
            completeItem('vocabulary', subcategory.id, 30);
            onComplete(30);
          }
        } else {
          setTimeout(() => setMatchingPairs(prev => ({ ...prev, left: null, right: null })), 800);
        }
      }
    } else {
      setMatchingPairs(prev => ({ ...prev, right: index }));
      if (matchingPairs.left !== null) {
        const rightWordIndex = shuffledRight[index];
        if (matchingPairs.left === rightWordIndex) {
          const newMatched = new Set(matchingPairs.matched);
          newMatched.add(matchingPairs.left);
          setMatchingPairs({ left: null, right: null, matched: newMatched });
          if (newMatched.size === subcategory.words.length) {
            completeItem('vocabulary', subcategory.id, 30);
            onComplete(30);
          }
        } else {
          setTimeout(() => setMatchingPairs(prev => ({ ...prev, left: null, right: null })), 800);
        }
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'var(--brand-charcoal)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '8px 16px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}>
            ← Back
          </button>
          <div>
            <h1 className="font-heading" style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'white',
              margin: 0,
            }}>
              {subcategory.icon} {subcategory.title}
            </h1>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>
              {subcategory.wordCount} words · {subcategory.level}
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '12px 24px',
        display: 'flex',
        gap: '8px',
      }}>
        <button
          onClick={() => setMode('learn')}
          style={{
            padding: '8px 16px',
            background: mode === 'learn' ? 'var(--brand-orange)' : 'var(--gray-100)',
            color: mode === 'learn' ? 'white' : 'var(--brand-charcoal)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          📖 Learn
        </button>
        <button
          onClick={() => setMode('quiz')}
          style={{
            padding: '8px 16px',
            background: mode === 'quiz' ? 'var(--brand-orange)' : 'var(--gray-100)',
            color: mode === 'quiz' ? 'white' : 'var(--brand-charcoal)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ❓ Quiz
        </button>
        <button
          onClick={() => setMode('matching')}
          style={{
            padding: '8px 16px',
            background: mode === 'matching' ? 'var(--brand-orange)' : 'var(--gray-100)',
            color: mode === 'matching' ? 'white' : 'var(--brand-charcoal)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          🔗 Match
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {mode === 'learn' && (
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                Word {currentWordIndex + 1} of {subcategory.words.length}
              </span>
            </div>
            <h2 className="font-heading" style={{
              fontSize: '36px',
              fontWeight: 800,
              color: 'var(--brand-charcoal)',
              marginBottom: '8px',
            }}>
              {currentWord.word}
            </h2>
            <p className="font-mono" style={{
              fontSize: '14px',
              color: 'var(--gray-400)',
              marginBottom: '16px',
            }}>
              {currentWord.phonetic}
            </p>
            <span className="tag tag-blue" style={{ marginBottom: '24px' }}>
              {currentWord.pos}
            </span>

            {showDefinition ? (
              <div style={{ marginTop: '24px', textAlign: 'left' }}>
                <div style={{
                  background: 'var(--brand-light-sand)',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}>
                  <p style={{ fontSize: '16px', color: 'var(--brand-charcoal)', marginBottom: '12px' }}>
                    <strong>Definition:</strong> {currentWord.definition}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--gray-600)', fontStyle: 'italic' }}>
                    "{currentWord.example}"
                  </p>
                  {currentWord.synonyms.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-charcoal)' }}>
                        Synonyms:{' '}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
                        {currentWord.synonyms.join(', ')}
                      </span>
                    </div>
                  )}
                  {currentWord.uk && currentWord.us && (
                    <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '13px' }}>🇬🇧 {currentWord.uk}</span>
                      <span style={{ fontSize: '13px' }}>🇺🇸 {currentWord.us}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowDefinition(true)}
                className="btn btn-primary"
                style={{ marginTop: '24px' }}
              >
                Show Definition
              </button>
            )}

            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => {
                  setCurrentWordIndex(Math.max(0, currentWordIndex - 1));
                  setShowDefinition(false);
                }}
                disabled={currentWordIndex === 0}
                className="btn btn-secondary"
                style={{ opacity: currentWordIndex === 0 ? 0.5 : 1 }}
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  if (currentWordIndex < subcategory.words.length - 1) {
                    setCurrentWordIndex(currentWordIndex + 1);
                    setShowDefinition(false);
                  }
                }}
                disabled={currentWordIndex === subcategory.words.length - 1}
                className="btn btn-primary"
                style={{ opacity: currentWordIndex === subcategory.words.length - 1 ? 0.5 : 1 }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {mode === 'quiz' && (
          <div>
            <h3 className="font-heading" style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '24px',
            }}>
              Match the word with its definition
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {subcategory.words.map((word, wordIndex) => {
                const options = generateQuizOptions(word);
                return (
                  <div key={wordIndex} className="card" style={{ padding: '20px' }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '12px',
                    }}>
                      {word.word}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => !quizSubmitted && handleQuizAnswer(wordIndex, optIndex)}
                          disabled={quizSubmitted}
                          style={{
                            padding: '12px 16px',
                            background: quizSubmitted
                              ? option === word.definition
                                ? 'rgba(16,185,129,0.1)'
                                : quizAnswers[wordIndex] === optIndex
                                ? 'rgba(239,68,68,0.1)'
                                : 'var(--white)'
                              : quizAnswers[wordIndex] === optIndex
                              ? 'var(--brand-orange-light)'
                              : 'var(--white)',
                            border: `2px solid ${
                              quizSubmitted
                                ? option === word.definition
                                  ? 'var(--green)'
                                  : quizAnswers[wordIndex] === optIndex
                                  ? 'var(--red)'
                                  : 'var(--gray-200)'
                                : quizAnswers[wordIndex] === optIndex
                                ? 'var(--brand-orange)'
                                : 'var(--gray-200)'
                            }`,
                            borderRadius: '8px',
                            fontSize: '14px',
                            color: 'var(--brand-charcoal)',
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {!quizSubmitted && (
              <button
                onClick={handleQuizSubmit}
                className="btn btn-primary"
                style={{ marginTop: '24px', width: '100%' }}
              >
                Submit Quiz
              </button>
            )}
            {quizSubmitted && (
              <div className="card" style={{ marginTop: '24px', textAlign: 'center', padding: '32px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {quizAnswers.filter((a, i) => {
                    const word = subcategory.words[i];
                    const options = generateQuizOptions(word);
                    return a === options.indexOf(word.definition);
                  }).length === subcategory.words.length ? '🏆' : '👍'}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand-charcoal)', marginBottom: '8px' }}>
                  Quiz Complete!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                  You earned XP for completing this vocabulary quiz.
                </p>
              </div>
            )}
          </div>
        )}

        {mode === 'matching' && (
          <div>
            <h3 className="font-heading" style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '24px',
            }}>
              Match words with their definitions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-500)', marginBottom: '12px' }}>
                  Words
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {subcategory.words.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleMatchingClick('left', index)}
                      disabled={matchingPairs.matched.has(index)}
                      style={{
                        padding: '12px 16px',
                        background: matchingPairs.matched.has(index)
                          ? 'rgba(16,185,129,0.1)'
                          : matchingPairs.left === index
                          ? 'var(--brand-orange-light)'
                          : 'var(--white)',
                        border: `2px solid ${
                          matchingPairs.matched.has(index)
                            ? 'var(--green)'
                            : matchingPairs.left === index
                            ? 'var(--brand-orange)'
                            : 'var(--gray-200)'
                        }`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: matchingPairs.matched.has(index) ? 'var(--green)' : 'var(--brand-charcoal)',
                        cursor: matchingPairs.matched.has(index) ? 'default' : 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {word.word} {matchingPairs.matched.has(index) && '✓'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-500)', marginBottom: '12px' }}>
                  Definitions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {shuffledRight.map((wordIndex, shuffledIndex) => {
                    const word = subcategory.words[wordIndex];
                    return (
                      <button
                        key={shuffledIndex}
                        onClick={() => handleMatchingClick('right', shuffledIndex)}
                        disabled={matchingPairs.matched.has(wordIndex)}
                        style={{
                          padding: '12px 16px',
                          background: matchingPairs.matched.has(wordIndex)
                            ? 'rgba(16,185,129,0.1)'
                            : matchingPairs.right === shuffledIndex
                            ? 'var(--brand-orange-light)'
                            : 'var(--white)',
                          border: `2px solid ${
                            matchingPairs.matched.has(wordIndex)
                              ? 'var(--green)'
                              : matchingPairs.right === shuffledIndex
                              ? 'var(--brand-orange)'
                              : 'var(--gray-200)'
                          }`,
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: matchingPairs.matched.has(wordIndex) ? 'var(--green)' : 'var(--brand-charcoal)',
                          cursor: matchingPairs.matched.has(wordIndex) ? 'default' : 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {word.definition} {matchingPairs.matched.has(wordIndex) && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {matchingPairs.matched.size === subcategory.words.length && (
              <div className="card" style={{ marginTop: '24px', textAlign: 'center', padding: '32px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand-charcoal)', marginBottom: '8px' }}>
                  All Matched!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                  You earned 30 XP for completing the matching game.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
