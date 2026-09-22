import { useState, useMemo } from 'react';

interface SentenceData {
  correct: string[];
  hint: string;
  translation?: string;
}

interface WordOrderProps {
  sentences: SentenceData[];
  onComplete: () => void;
}

export default function WordOrder({ sentences, onComplete }: WordOrderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedSentences, setCompletedSentences] = useState<Set<number>>(new Set());

  const sentence = sentences[currentIndex];

  const shuffledIndices = useMemo(() => {
    const indices = sentence.correct.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [sentence]);

  const selectWord = (shuffledIndex: number) => {
    if (selectedWords.includes(shuffledIndex)) return;
    const newSelected = [...selectedWords, shuffledIndex];
    setSelectedWords(newSelected);
    setIsCorrect(null);
  };

  const removeWord = (position: number) => {
    const newSelected = selectedWords.filter((_, i) => i !== position);
    setSelectedWords(newSelected);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const userWords = selectedWords.map(i => sentence.correct[i]);
    const correct = JSON.stringify(userWords) === JSON.stringify(sentence.correct);
    setIsCorrect(correct);
    if (correct) {
      setCompletedSentences(prev => new Set([...prev, currentIndex]));
    }
  };

  const reset = () => {
    setSelectedWords([]);
    setIsCorrect(null);
  };

  const nextSentence = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedWords([]);
      setIsCorrect(null);
    }
  };

  const allDone = completedSentences.size === sentences.length;

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--blue)] rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[var(--text-muted)] font-space font-medium">
          {currentIndex + 1}/{sentences.length}
        </span>
      </div>

      {/* Hint */}
      <div className="callout callout-blue mb-6">
        <strong>Hint:</strong> {sentence.hint}
        {sentence.translation && <div className="mt-1 text-sm">Translation: {sentence.translation}</div>}
      </div>

      {/* Answer area */}
      <div className="card mb-6 min-h-[80px]">
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-space font-semibold mb-3">
          Your sentence:
        </div>
        <div className="flex flex-wrap gap-2 min-h-[44px] items-center">
          {selectedWords.length === 0 ? (
            <span className="text-sm text-[var(--text-dim)] italic">Click words below to build the sentence...</span>
          ) : (
            selectedWords.map((wordIndex, position) => (
              <button
                key={position}
                onClick={() => removeWord(position)}
                className="word-chip selected"
                title="Click to remove"
              >
                {sentence.correct[wordIndex]}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Word choices */}
      <div className="mb-6">
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-space font-semibold mb-3">
          Available words:
        </div>
        <div className="flex flex-wrap gap-2">
          {shuffledIndices.map((wordIndex) => {
            const isUsed = selectedWords.includes(wordIndex);
            return (
              <button
                key={wordIndex}
                onClick={() => selectWord(wordIndex)}
                disabled={isUsed}
                className={`word-chip ${isUsed ? 'placed' : ''}`}
              >
                {sentence.correct[wordIndex]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {isCorrect !== null && (
        <div className={`p-4 rounded-lg mb-4 animate-fade-in ${
          isCorrect
            ? 'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]'
            : 'bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)]'
        }`}>
          <div className={`text-sm font-medium ${
            isCorrect ? 'text-[var(--green-light)]' : 'text-[#f87171]'
          }`}>
            {isCorrect ? '✓ Perfect! That\'s correct!' : '✗ Not quite right. Try again!'}
          </div>
          {!isCorrect && (
            <div className="text-sm text-[var(--text-muted)] mt-1">
              Correct: {sentence.correct.join(' ')}
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        {selectedWords.length > 0 && isCorrect === null && (
          <button onClick={checkAnswer} className="btn btn-primary">
            Check Answer
          </button>
        )}
        {selectedWords.length > 0 && isCorrect === null && (
          <button onClick={reset} className="btn btn-ghost">
            Reset
          </button>
        )}
        {isCorrect === true && currentIndex < sentences.length - 1 && (
          <button onClick={nextSentence} className="btn btn-primary">
            Next Sentence →
          </button>
        )}
        {isCorrect === false && (
          <button onClick={reset} className="btn btn-secondary">
            Try Again
          </button>
        )}
      </div>

      {/* Completion */}
      {allDone && (
        <div className="card text-center py-6 mt-6 animate-fade-in bg-[rgba(16,185,129,0.05)] border-[rgba(16,185,129,0.2)]">
          <div className="text-3xl mb-2">🧩</div>
          <div className="font-space text-lg font-bold text-[var(--green-light)] mb-1">
            All sentences built!
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Great job constructing sentences from individual words.
          </p>
          <button onClick={onComplete} className="btn btn-primary">
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
