import { Lesson } from '../data/lessons';
import HeaderBanner from './HeaderBanner';
import FunFactsCarousel from './FunFactsCarousel';
import WordOfDay from './WordOfDay';
import StudentManagement from './StudentManagement';
import { getLevelInfo, getLevelColor, loadStudents } from '../utils/xpSystem';

interface HomePageProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  studentName: string;
  studentCode: string;
  isAdmin: boolean;
  studentScore: number;
  onLogout: () => void;
  onAddScore: (points: number) => void;
}

export default function HomePage({
  lessons,
  onSelectLesson,
  studentName,
  studentCode,
  isAdmin,
  studentScore,
  onLogout,
  onAddScore,
}: HomePageProps) {
  const categories = [
    {
      id: 'lessons',
      icon: '📖',
      title: 'Lessons',
      description: 'Interactive grammar and vocabulary lessons',
      count: lessons.length,
      color: 'rgba(227, 108, 36, 0.1)',
      borderColor: 'rgba(227, 108, 36, 0.2)',
      action: () => {
        if (lessons.length > 0) {
          onSelectLesson(lessons[0]);
        }
      },
    },
    {
      id: 'stories',
      icon: '📚',
      title: 'Stories',
      description: 'Reading comprehension and analysis',
      count: 3,
      color: 'rgba(43, 45, 49, 0.08)',
      borderColor: 'rgba(43, 45, 49, 0.15)',
      action: () => alert('Stories section coming soon!'),
    },
    {
      id: 'tests',
      icon: '📝',
      title: 'Tests',
      description: 'Practice quizzes and assessments',
      count: 5,
      color: 'rgba(227, 108, 36, 0.08)',
      borderColor: 'rgba(227, 108, 36, 0.15)',
      action: () => alert('Tests section coming soon!'),
    },
    {
      id: 'games',
      icon: '🎮',
      title: 'Games',
      description: 'Fun learning games and challenges',
      count: 4,
      color: 'rgba(53, 57, 94, 0.08)',
      borderColor: 'rgba(53, 57, 94, 0.15)',
      action: () => alert('Games section coming soon!'),
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '8px 14px',
            }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
                {isAdmin ? '👑' : '👤'} {studentName}
              </span>
            </div>
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

      {/* Welcome Section */}
      <div style={{ padding: '32px 24px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="animate-fade-in">
          <h2 className="font-space" style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#2B2D31',
            marginBottom: '8px',
          }}>
            {isAdmin ? 'Welcome back, Teacher Steve 👑' : `Welcome back, ${studentName} 👋`}
          </h2>
          <p style={{ color: '#35395E', fontSize: '16px', maxWidth: '600px', lineHeight: 1.6, marginBottom: '20px' }}>
            {isAdmin
              ? 'You have full administrative access. Manage lessons and monitor student progress.'
              : 'Choose a category below to start learning. Track your progress and earn points!'}
          </p>

          {/* XP Progress Bar */}
          {!isAdmin && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '16px',
              padding: '20px',
              maxWidth: '500px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>⭐</span>
                  <div>
                    <div className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: levelColor }}>
                      Level {levelInfo.level}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      {levelInfo.currentXP} / {levelInfo.maxXP} XP
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#1E293B' }}>
                    {studentXP}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Total XP</div>
                </div>
              </div>
              <div style={{
                height: '12px',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '999px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.6)',
              }}>
                <div
                  style={{
                    height: '100%',
                    width: `${levelInfo.progress}%`,
                    background: `linear-gradient(90deg, ${levelColor}, ${levelColor}dd)`,
                    borderRadius: '999px',
                    transition: 'width 0.5s ease',
                    boxShadow: `0 0 10px ${levelColor}40`,
                  }}
                />
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '8px', textAlign: 'center' }}>
                {levelInfo.maxXP - levelInfo.currentXP} XP to Level {levelInfo.level + 1}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                onClick={cat.action}
                className="card card-interactive animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  background: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    flexShrink: 0,
                    background: cat.color,
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="font-space" style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#2B2D31',
                      marginBottom: '6px',
                    }}>
                      {cat.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#35395E',
                      lineHeight: 1.5,
                      marginBottom: '12px',
                    }}>
                      {cat.description}
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      background: cat.color,
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#2B2D31',
                    }}>
                      <span>{cat.count}</span>
                      <span style={{ opacity: 0.7 }}>available</span>
                    </div>
                  </div>
                </div>
              </div>
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
          <WordOfDay onAddScore={onAddScore} />
        </div>
      </div>

      {/* Admin Panel (if admin) */}
      {isAdmin && (
        <StudentManagement />
      )}
    </div>
  );
}
