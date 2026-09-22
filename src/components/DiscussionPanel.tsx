import { DiscussionSection } from '../data/lessons';

interface DiscussionPanelProps {
  discussion: DiscussionSection;
  onComplete: () => void;
}

export default function DiscussionPanel({ discussion, onComplete }: DiscussionPanelProps) {
  return (
    <div className="animate-fade-in">
      <div className="callout callout-purple mb-6">
        <strong>💬 Speaking Practice:</strong> These questions are designed for conversation with your teacher. Take your time, use the vocabulary and grammar from this lesson, and don't worry about making mistakes — that's how we learn!
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4 mb-6">
        {discussion.questions.map((q, i) => (
          <div key={i} className="card">
            <div className="flex items-start gap-3">
              <span className="font-space text-lg font-bold text-[var(--blue-light)] shrink-0">
                {i + 1}.
              </span>
              <p className="text-[15px] leading-relaxed">{q}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      {discussion.tips && discussion.tips.length > 0 && (
        <div className="callout callout-green mb-6">
          <strong>💡 Tips for this activity:</strong>
          <ul className="mt-2 flex flex-col gap-1.5">
            {discussion.tips.map((tip, i) => (
              <li key={i} className="text-sm text-[var(--text)] flex items-start gap-2">
                <span className="text-[var(--green-light)]">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Continue */}
      <div className="flex justify-end">
        <button onClick={onComplete} className="btn btn-primary">
          Continue →
        </button>
      </div>
    </div>
  );
}
