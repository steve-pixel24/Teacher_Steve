import React, { useState, useEffect } from 'react';
import { Achievement, loadAchievements, getAchievementPercentage } from '../utils/achievements';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAchievements(loadAchievements());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--white)',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
      }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(227, 108, 36, 0.1), rgba(255, 193, 7, 0.1))',
          padding: '24px',
          borderBottom: '1px solid var(--gray-200)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: 'var(--brand-charcoal)',
                margin: '0 0 4px 0',
                fontFamily: 'Montserrat, sans-serif',
              }}>
                🏆 Achievements
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', margin: 0 }}>
                {unlockedCount} of {achievements.length} unlocked • {totalXP} XP earned
              </p>
            </div>
            <button onClick={onClose} style={{
              background: 'var(--gray-100)',
              border: '1px solid var(--gray-300)',
              borderRadius: '10px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'var(--gray-600)',
            }}>✕</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ overflow: 'auto', padding: '24px', maxHeight: '60vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {achievements.map((achievement) => (
              <div key={achievement.id} style={{
                background: achievement.unlocked ? 'rgba(16, 185, 129, 0.05)' : 'var(--brand-light-sand)',
                border: `2px solid ${achievement.unlocked ? 'var(--green)' : 'var(--gray-200)'}`,
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                opacity: achievement.unlocked ? 1 : 0.7,
              }}>
                <div style={{
                  fontSize: '40px',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: achievement.unlocked ? 'rgba(16, 185, 129, 0.1)' : 'var(--gray-100)',
                  borderRadius: '12px',
                }}>
                  {achievement.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--brand-charcoal)',
                      margin: 0,
                    }}>
                      {achievement.title}
                    </h3>
                    {achievement.unlocked && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: 'var(--green)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}>
                        UNLOCKED
                      </span>
                    )}
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--gray-500)',
                      marginLeft: 'auto',
                    }}>
                      {getAchievementPercentage(achievement.id)}% of students
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--gray-600)', margin: '0 0 8px 0' }}>
                    {achievement.description}
                  </p>
                  {!achievement.unlocked && (
                    <div>
                      <div style={{
                        height: '6px',
                        background: 'var(--gray-200)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginBottom: '4px',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${(achievement.requirement.current / achievement.requirement.target) * 100}%`,
                          background: 'var(--brand-orange)',
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                        {achievement.requirement.current} / {achievement.requirement.target}
                      </span>
                    </div>
                  )}
                  {achievement.unlocked && (
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-orange)' }}>
                      +{achievement.xpReward} XP
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
interface ToastProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementToast: React.FC<ToastProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '24px',
      background: 'var(--white)',
      border: '2px solid var(--green)',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      animation: 'slideInRight 0.4s ease-out',
      maxWidth: '400px',
    }}>
      <div style={{ fontSize: '32px' }}>{achievement.icon}</div>
      <div>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--green)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '2px',
        }}>
          🏆 Achievement Unlocked!
        </div>
        <div style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--brand-charcoal)',
          marginBottom: '2px',
        }}>
          {achievement.title}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
          +{achievement.xpReward} XP earned
        </div>
      </div>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
