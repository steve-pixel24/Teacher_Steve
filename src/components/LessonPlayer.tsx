import { useState, useEffect } from 'react';
import { Lesson, LessonSection } from '../data/lessons';
import Quiz from './Quiz';
import Flashcards from './Flashcards';
import MatchingGame from './MatchingGame';
import WordOrder from './WordOrder';
import ContentRenderer from './ContentRenderer';
import DiscussionPanel from './DiscussionPanel';
import StoryPanel from './StoryPanel';

interface LessonPlayerProps {
  lesson: Lesson;
  studentName: string;
  onBack: () => void;
}

export default function LessonPlayer({ lesson, studentName, onBack }: LessonPlayerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [totalSeconds, setTotalSeconds] = useState(lesson.duration * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds(prev => {
        if (prev <= 0) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((currentSection + 1) / lesson.sections.length) * 100;

  const completeSection = () => {
    setCompletedSections(prev => new Set([...prev, currentSection]));
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const section = lesson.sections[currentSection];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[var(--navy2)] border-b border-[var(--border)] px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="btn-ghost rounded-lg px-3 py-1.5 text-sm flex items-center gap-1.5"
            >
              ← Back
            </button>
            <div className="hidden sm:block">
              <span className="text-[10px] font-space font-medium text-[var(--blue-light)] tracking-wider uppercase">
                {lesson.level} · {lesson.duration} min
              </span>
              <h1 className="font-space text-sm font-bold text-[var(--text)] leading-tight">
                {lesson.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block bg-[var(--blue-glow)] border border-[rgba(59,130,246,0.3)] rounded-full px-3 py-1 text-xs font-medium text-[var(--blue-light)]">
              {studentName}
            </span>
            <span className="font-space text-sm font-semibold text-[var(--text-muted)]">
              {formatTime(totalSeconds)}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-[var(--border)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--blue-light)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section Navigation */}
      <div className="bg-[var(--navy2)] border-b border-[var(--border)] px-4 sm:px-6 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex gap-1 py-2">
          {lesson.sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                i === currentSection
                  ? 'bg-[var(--blue-glow)] text-[var(--blue-light)] border border-[rgba(59,130,246,0.3)]'
                  : completedSections.has(i)
                    ? 'text-[var(--green-light)] hover:bg-[rgba(16,185,129,0.1)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--card)] hover:text-[var(--text)]'
              }`}
            >
              {completedSections.has(i) ? '✓' : `${i + 1}.`} {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fade-in" key={section.id}>
          <SectionHeader section={section} />
          
          {section.type === 'content' && section.content && (
            <ContentRenderer content={section.content} />
          )}
          {section.type === 'quiz' && section.quiz && (
            <Quiz questions={section.quiz.questions} onComplete={completeSection} />
          )}
          {section.type === 'flashcards' && section.flashcards && (
            <Flashcards cards={section.flashcards.cards} onComplete={completeSection} />
          )}
          {section.type === 'matching' && section.matching && (
            <MatchingGame
              instruction={section.matching.instruction}
              pairs={section.matching.pairs}
              onComplete={completeSection}
            />
          )}
          {section.type === 'wordOrder' && section.wordOrder && (
            <WordOrder sentences={section.wordOrder.sentences} onComplete={completeSection} />
          )}
          {section.type === 'story' && section.story && (
            <StoryPanel story={section.story} onComplete={completeSection} />
          )}
          {section.type === 'discussion' && section.discussion && (
            <DiscussionPanel discussion={section.discussion} onComplete={completeSection} />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
            <button
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
              className="btn btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <span className="text-xs text-[var(--text-muted)]">
              {currentSection + 1} of {lesson.sections.length}
            </span>
            {currentSection < lesson.sections.length - 1 ? (
              <button
                onClick={() => {
                  setCompletedSections(prev => new Set([...prev, currentSection]));
                  setCurrentSection(prev => prev + 1);
                }}
                className="btn btn-primary"
              >
                Next →
              </button>
            ) : (
              <button onClick={onBack} className="btn btn-success">
                ✓ Finish Lesson
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ section }: { section: LessonSection }) {
  const typeLabels: Record<string, { icon: string; label: string; color: string }> = {
    content: { icon: '📖', label: 'Learn', color: 'tag-blue' },
    quiz: { icon: '✏️', label: 'Quiz', color: 'tag-green' },
    flashcards: { icon: '🃏', label: 'Flashcards', color: 'tag-purple' },
    matching: { icon: '🔗', label: 'Match', color: 'tag-amber' },
    wordOrder: { icon: '🧩', label: 'Build', color: 'tag-cyan' },
    story: { icon: '📚', label: 'Story', color: 'tag-blue' },
    discussion: { icon: '💬', label: 'Discuss', color: 'tag-pink' },
  };

  const info = typeLabels[section.type] || typeLabels.content;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className={`tag ${info.color}`}>{info.icon} {info.label}</span>
        <span className="text-xs text-[var(--text-dim)]">· {section.duration} min</span>
      </div>
      <h2 className="font-space text-xl sm:text-2xl font-bold text-[var(--text)]">
        {section.title}
      </h2>
    </div>
  );
}
