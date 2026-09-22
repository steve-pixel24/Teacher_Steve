import { useState, useCallback } from 'react';

interface GameQuestion {
  sentence: string;
  blank: string;
  answer: string;
  choices: string[];
  context: string;
}

const gameData: GameQuestion[] = [
  { sentence: "If I _____ the lottery, I would travel the world.", blank: "_____", answer: "won", choices: ["win", "won", "had won", "winning"], context: "Hint: imaginary present situation" },
  { sentence: "You _____ have called me — I was worried!", blank: "_____", answer: "should", choices: ["could", "should", "might", "would"], context: "Hint: expressing criticism about a past action" },
  { sentence: "There's a critical issue — it _____ shut down the whole system.", blank: "_____", answer: "could", choices: ["should", "must", "could", "shall"], context: "Hint: a serious possibility, not certainty" },
  { sentence: "The package _____ arrive tomorrow — it was sent three days ago.", blank: "_____", answer: "should", choices: ["might", "could", "should", "will"], context: "Hint: expected based on what we know" },
  { sentence: "If she _____ harder, she would have passed the exam.", blank: "_____", answer: "had studied", choices: ["studied", "studies", "had studied", "would study"], context: "Hint: third conditional — past impossible" },
  { sentence: "We _____ take the train or the bus — both work for me.", blank: "_____", answer: "could", choices: ["should", "must", "could", "ought to"], context: "Hint: presenting options, not a strong opinion" },
  { sentence: "It's a _____ risk — only affects one minor process, nothing serious.", blank: "_____", answer: "slight", choices: ["critical", "severe", "significant", "slight"], context: "Hint: low severity — minor, small" },
  { sentence: "If I had known you were coming, I _____ cooked dinner.", blank: "_____", answer: "would have", choices: ["will", "would", "would have", "should have"], context: "Hint: third conditional result clause" },
  { sentence: "You _____ speak to your manager directly — it's the right approach.", blank: "_____", answer: "should", choices: ["could", "should", "might", "may"], context: "Hint: strong advice, I genuinely think this is best" },
  { sentence: "The meeting _____ run over — there are a lot of agenda items.", blank: "_____", answer: "might", choices: ["should", "must", "will", "might"], context: "Hint: uncertain possibility, roughly 50/50" },
];

export default function GameTab() {
  const [gIndex, setGIndex] = useState(0);
  const [gScore, setGScore] = useState(0);
  const [gStreak, setGStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: 'correct' | 'wrong' | '' }>({ text: '', type: '' });
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoice = useCallback((choice: string) => {
    if (selectedChoice !== null) return;

    const q = gameData[gIndex];
    setSelectedChoice(choice);

    if (choice === q.answer) {
      const newStreak = gStreak + 1;
      setGScore(prev => prev + 1);
      setGStreak(newStreak);
      setFeedback({
        text: newStreak >= 3 ? `✓ Correct! 🔥 ${newStreak} in a row!` : '✓ Correct!',
        type: 'correct'
      });
    } else {
      setGStreak(0);
      setFeedback({ text: `✗ The answer is "${q.answer}"`, type: 'wrong' });
    }

    setTimeout(() => {
      setSelectedChoice(null);
      setFeedback({ text: '', type: '' });
      const nextIndex = gIndex + 1;
      if (nextIndex >= gameData.length) {
        setGameOver(true);
      } else {
        setGIndex(nextIndex);
      }
    }, 1400);
  }, [gIndex, gStreak, selectedChoice]);

  const restartGame = () => {
    setGIndex(0);
    setGScore(0);
    setGStreak(0);
    setGameOver(false);
    setFeedback({ text: '', type: '' });
    setSelectedChoice(null);
  };

  const getTrophy = (score: number) => {
    const trophies = ['😅', '🙂', '😊', '👍', '⭐', '🌟', '🏅', '🥈', '🥇', '🏆', '🏆'];
    return trophies[score];
  };

  const getFinalMsg = (score: number) => {
    const msgs = [
      "Don't worry — every mistake teaches you something. Review the lesson and try again!",
      "Keep going! The more you practice, the more natural these feel.",
      "Good effort! You're building strong instincts for these structures.",
      "Nice work! A few more practice rounds and you'll have this locked in.",
      "Great job, Nicolas! You clearly understand the core concepts.",
      "Excellent! Strong command of conditionals and modals.",
      "Impressive! You're thinking like a native speaker now. 🌟"
    ];
    return msgs[Math.min(Math.floor(score / 1.5), msgs.length - 1)];
  };

  if (gameOver) {
    return (
      <>
        <div className="text-center mb-8">
          <h2 className="font-space text-2xl font-bold mb-1.5">⚡ Modal Blitz</h2>
          <p className="text-[var(--text-muted)] text-sm">Choose the correct word to complete each sentence. You have 10 sentences — go!</p>
        </div>

        <div className="text-center py-10">
          <div className="text-[56px] mb-4">{getTrophy(gScore)}</div>
          <div className="font-space text-[42px] font-bold text-[var(--blue-light)]">{gScore}</div>
          <div className="text-[var(--text-muted)] text-base mt-1">out of 10</div>
          <div className="text-base mt-5 leading-relaxed">{getFinalMsg(gScore)}</div>
          <button
            onClick={restartGame}
            className="bg-transparent border border-[var(--blue)] rounded-lg px-7 py-2.5 font-space text-sm font-semibold text-[var(--blue-light)] cursor-pointer mt-5 transition-all hover:bg-[var(--blue-glow)]"
          >
            Play Again
          </button>
        </div>
      </>
    );
  }

  const currentQ = gameData[gIndex];

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="font-space text-2xl font-bold mb-1.5">⚡ Modal Blitz</h2>
        <p className="text-[var(--text-muted)] text-sm">Choose the correct word to complete each sentence. You have 10 sentences — go!</p>
      </div>

      {/* Score Row */}
      <div className="flex justify-center gap-8 mb-7">
        <div className="text-center">
          <div className="font-space text-[28px] font-bold text-[var(--blue-light)]">{gScore}</div>
          <div className="text-xs text-[var(--text-muted)] mt-0.5">Score</div>
        </div>
        <div className="text-center">
          <div className="font-space text-[28px] font-bold text-[var(--blue-light)]">{gIndex + 1}</div>
          <div className="text-xs text-[var(--text-muted)] mt-0.5">of 10</div>
        </div>
        <div className="text-center">
          <div className="font-space text-[28px] font-bold text-[var(--blue-light)]">{gStreak}</div>
          <div className="text-xs text-[var(--text-muted)] mt-0.5">Streak 🔥</div>
        </div>
      </div>

      {/* Sentence Card */}
      <div className="section-card text-center py-8 min-h-[120px] flex flex-col items-center justify-center gap-4">
        <div className="text-lg leading-relaxed font-medium">
          {currentQ.sentence.split(currentQ.blank).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block min-w-[140px] border-b-[3px] border-[var(--blue)] px-2 text-[var(--blue-light)] font-bold">
                  _____
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="text-[13px] text-[var(--text-muted)] italic">{currentQ.context}</div>
      </div>

      {/* Choices */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-5">
        {currentQ.choices.map((c) => {
          let btnClass = 'choice-btn';
          if (selectedChoice !== null) {
            if (c === currentQ.answer) btnClass += ' flash-correct';
            if (c === selectedChoice && c !== currentQ.answer) btnClass += ' flash-wrong';
          }
          return (
            <button
              key={c}
              className={btnClass}
              onClick={() => handleChoice(c)}
              disabled={selectedChoice !== null}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      <div className={`min-h-[36px] text-center text-[15px] font-medium ${
        feedback.type === 'correct' ? 'text-[var(--green-light)]' :
        feedback.type === 'wrong' ? 'text-[#f87171]' : ''
      }`}>
        {feedback.text}
      </div>
    </>
  );
}
