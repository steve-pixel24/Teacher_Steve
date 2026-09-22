import { useState } from 'react';
import { loadStudents } from '../utils/xpSystem';

interface LoginScreenProps {
  onLogin: (name: string, code: string, isAdmin: boolean) => void;
}

const ADMIN_NAME = 'Steve';
const ADMIN_CODE = '2324';

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const trimmedName = name.trim();
      const trimmedCode = code.trim();

      if (!trimmedName) {
        setError('Please enter your name.');
        setIsLoading(false);
        return;
      }

      // Admin logic: name="Steve" + code="2324"
      if (trimmedName.toLowerCase() === ADMIN_NAME.toLowerCase() && trimmedCode === ADMIN_CODE) {
        onLogin('Teacher Steve', ADMIN_CODE, true);
        return;
      }

      // Check if code exists in student list
      const students = loadStudents();
      const student = students.find(s => s.code === trimmedCode);

      if (!student) {
        setError('Invalid code. Please check with your teacher.');
        setIsLoading(false);
        return;
      }

      // Regular student login
      onLogin(student.name, student.code, false);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: 'var(--brand-sand)',
      position: 'relative',
    }}>
      {/* Login Card */}
      <div style={{ width: '100%', maxWidth: '448px', position: 'relative', zIndex: 10 }} className="animate-fade-in">
        <div style={{
          background: 'var(--white)',
          border: '1px solid var(--gray-200)',
          borderRadius: '12px',
          boxShadow: 'var(--card-shadow)',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Top Accent Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'var(--brand-orange)',
          }} />

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--brand-charcoal)',
              color: 'var(--brand-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              margin: '0 auto 12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid var(--gray-800)',
            }}>
              🎓
            </div>
            <h2 className="font-heading" style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--brand-charcoal)',
              margin: 0,
            }}>
              Sign In
            </h2>
            <p style={{
              fontSize: '12px',
              color: 'var(--gray-500)',
              marginTop: '4px',
            }}>
              Enter your student details to access your portal
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Student Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--brand-graphite)',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="Enter your full name"
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background: 'var(--brand-light-sand)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '8px',
                  color: 'var(--brand-graphite)',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand-orange)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(227, 108, 36, 0.1)';
                  e.target.style.background = 'var(--white)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--gray-300)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'var(--brand-light-sand)';
                }}
              />
            </div>

            {/* Student Code */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--brand-graphite)',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Student Code
              </label>
              <input
                type="password"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(''); }}
                placeholder="Enter your personal code"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background: 'var(--brand-light-sand)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '8px',
                  color: 'var(--brand-graphite)',
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.05em',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand-orange)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(227, 108, 36, 0.1)';
                  e.target.style.background = 'var(--white)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--gray-300)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'var(--brand-light-sand)';
                }}
              />
              <p style={{
                fontSize: '10px',
                color: 'var(--gray-400)',
                marginTop: '6px',
              }}>
                Use <code style={{
                  background: 'var(--gray-200)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  color: 'var(--brand-charcoal)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>Steve2324</code> for Admin Mode
              </p>
            </div>

            {error && (
              <div className="animate-fade-in" style={{
                padding: '12px',
                background: 'var(--red-bg)',
                border: '1px solid var(--red-border)',
                borderRadius: '8px',
                fontSize: '13px',
                color: 'var(--red)',
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !name.trim() || !code.trim()}
              className="font-heading"
              style={{
                width: '100%',
                padding: '14px',
                background: 'var(--brand-orange)',
                color: 'var(--white)',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading || !name.trim() || !code.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginTop: '8px',
                opacity: isLoading || !name.trim() || !code.trim() ? 0.6 : 1,
                boxShadow: '0 4px 6px -1px rgba(227, 108, 36, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                if (!isLoading && name.trim() && code.trim()) {
                  e.currentTarget.style.background = 'var(--brand-orange-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px -1px rgba(227, 108, 36, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-orange)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(227, 108, 36, 0.2)';
              }}
            >
              <span>{isLoading ? 'Checking...' : 'Start Learning'}</span>
              {!isLoading && <span>→</span>}
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid var(--gray-100)',
            textAlign: 'center',
          }}>
            <span style={{
              fontSize: '12px',
              color: 'var(--gray-400)',
            }}>
              Need a code? Contact Teacher Steve directly.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
