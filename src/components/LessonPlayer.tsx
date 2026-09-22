import { useState, useEffect } from 'react';
import { Lesson, LessonSection } from '../data/lessons';
import HeaderBanner from './HeaderBanner';
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
  studentCode?: string;
  onBack: () => void;
}

export default function LessonPlayer({ lesson, studentName, studentCode, onBack }: LessonPlayerProps) {
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
  const section = lesson.sections[currentSection];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header Banner */}
      <HeaderBanner
        subtitle={`${lesson.level} · ${lesson.duration} min`}
        compact
        currentStudentCode={studentCode}
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
              <span style={{ fontSize: '12px', color: '#64748B' }}>{studentName}</span>
            </div>
            <div className="font-space" style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1E293B',
              background: 'rgba(255,255,255,0.7)',
              padding: '6px 12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.5)',
            }}>
              {formatTime(totalSeconds)}
            </div>
          </>
        }
      />

      {/* Lesson Title Bar */}
      <div style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.5)',
        padding: '12px 24px',
      }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(30,41,59,0.1)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '13px',
              color: '#64748B',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s',
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
            ← Back
          </button>
          <h1 className="font-space" style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', margin: 0 }}>
            {lesson.title}
          </h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Section Navigation */}
      <div style={{
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.4)',
        padding: '8px 24px',
        overflowX: 'auto',
      }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', gap: '4px' }}>
          {lesson.sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                cursor: 'pointer',
                border: 'none',
                background: i === currentSection
                  ? 'rgba(255,152,0,0.12)'
                  : 'transparent',
                color: i === currentSection
                  ? '#E65100'
                  : completedSections.has(i)
                    ? '#10b981'
                    : '#64748B',
              }}
            >
              {completedSections.has(i) ? '✓' : `${i + 1}.`} {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="animate-fade-in" key={section.id}>
          <SectionHeader section={section} />

          {section.type === 'content' && section.content && <ContentRenderer content={section.content} />}
          {section.type === 'quiz' && section.quiz && <Quiz questions={section.quiz.questions} onComplete={() => { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < lesson.sections.length - 1) setCurrentSection(prev => prev + 1); }} />}
          {section.type === 'flashcards' && section.flashcards && <Flashcards cards={section.flashcards.cards} onComplete={() => { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < lesson.sections.length - 1) setCurrentSection(prev => prev + 1); }} />}
          {section.type === 'matching' && section.matching && <MatchingGame instruction={section.matching.instruction} pairs={section.matching.pairs} onComplete={() => { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < lesson.sections.length - 1) setCurrentSection(prev => prev + 1); }} />}
          {section.type === 'wordOrder' && section.wordOrder && <WordOrder sentences={section.wordOrder.sentences} onComplete={() => { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < lesson.sections.length - 1) setCurrentSection(prev => prev + 1); }} />}
          {section.type === 'story' && section.story && <StoryPanel story={section.story} onComplete={() => { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < lesson.sections.length - 1) setCurrentSection(prev => prev + 1); }} />}
          {section.type === 'discussion' && section.discussion && <DiscussionPanel discussion={section.discussion} onComplete={() => { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < lesson.sections.length - 1) setCurrentSection(prev => prev + 1); }} />}

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.4)' }}>
            <button
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
              className="btn btn-secondary"
              style={{ opacity: currentSection === 0 ? 0.3 : 1, cursor: currentSection === 0 ? 'not-allowed' : 'pointer' }}
            >
              ← Previous
            </button>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
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
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span className={`tag ${info.color}`}>{info.icon} {info.label}</span>
        <span style={{ fontSize: '12px', color: '#94A3B8' }}>· {section.duration} min</span>
      </div>
      <h2 className="font-space" style={{ fontSize: '24px', fontWeight: 700, color: '#1E293B' }}>
        {section.title}
      </h2>
    </div>
  );
}
