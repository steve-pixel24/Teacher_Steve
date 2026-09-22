import React from 'react';
import { vocabSubcategories, vocabParentCategories, VocabSubcategory } from '../data/vocabulary';

interface VocabularyCategoryProps {
  onBack: () => void;
  onSelectSubcategory: (subcategory: VocabSubcategory) => void;
}

export const VocabularyCategory: React.FC<VocabularyCategoryProps> = ({ onBack, onSelectSubcategory }) => {
  // Group subcategories by parent category
  const grouped = Object.entries(vocabParentCategories).map(([key, info]) => ({
    ...info,
    subcategories: vocabSubcategories.filter(s => s.parentCategory === key),
  }));

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'var(--brand-charcoal)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          padding: '8px 16px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500,
        }}>
          ← Back to Dashboard
        </button>
        <h1 className="font-heading" style={{
          fontSize: '24px',
          fontWeight: 800,
          color: 'white',
          margin: 0,
        }}>
          📝 Vocabulary
        </h1>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {grouped.map((group) => (
          group.subcategories.length > 0 && (
            <div key={group.id} style={{ marginBottom: '40px' }}>
              <h2 className="font-heading" style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--brand-charcoal)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{ fontSize: '28px' }}>{group.icon}</span>
                {group.title}
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'var(--gray-500)',
                marginBottom: '20px',
              }}>
                {group.description}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}>
                {group.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => onSelectSubcategory(sub)}
                    className="category-tile"
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--gray-200)',
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--brand-orange)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(227, 108, 36, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gray-200)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '32px' }}>{sub.icon}</span>
                      <div>
                        <h3 className="font-heading" style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'var(--brand-charcoal)',
                          margin: 0,
                        }}>
                          {sub.title}
                        </h3>
                        <span className="tag tag-blue" style={{ fontSize: '10px', marginTop: '4px' }}>
                          {sub.level}
                        </span>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--gray-500)',
                      lineHeight: 1.5,
                      marginBottom: '12px',
                    }}>
                      {sub.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--gray-100)',
                    }}>
                      <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                        {sub.wordCount} words
                      </span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--brand-orange)',
                      }}>
                        Start Learning →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
