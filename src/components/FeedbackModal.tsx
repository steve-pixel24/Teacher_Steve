import React, { useState } from 'react';
import { submitFeedback, submitFeatureRequest, submitBugReport, loadFeatures, voteFeature, unvoteFeature, FeatureRequest } from '../utils/feedback';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentCode: string;
}

type FeedbackTab = 'feedback' | 'features' | 'bugs';

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, studentName, studentCode }) => {
  const [activeTab, setActiveTab] = useState<FeedbackTab>('feedback');
  const [feedbackType, setFeedbackType] = useState<'general' | 'topic'>('general');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [bugTitle, setBugTitle] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [bugSeverity, setBugSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [submitted, setSubmitted] = useState(false);
  const [features, setFeatures] = useState<FeatureRequest[]>(loadFeatures());

  if (!isOpen) return null;

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    submitFeedback(
      feedbackType,
      message,
      studentName,
      studentCode,
      feedbackType === 'general' ? rating : undefined,
      feedbackType === 'topic' ? category : undefined
    );

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setRating(0);
      setCategory('');
      onClose();
    }, 2000);
  };

  const handleSubmitFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureTitle.trim() || !featureDescription.trim()) return;

    submitFeatureRequest(featureTitle, featureDescription, studentName, studentCode);
    setFeatures(loadFeatures());
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeatureTitle('');
      setFeatureDescription('');
      setActiveTab('features');
    }, 2000);
  };

  const handleSubmitBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugTitle.trim() || !bugDescription.trim()) return;

    submitBugReport(bugTitle, bugDescription, bugSeverity, studentName, studentCode);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setBugTitle('');
      setBugDescription('');
      onClose();
    }, 2000);
  };

  const handleVote = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (feature && feature.votedBy.includes(studentCode)) {
      setFeatures(unvoteFeature(featureId, studentCode));
    } else {
      setFeatures(voteFeature(featureId, studentCode));
    }
  };

  const hasVoted = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    return feature?.votedBy.includes(studentCode) || false;
  };

  return (
    <div 
      style={{
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
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--white)',
          borderRadius: '16px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(227, 108, 36, 0.1), rgba(255, 193, 7, 0.1))',
          padding: '24px',
          borderBottom: '1px solid var(--gray-200)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: 'var(--brand-charcoal)',
                margin: '0 0 4px 0',
                fontFamily: 'Montserrat, sans-serif',
              }}>
                💬 Share Your Feedback
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', margin: 0 }}>
                Help us improve the platform
              </p>
            </div>
            <button 
              onClick={onClose}
              style={{
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
              }}
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
            <button
              onClick={() => setActiveTab('feedback')}
              style={{
                padding: '8px 16px',
                background: activeTab === 'feedback' ? 'var(--brand-orange)' : 'var(--gray-100)',
                color: activeTab === 'feedback' ? 'white' : 'var(--brand-charcoal)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              📝 Feedback
            </button>
            <button
              onClick={() => setActiveTab('features')}
              style={{
                padding: '8px 16px',
                background: activeTab === 'features' ? 'var(--brand-orange)' : 'var(--gray-100)',
                color: activeTab === 'features' ? 'white' : 'var(--brand-charcoal)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              💡 Feature Requests
            </button>
            <button
              onClick={() => setActiveTab('bugs')}
              style={{
                padding: '8px 16px',
                background: activeTab === 'bugs' ? 'var(--brand-orange)' : 'var(--gray-100)',
                color: activeTab === 'bugs' ? 'white' : 'var(--brand-charcoal)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🐛 Report Bug
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ overflow: 'auto', padding: '24px', flex: 1 }}>
          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--brand-charcoal)',
                marginBottom: '8px',
              }}>
                Thank you!
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                Your feedback has been submitted successfully.
              </p>
            </div>
          ) : (
            <>
              {/* Feedback Tab */}
              {activeTab === 'feedback' && (
                <form onSubmit={handleSubmitFeedback}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '8px',
                    }}>
                      What would you like to share?
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setFeedbackType('general')}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: feedbackType === 'general' ? 'var(--brand-orange)' : 'var(--gray-100)',
                          color: feedbackType === 'general' ? 'white' : 'var(--brand-charcoal)',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        💭 General Feedback
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedbackType('topic')}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: feedbackType === 'topic' ? 'var(--brand-orange)' : 'var(--gray-100)',
                          color: feedbackType === 'topic' ? 'white' : 'var(--brand-charcoal)',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        📚 Suggest a Topic
                      </button>
                    </div>
                  </div>

                  {feedbackType === 'general' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--brand-charcoal)',
                        marginBottom: '8px',
                      }}>
                        How would you rate your experience?
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            style={{
                              fontSize: '32px',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              filter: star <= rating ? 'none' : 'grayscale(100%)',
                              transition: 'all 0.2s',
                            }}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {feedbackType === 'topic' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--brand-charcoal)',
                        marginBottom: '8px',
                      }}>
                        What category?
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'var(--brand-light-sand)',
                          border: '1px solid var(--gray-300)',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: 'var(--brand-graphite)',
                        }}
                      >
                        <option value="">Select a category...</option>
                        <option value="grammar">Grammar</option>
                        <option value="vocabulary">Vocabulary</option>
                        <option value="speaking">Speaking</option>
                        <option value="listening">Listening</option>
                        <option value="reading">Reading</option>
                        <option value="writing">Writing</option>
                        <option value="business">Business English</option>
                        <option value="travel">Travel English</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '8px',
                    }}>
                      Your message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={feedbackType === 'general' 
                        ? "Tell us what you think..." 
                        : "What topic would you like to learn about?"}
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px 16px',
                        background: 'var(--brand-light-sand)',
                        border: '1px solid var(--gray-300)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: 'var(--brand-graphite)',
                        resize: 'vertical',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Submit Feedback
                  </button>
                </form>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '12px',
                    }}>
                      Vote for features you'd like to see
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {features.map((feature) => (
                        <div
                          key={feature.id}
                          style={{
                            background: 'var(--brand-light-sand)',
                            border: '1px solid var(--gray-200)',
                            borderRadius: '12px',
                            padding: '16px',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: 'var(--brand-charcoal)',
                                margin: '0 0 4px 0',
                              }}>
                                {feature.title}
                              </h4>
                              <p style={{
                                fontSize: '13px',
                                color: 'var(--gray-600)',
                                margin: 0,
                                lineHeight: 1.5,
                              }}>
                                {feature.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleVote(feature.id)}
                              style={{
                                background: hasVoted(feature.id) ? 'var(--brand-orange)' : 'var(--gray-100)',
                                color: hasVoted(feature.id) ? 'white' : 'var(--brand-charcoal)',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginLeft: '12px',
                              }}
                            >
                              👍 {feature.votes}
                            </button>
                          </div>
                          <div style={{
                            fontSize: '11px',
                            color: 'var(--gray-500)',
                          }}>
                            Proposed by {feature.createdBy}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--gray-200)',
                    paddingTop: '20px',
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '12px',
                    }}>
                      Or suggest a new feature
                    </h3>
                    <form onSubmit={handleSubmitFeature}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--brand-charcoal)',
                          marginBottom: '8px',
                        }}>
                          Feature title
                        </label>
                        <input
                          type="text"
                          value={featureTitle}
                          onChange={(e) => setFeatureTitle(e.target.value)}
                          placeholder="e.g., Add more games"
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: 'var(--brand-light-sand)',
                            border: '1px solid var(--gray-300)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            color: 'var(--brand-graphite)',
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--brand-charcoal)',
                          marginBottom: '8px',
                        }}>
                          Description
                        </label>
                        <textarea
                          value={featureDescription}
                          onChange={(e) => setFeatureDescription(e.target.value)}
                          placeholder="Describe the feature you'd like to see..."
                          style={{
                            width: '100%',
                            minHeight: '100px',
                            padding: '12px 16px',
                            background: 'var(--brand-light-sand)',
                            border: '1px solid var(--gray-300)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            color: 'var(--brand-graphite)',
                            resize: 'vertical',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                      >
                        Submit Feature Request
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Bugs Tab */}
              {activeTab === 'bugs' && (
                <form onSubmit={handleSubmitBug}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '8px',
                    }}>
                      Bug title
                    </label>
                    <input
                      type="text"
                      value={bugTitle}
                      onChange={(e) => setBugTitle(e.target.value)}
                      placeholder="e.g., Quiz not loading"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'var(--brand-light-sand)',
                        border: '1px solid var(--gray-300)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: 'var(--brand-graphite)',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '8px',
                    }}>
                      Severity
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {(['low', 'medium', 'high'] as const).map((severity) => (
                        <button
                          key={severity}
                          type="button"
                          onClick={() => setBugSeverity(severity)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: bugSeverity === severity 
                              ? severity === 'high' ? 'var(--red)' 
                              : severity === 'medium' ? 'var(--brand-orange)' 
                              : 'var(--green)'
                              : 'var(--gray-100)',
                            color: bugSeverity === severity ? 'white' : 'var(--brand-charcoal)',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                          }}
                        >
                          {severity}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--brand-charcoal)',
                      marginBottom: '8px',
                    }}>
                      Description
                    </label>
                    <textarea
                      value={bugDescription}
                      onChange={(e) => setBugDescription(e.target.value)}
                      placeholder="Describe what happened and how to reproduce the bug..."
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px 16px',
                        background: 'var(--brand-light-sand)',
                        border: '1px solid var(--gray-300)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: 'var(--brand-graphite)',
                        resize: 'vertical',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Submit Bug Report
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
