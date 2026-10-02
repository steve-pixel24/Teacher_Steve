import React from 'react';
import { allGrammarCategories, GrammarCategory } from '../data/grammar';

interface GrammarCategoryProps {
  onBack: () => void;
  onSelectCategory: (category: GrammarCategory) => void;
}

export const GrammarCategoryView: React.FC<GrammarCategoryProps> = ({ onBack, onSelectCategory }) => {
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
          📚 Grammar Rules
        </h1>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {allGrammarCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category)}
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
                <span style={{ fontSize: '32px' }}>{category.icon}</span>
                <div>
                  <h3 className="font-heading" style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--brand-charcoal)',
                    margin: 0,
                  }}>
                    {category.title}
                  </h3>
                  <span className="tag tag-blue" style={{ fontSize: '10px', marginTop: '4px' }}>
                    {category.level}
                  </span>
                </div>
              </div>
              <p style={{
                fontSize: '13px',
                color: 'var(--gray-500)',
                lineHeight: 1.5,
                marginBottom: '12px',
              }}>
                {category.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid var(--gray-100)',
              }}>
                <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                  {category.ruleCount} rules
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--brand-orange)',
                }}>
                  Learn More →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
