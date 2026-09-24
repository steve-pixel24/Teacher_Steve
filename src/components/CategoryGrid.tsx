import React from 'react';
import { lessons } from '../data/lessons';
import { stories } from '../data/stories';
import { tests } from '../data/tests';
import { games } from '../data/games';
import { getItemProgress } from '../utils/progress';

type CategoryType = 'lessons' | 'vocabulary' | 'grammar' | 'stories' | 'tests' | 'games';

interface CategoryGridProps {
  category: CategoryType;
  onBack: () => void;
  onSelectItem: (type: CategoryType, id: string) => void;
}

const categoryConfig = {
  lessons: {
    icon: '📖',
    title: 'Lessons',
    color: 'var(--brand-orange)',
  },
  vocabulary: {
    icon: '📝',
    title: 'Vocabulary',
    color: 'var(--brand-orange)',
  },
  grammar: {
    icon: '📚',
    title: 'Grammar Rules',
    color: 'var(--brand-orange)',
  },
  stories: {
    icon: '📚',
    title: 'Stories',
    color: 'var(--brand-orange)',
  },
  tests: {
    icon: '📝',
    title: 'Tests',
    color: 'var(--brand-orange)',
  },
  games: {
    icon: '🎮',
    title: 'Games',
    color: 'var(--brand-orange)',
  },
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({ category, onBack, onSelectItem }) => {
  const config = categoryConfig[category];

  const renderLessonTile = (lesson: typeof lessons[0]) => {
    const progress = getItemProgress('lesson', lesson.id);
    const isCompleted = progress?.status === 'completed';
    const isInProgress = progress?.status === 'in-progress';

    return (
      <div
        key={lesson.id}
        onClick={() => onSelectItem('lessons', lesson.id)}
        className="category-tile"
        style={{ position: 'relative' }}
      >
        {isCompleted && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--green)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            ✅ Completed
          </div>
        )}
        <div className="category-tile-header">
          <span className="category-tile-icon">{lesson.icon}</span>
          <div className="category-tile-tags">
            <span className="tag tag-blue">{lesson.level}</span>
            <span className="tag tag-purple">{lesson.type}</span>
          </div>
        </div>
        <h3 className="category-tile-title">{lesson.title}</h3>
        <p className="category-tile-description">{lesson.description}</p>
        {isInProgress && !isCompleted && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              height: '6px',
              background: 'var(--gray-200)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progress?.progress || 0}%`,
                background: 'var(--brand-orange)',
                transition: 'width 0.3s ease',
              }} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: '4px' }}>
              {progress?.progress || 0}% Complete
            </span>
          </div>
        )}
        <div className="category-tile-footer">
          <span className="category-tile-duration">⏱️ {lesson.duration} min</span>
          <button className="btn-primary">
            {isCompleted ? 'Review →' : isInProgress ? 'Continue →' : 'Start Lesson →'}
          </button>
        </div>
      </div>
    );
  };

  const renderStoryTile = (story: typeof stories[0]) => {
    const progress = getItemProgress('story', story.id);
    const isCompleted = progress?.status === 'completed';
    const isInProgress = progress?.status === 'in-progress';

    return (
      <div
        key={story.id}
        onClick={() => onSelectItem('stories', story.id)}
        className="category-tile"
        style={{ position: 'relative' }}
      >
        {isCompleted && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--green)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            ✅ Completed
          </div>
        )}
        <div className="category-tile-header">
          <span className="category-tile-icon">📖</span>
          <div className="category-tile-tags">
            <span className="tag tag-blue">{story.level}</span>
            <span className="tag tag-green">{story.genre}</span>
          </div>
        </div>
        <h3 className="category-tile-title">{story.title}</h3>
        <p className="category-tile-description">{story.summary}</p>
        {isInProgress && !isCompleted && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              height: '6px',
              background: 'var(--gray-200)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progress?.progress || 0}%`,
                background: 'var(--brand-orange)',
                transition: 'width 0.3s ease',
              }} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: '4px' }}>
              {progress?.progress || 0}% Read
            </span>
          </div>
        )}
        <div className="category-tile-footer">
          <span className="category-tile-duration">⏱️ {story.readTime} min read</span>
          <button className="btn-primary">
            {isCompleted ? 'Read Again →' : isInProgress ? 'Continue →' : 'Read Story →'}
          </button>
        </div>
      </div>
    );
  };

  const renderTestTile = (test: typeof tests[0]) => {
    const progress = getItemProgress('test', test.id);
    const isCompleted = progress?.status === 'completed';

    return (
      <div
        key={test.id}
        onClick={() => onSelectItem('tests', test.id)}
        className="category-tile"
        style={{ position: 'relative' }}
      >
        {isCompleted && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--green)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            ✅ Completed
          </div>
        )}
        <div className="category-tile-header">
          <span className="category-tile-icon">📝</span>
          <div className="category-tile-tags">
            <span className="tag tag-blue">{test.difficulty}</span>
            <span className="tag tag-purple">{test.category}</span>
          </div>
        </div>
        <h3 className="category-tile-title">{test.title}</h3>
        <p className="category-tile-description">{test.description}</p>
        <div className="category-tile-footer">
          <div className="category-tile-stats">
            <span>❓ {test.questionCount} questions</span>
            <span>⭐ {test.xpReward} XP</span>
          </div>
          <button className="btn-primary">
            {isCompleted ? 'Retake Test →' : 'Take Test →'}
          </button>
        </div>
      </div>
    );
  };

  const renderGameTile = (game: typeof games[0]) => {
    const progress = getItemProgress('game', game.id);
    const isCompleted = progress?.status === 'completed';

    return (
      <div
        key={game.id}
        onClick={() => onSelectItem('games', game.id)}
        className="category-tile"
        style={{ position: 'relative' }}
      >
        {isCompleted && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--green)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            ✅ Completed
          </div>
        )}
        <div className="category-tile-header">
          <span className="category-tile-icon">{game.icon}</span>
          <div className="category-tile-tags">
            <span className="tag tag-purple">{game.category}</span>
          </div>
        </div>
        <h3 className="category-tile-title">{game.title}</h3>
        <p className="category-tile-description">{game.description}</p>
        <div className="category-tile-footer">
          {game.highScore && (
            <span className="category-tile-highscore">🏆 High Score: {game.highScore}</span>
          )}
          <button className="btn-primary">
            {isCompleted ? 'Play Again →' : 'Play Game →'}
          </button>
        </div>
      </div>
    );
  };

  const renderGrid = () => {
    switch (category) {
      case 'lessons':
        return lessons.map(renderLessonTile);
      case 'stories':
        return stories.map(renderStoryTile);
      case 'tests':
        return tests.map(renderTestTile);
      case 'games':
        return games.map(renderGameTile);
      default:
        return null;
    }
  };

  return (
    <div className="category-grid-container">
      <div className="category-grid-header">
        <button onClick={onBack} className="btn-secondary">
          ← Back to Dashboard
        </button>
        <h2 className="category-grid-title">
          <span style={{ color: config.color }}>{config.icon}</span> {config.title}
        </h2>
      </div>

      <div className="category-grid-content">
        {renderGrid()}
      </div>

      <style>{`
        .category-grid-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .category-grid-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 2px solid var(--gray-200);
        }

        .category-grid-title {
          font-size: 28px;
          font-weight: 800;
          color: var(--brand-charcoal);
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .category-grid-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .category-tile {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .category-tile:hover {
          border-color: var(--brand-orange);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(227, 108, 36, 0.15);
        }

        .category-tile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .category-tile-icon {
          font-size: 32px;
        }

        .category-tile-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

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

        .tag-purple {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .tag-green {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .category-tile-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--brand-charcoal);
          margin: 0 0 8px 0;
        }

        .category-tile-description {
          font-size: 14px;
          color: var(--gray-600);
          line-height: 1.5;
          margin: 0 0 16px 0;
          flex: 1;
        }

        .category-tile-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--gray-100);
        }

        .category-tile-duration {
          font-size: 13px;
          color: var(--gray-500);
          font-weight: 500;
        }

        .category-tile-stats {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: var(--gray-500);
          font-weight: 500;
        }

        .category-tile-highscore {
          font-size: 13px;
          color: var(--brand-orange);
          font-weight: 600;
        }

        .btn-primary {
          padding: 8px 16px;
          background: var(--brand-orange);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          background: var(--brand-orange-hover);
          transform: translateY(-1px);
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
          border-color: var(--gray-400);
        }
      `}</style>
    </div>
  );
};
