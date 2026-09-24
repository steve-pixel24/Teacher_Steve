import { useState } from 'react';
import { QuizQuestion } from '../data/lessons';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);

  const question = questions[currentQ];
  const isAnswered = answers[currentQ] !== null;

  const selectAnswer = (index: number) => {
    if (isAnswered) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
    setFeedback({
      correct: index === question.answer,
      explanation: question.explanation,
    });
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const correctCount = answers.filter((a, i) => a === questions[i].answer).length;

  if (showResult) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {percentage === 100 ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '💪'}
        </div>
        <div className="font-space" style={{ fontSize: '36px', fontWeight: 700, color: '#E65100', marginBottom: '8px' }}>
          {correctCount}/{questions.length}
        </div>
        <div style={{ color: '#64748B', marginBottom: '16px' }}>
          {percentage === 100 ? 'Perfect score! Outstanding!' :
           percentage >= 80 ? 'Excellent work!' :
           percentage >= 60 ? 'Good job! Keep practicing.' :
           'Keep going — practice makes perfect!'}
        </div>
        <div style={{ width: '200px', height: '8px', background: 'rgba(255,255,255,0.5)', borderRadius: '999px', margin: '0 auto 24px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              borderRadius: '999px',
              transition: 'width 1s ease',
              width: `${percentage}%`,
              background: percentage >= 80 ? '#10b981' : percentage >= 60 ? '#FF9800' : '#ef4444',
            }}
          />
        </div>
        <button onClick={onComplete} className="btn btn-primary">
          Continue to Next Section →
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.5)', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{ height: '100%', background: 'linear-gradient(90deg, #FF9800, #FFC107)', borderRadius: '999px', transition: 'width 0.3s', width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="font-space" style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
          {currentQ + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '18px', fontWeight: 500, lineHeight: 1.6, marginBottom: '24px', color: '#1E293B' }}>
          {question.question}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {question.options.map((option, i) => {
            let className = 'game-option';
            if (isAnswered) {
              if (i === question.answer) className += ' correct';
              else if (i === answers[currentQ] && i !== question.answer) className += ' wrong';
            }

            return (
              <button
                key={i}
                className={className}
                onClick={() => selectAnswer(i)}
                disabled={isAnswered}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '1px solid rgba(30,41,59,0.15)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    flexShrink: 0,
                    background: 'rgba(255,255,255,0.5)',
                  }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            borderRadius: '12px',
            animation: 'fadeIn 0.3s ease-out',
            background: feedback.correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)',
            border: `1px solid ${feedback.correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)'}`,
          }}>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px', color: feedback.correct ? '#10b981' : '#ef4444' }}>
              {feedback.correct ? '✓ Correct!' : '✗ Not quite'}
            </div>
            <div style={{ fontSize: '14px', color: '#64748B' }}>
              {feedback.explanation}
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {isAnswered && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="animate-fade-in">
          <button onClick={nextQuestion} className="btn btn-primary">
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        </div>
      )}
    </div>
  );
}
