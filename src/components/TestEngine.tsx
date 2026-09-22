import React, { useState } from 'react';
import { Test } from '../data/tests';
import { completeItem } from '../utils/progress';

interface TestEngineProps {
  test: Test;
  onBack: () => void;
  onComplete: (xpReward: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Generate sample questions based on test type
function generateQuestions(test: Test): Question[] {
  const questions: Question[] = [];
  
  for (let i = 0; i < test.questionCount; i++) {
    questions.push({
      id: i,
      question: `Sample question ${i + 1} for ${test.title}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `This is the explanation for question ${i + 1}.`,
    });
  }
  
  return questions;
}

export const TestEngine: React.FC<TestEngineProps> = ({ test, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(test.questionCount).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = generateQuestions(test);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < test.questionCount - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
      const percentage = (score / test.questionCount) * 100;
      
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
    const percentage = Math.round((score / test.questionCount) * 100);

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
              You answered {score} out of {test.questionCount} questions correctly
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
              Question {currentQuestion + 1} of {test.questionCount}
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
            {question.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                style={{
                  padding: '16px 20px',
                  background: answers[currentQuestion] === index ? 'var(--brand-orange)' : 'var(--white)',
                  color: answers[currentQuestion] === index ? 'var(--white)' : 'var(--brand-charcoal)',
                  border: `2px solid ${answers[currentQuestion] === index ? 'var(--brand-orange)' : 'var(--gray-300)'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {option}
              </button>
            ))}
          </div>

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
              {currentQuestion === test.questionCount - 1 ? 'Finish Test' : 'Next →'}
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
