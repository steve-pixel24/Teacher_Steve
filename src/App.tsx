import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';
import LessonPlayer from './components/LessonPlayer';
import { CategoryGrid } from './components/CategoryGrid';
import { StoryReader } from './components/StoryReader';
import { TestEngine } from './components/TestEngine';
import { GameLauncher } from './components/GameLauncher';
import { lessons, Lesson } from './data/lessons';
import { stories, Story } from './data/stories';
import { tests, Test } from './data/tests';
import { games, Game } from './data/games';

type AppView = 'login' | 'home' | 'category' | 'lesson' | 'story' | 'test' | 'game';
type CategoryType = 'lessons' | 'stories' | 'tests' | 'games';

export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
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

  const openStory = (story: Story) => {
    setActiveStory(story);
    setView('story');
  };

  const openTest = (test: Test) => {
    setActiveTest(test);
    setView('test');
  };

  const openGame = (game: Game) => {
    setActiveGame(game);
    setView('game');
  };

  const openCategory = (category: CategoryType) => {
    setActiveCategory(category);
    setView('category');
  };

  const handleSelectItem = (type: CategoryType, id: string) => {
    switch (type) {
      case 'lessons':
        const lesson = lessons.find(l => l.id === id);
        if (lesson) openLesson(lesson);
        break;
      case 'stories':
        const story = stories.find(s => s.id === id);
        if (story) openStory(story);
        break;
      case 'tests':
        const test = tests.find(t => t.id === id);
        if (test) openTest(test);
        break;
      case 'games':
        const game = games.find(g => g.id === id);
        if (game) openGame(game);
        break;
    }
  };

  // Smart routing: return to category grid, not dashboard
  const goBackToCategory = () => {
    setView('category');
    setActiveLesson(null);
    setActiveStory(null);
    setActiveTest(null);
    setActiveGame(null);
  };

  const goBackToDashboard = () => {
    setView('home');
    setActiveLesson(null);
    setActiveStory(null);
    setActiveTest(null);
    setActiveGame(null);
    setActiveCategory(null);
  };

  const logout = () => {
    setView('login');
    setStudentName('');
    setStudentCode('');
    setIsAdmin(false);
    setActiveLesson(null);
    setActiveStory(null);
    setActiveTest(null);
    setActiveGame(null);
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
          onBack={goBackToDashboard}
          onSelectItem={handleSelectItem}
        />
      )}
      {view === 'lesson' && activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          studentName={studentName}
          studentCode={studentCode}
          onBack={goBackToCategory}
          onComplete={addScore}
        />
      )}
      {view === 'story' && activeStory && (
        <StoryReader
          story={activeStory}
          onBack={goBackToCategory}
          onComplete={addScore}
        />
      )}
      {view === 'test' && activeTest && (
        <TestEngine
          test={activeTest}
          onBack={goBackToCategory}
          onComplete={addScore}
        />
      )}
      {view === 'game' && activeGame && (
        <GameLauncher
          game={activeGame}
          onBack={goBackToCategory}
          onComplete={addScore}
        />
      )}
    </div>
  );
}
