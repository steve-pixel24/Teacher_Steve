import React, { useState } from 'react';
import { Test } from '../data/tests';
import { completeItem } from '../utils/progress';

interface TestEngineProps {
  test: Test;
  onBack: () => void;
  onComplete: (xpReward: number) => void;
}

export const TestEngine: React.FC<TestEngineProps> = ({ test, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(test.questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = test.questions;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    if (!isCompleted) {
      const score = calculateScore();
      const percentage = (score / questions.length) * 100;
      
      // Award XP based on performance
      let xpEarned = 0;
      if (percentage >= 90) {
        xpEarned = test.xpReward;
      } else if (percentage >= 70) {
        xpEarned = Math.round(test.xpReward * 0.75);
      } else if (percentage >= 50) {
        xpEarned = Math.round(test.xpReward * 0.5);
      }

      completeItem('test', test.id, xpEarned);
      setIsCompleted(true);
      onComplete(xpEarned);
    }
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div style={{ minHeight: '100vh', background: 'var(--brand-sand)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
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
              Test Results
            </h1>

            <div style={{
              fontSize: '64px',
              fontWeight: 800,
              color: percentage >= 70 ? 'var(--green)' : 'var(--brand-orange)',
              marginBottom: '16px',
            }}>
              {percentage}%
            </div>

            <p style={{
              fontSize: '18px',
              color: 'var(--gray-600)',
              marginBottom: '32px',
            }}>
              You answered {score} out of {questions.length} questions correctly
            </p>

            {!isCompleted && (
              <div style={{
                background: 'var(--brand-light-sand)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '32px',
              }}>
                <p style={{ fontSize: '16px', color: 'var(--brand-charcoal)', marginBottom: '8px' }}>
                  <strong>XP Reward:</strong>
                </p>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--brand-orange)' }}>
                  +{(() => {
                    if (percentage >= 90) return test.xpReward;
                    if (percentage >= 70) return Math.round(test.xpReward * 0.75);
                    if (percentage >= 50) return Math.round(test.xpReward * 0.5);
                    return 0;
                  })()} XP
                </p>
              </div>
            )}

            {isCompleted && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '32px',
              }}>
                <p style={{ fontSize: '18px', color: 'var(--green)', fontWeight: 600 }}>
                  ✅ Test Completed!
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={onBack} className="btn-secondary">
                ← Back to Tests
              </button>
              {!isCompleted && (
                <button onClick={handleSubmit} className="btn-primary">
                  Submit & Earn XP
                </button>
              )}
            </div>
          </div>
        </div>

        <style>{`
          .btn-primary {
            padding: 12px 24px;
            background: var(--brand-orange);
            color: var(--white);
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-primary:hover {
            background: var(--brand-orange-hover);
          }
          .btn-secondary {
            padding: 12px 24px;
            background: var(--white);
            color: var(--brand-charcoal);
            border: 1px solid var(--gray-300);
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-secondary:hover {
            background: var(--gray-100);
          }
        `}</style>
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
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn-secondary">
            ← Back to Tests
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span style={{
              padding: '4px 12px',
              background: 'var(--brand-orange)',
              color: 'var(--white)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
            }}>
              ⭐ {test.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: '12px',
          padding: '48px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--brand-charcoal)',
            marginBottom: '32px',
            lineHeight: 1.4,
          }}>
            {currentQ.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {currentQ.options.map((option, index) => {
              const isSelected = answers[currentQuestion] === index;
              const isCorrect = index === currentQ.correctAnswer;
              const showResult = showExplanation && answers[currentQuestion] !== null;
              
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
              } else if (isSelected) {
                bgColor = 'var(--brand-orange)';
                borderColor = 'var(--brand-orange)';
                textColor = 'var(--white)';
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswer(index)}
                  disabled={showExplanation}
                  style={{
                    padding: '16px 20px',
                    background: bgColor,
                    color: textColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    textAlign: 'left',
                    cursor: showExplanation ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div style={{
              padding: '16px',
              background: 'var(--brand-light-sand)',
              borderRadius: '8px',
              marginBottom: '24px',
              border: '1px solid var(--gray-200)',
            }}>
              <p style={{
                fontSize: '14px',
                color: 'var(--brand-charcoal)',
                margin: 0,
                lineHeight: 1.6,
              }}>
                <strong style={{ color: 'var(--brand-orange)' }}>Explanation:</strong> {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="btn-secondary"
              style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
            >
              ← Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === null}
              className="btn-primary"
              style={{ opacity: answers[currentQuestion] === null ? 0.5 : 1 }}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next →'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .btn-primary {
          padding: 12px 24px;
          background: var(--brand-orange);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-primary:hover:not(:disabled) {
          background: var(--brand-orange-hover);
        }
        .btn-secondary {
          padding: 12px 24px;
          background: var(--white);
          color: var(--brand-charcoal);
          border: 1px solid var(--gray-300);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover:not(:disabled) {
          background: var(--gray-100);
        }
      `}</style>
    </div>
  );
};
