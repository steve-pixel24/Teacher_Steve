import React, { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentLevel: number;
  currentAvatar: string;
  currentTitle: string;
  onSave: (avatar: string, title: string) => void;
}

const AVATARS = [
  '🎓', '👨‍🎓', '👩‍🎓', '🧑‍💼', '👨‍💼', '👩‍💼',
  '🦊', '🐼', '🦁', '🐯', '🦄', '🐲',
  '🚀', '⭐', '🎯', '🏆', '💎', '🌟',
];

const TITLES_BY_LEVEL: Record<number, string[]> = {
  1: ['Grammar Novice', 'Vocabulary Beginner', 'Language Learner'],
  2: ['Grammar Explorer', 'Vocabulary Builder', 'Word Enthusiast'],
  3: ['Grammar Specialist', 'Vocabulary Explorer', 'Language Apprentice'],
  4: ['Grammar Expert', 'Vocabulary Master', 'Communication Pro'],
  5: ['Grammar Guru', 'Vocabulary Virtuoso', 'Master Communicator'],
  6: ['Grammar Sage', 'Language Scholar', 'English Authority'],
  7: ['Grammar Master', 'Linguistic Expert', 'Language Legend'],
  8: ['Grammar Champion', 'Word Wizard', 'English Elite'],
  9: ['Grammar Legend', 'Language Master', 'Vocabulary King'],
  10: ['Grammar God', 'Language Deity', 'Ultimate Master'],
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentLevel,
  currentAvatar,
  currentTitle,
  onSave,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [selectedTitle, setSelectedTitle] = useState(currentTitle);

  if (!isOpen) return null;

  const availableTitles = TITLES_BY_LEVEL[studentLevel] || TITLES_BY_LEVEL[1];

  const handleSave = () => {
    onSave(selectedAvatar, selectedTitle);
    onClose();
  };

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
        maxWidth: '500px',
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: 'var(--brand-charcoal)',
                margin: '0 0 4px 0',
                fontFamily: 'Montserrat, sans-serif',
              }}>
                👤 My Profile
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', margin: 0 }}>
                Customize your learning identity
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
        </div>

        {/* Content */}
        <div style={{ overflow: 'auto', padding: '24px', maxHeight: '60vh' }}>
          {/* Current Profile Preview */}
          <div style={{
            background: 'var(--brand-light-sand)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '8px' }}>{selectedAvatar}</div>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              marginBottom: '4px',
            }}>
              {studentName}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--brand-orange)',
              fontWeight: 600,
            }}>
              {selectedTitle}
            </div>
          </div>

          {/* Avatar Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}>
              Choose Your Avatar
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '8px',
            }}>
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  style={{
                    fontSize: '32px',
                    padding: '8px',
                    background: selectedAvatar === avatar ? 'var(--brand-orange)' : 'var(--gray-100)',
                    border: `2px solid ${selectedAvatar === avatar ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Title Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--brand-charcoal)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}>
              Select Your Title (Level {studentLevel})
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {availableTitles.map((title) => (
                <button
                  key={title}
                  onClick={() => setSelectedTitle(title)}
                  style={{
                    padding: '12px 16px',
                    background: selectedTitle === title ? 'var(--brand-orange)' : 'var(--white)',
                    color: selectedTitle === title ? 'var(--white)' : 'var(--brand-charcoal)',
                    border: `2px solid ${selectedTitle === title ? 'var(--brand-orange)' : 'var(--gray-200)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--gray-200)',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}>
          <button onClick={onClose} style={{
            padding: '10px 20px',
            background: 'var(--white)',
            color: 'var(--brand-charcoal)',
            border: '1px solid var(--gray-300)',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{
            padding: '10px 20px',
            background: 'var(--brand-orange)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
