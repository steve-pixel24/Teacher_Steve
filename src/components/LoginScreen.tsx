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
      background: '#F4F2EE',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle texture overlay */}
      <div style={{
        position: 'absolute', width: '800px', height: '400px', top: '20%', left: '10%',
        background: 'rgba(227,108,36,0.03)', borderRadius: '50%', filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', width: '600px', height: '300px', bottom: '20%', right: '15%',
        background: 'rgba(43,45,49,0.02)', borderRadius: '50%', filter: 'blur(60px)',
      }} />

      {/* Geometric header banner at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        overflow: 'hidden',
        background: '#1F1F1F',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(227,108,36,0.9), rgba(227,108,36,0.6))', clipPath: 'polygon(0 0, 48% 0, 32% 100%, 0 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(227,108,36,0.7), rgba(227,108,36,0.4))', clipPath: 'polygon(12% 0, 58% 0, 42% 100%, 0% 100%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(227,108,36,0.5), rgba(31,31,31,0.8))', clipPath: 'polygon(25% 0, 68% 0, 52% 100%, 10% 100%)', zIndex: 3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(31,31,31,0.6), rgba(31,31,31,0.9))', clipPath: 'polygon(40% 0, 78% 0, 62% 100%, 25% 100%)', zIndex: 4 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(31,31,31,0.7), rgba(31,31,31,0.95))', clipPath: 'polygon(55% 0, 88% 0, 72% 100%, 40% 100%)', zIndex: 5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(31,31,31,0.8), rgba(31,31,31,1))', clipPath: 'polygon(68% 0, 95% 0, 82% 100%, 55% 100%)', zIndex: 6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(31,31,31,0.9), rgba(31,31,31,1))', clipPath: 'polygon(80% 0, 100% 0, 100% 100%, 68% 100%)', zIndex: 7 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E36C24, #C85A1C, transparent 70%)', zIndex: 10 }} />
        
        {/* Brand text on banner */}
        <div style={{
          position: 'relative',
          zIndex: 20,
          height: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>🎓</div>
            <h1 className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Teacher Steve's
            </h1>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10, marginTop: '40px' }} className="animate-fade-in">
        <form onSubmit={handleSubmit} style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          padding: '48px 40px',
        }}>
          <h2 className="font-space" style={{ fontSize: '28px', fontWeight: 600, color: '#2B2D31', marginBottom: '32px', marginTop: 0 }}>
            Sign in
          </h2>

          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2B2D31', marginBottom: '8px' }}>
            Student Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Enter your name"
            autoFocus
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#2B2D31',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.2s',
              marginBottom: '20px',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#E36C24';
              e.target.style.boxShadow = '0 0 0 3px rgba(227, 108, 36, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E0E0E0';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2B2D31', marginBottom: '8px' }}>
            Student Code
          </label>
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="Enter your code"
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#2B2D31',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '16px',
              letterSpacing: '0.05em',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#E36C24';
              e.target.style.boxShadow = '0 0 0 3px rgba(227, 108, 36, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E0E0E0';
              e.target.style.boxShadow = 'none';
            }}
          />

          {error && (
            <div className="animate-fade-in" style={{ marginTop: '12px', fontSize: '14px', color: '#ef4444' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !name.trim() || !code.trim()}
            style={{
              width: '100%',
              background: '#E36C24',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              padding: '14px 24px',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoading || !name.trim() || !code.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              marginTop: '24px',
              opacity: isLoading || !name.trim() || !code.trim() ? 0.6 : 1,
              boxShadow: '0 4px 12px rgba(227, 108, 36, 0.25)',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && name.trim() && code.trim()) {
                e.currentTarget.style.background = '#C85A1C';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(227, 108, 36, 0.35)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#E36C24';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(227, 108, 36, 0.25)';
            }}
          >
            {isLoading ? 'Checking...' : 'Start Learning'}
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
