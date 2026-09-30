import React, { useState } from 'react';
import { DictionaryEntry, searchDictionary, getWordDetails } from '../utils/dictionary';

interface DictionaryWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DictionaryWidget: React.FC<DictionaryWidgetProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [selectedWord, setSelectedWord] = useState<DictionaryEntry | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setResults(searchDictionary(query));
    } else {
      setResults([]);
    }
  };

  const handleWordClick = (word: string) => {
    const entry = getWordDetails(word);
    if (entry) {
      setSelectedWord(entry);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--white)',
        borderRadius: '16px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
      }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(227, 108, 36, 0.1), rgba(255, 193, 7, 0.1))',
          padding: '24px',
          borderBottom: '1px solid var(--gray-200)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: 'var(--brand-charcoal)',
                margin: '0 0 4px 0',
                fontFamily: 'Montserrat, sans-serif',
              }}>
                📖 Dictionary
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', margin: 0 }}>
                British & American English
              </p>
            </div>
            <button onClick={onClose} style={{
              background: 'var(--gray-100)',
              border: '1px solid var(--gray-300)',
              borderRadius: '10px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'var(--gray-600)',
            }}>✕</button>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a word..."
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              background: 'var(--white)',
              border: '2px solid var(--gray-200)',
              borderRadius: '8px',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--brand-orange)';
              e.target.style.boxShadow = '0 0 0 3px rgba(227, 108, 36, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--gray-200)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Content */}
        <div style={{ overflow: 'auto', padding: '24px', maxHeight: '60vh' }}>
          {selectedWord ? (
            <div>
              <button
                onClick={() => setSelectedWord(null)}
                style={{
                  marginBottom: '16px',
                  padding: '8px 16px',
                  background: 'var(--gray-100)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--brand-charcoal)',
                }}
              >
                ← Back to Results
              </button>

              <div style={{
                background: 'var(--brand-light-sand)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    color: 'var(--brand-charcoal)',
                    margin: 0,
                    fontFamily: 'Montserrat, sans-serif',
                  }}>
                    {selectedWord.word}
                  </h3>
                  <span style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--gray-600)' }}>
                    {selectedWord.phonetic}
                  </span>
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--brand-orange)',
                  background: 'rgba(227, 108, 36, 0.1)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                }}>
                  {selectedWord.partOfSpeech}
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--brand-charcoal)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Definition
                </h4>
                <p style={{ fontSize: '15px', color: 'var(--gray-700)', lineHeight: 1.6, margin: 0 }}>
                  {selectedWord.definition}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--brand-charcoal)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Synonyms
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedWord.synonyms.map((synonym) => (
                    <span key={synonym} style={{
                      fontSize: '13px',
                      color: 'var(--brand-charcoal)',
                      background: 'var(--gray-100)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                    }}>
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--brand-charcoal)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Example
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--gray-700)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  margin: 0,
                  padding: '12px 16px',
                  background: 'var(--gray-100)',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--brand-orange)',
                }}>
                  "{selectedWord.example}"
                </p>
              </div>

              {selectedWord.hasComparison && (
                <div>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--brand-charcoal)',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    🌍 British vs American English
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{
                      background: 'rgba(59, 130, 246, 0.05)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}>
                      <div style={{
                        fontSize: '24px',
                        marginBottom: '8px',
                      }}>
                        🇬🇧
                      </div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--blue)',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}>
                        British English
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--brand-charcoal)',
                        marginBottom: '4px',
                      }}>
                        {selectedWord.british?.spelling}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--gray-600)',
                      }}>
                        {selectedWord.british?.usage}
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}>
                      <div style={{
                        fontSize: '24px',
                        marginBottom: '8px',
                      }}>
                        🇺🇸
                      </div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--red)',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}>
                        American English
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--brand-charcoal)',
                        marginBottom: '4px',
                      }}>
                        {selectedWord.american?.spelling}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--gray-600)',
                      }}>
                        {selectedWord.american?.usage}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {results.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {results.map((entry) => (
                    <button
                      key={entry.word}
                      onClick={() => handleWordClick(entry.word)}
                      style={{
                        padding: '16px',
                        background: 'var(--white)',
                        border: '1px solid var(--gray-200)',
                        borderRadius: '8px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--brand-orange)';
                        e.currentTarget.style.background = 'var(--brand-light-sand)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gray-200)';
                        e.currentTarget.style.background = 'var(--white)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'var(--brand-charcoal)',
                          }}>
                            {entry.word}
                          </span>
                          {entry.hasComparison && (
                            <span style={{ fontSize: '16px' }}>🌍</span>
                          )}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          color: 'var(--gray-500)',
                          fontStyle: 'italic',
                        }}>
                          {entry.partOfSpeech}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '13px',
                        color: 'var(--gray-600)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}>
                        {entry.definition}
                      </p>
                    </button>
                  ))}
                </div>
              ) : searchQuery ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: 'var(--gray-500)',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                  <p style={{ fontSize: '16px', margin: 0 }}>
                    No results found for "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: 'var(--gray-500)',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📖</div>
                  <p style={{ fontSize: '16px', margin: 0 }}>
                    Start typing to search the dictionary
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quick Dictionary Popup for inline word lookup
interface QuickDictionaryPopupProps {
  word: string;
  position: { top: number; left: number };
  onClose: () => void;
}

export const QuickDictionaryPopup: React.FC<QuickDictionaryPopupProps> = ({ word, position, onClose }) => {
  const entry = getWordDetails(word);

  if (!entry) return null;

  return (
    <div style={{
      position: 'fixed',
      top: `${position.top}px`,
      left: `${position.left}px`,
      background: 'var(--white)',
      border: '2px solid var(--brand-orange)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      zIndex: 1500,
      maxWidth: '300px',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'transparent',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        color: 'var(--gray-500)',
      }}>✕</button>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
        <span style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--brand-charcoal)',
        }}>
          {entry.word}
        </span>
        <span style={{
          fontSize: '12px',
          fontStyle: 'italic',
          color: 'var(--gray-500)',
        }}>
          {entry.phonetic}
        </span>
      </div>

      <span style={{
        display: 'inline-block',
        fontSize: '10px',
        fontWeight: 600,
        color: 'var(--brand-orange)',
        background: 'rgba(227, 108, 36, 0.1)',
        padding: '2px 8px',
        borderRadius: '4px',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>
        {entry.partOfSpeech}
      </span>

      <p style={{
        fontSize: '13px',
        color: 'var(--gray-700)',
        lineHeight: 1.5,
        margin: '0 0 8px 0',
      }}>
        {entry.definition}
      </p>

      {entry.hasComparison && (
        <div style={{
          display: 'flex',
          gap: '8px',
          fontSize: '11px',
          borderTop: '1px solid var(--gray-200)',
          paddingTop: '8px',
        }}>
          <span>🇬🇧 {entry.british?.spelling}</span>
          <span>🇺🇸 {entry.american?.spelling}</span>
        </div>
      )}
    </div>
  );
};
