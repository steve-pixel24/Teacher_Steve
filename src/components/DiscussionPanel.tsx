import { DiscussionSection } from '../data/lessons';

interface DiscussionPanelProps {
  discussion: DiscussionSection;
  onComplete: () => void;
}

export default function DiscussionPanel({ discussion, onComplete }: DiscussionPanelProps) {
  return (
    <div className="animate-fade-in">
      <div className="callout callout-purple" style={{ marginBottom: '24px' }}>
        <strong>💬 Speaking Practice:</strong> These questions are designed for conversation with your teacher. Take your time, use the vocabulary and grammar from this lesson, and don't worry about making mistakes — that's how we learn!
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {discussion.questions.map((q, i) => (
          <div key={i} className="card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#FF9800', flexShrink: 0 }}>
                {i + 1}.
              </span>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#1E293B' }}>{q}</p>
            </div>
          </div>
        ))}
      </div>

      {discussion.tips && discussion.tips.length > 0 && (
        <div className="callout callout-green" style={{ marginBottom: '24px' }}>
          <strong>💡 Tips for this activity:</strong>
          <ul style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: 0, listStyle: 'none' }}>
            {discussion.tips.map((tip, i) => (
              <li key={i} style={{ fontSize: '14px', color: '#1E293B', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} className="btn btn-primary">
          Continue →
        </button>
      </div>
    </div>
  );
}
