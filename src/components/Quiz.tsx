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
      <div className="card text-center py-10 animate-fade-in">
        <div className="text-5xl mb-4">
          {percentage === 100 ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '💪'}
        </div>
        <div className="font-space text-4xl font-bold text-[var(--blue-light)] mb-2">
          {correctCount}/{questions.length}
        </div>
        <div className="text-[var(--text-muted)] mb-4">
          {percentage === 100 ? 'Perfect score! Outstanding!' :
           percentage >= 80 ? 'Excellent work!' :
           percentage >= 60 ? 'Good job! Keep practicing.' :
           'Keep going — practice makes perfect!'}
        </div>
        <div className="w-48 h-2 bg-[rgba(255,255,255,0.1)] rounded-full mx-auto overflow-hidden mb-6">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${percentage}%`,
              background: percentage >= 80 ? 'var(--green)' : percentage >= 60 ? 'var(--amber)' : 'var(--red)'
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
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--blue)] rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[var(--text-muted)] font-space font-medium">
          {currentQ + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="card mb-6">
        <div className="text-lg font-medium leading-relaxed mb-6">
          {question.question}
        </div>

        <div className="flex flex-col gap-3">
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
                <span className="inline-flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center text-xs font-space font-bold shrink-0">
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
          <div className={`mt-4 p-4 rounded-lg animate-fade-in ${
            feedback.correct
              ? 'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]'
              : 'bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)]'
          }`}>
            <div className={`text-sm font-medium mb-1 ${
              feedback.correct ? 'text-[var(--green-light)]' : 'text-[#f87171]'
            }`}>
              {feedback.correct ? '✓ Correct!' : '✗ Not quite'}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {feedback.explanation}
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {isAnswered && (
        <div className="flex justify-end animate-fade-in">
          <button onClick={nextQuestion} className="btn btn-primary">
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        </div>
      )}
    </div>
  );
}
