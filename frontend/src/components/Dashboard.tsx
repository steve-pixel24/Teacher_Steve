import { Lesson, Level } from '../data/lessons';
import HeaderBanner from './HeaderBanner';

interface DashboardProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  studentName: string;
  studentCode: string;
  onLogout: () => void;
}

const levelColors: Record<Level, string> = {
  A1: 'tag-green',
  A2: 'tag-cyan',
  B1: 'tag-amber',
  B2: 'tag-blue',
  C1: 'tag-purple',
};

const typeIcons: Record<string, string> = {
  grammar: '📐',
  vocabulary: '📚',
  conversation: '💬',
  mixed: '🎯',
};

const lessonCardColors: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'rgba(59,130,246,0.08)', icon: '🔵' },
  purple: { bg: 'rgba(139,92,246,0.08)', icon: '🟣' },
  green: { bg: 'rgba(16,185,129,0.08)', icon: '🟢' },
  amber: { bg: 'rgba(255,152,0,0.08)', icon: '🟠' },
  cyan: { bg: 'rgba(6,182,212,0.08)', icon: '🔷' },
};

export default function Dashboard({ lessons, onSelectLesson, studentName, studentCode, onLogout }: DashboardProps) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header Banner */}
      <HeaderBanner
        subtitle="Interactive Lessons"
        rightContent={
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '10px',
              padding: '6px 12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Welcome,</span>
              <span className="font-space" style={{ fontSize: '14px', fontWeight: 600, color: '#E65100' }}>
                {studentName}
              </span>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '10px',
                padding: '6px 14px',
                fontSize: '12px',
                color: '#64748B',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.color = '#1E293B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.color = '#64748B';
              }}
            >
              🚪 Exit
            </button>
          </>
        }
      />

      {/* Welcome Section */}
      <div style={{ padding: '32px 24px 16px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }} className="animate-fade-in">
          <h2 className="font-space" style={{ fontSize: '28px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
            Welcome back, <span style={{ color: '#FF9800' }}>{studentName}</span> 👋
          </h2>
          <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '600px', lineHeight: 1.6 }}>
            Choose a lesson below to start learning. Each lesson includes explanations, interactive exercises, and practice activities.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 24px 16px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px' }}>
            <span style={{ fontSize: '22px' }}>📖</span>
            <div>
              <div className="font-space" style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B' }}>{lessons.length}</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Lessons</div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px' }}>
            <span style={{ fontSize: '22px' }}>⏱️</span>
            <div>
              <div className="font-space" style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B' }}>{lessons.reduce((a, l) => a + l.duration, 0)}</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Minutes total</div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px' }}>
            <span style={{ fontSize: '22px' }}>🎮</span>
            <div>
              <div className="font-space" style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B' }}>
                {lessons.reduce((a, l) => a + l.sections.filter(s => ['quiz', 'flashcards', 'matching', 'wordOrder'].includes(s.type)).length, 0)}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Activities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div style={{ padding: '16px 24px 48px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <h3 className="font-space" style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1E293B' }}>
            Available Lessons
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {lessons.map((lesson, index) => {
              const colors = lessonCardColors[lesson.color] || lessonCardColors.blue;
              return (
                <div
                  key={lesson.id}
                  className="card card-interactive animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onSelectLesson(lesson)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                      background: colors.bg,
                    }}>
                      {lesson.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span className={`tag ${levelColors[lesson.level]}`}>{lesson.level}</span>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>
                          {typeIcons[lesson.type]} {lesson.type}
                        </span>
                      </div>
                      <h4 className="font-space" style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1E293B',
                        marginBottom: '4px',
                        lineHeight: 1.3,
                      }}>
                        {lesson.title}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5 }}>
                        {lesson.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                        <span style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ⏱️ {lesson.duration} min
                        </span>
                        <span style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          📋 {lesson.sections.length} sections
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.4)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#94A3B8' }}>
          Built for Preply teachers · Interactive lessons that make learning fun 🚀
        </p>
      </footer>
    </div>
  );
}
