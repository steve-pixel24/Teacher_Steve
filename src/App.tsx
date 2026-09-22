import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import LessonPlayer from './components/LessonPlayer';
import { lessons, Lesson } from './data/lessons';

type AppView = 'login' | 'dashboard' | 'lesson';

export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const handleLogin = (name: string, code: string) => {
    setStudentName(name);
    setStudentCode(code);
    setView('dashboard');
  };

  const openLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setView('lesson');
  };

  const goBack = () => {
    setView('dashboard');
    setActiveLesson(null);
  };

  const logout = () => {
    setView('login');
    setStudentName('');
    setStudentCode('');
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen">
      {view === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      {view === 'dashboard' && (
        <Dashboard
          lessons={lessons}
          onSelectLesson={openLesson}
          studentName={studentName}
          studentCode={studentCode}
          onLogout={logout}
        />
      )}
      {view === 'lesson' && activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          studentName={studentName}
          onBack={goBack}
        />
      )}
    </div>
  );
}
