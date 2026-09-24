import { StorySection } from '../data/lessons';

interface StoryPanelProps {
  story: StorySection;
  onComplete: () => void;
}

export default function StoryPanel({ story, onComplete }: StoryPanelProps) {
  return (
    <div className="animate-fade-in">
      <div className="story-box" dangerouslySetInnerHTML={{ __html: story.text }} />

      <div style={{ marginBottom: '24px' }}>
        <h3 className="font-space" style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Comprehension Questions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {story.questions.map((q, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span className="font-space" style={{ fontSize: '16px', fontWeight: 700, color: '#FF9800', flexShrink: 0 }}>
                  {i + 1}.
                </span>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#1E293B' }}>{q}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="callout callout-blue">
        <strong>📝 Task:</strong> Discuss these questions with your teacher. Try to find evidence in the story to support your answers.
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button onClick={onComplete} className="btn btn-primary">
          Continue →
        </button>
      </div>
    </div>
  );
}
