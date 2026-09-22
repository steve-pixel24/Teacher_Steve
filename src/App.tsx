import { useState } from 'react';
import Dashboard from './components/Dashboard';
import LessonPlayer from './components/LessonPlayer';
import { lessons, Lesson } from './data/lessons';

export type AppView = 'dashboard' | 'lesson';

export default function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [studentName, setStudentName] = useState('Nicolas');

  const openLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setView('lesson');
  };

  const goBack = () => {
    setView('dashboard');
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen">
      {view === 'dashboard' && (
        <Dashboard
          lessons={lessons}
          onSelectLesson={openLesson}
          studentName={studentName}
          onNameChange={setStudentName}
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
