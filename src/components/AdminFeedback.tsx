import React, { useState, useEffect } from 'react';
import { loadFeedback, loadFeatures, loadBugs, getFeedbackStats, Feedback, FeatureRequest, BugReport } from '../utils/feedback';

interface AdminFeedbackProps {
  onBack: () => void;
}

export const AdminFeedback: React.FC<AdminFeedbackProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'features' | 'bugs' | 'stats'>('stats');
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [features, setFeatures] = useState<FeatureRequest[]>([]);
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [stats, setStats] = useState(getFeedbackStats());

  useEffect(() => {
    setFeedback(loadFeedback());
    setFeatures(loadFeatures());
    setBugs(loadBugs());
    setStats(getFeedbackStats());
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'var(--red)';
      case 'medium': return 'var(--brand-orange)';
      case 'low': return 'var(--green)';
      default: return 'var(--gray-500)';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'var(--blue)';
      case 'reviewed': return 'var(--brand-orange)';
      case 'completed': return 'var(--green)';
      case 'proposed': return 'var(--gray-500)';
      case 'planned': return 'var(--blue)';
      case 'in-progress': return 'var(--brand-orange)';
      case 'investigating': return 'var(--brand-orange)';
      case 'fixed': return 'var(--green)';
      default: return 'var(--gray-500)';
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} className="btn btn-secondary">
            ← Back to Dashboard
          </button>
          <h1 className="font-heading" style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--brand-charcoal)',
            margin: 0,
          }}>
            💬 Feedback Management
          </h1>
          <div style={{ width: '120px' }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('stats')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'stats' ? 'var(--brand-orange)' : 'var(--white)',
              color: activeTab === 'stats' ? 'white' : 'var(--brand-charcoal)',
              border: `1px solid ${activeTab === 'stats' ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'feedback' ? 'var(--brand-orange)' : 'var(--white)',
              color: activeTab === 'feedback' ? 'white' : 'var(--brand-charcoal)',
              border: `1px solid ${activeTab === 'feedback' ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📝 Feedback ({stats.newFeedback})
          </button>
          <button
            onClick={() => setActiveTab('features')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'features' ? 'var(--brand-orange)' : 'var(--white)',
              color: activeTab === 'features' ? 'white' : 'var(--brand-charcoal)',
              border: `1px solid ${activeTab === 'features' ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            💡 Features ({stats.totalFeatures})
          </button>
          <button
            onClick={() => setActiveTab('bugs')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'bugs' ? 'var(--brand-orange)' : 'var(--white)',
              color: activeTab === 'bugs' ? 'white' : 'var(--brand-charcoal)',
              border: `1px solid ${activeTab === 'bugs' ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🐛 Bugs ({stats.openBugs})
          </button>
        </div>

        {/* Stats Overview */}
        {activeTab === 'stats' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>📝</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--brand-orange)', marginBottom: '4px' }}>
                  {stats.totalFeedback}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Total Feedback</div>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>💡</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--brand-orange)', marginBottom: '4px' }}>
                  {stats.totalVotes}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Total Votes</div>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>🐛</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--brand-orange)', marginBottom: '4px' }}>
                  {stats.openBugs}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Open Bugs</div>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>⭐</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--brand-orange)', marginBottom: '4px' }}>
                  {feedback.filter(f => f.rating).length > 0 
                    ? (feedback.filter(f => f.rating).reduce((sum, f) => sum + (f.rating || 0), 0) / feedback.filter(f => f.rating).length).toFixed(1)
                    : 'N/A'}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Avg Rating</div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--brand-charcoal)',
                marginBottom: '16px',
              }}>
                Top Feature Requests
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {features
                  .sort((a, b) => b.votes - a.votes)
                  .slice(0, 5)
                  .map((feature, index) => (
                    <div key={feature.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px',
                      background: 'var(--brand-light-sand)',
                      borderRadius: '8px',
                    }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 800,
                        color: index === 0 ? 'var(--brand-orange)' : 'var(--gray-500)',
                        minWidth: '40px',
                      }}>
                        #{index + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand-charcoal)' }}>
                          {feature.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                          {feature.description}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--brand-orange)',
                      }}>
                        👍 {feature.votes}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Feedback List */}
        {activeTab === 'feedback' && (
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '16px',
            }}>
              Student Feedback
            </h3>
            {feedback.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-500)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
                <p>No feedback yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {feedback.map((item) => (
                  <div key={item.id} style={{
                    padding: '16px',
                    background: 'var(--brand-light-sand)',
                    borderRadius: '8px',
                    border: '1px solid var(--gray-200)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            padding: '2px 8px',
                            background: item.type === 'general' ? 'var(--blue)' : 'var(--green)',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 600,
                          }}>
                            {item.type === 'general' ? '💭 General' : '📚 Topic'}
                          </span>
                          {item.rating && (
                            <span style={{ fontSize: '14px' }}>
                              {'⭐'.repeat(item.rating)}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
                          From: {item.studentName} • {new Date(item.submittedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        background: getStatusColor(item.status),
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}>
                        {item.status}
                      </span>
                    </div>
                    {item.category && (
                      <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '8px' }}>
                        Category: {item.category}
                      </div>
                    )}
                    <div style={{ fontSize: '14px', color: 'var(--brand-charcoal)', lineHeight: 1.6 }}>
                      {item.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Features List */}
        {activeTab === 'features' && (
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '16px',
            }}>
              Feature Requests
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {features
                .sort((a, b) => b.votes - a.votes)
                .map((feature) => (
                  <div key={feature.id} style={{
                    padding: '16px',
                    background: 'var(--brand-light-sand)',
                    borderRadius: '8px',
                    border: '1px solid var(--gray-200)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: 'var(--brand-charcoal)',
                          margin: '0 0 4px 0',
                        }}>
                          {feature.title}
                        </h4>
                        <p style={{
                          fontSize: '13px',
                          color: 'var(--gray-600)',
                          margin: '0 0 8px 0',
                          lineHeight: 1.5,
                        }}>
                          {feature.description}
                        </p>
                        <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                          Proposed by {feature.createdBy} • {new Date(feature.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', minWidth: '80px' }}>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand-orange)' }}>
                          👍 {feature.votes}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>votes</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Bugs List */}
        {activeTab === 'bugs' && (
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '16px',
            }}>
              Bug Reports
            </h3>
            {bugs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-500)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🐛</div>
                <p>No bugs reported</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bugs.map((bug) => (
                  <div key={bug.id} style={{
                    padding: '16px',
                    background: 'var(--brand-light-sand)',
                    borderRadius: '8px',
                    border: `2px solid ${getSeverityColor(bug.severity)}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: 'var(--brand-charcoal)',
                            margin: 0,
                          }}>
                            {bug.title}
                          </h4>
                          <span style={{
                            padding: '2px 8px',
                            background: getSeverityColor(bug.severity),
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                          }}>
                            {bug.severity}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                          Reported by {bug.reportedBy} • {new Date(bug.reportedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        background: getStatusColor(bug.status),
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}>
                        {bug.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--brand-charcoal)', lineHeight: 1.6 }}>
                      {bug.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
