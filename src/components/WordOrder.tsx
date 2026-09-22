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
    setSelectedWords([...selectedWords, shuffledIndex]);
    setIsCorrect(null);
  };

  const removeWord = (position: number) => {
    setSelectedWords(selectedWords.filter((_, i) => i !== position));
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const userWords = selectedWords.map(i => sentence.correct[i]);
    const correct = JSON.stringify(userWords) === JSON.stringify(sentence.correct);
    setIsCorrect(correct);
    if (correct) setCompletedSentences(prev => new Set([...prev, currentIndex]));
  };

  const reset = () => { setSelectedWords([]); setIsCorrect(null); };

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.5)', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, #FF9800, #FFC107)', borderRadius: '999px', transition: 'width 0.3s', width: `${((currentIndex + 1) / sentences.length) * 100}%` }} />
        </div>
        <span className="font-space" style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
          {currentIndex + 1}/{sentences.length}
        </span>
      </div>

      {/* Hint */}
      <div className="callout callout-amber" style={{ marginBottom: '24px' }}>
        <strong>Hint:</strong> {sentence.hint}
        {sentence.translation && <div style={{ marginTop: '4px', fontSize: '13px' }}>Translation: {sentence.translation}</div>}
      </div>

      {/* Answer area */}
      <div className="card" style={{ marginBottom: '24px', minHeight: '80px' }}>
        <div className="font-space" style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '12px' }}>
          Your sentence:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '44px', alignItems: 'center' }}>
          {selectedWords.length === 0 ? (
            <span style={{ fontSize: '14px', color: '#94A3B8', fontStyle: 'italic' }}>Click words below to build the sentence...</span>
          ) : (
            selectedWords.map((wordIndex, position) => (
              <button key={position} onClick={() => removeWord(position)} className="word-chip selected" title="Click to remove">
                {sentence.correct[wordIndex]}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Word choices */}
      <div style={{ marginBottom: '24px' }}>
        <div className="font-space" style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '12px' }}>
          Available words:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {shuffledIndices.map((wordIndex) => {
            const isUsed = selectedWords.includes(wordIndex);
            return (
              <button key={wordIndex} onClick={() => selectWord(wordIndex)} disabled={isUsed} className={`word-chip ${isUsed ? 'placed' : ''}`}>
                {sentence.correct[wordIndex]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {isCorrect !== null && (
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '16px',
          background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)',
          border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)'}`,
        }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: isCorrect ? '#10b981' : '#ef4444' }}>
            {isCorrect ? "✓ Perfect! That's correct!" : '✗ Not quite right. Try again!'}
          </div>
          {!isCorrect && (
            <div style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
              Correct: {sentence.correct.join(' ')}
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {selectedWords.length > 0 && isCorrect === null && (
          <button onClick={checkAnswer} className="btn btn-primary">Check Answer</button>
        )}
        {selectedWords.length > 0 && isCorrect === null && (
          <button onClick={reset} className="btn btn-ghost">Reset</button>
        )}
        {isCorrect === true && currentIndex < sentences.length - 1 && (
          <button onClick={nextSentence} className="btn btn-primary">Next Sentence →</button>
        )}
        {isCorrect === false && (
          <button onClick={reset} className="btn btn-secondary">Try Again</button>
        )}
      </div>

      {/* Completion */}
      {allDone && (
        <div className="card" style={{ textAlign: 'center', padding: '24px', marginTop: '24px', background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🧩</div>
          <div className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>All sentences built!</div>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>Great job constructing sentences from individual words.</p>
          <button onClick={onComplete} className="btn btn-primary">Continue →</button>
        </div>
      )}
    </div>
  );
}
