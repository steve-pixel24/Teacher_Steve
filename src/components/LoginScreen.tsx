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

    // Simulate a small delay for effect
    setTimeout(() => {
      const upperCode = code.trim().toUpperCase();
      const name = STUDENTS[upperCode];

      if (name) {
        onLogin(name, upperCode);
      } else {
        setError('Invalid code. Ask your teacher for your personal code!');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--blue)] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--purple)] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--blue)] to-[var(--purple)] text-3xl mb-4 shadow-lg shadow-[rgba(59,130,246,0.3)]">
            🎓
          </div>
          <h1 className="font-space text-2xl font-bold text-[var(--text)] mb-1">
            Interactive Lessons
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Enter your student code to continue
          </p>
        </div>

        {/* Login Card */}
        <form onSubmit={handleSubmit} className="card p-6">
          <label className="block text-xs font-space font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Student Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="e.g. NICOLAS"
            autoFocus
            className="w-full bg-[var(--navy)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] font-mono text-lg tracking-wider placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--blue)] transition-colors"
          />

          {error && (
            <div className="mt-3 text-sm text-[#f87171] flex items-center gap-2 animate-fade-in">
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !code.trim()}
            className="btn btn-primary w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Checking...
              </span>
            ) : (
              'Enter Lessons →'
            )}
          </button>
        </form>

        {/* Help text */}
        <div className="text-center mt-6">
          <p className="text-xs text-[var(--text-dim)]">
            Don't have a code? Ask your teacher for one! 💬
          </p>
          <p className="text-xs text-[var(--text-dim)] mt-2">
            Try <span className="font-mono text-[var(--blue-light)]">DEMO</span> to preview
          </p>
        </div>
      </div>
    </div>
  );
}
