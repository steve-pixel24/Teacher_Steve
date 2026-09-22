import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (name: string, code: string) => void;
}

// Your student roster - add/edit as needed
const STUDENTS: Record<string, string> = {
  'NICOLAS': 'Nicolas',
  'MARIA': 'Maria',
  'JOHN': 'John',
  'ANNA': 'Anna',
  'PEDRO': 'Pedro',
  'SOPHIE': 'Sophie',
  'DEMO': 'Demo Student',
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const upperCode = code.trim().toUpperCase();
      const name = STUDENTS[upperCode];

      if (name) {
        onLogin(name, upperCode);
      } else {
        setError('Invalid code. Please check with your teacher.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating cloud-like blobs */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        top: '10%',
        left: '15%',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        bottom: '15%',
        right: '10%',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 25s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: '50%',
        left: '60%',
        background: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '50%',
        filter: 'blur(35px)',
        animation: 'float 18s ease-in-out infinite',
      }} />

      <div style={{ width: '100%', maxWidth: '448px', position: 'relative', zIndex: 10 }} className="animate-fade-in">
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="font-space" style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#1e293b',
            margin: 0,
          }}>
            Teacher Steve's
          </h1>
        </div>

        {/* Login Card */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.06)',
          padding: '48px 40px',
        }}>
          <h2 className="font-space" style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '32px',
            marginTop: 0,
          }}>
            Sign in
          </h2>

          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            color: '#1e293b',
            marginBottom: '8px',
          }}>
            Enter Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            autoFocus
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#1e293b',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '16px',
              letterSpacing: '0.05em',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />

          {error && (
            <div className="animate-fade-in" style={{
              marginTop: '12px',
              fontSize: '14px',
              color: '#ef4444',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !code.trim()}
            style={{
              width: '100%',
              background: '#1e293b',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              padding: '14px 24px',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoading || !code.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              marginTop: '24px',
              opacity: isLoading || !code.trim() ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading && code.trim()) {
                e.currentTarget.style.background = '#0f172a';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e293b';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="animate-spin">⏳</span> Checking...
              </span>
            ) : (
              'Start Learning'
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>
    </div>
  );
}
