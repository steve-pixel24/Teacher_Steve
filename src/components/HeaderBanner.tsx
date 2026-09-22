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
        style={{ height: compact ? '56px' : '72px' }}
      >
        {/* Geometric layers - clean overlapping diagonal blocks at 45° */}
        <div className="header-geo-1" />
        <div className="header-geo-2" />
        <div className="header-geo-3" />
        <div className="header-geo-4" />
        <div className="header-geo-5" />

        {/* Bottom accent line */}
        <div className="header-banner-line" />

        {/* Content container */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            height: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left content - High Scores Widget */}
          {!compact && (
            <div
              onClick={() => setShowLeaderboard(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '12px',
                padding: '8px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '16px' }}>🏆</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Top Students
                </span>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                  {topStudents.map((student, idx) => (
                    <span key={student.code} style={{ color: '#1E293B', fontWeight: 500 }}>
                      {getRankBadge(idx + 1)} {student.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Center content - Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              🎓
            </div>
            <h1
              className="font-space"
              style={{
                fontSize: compact ? '20px' : '26px',
                fontWeight: 700,
                color: '#1E293B',
                margin: 0,
                lineHeight: 1.2,
                textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                letterSpacing: '-0.02em',
              }}
            >
              Teacher Steve's
            </h1>
            {subtitle && (
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#64748B',
                  letterSpacing: '0.02em',
                  marginLeft: '8px',
                }}
              >
                {subtitle}
              </span>
            )}
          </div>

          {/* Right content */}
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
