import React, { useState } from 'react';
import { Story, ComprehensionQuestion, VocabularyExercise } from '../data/stories';

interface StoryExercisesProps {
  story: Story;
  onComplete: (xpEarned: number) => void;
}

export const StoryExercises: React.FC<StoryExercisesProps> = ({ story, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'comprehension' | 'vocabulary'>('comprehension');
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [vocabAnswers, setVocabAnswers] = useState<Record<number, any>>({});
  const [showVocabResults, setShowVocabResults] = useState(false);

  const handleAnswer = (questionIndex: number, answer: any) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleVocabAnswer = (exerciseIndex: number, answer: any) => {
    setVocabAnswers({ ...vocabAnswers, [exerciseIndex]: answer });
  };

  const submitComprehension = () => {
    setShowResults(true);
    const correct = story.comprehensionQuestions?.filter((q, i) => {
      if (q.type === 'multiple-choice') {
        return answers[i] === q.correctAnswer;
      } else if (q.type === 'true-false') {
        return answers[i] === q.correctAnswer;
      }
      return true; // Open-ended questions are always "correct"
    }).length || 0;

    const total = story.comprehensionQuestions?.length || 0;
    const xpEarned = Math.round((correct / total) * 30);
    onComplete(xpEarned);
  };

  const submitVocabulary = () => {
    setShowVocabResults(true);
    const correct = story.vocabularyExercises?.filter((ex, i) => {
      if (ex.exercise === 'fill-blank') {
        return vocabAnswers[i]?.toLowerCase().trim() === ex.correctAnswer?.toString().toLowerCase();
      } else if (ex.exercise === 'matching' || ex.exercise === 'context') {
        return vocabAnswers[i] === ex.correctAnswer;
      }
      return false;
    }).length || 0;

    const total = story.vocabularyExercises?.length || 0;
    const xpEarned = Math.round((correct / total) * 20);
    onComplete(xpEarned);
  };

  if (!story.comprehensionQuestions && !story.vocabularyExercises) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--gray-500)' }}>
        <p>No exercises available for this story yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid var(--gray-200)' }}>
        {story.comprehensionQuestions && (
          <button
            onClick={() => setActiveTab('comprehension')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'comprehension' ? '3px solid var(--brand-orange)' : 'none',
              color: activeTab === 'comprehension' ? 'var(--brand-orange)' : 'var(--gray-500)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            📝 Comprehension Questions
          </button>
        )}
        {story.vocabularyExercises && (
          <button
            onClick={() => setActiveTab('vocabulary')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'vocabulary' ? '3px solid var(--brand-orange)' : 'none',
              color: activeTab === 'vocabulary' ? 'var(--brand-orange)' : 'var(--gray-500)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            📚 Vocabulary Exercises
          </button>
        )}
      </div>

      {/* Comprehension Questions */}
      {activeTab === 'comprehension' && story.comprehensionQuestions && (
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'var(--brand-charcoal)' }}>
            Test Your Understanding
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {story.comprehensionQuestions.map((question, qIndex) => (
              <div key={qIndex} className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--brand-charcoal)' }}>
                  {qIndex + 1}. {question.question}
                </h4>

                {question.type === 'multiple-choice' && question.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => !showResults && handleAnswer(qIndex, oIndex)}
                        disabled={showResults}
                        style={{
                          padding: '12px 16px',
                          background: showResults
                            ? oIndex === question.correctAnswer
                              ? 'rgba(16,185,129,0.1)'
                              : answers[qIndex] === oIndex
                              ? 'rgba(239,68,68,0.1)'
                              : 'var(--white)'
                            : answers[qIndex] === oIndex
                            ? 'var(--brand-orange-light)'
                            : 'var(--white)',
                          border: `2px solid ${
                            showResults
                              ? oIndex === question.correctAnswer
                                ? 'var(--green)'
                                : answers[qIndex] === oIndex
                                ? 'var(--red)'
                                : 'var(--gray-200)'
                              : answers[qIndex] === oIndex
                              ? 'var(--brand-orange)'
                              : 'var(--gray-200)'
                          }`,
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: 'var(--brand-charcoal)',
                          cursor: showResults ? 'default' : 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => !showResults && handleAnswer(qIndex, true)}
                      disabled={showResults}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: showResults
                          ? question.correctAnswer === true
                            ? 'rgba(16,185,129,0.1)'
                            : answers[qIndex] === true
                            ? 'rgba(239,68,68,0.1)'
                            : 'var(--white)'
                          : answers[qIndex] === true
                          ? 'var(--brand-orange-light)'
                          : 'var(--white)',
                        border: `2px solid ${
                          showResults
                            ? question.correctAnswer === true
                              ? 'var(--green)'
                              : answers[qIndex] === true
                              ? 'var(--red)'
                              : 'var(--gray-200)'
                            : answers[qIndex] === true
                            ? 'var(--brand-orange)'
                            : 'var(--gray-200)'
                        }`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: showResults ? 'default' : 'pointer',
                      }}
                    >
                      True
                    </button>
                    <button
                      onClick={() => !showResults && handleAnswer(qIndex, false)}
                      disabled={showResults}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: showResults
                          ? question.correctAnswer === false
                            ? 'rgba(16,185,129,0.1)'
                            : answers[qIndex] === false
                            ? 'rgba(239,68,68,0.1)'
                            : 'var(--white)'
                          : answers[qIndex] === false
                          ? 'var(--brand-orange-light)'
                          : 'var(--white)',
                        border: `2px solid ${
                          showResults
                            ? question.correctAnswer === false
                              ? 'var(--green)'
                              : answers[qIndex] === false
                              ? 'var(--red)'
                              : 'var(--gray-200)'
                            : answers[qIndex] === false
                            ? 'var(--brand-orange)'
                            : 'var(--gray-200)'
                        }`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: showResults ? 'default' : 'pointer',
                      }}
                    >
                      False
                    </button>
                  </div>
                )}

                {question.type === 'open-ended' && (
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--gray-500)', fontStyle: 'italic', marginBottom: '8px' }}>
                      (Discuss with your teacher or write your answer)
                    </p>
                    {showResults && question.explanation && (
                      <div style={{
                        padding: '12px',
                        background: 'rgba(59,130,246,0.08)',
                        borderRadius: '8px',
                        border: '1px solid rgba(59,130,246,0.2)',
                        fontSize: '13px',
                        color: 'var(--brand-charcoal)',
                      }}>
                        <strong>Suggested answer:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                )}

                {showResults && question.explanation && question.type !== 'open-ended' && (
                  <div style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'rgba(59,130,246,0.08)',
                    borderRadius: '8px',
                    border: '1px solid rgba(59,130,246,0.2)',
                    fontSize: '13px',
                    color: 'var(--brand-charcoal)',
                  }}>
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showResults ? (
            <button
              onClick={submitComprehension}
              className="btn btn-primary"
              style={{ marginTop: '24px', width: '100%' }}
            >
              Submit Answers
            </button>
          ) : (
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--green)' }}>
                ✓ Comprehension exercises completed!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Vocabulary Exercises */}
      {activeTab === 'vocabulary' && story.vocabularyExercises && (
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'var(--brand-charcoal)' }}>
            Vocabulary Practice
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {story.vocabularyExercises.map((exercise, eIndex) => (
              <div key={eIndex} className="card" style={{ padding: '20px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--brand-orange)', marginBottom: '4px' }}>
                    {exercise.word}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '8px' }}>
                    <strong>Definition:</strong> {exercise.definition}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--gray-500)', fontStyle: 'italic' }}>
                    <strong>Example:</strong> {exercise.example}
                  </p>
                </div>

                {exercise.exercise === 'fill-blank' && (
                  <div>
                    <p style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--brand-charcoal)' }}>
                      {exercise.question}
                    </p>
                    <input
                      type="text"
                      value={vocabAnswers[eIndex] || ''}
                      onChange={(e) => !showVocabResults && handleVocabAnswer(eIndex, e.target.value)}
                      disabled={showVocabResults}
                      placeholder="Type your answer..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `2px solid ${
                          showVocabResults
                            ? vocabAnswers[eIndex]?.toLowerCase().trim() === exercise.correctAnswer?.toString().toLowerCase()
                              ? 'var(--green)'
                              : 'var(--red)'
                            : 'var(--gray-300)'
                        }`,
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                    {showVocabResults && (
                      <p style={{ marginTop: '8px', fontSize: '13px', color: vocabAnswers[eIndex]?.toLowerCase().trim() === exercise.correctAnswer?.toString().toLowerCase() ? 'var(--green)' : 'var(--red)' }}>
                        {vocabAnswers[eIndex]?.toLowerCase().trim() === exercise.correctAnswer?.toString().toLowerCase()
                          ? '✓ Correct!'
                          : `✗ Correct answer: ${exercise.correctAnswer}`}
                      </p>
                    )}
                  </div>
                )}

                {exercise.exercise === 'matching' && exercise.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {exercise.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => !showVocabResults && handleVocabAnswer(eIndex, oIndex)}
                        disabled={showVocabResults}
                        style={{
                          padding: '12px 16px',
                          background: showVocabResults
                            ? oIndex === exercise.correctAnswer
                              ? 'rgba(16,185,129,0.1)'
                              : vocabAnswers[eIndex] === oIndex
                              ? 'rgba(239,68,68,0.1)'
                              : 'var(--white)'
                            : vocabAnswers[eIndex] === oIndex
                            ? 'var(--brand-orange-light)'
                            : 'var(--white)',
                          border: `2px solid ${
                            showVocabResults
                              ? oIndex === exercise.correctAnswer
                                ? 'var(--green)'
                                : vocabAnswers[eIndex] === oIndex
                                ? 'var(--red)'
                                : 'var(--gray-200)'
                              : vocabAnswers[eIndex] === oIndex
                              ? 'var(--brand-orange)'
                              : 'var(--gray-200)'
                          }`,
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: 'var(--brand-charcoal)',
                          cursor: showVocabResults ? 'default' : 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {exercise.exercise === 'context' && exercise.options && (
                  <div>
                    <p style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--brand-charcoal)' }}>
                      {exercise.question}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {exercise.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => !showVocabResults && handleVocabAnswer(eIndex, oIndex)}
                          disabled={showVocabResults}
                          style={{
                            padding: '12px 16px',
                            background: showVocabResults
                              ? oIndex === exercise.correctAnswer
                                ? 'rgba(16,185,129,0.1)'
                                : vocabAnswers[eIndex] === oIndex
                                ? 'rgba(239,68,68,0.1)'
                                : 'var(--white)'
                              : vocabAnswers[eIndex] === oIndex
                              ? 'var(--brand-orange-light)'
                              : 'var(--white)',
                            border: `2px solid ${
                              showVocabResults
                                ? oIndex === exercise.correctAnswer
                                  ? 'var(--green)'
                                  : vocabAnswers[eIndex] === oIndex
                                  ? 'var(--red)'
                                  : 'var(--gray-200)'
                                : vocabAnswers[eIndex] === oIndex
                                ? 'var(--brand-orange)'
                                : 'var(--gray-200)'
                            }`,
                            borderRadius: '8px',
                            fontSize: '14px',
                            color: 'var(--brand-charcoal)',
                            cursor: showVocabResults ? 'default' : 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showVocabResults ? (
            <button
              onClick={submitVocabulary}
              className="btn btn-primary"
              style={{ marginTop: '24px', width: '100%' }}
            >
              Submit Answers
            </button>
          ) : (
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--green)' }}>
                ✓ Vocabulary exercises completed!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
