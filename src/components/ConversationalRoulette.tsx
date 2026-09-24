import { useState, useEffect } from 'react';
import { ROULETTE_TOPICS, ROULETTE_TWISTS } from '../data/roulette';
import { completeItem } from '../utils/progress';

interface ConversationalRouletteProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

export default function ConversationalRoulette({ onBack, onComplete }: ConversationalRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<typeof ROULETTE_TOPICS[0] | null>(null);
  const [selectedTwist, setSelectedTwist] = useState<typeof ROULETTE_TWISTS[0] | null>(null);
  const [showTwist, setShowTwist] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [history, setHistory] = useState<Array<{ topic: string; twist: string; timestamp: number }>>([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isTimerRunning && timer > 0) {
      interval = window.setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowTwist(false);
    setSelectedTopic(null);
    setSelectedTwist(null);
    setTimer(60);
    setIsTimerRunning(false);

    // Random rotation between 5-10 full spins plus random offset
    const spins = 5 + Math.random() * 5;
    const offset = Math.random() * 360;
    const newRotation = rotation + (spins * 360) + offset;
    setRotation(newRotation);

    // Select random topic and twist
    setTimeout(() => {
      const randomTopic = ROULETTE_TOPICS[Math.floor(Math.random() * ROULETTE_TOPICS.length)];
      const randomTwist = ROULETTE_TWISTS[Math.floor(Math.random() * ROULETTE_TWISTS.length)];
      
      setSelectedTopic(randomTopic);
      setSelectedTwist(randomTwist);
      setIsSpinning(false);

      // Add to history
      setHistory(prev => [{
        topic: randomTopic.topic,
        twist: randomTwist.twist,
        timestamp: Date.now()
      }, ...prev.slice(0, 9)]); // Keep last 10

      // Show twist after 2 seconds
      setTimeout(() => {
        setShowTwist(true);
        setIsTimerRunning(true);
      }, 2000);
    }, 3000);
  };

  const handleComplete = () => {
    const xpEarned = 20;
    completeItem('game', 'conversational-roulette', xpEarned);
    onComplete(xpEarned);
    setIsTimerRunning(false);
  };

  const resetWheel = () => {
    setSelectedTopic(null);
    setSelectedTwist(null);
    setShowTwist(false);
    setTimer(60);
    setIsTimerRunning(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

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
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn btn-secondary">
            ← Back to Games
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
              Spins: {history.length}
            </span>
            <span style={{
              padding: '4px 12px',
              background: 'var(--brand-orange)',
              color: 'var(--white)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
            }}>
              ⭐ 20 XP
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Left Column - Wheel */}
          <div>
            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <h2 className="font-heading" style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--brand-charcoal)',
                marginBottom: '8px',
              }}>
                🎰 Conversational Roulette
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'var(--gray-600)',
                marginBottom: '32px',
              }}>
                Spin the wheel and speak about the topic with a twist!
              </p>

              {/* Wheel Container */}
              <div style={{
                position: 'relative',
                width: '400px',
                height: '400px',
                margin: '0 auto 32px',
              }}>
                {/* Wheel */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '8px solid var(--brand-orange)',
                  position: 'relative',
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                  background: 'conic-gradient(from 0deg, #E36C24 0deg 7.2deg, #FF9800 7.2deg 14.4deg, #FFC107 14.4deg 21.6deg, #E36C24 21.6deg 28.8deg, #FF9800 28.8deg 36deg, #FFC107 36deg 43.2deg, #E36C24 43.2deg 50.4deg, #FF9800 50.4deg 57.6deg, #FFC107 57.6deg 64.8deg, #E36C24 64.8deg 72deg, #FF9800 72deg 79.2deg, #FFC107 79.2deg 86.4deg, #E36C24 86.4deg 93.6deg, #FF9800 93.6deg 100.8deg, #FFC107 100.8deg 108deg, #E36C24 108deg 115.2deg, #FF9800 115.2deg 122.4deg, #FFC107 122.4deg 129.6deg, #E36C24 129.6deg 136.8deg, #FF9800 136.8deg 144deg, #FFC107 144deg 151.2deg, #E36C24 151.2deg 158.4deg, #FF9800 158.4deg 165.6deg, #FFC107 165.6deg 172.8deg, #E36C24 172.8deg 180deg, #FF9800 180deg 187.2deg, #FFC107 187.2deg 194.4deg, #E36C24 194.4deg 201.6deg, #FF9800 201.6deg 208.8deg, #FFC107 208.8deg 216deg, #E36C24 216deg 223.2deg, #FF9800 223.2deg 230.4deg, #FFC107 230.4deg 237.6deg, #E36C24 237.6deg 244.8deg, #FF9800 244.8deg 252deg, #FFC107 252deg 259.2deg, #E36C24 259.2deg 266.4deg, #FF9800 266.4deg 273.6deg, #FFC107 273.6deg 280.8deg, #E36C24 280.8deg 288deg, #FF9800 288deg 295.2deg, #FFC107 295.2deg 302.4deg, #E36C24 302.4deg 309.6deg, #FF9800 309.6deg 316.8deg, #FFC107 316.8deg 324deg, #E36C24 324deg 331.2deg, #FF9800 331.2deg 338.4deg, #FFC107 338.4deg 345.6deg, #E36C24 345.6deg 352.8deg, #FF9800 352.8deg 360deg)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                }}>
                  {/* Center circle */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--white)',
                    border: '4px solid var(--brand-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}>
                    🎯
                  </div>
                </div>

                {/* Pointer */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: '15px solid transparent',
                  borderRight: '15px solid transparent',
                  borderTop: '30px solid var(--brand-charcoal)',
                  zIndex: 10,
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                }} />
              </div>

              {/* Spin Button */}
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '18px',
                  fontWeight: 700,
                  opacity: isSpinning ? 0.6 : 1,
                  cursor: isSpinning ? 'not-allowed' : 'pointer',
                }}
              >
                {isSpinning ? '🎰 Spinning...' : '🎰 SPIN THE WHEEL'}
              </button>
            </div>
          </div>

          {/* Right Column - Results & Timer */}
          <div>
            {/* Topic & Twist Display */}
            <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
              {selectedTopic ? (
                <>
                  {/* Topic */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '24px',
                    padding: '24px',
                    background: 'var(--brand-light-sand)',
                    borderRadius: '12px',
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '12px' }}>
                      {selectedTopic.emoji}
                    </div>
                    <h3 className="font-heading" style={{
                      fontSize: '32px',
                      fontWeight: 800,
                      color: 'var(--brand-charcoal)',
                      margin: '0 0 8px 0',
                    }}>
                      {selectedTopic.topic}
                    </h3>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: 'rgba(227, 108, 36, 0.1)',
                      border: '1px solid rgba(227, 108, 36, 0.2)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--brand-orange)',
                    }}>
                      {selectedTopic.category}
                    </span>
                  </div>

                  {/* Twist */}
                  {showTwist && selectedTwist && (
                    <div className="animate-fade-in" style={{
                      textAlign: 'center',
                      padding: '24px',
                      background: `${getDifficultyColor(selectedTwist.difficulty)}10`,
                      border: `2px solid ${getDifficultyColor(selectedTwist.difficulty)}`,
                      borderRadius: '12px',
                      marginBottom: '24px',
                    }}>
                      <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                        {selectedTwist.icon}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: getDifficultyColor(selectedTwist.difficulty),
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px',
                      }}>
                        {selectedTwist.difficulty} Challenge
                      </div>
                      <p style={{
                        fontSize: '16px',
                        color: 'var(--brand-charcoal)',
                        lineHeight: 1.6,
                        margin: 0,
                        fontWeight: 500,
                      }}>
                        {selectedTwist.twist}
                      </p>
                    </div>
                  )}

                  {/* Timer */}
                  {showTwist && (
                    <div style={{
                      textAlign: 'center',
                      padding: '20px',
                      background: timer <= 10 ? 'rgba(239, 68, 68, 0.1)' : 'var(--brand-light-sand)',
                      borderRadius: '12px',
                      marginBottom: '24px',
                    }}>
                      <div style={{
                        fontSize: '48px',
                        fontWeight: 800,
                        color: timer <= 10 ? 'var(--red)' : 'var(--brand-orange)',
                        marginBottom: '8px',
                      }}>
                        {timer}s
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--gray-600)',
                        margin: 0,
                      }}>
                        {timer > 0 ? 'Keep speaking!' : 'Time\'s up!'}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {showTwist && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {timer > 0 ? (
                        <button onClick={handleComplete} className="btn btn-primary" style={{ flex: 1 }}>
                          ✓ I'm Done! (+20 XP)
                        </button>
                      ) : (
                        <button onClick={handleComplete} className="btn btn-primary" style={{ flex: 1 }}>
                          ✓ Complete (+20 XP)
                        </button>
                      )}
                      <button onClick={resetWheel} className="btn btn-secondary">
                        Reset
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  color: 'var(--gray-500)',
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎰</div>
                  <p style={{ fontSize: '16px', margin: 0 }}>
                    Spin the wheel to get your topic!
                  </p>
                </div>
              )}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="card" style={{ padding: '24px' }}>
                <h4 className="font-heading" style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--brand-charcoal)',
                  marginBottom: '16px',
                }}>
                  📜 Recent Spins
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {history.map((item, index) => (
                    <div key={index} style={{
                      padding: '12px',
                      background: 'var(--brand-light-sand)',
                      borderRadius: '8px',
                      fontSize: '13px',
                    }}>
                      <div style={{ fontWeight: 600, color: 'var(--brand-charcoal)', marginBottom: '4px' }}>
                        {item.topic}
                      </div>
                      <div style={{ color: 'var(--gray-600)', fontSize: '12px' }}>
                        {item.twist.substring(0, 50)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
