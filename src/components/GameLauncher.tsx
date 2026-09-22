import React, { useState, useEffect } from 'react';
import { Game } from '../data/games';
import { completeItem, updateItemProgress } from '../utils/progress';
import { GrammarDash } from './GrammarDash';
import { IdiomMatch } from './IdiomMatch';
import ConversationalRoulette from './ConversationalRoulette';

interface GameLauncherProps {
  game: Game;
  onBack: () => void;
  onComplete: (xpReward: number) => void;
}

// Word list for the game
const WORDS = [
  'ENGLISH', 'LEARNING', 'VOCABULARY', 'GRAMMAR', 'PRACTICE',
  'STUDENT', 'TEACHER', 'LANGUAGE', 'READING', 'WRITING',
  'SPEAKING', 'LISTENING', 'PROGRESS', 'ACHIEVEMENT', 'CHALLENGE'
];

export const GameLauncher: React.FC<GameLauncherProps> = ({ game, onBack, onComplete }) => {
  // Route to specific game components
  if (game.id === 'grammar-dash') {
    return <GrammarDash onBack={onBack} onComplete={onComplete} />;
  }

  if (game.id === 'idiom-match') {
    return <IdiomMatch onBack={onBack} onComplete={onComplete} />;
  }

  if (game.id === 'conversational-roulette') {
    return <ConversationalRoulette onBack={onBack} onComplete={onComplete} />;
  }
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Scramble a word
  const scrambleWord = (word: string) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  // Start new round
  const startNewRound = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput('');
  };

  // Initialize game
  useEffect(() => {
    startNewRound();
    updateItemProgress('game', game.id, { status: 'in-progress', progress: 0 });
  }, [game.id]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  // Check answer
  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord) {
      setScore(score + 100);
      startNewRound();
    }
  };

  // Submit high score
  const handleSubmitScore = () => {
    if (!isCompleted) {
      const xpEarned = Math.min(100, Math.round(score / 10));
      completeItem('game', game.id, xpEarned);
      setIsCompleted(true);
      onComplete(xpEarned);
    }
  };

  if (gameOver) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--brand-sand)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>
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
              Game Over!
            </h1>

            <div style={{
              fontSize: '64px',
              fontWeight: 800,
              color: 'var(--brand-orange)',
              marginBottom: '16px',
            }}>
              {score}
            </div>

            <p style={{
              fontSize: '18px',
              color: 'var(--gray-600)',
              marginBottom: '32px',
            }}>
              Points Earned
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
                  +{Math.min(100, Math.round(score / 10))} XP
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
                  ✅ Game Completed!
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={onBack} className="btn-secondary">
                ← Back to Games
              </button>
              {!isCompleted && (
                <button onClick={handleSubmitScore} className="btn-primary">
                  Submit Score
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
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn-secondary">
            ← Back to Games
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-orange)' }}>
              Score: {score}
            </span>
            <span style={{
              fontSize: '16px',
              fontWeight: 700,
              color: timeLeft <= 10 ? 'var(--red)' : 'var(--brand-charcoal)',
            }}>
              ⏱️ {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: '12px',
          padding: '48px',
          boxShadow: 'var(--card-shadow)',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '24px',
          }}>
            Unscramble the Word
          </h2>

          <div style={{
            fontSize: '48px',
            fontWeight: 800,
            color: 'var(--brand-charcoal)',
            letterSpacing: '0.2em',
            marginBottom: '48px',
            fontFamily: 'monospace',
          }}>
            {scrambledWord}
          </div>

          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Type your answer..."
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '20px',
              textAlign: 'center',
              border: '2px solid var(--gray-300)',
              borderRadius: '8px',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'monospace',
            }}
          />

          <button
            onClick={checkAnswer}
            disabled={!userInput.trim()}
            className="btn-primary"
            style={{ width: '100%', opacity: !userInput.trim() ? 0.5 : 1 }}
          >
            Check Answer
          </button>
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
        .btn-secondary:hover {
          background: var(--gray-100);
        }
      `}</style>
    </div>
  );
};
