import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';
import LessonPlayer from './components/LessonPlayer';
import { CategoryGrid } from './components/CategoryGrid';
import { lessons, Lesson } from './data/lessons';

type AppView = 'login' | 'home' | 'category' | 'lesson';
type CategoryType = 'lessons' | 'stories' | 'tests' | 'games';

export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);
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

  const openCategory = (category: CategoryType) => {
    setActiveCategory(category);
    setView('category');
  };

  const handleSelectItem = (type: CategoryType, id: string) => {
    // For now, only lessons are implemented
    if (type === 'lessons') {
      const lesson = lessons.find(l => l.id === id);
      if (lesson) {
        openLesson(lesson);
      }
    } else {
      // TODO: Implement other content types
      alert(`${type} content coming soon! Item ID: ${id}`);
    }
  };

  const goBack = () => {
    setView('home');
    setActiveLesson(null);
    setActiveCategory(null);
  };

  const logout = () => {
    setView('login');
    setStudentName('');
    setStudentCode('');
    setIsAdmin(false);
    setActiveLesson(null);
    setActiveCategory(null);
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
          onOpenCategory={openCategory}
          studentName={studentName}
          studentCode={studentCode}
          isAdmin={isAdmin}
          studentScore={studentScore}
          onLogout={logout}
          onAddScore={addScore}
        />
      )}
      {view === 'category' && activeCategory && (
        <CategoryGrid
          category={activeCategory}
          onBack={goBack}
          onSelectItem={handleSelectItem}
        />
      )}
      {view === 'lesson' && activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          studentName={studentName}
          studentCode={studentCode}
          onBack={goBack}
        />
      )}
    </div>
  );
}
