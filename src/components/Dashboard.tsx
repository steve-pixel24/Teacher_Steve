import { Lesson, Level } from '../data/lessons';

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

export default function Dashboard({ lessons, onSelectLesson, studentName, studentCode, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[var(--navy2)] border-b border-[var(--border)] px-4 sm:px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--blue)] to-[var(--purple)] flex items-center justify-center text-lg">
              🎓
            </div>
            <div>
              <h1 className="font-space text-lg font-bold text-[var(--text)]">Interactive Lessons</h1>
              <p className="text-xs text-[var(--text-muted)]">Preply Teacher Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2">
              <span className="text-xs text-[var(--text-muted)]">Code:</span>
              <span className="text-sm font-mono font-medium text-[var(--blue-light)]">{studentCode}</span>
            </div>
            <button
              onClick={onLogout}
              className="btn btn-ghost text-xs"
              title="Log out"
            >
              🚪 Exit
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-4 sm:px-8 pt-8 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="font-space text-2xl sm:text-3xl font-bold mb-2">
              Welcome back, <span className="text-[var(--blue-light)]">{studentName}</span> 👋
            </h2>
            <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl">
              Choose a lesson below to start learning. Each lesson includes explanations, interactive exercises, and practice activities.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <div className="card flex items-center gap-3 px-4 py-3">
              <span className="text-xl">📖</span>
              <div>
                <div className="font-space text-lg font-bold text-[var(--text)]">{lessons.length}</div>
                <div className="text-xs text-[var(--text-muted)]">Lessons</div>
              </div>
            </div>
            <div className="card flex items-center gap-3 px-4 py-3">
              <span className="text-xl">⏱️</span>
              <div>
                <div className="font-space text-lg font-bold text-[var(--text)]">{lessons.reduce((a, l) => a + l.duration, 0)}</div>
                <div className="text-xs text-[var(--text-muted)]">Minutes total</div>
              </div>
            </div>
            <div className="card flex items-center gap-3 px-4 py-3">
              <span className="text-xl">🎮</span>
              <div>
                <div className="font-space text-lg font-bold text-[var(--text)]">
                  {lessons.reduce((a, l) => a + l.sections.filter(s => ['quiz', 'flashcards', 'matching', 'wordOrder'].includes(s.type)).length, 0)}
                </div>
                <div className="text-xs text-[var(--text-muted)]">Activities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="px-4 sm:px-8 py-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-space text-lg font-semibold mb-4 text-[var(--text)]">Available Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="card card-interactive animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onSelectLesson(lesson)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    lesson.color === 'blue' ? 'bg-[var(--blue-glow)]' :
                    lesson.color === 'purple' ? 'bg-[rgba(139,92,246,0.15)]' :
                    lesson.color === 'green' ? 'bg-[rgba(16,185,129,0.15)]' :
                    lesson.color === 'amber' ? 'bg-[rgba(245,158,11,0.15)]' :
                    'bg-[rgba(6,182,212,0.15)]'
                  }`}>
                    {lesson.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`tag ${levelColors[lesson.level]}`}>{lesson.level}</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {typeIcons[lesson.type]} {lesson.type}
                      </span>
                    </div>
                    <h4 className="font-space text-base font-semibold text-[var(--text)] mb-1 leading-tight">
                      {lesson.title}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
                      {lesson.description}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs text-[var(--text-dim)] flex items-center gap-1">
                        ⏱️ {lesson.duration} min
                      </span>
                      <span className="text-xs text-[var(--text-dim)] flex items-center gap-1">
                        📋 {lesson.sections.length} sections
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-4 sm:px-8 py-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-[var(--text-dim)]">
            Built for Preply teachers · Interactive lessons that make learning fun 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}
