import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';
import LessonPlayer from './components/LessonPlayer';
import { lessons, Lesson } from './data/lessons';

type AppView = 'login' | 'home' | 'lesson';

export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [studentScore, setStudentScore] = useState(0);

  const handleLogin = (name: string, code: string, admin: boolean) => {
    setStudentName(name);
    setStudentCode(code);
    setIsAdmin(admin);
    setView('home');
  };

  const openLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setView('lesson');
  };

  const goBack = () => {
    setView('home');
    setActiveLesson(null);
  };

  const logout = () => {
    setView('login');
    setStudentName('');
    setStudentCode('');
    setIsAdmin(false);
    setActiveLesson(null);
    setStudentScore(0);
  };

  const addScore = (points: number) => {
    setStudentScore(prev => prev + points);
  };

  return (
    <div className="min-h-screen">
      {view === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      {view === 'home' && (
        <HomePage
          lessons={lessons}
          onSelectLesson={openLesson}
          studentName={studentName}
          studentCode={studentCode}
          isAdmin={isAdmin}
          studentScore={studentScore}
          onLogout={logout}
          onAddScore={addScore}
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
