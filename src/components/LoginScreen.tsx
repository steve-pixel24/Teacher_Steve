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
      background: 'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 40%, #7dd3fc 70%, #38bdf8 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Cloud blobs */}
      <div style={{
        position: 'absolute', width: '300px', height: '300px', top: '10%', left: '15%',
        background: 'rgba(255,255,255,0.6)', borderRadius: '50%', filter: 'blur(40px)',
        animation: 'float 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px', bottom: '15%', right: '10%',
        background: 'rgba(255,255,255,0.5)', borderRadius: '50%', filter: 'blur(50px)',
        animation: 'float 25s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', width: '200px', height: '200px', top: '50%', left: '60%',
        background: 'rgba(255,255,255,0.4)', borderRadius: '50%', filter: 'blur(35px)',
        animation: 'float 18s ease-in-out infinite',
      }} />

      {/* Geometric header banner at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        overflow: 'hidden',
        background: 'linear-gradient(90deg, #E65100 0%, #FF9800 35%, #FFC107 55%, #FFFFFF 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(230,81,0,0.7), rgba(230,81,0,0.4))', clipPath: 'polygon(0 0, 55% 0, 40% 100%, 0 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,152,0,0.85), rgba(255,152,0,0.5))', clipPath: 'polygon(15% 0, 65% 0, 50% 100%, 0% 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,193,7,0.8), rgba(255,193,7,0.4))', clipPath: 'polygon(30% 0, 72% 0, 58% 100%, 15% 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,193,7,0.6), rgba(255,255,255,0.3))', clipPath: 'polygon(45% 0, 80% 0, 68% 100%, 32% 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.8))', clipPath: 'polygon(58% 0, 88% 0, 78% 100%, 48% 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.95))', clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 60% 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #E65100, #FF9800, #FFC107, transparent 70%)' }} />
        
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
              background: 'rgba(255,255,255,0.9)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>🎓</div>
            <h1 className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: 0, textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}>
              Teacher Steve's
            </h1>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10, marginTop: '40px' }} className="animate-fade-in">
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.04)',
          padding: '48px 40px',
        }}>
          <h2 className="font-space" style={{ fontSize: '28px', fontWeight: 600, color: '#1E293B', marginBottom: '32px', marginTop: 0 }}>
            Sign in
          </h2>

          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
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
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#1E293B',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.2s',
              marginBottom: '20px',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#FF9800';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 152, 0, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
            Student Code
          </label>
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="Enter your code"
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#1E293B',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '16px',
              letterSpacing: '0.05em',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#FF9800';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 152, 0, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
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
              background: '#1E293B',
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
            }}
            onMouseEnter={(e) => {
              if (!isLoading && name.trim() && code.trim()) {
                e.currentTarget.style.background = '#0f172a';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1E293B';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
