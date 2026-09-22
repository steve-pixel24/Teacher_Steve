import { useState } from 'react';

interface TestQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

const testQuestions: TestQuestion[] = [
  {
    q: "_____ I had more time, I would learn Japanese.",
    options: ["If", "When", "Unless", "Although"],
    answer: 0,
    explanation: "'If' introduces the second conditional — an imaginary present situation."
  },
  {
    q: "You _____ have told me about the meeting! I missed it completely.",
    options: ["could", "should", "might", "would"],
    answer: 1,
    explanation: "'Should have' expresses criticism — you expected it to happen but it didn't."
  },
  {
    q: "There's a significant chance the flight _____ be delayed due to the storm.",
    options: ["will", "should", "might", "must"],
    answer: 2,
    explanation: "'Might' expresses uncertainty — around 50% probability. 'Will' is too certain here."
  },
  {
    q: "If she had applied earlier, she _____ got the job.",
    options: ["would", "will have", "would have", "should"],
    answer: 2,
    explanation: "Third conditional: If + past perfect → would have + past participle."
  },
  {
    q: "We _____ meet on Thursday — it's just one option, nothing decided yet.",
    options: ["should", "must", "could", "shall"],
    answer: 2,
    explanation: "'Could' suggests a possibility without commitment. 'Should' would imply a stronger recommendation."
  },
  {
    q: "The report _____ be ready by Friday — that's what was agreed.",
    options: ["could", "might", "should", "would"],
    answer: 2,
    explanation: "'Should' expresses expectation based on a prior agreement — around 70% confidence."
  },
  {
    q: "If water reaches 100°C, it _____.",
    options: ["would boil", "will boil", "boils", "boiled"],
    answer: 2,
    explanation: "Zero conditional uses present simple in both clauses — for scientific facts and general truths."
  },
  {
    q: "It was a _____ problem — it affected every department and cost millions.",
    options: ["slight", "minor", "critical", "small"],
    answer: 2,
    explanation: "'Critical' signals high severity. The context — every department, millions — confirms this."
  },
  {
    q: "I _____ have taken a taxi — then I wouldn't have missed the train.",
    options: ["should", "would", "must", "shall"],
    answer: 0,
    explanation: "'Should have' expresses a past regret — the right action that wasn't taken."
  },
  {
    q: "If I _____ you, I would talk to her directly.",
    options: ["am", "was", "were", "had been"],
    answer: 2,
    explanation: "Second conditional uses 'were' for all subjects (I/he/she) in formal English — 'If I were you' is the standard phrase."
  }
];

export default function TestTab() {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(testQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const selectAnswer = (qi: number, oi: number) => {
    if (answers[qi] !== null) return;
    const newAnswers = [...answers];
    newAnswers[qi] = oi;
    setAnswers(newAnswers);
  };

  const submitTest = () => {
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      alert(`You still have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Answer all questions first!`);
      return;
    }
    setSubmitted(true);
  };

  const correct = answers.filter((ans, i) => ans === testQuestions[i].answer).length;

  const getScoreMsg = (score: number) => {
    const msgs: Record<number, string> = {
      10: "Perfect score! Outstanding work, Nicolas. 🏆",
      9: "Excellent! You've clearly mastered this material. 🌟",
      8: "Great job! Just a couple of things to revisit.",
      7: "Good work — review the questions you missed and you'll nail it.",
      6: "Solid effort. Let's go over the tricky ones together.",
      5: "Good start — review the lesson sections and try again.",
    };
    return msgs[score] || "Keep practising — every attempt makes you stronger.";
  };

  return (
    <>
      <div className="section-card mb-7">
        <span className="section-tag tag-blue">10 Questions · Multiple Choice</span>
        <h2 className="font-space text-xl font-bold mb-1.5">Test Your Understanding</h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">Choose the best answer for each question. You'll get instant feedback after each one.</p>
      </div>

      {testQuestions.map((q, qi) => {
        const userAnswer = answers[qi];
        const isAnswered = userAnswer !== null;
        const isCorrect = userAnswer === q.answer;
        const cardClass = isAnswered
          ? isCorrect ? 'test-q correct' : 'test-q wrong'
          : 'test-q';

        return (
          <div key={qi} className={cardClass}>
            <div className="text-[15px] font-medium mb-3.5 leading-relaxed">
              <span className="text-[var(--text-muted)] text-[13px] font-space font-semibold mr-1">{qi + 1}.</span>
              {q.q.split('_____').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="inline-block min-w-[120px] border-b-2 border-[var(--blue)] text-[var(--blue-light)] px-1.5 font-semibold">
                      _____
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => {
                let btnClass = 'option-btn';
                if (isAnswered) {
                  if (oi === q.answer) btnClass += ' reveal-correct';
                  if (oi === userAnswer && !isCorrect) btnClass += ' selected-wrong';
                  if (oi === userAnswer && isCorrect) btnClass += ' selected-correct';
                }

                return (
                  <button
                    key={oi}
                    className={btnClass}
                    onClick={() => selectAnswer(qi, oi)}
                    disabled={isAnswered}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`text-[13px] mt-2.5 px-3 py-2 rounded-md ${
                isCorrect
                  ? 'bg-[rgba(16,185,129,0.1)] text-[var(--green-light)]'
                  : 'bg-[rgba(239,68,68,0.08)] text-[#f87171]'
              }`}>
                {isCorrect ? '✓' : '✗'} {isCorrect ? 'Correct' : 'Not quite'} — {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!submitted && (
        <button
          onClick={submitTest}
          className="bg-[var(--blue)] hover:bg-[#2563eb] border-none rounded-lg px-8 py-3 font-space text-[15px] font-semibold text-white cursor-pointer transition-colors mt-6"
        >
          See My Score
        </button>
      )}

      {submitted && (
        <div className="section-card mt-6 text-center py-8">
          <div className="font-space text-5xl font-bold text-[var(--blue-light)]">{correct}</div>
          <div className="text-[var(--text-muted)] text-[15px] mt-1.5">out of 10 correct</div>
          <div className="text-base font-medium mt-4">{getScoreMsg(correct)}</div>
        </div>
      )}
    </>
  );
}
