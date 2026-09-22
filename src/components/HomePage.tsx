import { Lesson } from '../data/lessons';
import HeaderBanner from './HeaderBanner';
import FunFactsCarousel from './FunFactsCarousel';
import WordOfDay from './WordOfDay';
import StudentManagement from './StudentManagement';
import { getLevelInfo, getLevelColor, loadStudents } from '../utils/xpSystem';

interface HomePageProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  onOpenCategory: (category: 'lessons' | 'stories' | 'tests' | 'games') => void;
  studentName: string;
  studentCode: string;
  isAdmin: boolean;
  studentScore: number;
  studentAvatar: string;
  studentTitle: string;
  onLogout: () => void;
  onAddScore: (points: number) => void;
  onOpenAchievements: () => void;
  onOpenProfile: () => void;
  onOpenDictionary: () => void;
  onWordSubmission: () => void;
}

export default function HomePage({
  lessons,
  onSelectLesson,
  onOpenCategory,
  studentName,
  studentCode,
  isAdmin,
  studentScore,
  studentAvatar,
  studentTitle,
  onLogout,
  onAddScore,
  onOpenAchievements,
  onOpenProfile,
  onOpenDictionary,
  onWordSubmission,
}: HomePageProps) {
  const categories = [
    {
      id: 'lessons' as const,
      icon: '📖',
      title: 'Lessons',
      description: 'Interactive grammar and vocabulary lessons',
      count: lessons.length,
      color: 'rgba(227, 108, 36, 0.1)',
      borderColor: 'rgba(227, 108, 36, 0.2)',
      action: () => onOpenCategory('lessons'),
    },
    {
      id: 'stories' as const,
      icon: '📚',
      title: 'Stories',
      description: 'Reading comprehension and analysis',
      count: 5,
      color: 'rgba(43, 45, 49, 0.08)',
      borderColor: 'rgba(43, 45, 49, 0.15)',
      action: () => onOpenCategory('stories'),
    },
    {
      id: 'tests' as const,
      icon: '📝',
      title: 'Tests',
      description: 'Practice quizzes and assessments',
      count: 6,
      color: 'rgba(227, 108, 36, 0.08)',
      borderColor: 'rgba(227, 108, 36, 0.15)',
      action: () => onOpenCategory('tests'),
    },
    {
      id: 'games' as const,
      icon: '🎮',
      title: 'Games',
      description: 'Fun learning games and challenges',
      count: 6,
      color: 'rgba(53, 57, 94, 0.08)',
      borderColor: 'rgba(53, 57, 94, 0.15)',
      action: () => onOpenCategory('games'),
    },
  ];

  // Get student's XP from leaderboard or use studentScore as XP
  const students = loadStudents();
  const studentProfile = students.find(s => s.code === studentCode);
  const studentXP = studentProfile ? studentProfile.xp : studentScore;
  const levelInfo = getLevelInfo(studentXP);
  const levelColor = getLevelColor(levelInfo.level);

  return (
    <div style={{ minHeight: '100vh' }}>
      <HeaderBanner
        subtitle={isAdmin ? 'Admin Mode' : 'Interactive Learning'}
        currentStudentCode={studentCode}
        rightContent={
          <>
            {!isAdmin && (
              <>
                <button
                  onClick={onOpenDictionary}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.9)',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  📖 Dictionary
                </button>
                <button
                  onClick={onOpenAchievements}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.9)',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  🏆 Achievements
                </button>
              </>
            )}
            <button
              onClick={onOpenProfile}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              {studentAvatar}
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(227, 108, 36, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(227, 108, 36, 0.3)',
              borderRadius: '12px',
              padding: '8px 14px',
            }}>
              <span style={{ fontSize: '14px' }}>⭐</span>
              <span className="font-space" style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                {studentScore}
              </span>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
              }}
            >
              🚪 Exit
            </button>
          </>
        }
      />

      {/* Welcome Section with XP Progress */}
      <div style={{ padding: '32px 24px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="animate-fade-in">
          <div className="card" style={{
            padding: '24px 32px',
            borderLeft: '4px solid var(--brand-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 className="font-heading" style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--brand-charcoal)',
                marginBottom: '4px',
              }}>
                {isAdmin ? 'Welcome back, Teacher Steve 👑' : `Welcome back, `}
                {!isAdmin && <span style={{ color: 'var(--brand-orange)' }}>{studentName}</span>}
                {!isAdmin && ' 👋'}
              </h2>
              <p style={{ color: 'var(--gray-600)', fontSize: '14px', lineHeight: 1.5 }}>
                {isAdmin
                  ? 'You have full administrative access. Manage lessons and monitor student progress.'
                  : 'Select an activity below to start practice. Earn XP to level up your rank!'}
              </p>
            </div>

            {/* XP Progress Card */}
            {!isAdmin && (
              <div style={{
                width: '320px',
                background: 'var(--brand-light-sand)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--gray-200)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="font-heading" style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    background: 'var(--brand-orange)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}>
                    Level {levelInfo.level}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-graphite)' }}>
                    {levelInfo.currentXP} / {levelInfo.maxXP} XP
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
                  background: 'var(--gray-200)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${levelInfo.progress}%`,
                    background: 'var(--brand-orange)',
                    borderRadius: '999px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <div style={{ fontSize: '10px', color: 'var(--gray-500)', marginTop: '6px', textAlign: 'right' }}>
                  {levelInfo.maxXP - levelInfo.currentXP} XP to Level {levelInfo.level + 1}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 className="font-heading" style={{
              fontSize: '18px',
              fontWeight: 800,
              color: 'var(--brand-charcoal)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Learning Modules
            </h3>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--brand-orange)',
            }}>
              {categories.length} Categories Available
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={cat.action}
                className="card animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  padding: '20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1px solid var(--gray-200)',
                  background: 'var(--white)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-orange)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gray-200)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cat.icon}</div>
                <h4 className="font-heading" style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--brand-charcoal)',
                  marginBottom: '4px',
                }}>
                  {cat.title}
                </h4>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--gray-500)',
                  lineHeight: 1.5,
                  marginBottom: '12px',
                }}>
                  {cat.description}
                </p>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--brand-orange)',
                }}>
                  Explore →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fun Facts Carousel */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FunFactsCarousel />
        </div>
      </div>

      {/* Word of the Day */}
      <div style={{ padding: '0 24px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <WordOfDay onAddScore={onAddScore} onWordSubmission={onWordSubmission} />
        </div>
      </div>

      {/* Admin Panel (if admin) */}
      {isAdmin && (
        <StudentManagement />
      )}
    </div>
  );
}
