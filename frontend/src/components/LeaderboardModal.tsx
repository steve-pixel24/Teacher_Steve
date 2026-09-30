import { getFullLeaderboard, getRankBadge, getLevelColor, loadStudents } from '../utils/xpSystem';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudentCode?: string;
}

export default function LeaderboardModal({ isOpen, onClose, currentStudentCode }: LeaderboardModalProps) {
  if (!isOpen) return null;

  const students = loadStudents();
  const leaderboard = getFullLeaderboard(students);

  return (
    <div
      style={{
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
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 193, 7, 0.1))',
            padding: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2
                className="font-space"
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#1E293B',
                  margin: '0 0 4px 0',
                }}
              >
                🏆 Leaderboard
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                Top students ranked by XP
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '10px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#64748B',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.color = '#1E293B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.color = '#64748B';
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ overflow: 'auto', padding: '24px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaderboard.map((student, index) => {
              const rank = index + 1;
              const isCurrentStudent = student.code === currentStudentCode;
              const levelColor = getLevelColor(student.level);

              return (
                <div
                  key={student.code}
                  style={{
                    background: isCurrentStudent
                      ? 'rgba(255, 152, 0, 0.08)'
                      : 'rgba(255, 255, 255, 0.6)',
                    border: isCurrentStudent
                      ? '2px solid rgba(255, 152, 0, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.2s',
                  }}
                >
                  {/* Rank */}
                  <div
                    style={{
                      fontSize: rank <= 3 ? '32px' : '20px',
                      fontWeight: 700,
                      minWidth: '50px',
                      textAlign: 'center',
                      color: rank <= 3 ? undefined : '#64748B',
                    }}
                  >
                    {getRankBadge(rank)}
                  </div>

                  {/* Student Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        className="font-space"
                        style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#1E293B',
                        }}
                      >
                        {student.name}
                      </span>
                      {isCurrentStudent && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#FF9800',
                            background: 'rgba(255, 152, 0, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          You
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#64748B' }}>
                      <span>📚 {student.lessonsCompleted} lessons</span>
                      <span>📖 {student.storiesRead} stories</span>
                      <span>🎮 {student.gamesPlayed} games</span>
                    </div>
                  </div>

                  {/* Level & XP */}
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: `${levelColor}15`,
                        border: `1px solid ${levelColor}30`,
                        borderRadius: '12px',
                        padding: '4px 12px',
                        marginBottom: '4px',
                      }}
                    >
                      <span style={{ fontSize: '14px' }}>⭐</span>
                      <span
                        className="font-space"
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: levelColor,
                        }}
                      >
                        Lvl {student.level}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      {student.xp} XP
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
