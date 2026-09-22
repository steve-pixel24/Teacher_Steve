import React, { useState, useEffect } from 'react';
import { Story } from '../data/stories';
import { updateItemProgress, completeItem } from '../utils/progress';

interface StoryReaderProps {
  story: Story;
  onBack: () => void;
  onComplete: (xpReward: number) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ story, onBack, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [isCompleted, setIsCompleted] = useState(false);

  // Split story content into pages (roughly 300 words per page)
  const pages = story.content.split('\n\n').filter(p => p.trim());
  const totalPages = pages.length;

  useEffect(() => {
    // Update progress when page changes
    const progress = Math.round(((currentPage + 1) / totalPages) * 100);
    updateItemProgress('story', story.id, {
      status: 'in-progress',
      progress,
    });
  }, [currentPage, totalPages, story.id]);

  const handleFinish = () => {
    if (!isCompleted) {
      completeItem('story', story.id, 50);
      setIsCompleted(true);
      onComplete(50);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--brand-sand)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn-secondary">
            ← Back to Stories
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
              Page {currentPage + 1} of {totalPages}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                style={{
                  padding: '6px 12px',
                  background: 'var(--gray-100)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                style={{
                  padding: '6px 12px',
                  background: 'var(--gray-100)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: '12px',
          padding: '48px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 800,
            color: 'var(--brand-charcoal)',
            marginBottom: '8px',
            fontFamily: 'Montserrat, sans-serif',
          }}>
            {story.title}
          </h1>
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <span className="tag tag-blue">{story.level}</span>
            <span className="tag tag-green">{story.genre}</span>
            <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
              ⏱️ {story.readTime} min read
            </span>
          </div>

          <div style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.8,
            color: 'var(--brand-charcoal)',
            marginBottom: '48px',
          }}>
            {pages[currentPage]}
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid var(--gray-200)',
          }}>
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="btn-secondary"
              style={{ opacity: currentPage === 0 ? 0.5 : 1 }}
            >
              ← Previous Page
            </button>

            {currentPage === totalPages - 1 && !isCompleted ? (
              <button onClick={handleFinish} className="btn-primary">
                ✓ Finish Story (+50 XP)
              </button>
            ) : isCompleted ? (
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>
                ✅ Completed
              </span>
            ) : (
              <button onClick={nextPage} className="btn-primary">
                Next Page →
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .tag {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tag-blue {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        .tag-green {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }
        .btn-primary {
          padding: 10px 20px;
          background: var(--brand-orange);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          background: var(--brand-orange-hover);
        }
        .btn-secondary {
          padding: 10px 20px;
          background: var(--white);
          color: var(--brand-charcoal);
          border: 1px solid var(--gray-300);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          background: var(--gray-100);
        }
      `}</style>
    </div>
  );
};
