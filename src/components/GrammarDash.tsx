import React, { useState, useEffect } from 'react';
import { grammarQuestions } from '../data/games';
import { completeItem, updateItemProgress } from '../utils/progress';

interface GrammarDashProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

export const GrammarDash: React.FC<GrammarDashProps> = ({ onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState(grammarQuestions);

  // Shuffle questions on mount
  useEffect(() => {
    const shuffled = [...grammarQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10)); // Take 10 random questions
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      const xpEarned = Math.min(100, Math.round(score * 10));
      completeItem('game', 'grammar-dash', xpEarned);
      onComplete(xpEarned);
    }
  }, [timeLeft, gameOver, score, onComplete]);

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setGameOver(true);
        const xpEarned = Math.min(100, Math.round(score * 10));
        completeItem('game', 'grammar-dash', xpEarned);
        onComplete(xpEarned);
      }
    }, 2000);
  };

  if (gameOver) {
    const xpEarned = Math.min(100, Math.round(score * 10));
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
              Game Over!
            </h1>

            <div style={{
              fontSize: '64px',
              fontWeight: 800,
              color: 'var(--brand-orange)',
              marginBottom: '16px',
            }}>
              {score}/{questions.length}
            </div>

            <p style={{
              fontSize: '18px',
              color: 'var(--gray-600)',
              marginBottom: '32px',
            }}>
              Correct Answers
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

  const question = questions[currentQuestion];

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
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn btn-secondary">
            ← Back to Games
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-orange)' }}>
              Score: {score}
            </span>
            <span style={{
              fontSize: '16px',
              fontWeight: 700,
              color: timeLeft <= 10 ? 'var(--red)' : 'var(--brand-charcoal)',
            }}>
              ⏱️ {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '4px',
        background: 'var(--gray-200)',
      }}>
        <div style={{
          height: '100%',
          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          background: 'var(--brand-orange)',
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Game Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: '12px',
          padding: '48px',
          boxShadow: 'var(--card-shadow)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '14px',
            color: 'var(--gray-500)',
            marginBottom: '16px',
          }}>
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--brand-charcoal)',
            marginBottom: '32px',
            lineHeight: 1.4,
          }}>
            {question.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showResult = showExplanation;

              let bgColor = 'var(--white)';
              let borderColor = 'var(--gray-300)';
              let textColor = 'var(--brand-charcoal)';

              if (showResult) {
                if (isCorrect) {
                  bgColor = 'rgba(16, 185, 129, 0.1)';
                  borderColor = 'var(--green)';
                  textColor = 'var(--green)';
                } else if (isSelected && !isCorrect) {
                  bgColor = 'rgba(239, 68, 68, 0.1)';
                  borderColor = 'var(--red)';
                  textColor = 'var(--red)';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  style={{
                    padding: '16px 20px',
                    background: bgColor,
                    color: textColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: showExplanation ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'var(--brand-light-sand)',
              borderRadius: '8px',
              border: '1px solid var(--gray-200)',
            }}>
              <p style={{
                fontSize: '14px',
                color: 'var(--brand-charcoal)',
                margin: 0,
                lineHeight: 1.6,
              }}>
                <strong style={{ color: 'var(--brand-orange)' }}>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
