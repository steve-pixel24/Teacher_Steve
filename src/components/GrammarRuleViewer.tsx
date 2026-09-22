import React, { useState } from 'react';
import { GrammarCategory, GrammarRule } from '../data/grammar';
import { completeItem, updateItemProgress } from '../utils/progress';

interface GrammarRuleViewerProps {
  category: GrammarCategory;
  onBack: () => void;
  onComplete: (xpReward: number) => void;
}

export const GrammarRuleViewer: React.FC<GrammarRuleViewerProps> = ({ category, onBack, onComplete }) => {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [showExamples, setShowExamples] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(category.rules.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentRule = category.rules[currentRuleIndex];

  const handleQuizAnswer = (ruleIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[ruleIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correct = quizAnswers.filter((a, i) => a === 0).length; // Assuming first option is always correct for demo
    const xpReward = Math.round((correct / category.rules.length) * 50);
    completeItem('grammar', category.id, xpReward);
    onComplete(xpReward);
  };

  const generateQuizQuestion = (rule: GrammarRule) => {
    // Simple quiz: show example with blank, ask to fill in
    const example = rule.examples[0];
    return {
      question: `Choose the correct form: "${example}"`,
      options: [example, example.replace(/\b\w+\b/, 'wrong'), example.replace(/\b\w+\b/, 'incorrect')],
      correct: 0
    };
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
              {category.icon} {category.title}
            </h1>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>
              {category.ruleCount} rules · {category.level}
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
          onClick={() => setQuizMode(false)}
          style={{
            padding: '8px 16px',
            background: !quizMode ? 'var(--brand-orange)' : 'var(--gray-100)',
            color: !quizMode ? 'white' : 'var(--brand-charcoal)',
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
          onClick={() => setQuizMode(true)}
          style={{
            padding: '8px 16px',
            background: quizMode ? 'var(--brand-orange)' : 'var(--gray-100)',
            color: quizMode ? 'white' : 'var(--brand-charcoal)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ❓ Quiz
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {!quizMode ? (
          <>
            {/* Rule Navigation */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}>
              {category.rules.map((rule, index) => (
                <button
                  key={rule.id}
                  onClick={() => {
                    setCurrentRuleIndex(index);
                    setShowExamples(false);
                    setShowMistakes(false);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: index === currentRuleIndex ? 'var(--brand-orange)' : 'var(--white)',
                    color: index === currentRuleIndex ? 'white' : 'var(--brand-charcoal)',
                    border: `1px solid ${index === currentRuleIndex ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {index + 1}. {rule.title}
                </button>
              ))}
            </div>

            {/* Current Rule */}
            <div className="card" style={{ padding: '32px' }}>
              <h2 className="font-heading" style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--brand-charcoal)',
                marginBottom: '8px',
              }}>
                {currentRule.title}
              </h2>
              
              <span className="tag tag-blue" style={{ marginBottom: '16px' }}>
                Level {currentRule.level}
              </span>

              {/* Explanation */}
              <div style={{
                background: 'var(--brand-light-sand)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--brand-charcoal)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Explanation
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--brand-graphite)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {currentRule.explanation}
                </p>
              </div>

              {/* Formula */}
              {currentRule.formula && (
                <div style={{
                  background: 'rgba(59, 130, 246, 0.08)',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}>
                  <h3 style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--blue)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Formula
                  </h3>
                  <p className="font-mono" style={{
                    fontSize: '14px',
                    color: 'var(--brand-charcoal)',
                    margin: 0,
                    whiteSpace: 'pre-line',
                  }}>
                    {currentRule.formula}
                  </p>
                </div>
              )}

              {/* Examples */}
              <div style={{ marginBottom: '20px' }}>
                <button
                  onClick={() => setShowExamples(!showExamples)}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--gray-300)',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--brand-charcoal)',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>💡 Examples</span>
                  <span>{showExamples ? '▼' : '▶'}</span>
                </button>
                {showExamples && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px',
                    background: 'var(--gray-100)',
                    borderRadius: '8px',
                  }}>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {currentRule.examples.map((example, i) => (
                        <li key={i} style={{
                          fontSize: '14px',
                          color: 'var(--brand-charcoal)',
                          marginBottom: '8px',
                          lineHeight: 1.6,
                        }}>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Common Mistakes */}
              {currentRule.commonMistakes && (
                <div style={{ marginBottom: '20px' }}>
                  <button
                    onClick={() => setShowMistakes(!showMistakes)}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--gray-300)',
                      borderRadius: '8px',
                      padding: '12px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--brand-charcoal)',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>⚠️ Common Mistakes</span>
                    <span>{showMistakes ? '▼' : '▶'}</span>
                  </button>
                  {showMistakes && (
                    <div style={{
                      marginTop: '12px',
                      padding: '16px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {currentRule.commonMistakes.map((mistake, i) => (
                          <li key={i} style={{
                            fontSize: '14px',
                            color: 'var(--brand-charcoal)',
                            marginBottom: '8px',
                            lineHeight: 1.6,
                          }}>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tips */}
              {currentRule.tips && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}>
                  <h3 style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--green)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    💡 Tips
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {currentRule.tips.map((tip, i) => (
                      <li key={i} style={{
                        fontSize: '14px',
                        color: 'var(--brand-charcoal)',
                        marginBottom: '6px',
                        lineHeight: 1.5,
                      }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* UK/US Difference */}
              {currentRule.ukUsDifference && (
                <div style={{
                  marginTop: '20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}>
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    padding: '16px',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🇬🇧</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      British English
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-charcoal)' }}>
                      {currentRule.ukUsDifference.uk}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    padding: '16px',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🇺🇸</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--red)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      American English
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-charcoal)' }}>
                      {currentRule.ukUsDifference.us}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '24px',
            }}>
              <button
                onClick={() => {
                  if (currentRuleIndex > 0) {
                    setCurrentRuleIndex(currentRuleIndex - 1);
                    setShowExamples(false);
                    setShowMistakes(false);
                  }
                }}
                disabled={currentRuleIndex === 0}
                className="btn btn-secondary"
                style={{ opacity: currentRuleIndex === 0 ? 0.5 : 1 }}
              >
                ← Previous Rule
              </button>
              <button
                onClick={() => {
                  if (currentRuleIndex < category.rules.length - 1) {
                    setCurrentRuleIndex(currentRuleIndex + 1);
                    setShowExamples(false);
                    setShowMistakes(false);
                  }
                }}
                disabled={currentRuleIndex === category.rules.length - 1}
                className="btn btn-primary"
                style={{ opacity: currentRuleIndex === category.rules.length - 1 ? 0.5 : 1 }}
              >
                Next Rule →
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Quiz Mode */}
            <h3 className="font-heading" style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '24px',
            }}>
              Test Your Knowledge
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {category.rules.map((rule, ruleIndex) => {
                const quiz = generateQuizQuestion(rule);
                return (
                  <div key={rule.id} className="card" style={{ padding: '20px' }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '12px',
                    }}>
                      {ruleIndex + 1}. {rule.title}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--gray-600)',
                      marginBottom: '16px',
                    }}>
                      {quiz.question}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {quiz.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => !quizSubmitted && handleQuizAnswer(ruleIndex, optIndex)}
                          disabled={quizSubmitted}
                          style={{
                            padding: '12px 16px',
                            background: quizSubmitted
                              ? optIndex === quiz.correct
                                ? 'rgba(16,185,129,0.1)'
                                : quizAnswers[ruleIndex] === optIndex
                                ? 'rgba(239,68,68,0.1)'
                                : 'var(--white)'
                              : quizAnswers[ruleIndex] === optIndex
                              ? 'var(--brand-orange-light)'
                              : 'var(--white)',
                            border: `2px solid ${
                              quizSubmitted
                                ? optIndex === quiz.correct
                                  ? 'var(--green)'
                                  : quizAnswers[ruleIndex] === optIndex
                                  ? 'var(--red)'
                                  : 'var(--gray-200)'
                                : quizAnswers[ruleIndex] === optIndex
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
                  {quizAnswers.filter((a, i) => a === 0).length === category.rules.length ? '🏆' : '👍'}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand-charcoal)', marginBottom: '8px' }}>
                  Quiz Complete!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                  You earned XP for completing this grammar quiz.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
