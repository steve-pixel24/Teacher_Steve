import { getTopStudents, getRankBadge, loadStudents } from '../utils/xpSystem';
import LeaderboardModal from './LeaderboardModal';
import { useState } from 'react';

interface HeaderBannerProps {
  subtitle?: string;
  rightContent?: React.ReactNode;
  compact?: boolean;
  currentStudentCode?: string;
}

export default function HeaderBanner({ subtitle, rightContent, compact, currentStudentCode }: HeaderBannerProps) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const students = loadStudents();
  const topStudents = getTopStudents(students, 3);

  return (
    <>
      <header
        className="header-banner"
        style={{ height: compact ? '64px' : '80px' }}
      >
        {/* Geometric Orange Patterns */}
        <div className="header-geo-1" />
        <div className="header-geo-2" />
        <div className="header-geo-3" />

        {/* Content Container */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            height: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: High Scores Widget */}
          {!compact && (
            <button
              onClick={() => setShowLeaderboard(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'var(--brand-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: 'white',
              }}>
                🏆
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--brand-charcoal)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Top Students
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--brand-charcoal)',
                }}>
                  {topStudents.length > 0 ? (
                    <>
                      {getRankBadge(1)} {topStudents[0]?.name}{' '}
                      <span style={{ color: 'var(--gray-600)', fontWeight: 400 }}>
                        • Lvl {topStudents[0]?.level || 1}
                      </span>{' '}
                      <span style={{ color: 'var(--brand-orange)' }}>
                        ({topStudents[0]?.xp || 0} pts)
                      </span>
                    </>
                  ) : (
                    <span style={{ color: 'var(--gray-600)' }}>No students yet</span>
                  )}
                </div>
              </div>
            </button>
          )}

          {/* Center: Title */}
          <div style={{ 
            textAlign: 'center', 
            flex: 1,
            padding: '0 20px',
          }}>
            <h1
              className="font-heading"
              style={{
                fontSize: compact ? '20px' : '28px',
                fontWeight: 800,
                color: 'white',
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Teacher Steve's
            </h1>
            <p style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '2px 0 0 0',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              {subtitle || 'Interactive English Platform'}
            </p>
          </div>

          {/* Right: User Status */}
          {rightContent && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              {rightContent}
            </div>
          )}
        </div>
      </header>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentStudentCode={currentStudentCode}
      />
    </>
  );
}
