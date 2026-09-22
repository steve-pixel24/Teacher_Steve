import { useState, useEffect } from 'react';
import { SPELLING_WORDS, SPELLING_CATEGORIES, getWordsByCategory, getRandomWords } from '../data/spelling';
import { completeItem } from '../utils/progress';

interface SpellingPracticeProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

type PracticeMode = 'typing' | 'multiple-choice' | 'listening';

export default function SpellingPractice({ onBack, onComplete }: SpellingPracticeProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('typing');
  const [currentWords, setCurrentWords] = useState(SPELLING_WORDS.slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentWord = currentWords[currentIndex];

  useEffect(() => {
    const words = getWordsByCategory(selectedCategory);
    setCurrentWords(getRandomWords(10, selectedCategory === 'all' ? undefined : selectedCategory));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSessionComplete(false);
  }, [selectedCategory, practiceMode]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const correct = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    setShowAnswer(true);

    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setShowAnswer(false);
      setIsCorrect(null);
    } else {
      setSessionComplete(true);
      const xpEarned = score * 5 + (streak >= 5 ? 20 : 0);
      completeItem('spelling', `session-${Date.now()}`, xpEarned);
      onComplete(xpEarned);
    }
  };

  const handleMultipleChoice = (choice: string) => {
    const correct = choice === currentWord.word;
    setIsCorrect(correct);
    setShowAnswer(true);

    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const getChoices = () => {
    const correct = currentWord.word;
    const others = SPELLING_WORDS
      .filter(w => w.word !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.word);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      case 'expert': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (sessionComplete) {
    const xpEarned = score * 5 + (streak >= 5 ? 20 : 0);
    return (
      <div style={{ minHeight: '100vh', background: 'var(--brand-sand)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              {score === currentWords.length ? '🎉' : score >= currentWords.length * 0.7 ? '👏' : '💪'}
            </div>
            <h2 className="font-heading" style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '16px',
            }}>
              Practice Complete!
            </h2>
            <div style={{
              background: 'var(--brand-light-sand)',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
            }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--brand-orange)', marginBottom: '8px' }}>
                {score}/{currentWords.length}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                Words spelled correctly
              </div>
            </div>
            <div style={{
              background: 'rgba(227, 108, 36, 0.08)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--brand-orange)' }}>
                +{xpEarned} XP
              </div>
              <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>
                {score * 5} XP for correct answers{streak >= 5 ? ' + 20 XP streak bonus!' : ''}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setSessionComplete(false)} className="btn btn-secondary">
                Practice Again
              </button>
              <button onClick={onBack} className="btn btn-primary">
                Back to Spelling
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn btn-secondary">
            ← Back to Categories
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
              Score: {score}/{currentWords.length}
            </span>
            {streak >= 3 && (
              <span style={{
                padding: '4px 12px',
                background: 'rgba(227, 108, 36, 0.1)',
                border: '1px solid rgba(227, 108, 36, 0.3)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--brand-orange)',
              }}>
                🔥 {streak} streak
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Category & Mode Selection */}
        {!showAnswer && currentIndex === 0 && (
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 className="font-heading" style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '16px',
            }}>
              📝 Spelling Practice
            </h3>
            
            {/* Category Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--brand-charcoal)',
                marginBottom: '8px',
              }}>
                Choose Category
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SPELLING_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '8px 16px',
                      background: selectedCategory === cat.id ? 'var(--brand-orange)' : 'var(--white)',
                      color: selectedCategory === cat.id ? 'white' : 'var(--brand-charcoal)',
                      border: `2px solid ${selectedCategory === cat.id ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Practice Mode Selection */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--brand-charcoal)',
                marginBottom: '8px',
              }}>
                Practice Mode
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setPracticeMode('typing')}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: practiceMode === 'typing' ? 'var(--brand-orange)' : 'var(--white)',
                    color: practiceMode === 'typing' ? 'white' : 'var(--brand-charcoal)',
                    border: `2px solid ${practiceMode === 'typing' ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  ⌨️ Type the Word
                </button>
                <button
                  onClick={() => setPracticeMode('multiple-choice')}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: practiceMode === 'multiple-choice' ? 'var(--brand-orange)' : 'var(--white)',
                    color: practiceMode === 'multiple-choice' ? 'white' : 'var(--brand-charcoal)',
                    border: `2px solid ${practiceMode === 'multiple-choice' ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  🎯 Multiple Choice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Practice Area */}
        <div className="card">
          {/* Progress Bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '13px',
              color: 'var(--gray-600)',
            }}>
              <span>Word {currentIndex + 1} of {currentWords.length}</span>
              <span>{Math.round(((currentIndex + 1) / currentWords.length) * 100)}%</span>
            </div>
            <div style={{
              height: '8px',
              background: 'var(--gray-200)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${((currentIndex + 1) / currentWords.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--brand-orange), var(--brand-orange-hover))',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>

          {/* Word Display */}
          <div style={{
            background: 'var(--brand-light-sand)',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{
                padding: '4px 12px',
                background: `${getDifficultyColor(currentWord.difficulty)}20`,
                color: getDifficultyColor(currentWord.difficulty),
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}>
                {currentWord.difficulty}
              </span>
              <span style={{
                padding: '4px 12px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: 'var(--blue)',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
              }}>
                {currentWord.category}
              </span>
            </div>
            
            <h4 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--brand-charcoal)',
              marginBottom: '8px',
            }}>
              Definition:
            </h4>
            <p style={{
              fontSize: '15px',
              color: 'var(--gray-700)',
              lineHeight: 1.6,
              marginBottom: '16px',
            }}>
              {currentWord.definition}
            </p>

            <h4 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--brand-charcoal)',
              marginBottom: '8px',
            }}>
              Example:
            </h4>
            <p style={{
              fontSize: '15px',
              color: 'var(--gray-700)',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}>
              "{currentWord.example}"
            </p>
          </div>

          {/* Input Area */}
          {practiceMode === 'typing' ? (
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--brand-charcoal)',
                marginBottom: '8px',
              }}>
                Type the word:
              </label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !showAnswer && handleSubmit()}
                disabled={showAnswer}
                placeholder="Type here..."
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '18px',
                  background: 'var(--white)',
                  border: `2px solid ${showAnswer ? (isCorrect ? 'var(--green)' : 'var(--red)') : 'var(--gray-300)'}`,
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  marginBottom: '16px',
                }}
              />
            </div>
          ) : (
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--brand-charcoal)',
                marginBottom: '12px',
              }}>
                Choose the correct spelling:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {getChoices().map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => !showAnswer && handleMultipleChoice(choice)}
                    disabled={showAnswer}
                    style={{
                      padding: '16px',
                      background: showAnswer
                        ? choice === currentWord.word
                          ? 'rgba(16, 185, 129, 0.1)'
                          : 'var(--white)'
                        : 'var(--white)',
                      border: `2px solid ${
                        showAnswer
                          ? choice === currentWord.word
                            ? 'var(--green)'
                            : 'var(--gray-200)'
                          : 'var(--gray-200)'
                      }`,
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: showAnswer && choice === currentWord.word ? 'var(--green)' : 'var(--brand-charcoal)',
                      cursor: showAnswer ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {showAnswer && (
            <div style={{
              padding: '16px',
              background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
              borderRadius: '8px',
              marginBottom: '16px',
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                color: isCorrect ? 'var(--green)' : 'var(--red)',
                marginBottom: '8px',
              }}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              {!isCorrect && (
                <div style={{ fontSize: '14px', color: 'var(--brand-charcoal)', marginBottom: '12px' }}>
                  The correct spelling is: <strong>{currentWord.word}</strong>
                </div>
              )}
              <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '8px' }}>
                <strong>Common mistakes:</strong> {currentWord.commonMistakes.join(', ')}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
                <strong>Tips:</strong> {currentWord.tips.join(' • ')}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {!showAnswer ? (
              <button
                onClick={handleSubmit}
                disabled={!userInput.trim() && practiceMode === 'typing'}
                className="btn btn-primary"
                style={{ flex: 1, opacity: !userInput.trim() && practiceMode === 'typing' ? 0.5 : 1 }}
              >
                Check Answer
              </button>
            ) : (
              <button onClick={handleNext} className="btn btn-primary" style={{ flex: 1 }}>
                {currentIndex < currentWords.length - 1 ? 'Next Word →' : 'Finish Practice'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
