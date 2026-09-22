import { StorySection } from '../data/lessons';

interface StoryPanelProps {
  story: StorySection;
  onComplete: () => void;
}

export default function StoryPanel({ story, onComplete }: StoryPanelProps) {
  return (
    <div className="animate-fade-in">
      {/* Story */}
      <div className="story-box mb-8" dangerouslySetInnerHTML={{ __html: story.text }} />

      {/* Questions */}
      <div className="mb-6">
        <h3 className="font-space text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
          Comprehension Questions
        </h3>
        <div className="flex flex-col gap-3">
          {story.questions.map((q, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-3">
                <span className="font-space text-base font-bold text-[var(--blue-light)] shrink-0">
                  {i + 1}.
                </span>
                <p className="text-sm leading-relaxed">{q}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="callout callout-blue">
        <strong>📝 Task:</strong> Discuss these questions with your teacher. Try to find evidence in the story to support your answers.
      </div>

      {/* Continue */}
      <div className="flex justify-end mt-6">
        <button onClick={onComplete} className="btn btn-primary">
          Continue →
        </button>
      </div>
    </div>
  );
}
