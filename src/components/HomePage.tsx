import { Lesson } from '../data/lessons';
import HeaderBanner from './HeaderBanner';
import FunFactsCarousel from './FunFactsCarousel';
import WordOfDay from './WordOfDay';

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
      color: 'rgba(59, 130, 246, 0.08)',
      borderColor: 'rgba(59, 130, 246, 0.2)',
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
      color: 'rgba(139, 92, 246, 0.08)',
      borderColor: 'rgba(139, 92, 246, 0.2)',
      action: () => alert('Stories section coming soon!'),
    },
    {
      id: 'tests',
      icon: '📝',
      title: 'Tests',
      description: 'Practice quizzes and assessments',
      count: 5,
      color: 'rgba(255, 152, 0, 0.08)',
      borderColor: 'rgba(255, 152, 0, 0.2)',
      action: () => alert('Tests section coming soon!'),
    },
    {
      id: 'games',
      icon: '🎮',
      title: 'Games',
      description: 'Fun learning games and challenges',
      count: 4,
      color: 'rgba(16, 185, 129, 0.08)',
      borderColor: 'rgba(16, 185, 129, 0.2)',
      action: () => alert('Games section coming soon!'),
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <HeaderBanner
        subtitle={isAdmin ? 'Admin Mode' : 'Interactive Learning'}
        rightContent={
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '12px',
              padding: '8px 14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            }}>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                {isAdmin ? '👑' : '👤'} {studentName}
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '12px',
              padding: '8px 14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            }}>
              <span style={{ fontSize: '14px' }}>⭐</span>
              <span className="font-space" style={{ fontSize: '14px', fontWeight: 600, color: '#E65100' }}>
                {studentScore}
              </span>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '13px',
                color: '#64748B',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.color = '#1E293B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
                e.currentTarget.style.color = '#64748B';
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
            color: '#1E293B',
            marginBottom: '8px',
          }}>
            {isAdmin ? 'Welcome back, Teacher Steve 👑' : `Welcome back, ${studentName} 👋`}
          </h2>
          <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '600px', lineHeight: 1.6 }}>
            {isAdmin
              ? 'You have full administrative access. Manage lessons and monitor student progress.'
              : 'Choose a category below to start learning. Track your progress and earn points!'}
          </p>
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
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: `1px solid ${cat.borderColor}`,
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
                      color: '#1E293B',
                      marginBottom: '6px',
                    }}>
                      {cat.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748B',
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
                      color: '#1E293B',
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
        <div style={{ padding: '0 24px 48px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="card" style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
            }}>
              <h3 className="font-space" style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#E65100',
                marginBottom: '16px',
              }}>
                👑 Admin Panel
              </h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
                Administrative controls and student management features will appear here.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary">Manage Lessons</button>
                <button className="btn btn-secondary">View Student Progress</button>
                <button className="btn btn-secondary">Edit Content</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
