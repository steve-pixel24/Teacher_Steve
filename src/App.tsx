import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';
import LessonPlayer from './components/LessonPlayer';
import { CategoryGrid } from './components/CategoryGrid';
import { StoryReader } from './components/StoryReader';
import { TestEngine } from './components/TestEngine';
import { GameLauncher } from './components/GameLauncher';
import { VocabularyCategory } from './components/VocabularyCategory';
import { VocabularyPractice } from './components/VocabularyPractice';
import { GrammarCategoryView } from './components/GrammarCategory';
import { GrammarRuleViewer } from './components/GrammarRuleViewer';
import { AchievementsModal, AchievementToast } from './components/AchievementsModal';
import { ProfileModal } from './components/ProfileModal';
import { DictionaryWidget } from './components/DictionaryWidget';
import { FeedbackModal } from './components/FeedbackModal';
import { AdminFeedback } from './components/AdminFeedback';
import { lessons, Lesson } from './data/lessons';
import { stories, Story } from './data/stories';
import { tests, Test } from './data/tests';
import { games, Game } from './data/games';
import { VocabSubcategory } from './data/vocabulary';
import { GrammarCategory } from './data/grammar';
import { Achievement, checkAchievements, trackLoginStreak, loadAchievements } from './utils/achievements';
import { getCompletionStats } from './utils/progress';
import { getLevelInfo } from './utils/xpSystem';

type AppView = 'login' | 'home' | 'category' | 'lesson' | 'story' | 'test' | 'game' | 'vocabulary' | 'vocabPractice' | 'grammar' | 'grammarRule' | 'adminFeedback';
type CategoryType = 'lessons' | 'vocabulary' | 'grammar' | 'stories' | 'tests' | 'games';

export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [activeVocabSubcategory, setActiveVocabSubcategory] = useState<VocabSubcategory | null>(null);
  const [activeGrammarCategory, setActiveGrammarCategory] = useState<GrammarCategory | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);
  const [studentScore, setStudentScore] = useState(0);
  
  // New modal states
  const [showAchievements, setShowAchievements] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [toastAchievement, setToastAchievement] = useState<Achievement | null>(null);
  
  // Profile customization
  const [studentAvatar, setStudentAvatar] = useState('🎓');
  const [studentTitle, setStudentTitle] = useState('Language Learner');
  
  // Calculate student level
  const levelInfo = getLevelInfo(studentScore);

  const handleLogin = (name: string, code: string, admin: boolean) => {
    setStudentName(name);
    setStudentCode(code);
    setIsAdmin(admin);
    setView('home');
    
    // Track login streak and check achievements
    const streak = trackLoginStreak();
    const newAchievements = checkAchievements('login_streak', streak);
    if (newAchievements.length > 0) {
      setToastAchievement(newAchievements[0]);
      setStudentScore(prev => prev + newAchievements[0].xpReward);
    }
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

  const openVocabSubcategory = (subcategory: VocabSubcategory) => {
    setActiveVocabSubcategory(subcategory);
    setView('vocabPractice');
  };

  const openGrammarCategory = (category: GrammarCategory) => {
    setActiveGrammarCategory(category);
    setView('grammarRule');
  };

  const openCategory = (category: CategoryType) => {
    setActiveCategory(category);
    if (category === 'vocabulary') {
      setView('vocabulary');
    } else if (category === 'grammar') {
      setView('grammar');
    } else {
      setView('category');
    }
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
    if (activeCategory === 'vocabulary') {
      setView('vocabulary');
    } else if (activeCategory === 'grammar') {
      setView('grammar');
    } else {
      setView('category');
    }
    setActiveLesson(null);
    setActiveStory(null);
    setActiveTest(null);
    setActiveGame(null);
    setActiveVocabSubcategory(null);
    setActiveGrammarCategory(null);
  };

  const goBackToDashboard = () => {
    setView('home');
    setActiveLesson(null);
    setActiveStory(null);
    setActiveTest(null);
    setActiveGame(null);
    setActiveVocabSubcategory(null);
    setActiveGrammarCategory(null);
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
    setActiveVocabSubcategory(null);
    setActiveGrammarCategory(null);
    setActiveCategory(null);
    setStudentScore(0);
  };

  const addScore = (points: number) => {
    setStudentScore(prev => prev + points);
    
    // Check achievements after adding score
    const stats = getCompletionStats();
    
    // Check lessons completed
    const lessonsCompleted = stats.completed;
    const lessonAchievements = checkAchievements('lessons_completed', lessonsCompleted);
    if (lessonAchievements.length > 0) {
      setToastAchievement(lessonAchievements[0]);
      setStudentScore(prev => prev + lessonAchievements[0].xpReward);
    }
  };

  const handleWordSubmission = () => {
    // Track word submissions for Word Smith achievement
    const currentSubmissions = parseInt(localStorage.getItem('word_submissions') || '0');
    const newCount = currentSubmissions + 1;
    localStorage.setItem('word_submissions', newCount.toString());
    
    const newAchievements = checkAchievements('word_submissions', newCount);
    if (newAchievements.length > 0) {
      setToastAchievement(newAchievements[0]);
      setStudentScore(prev => prev + newAchievements[0].xpReward);
    }
  };

  const handlePerfectTest = () => {
    // Track perfect tests for Quiz Master achievement
    const currentPerfect = parseInt(localStorage.getItem('perfect_tests') || '0');
    const newCount = currentPerfect + 1;
    localStorage.setItem('perfect_tests', newCount.toString());
    
    const newAchievements = checkAchievements('perfect_test', newCount);
    if (newAchievements.length > 0) {
      setToastAchievement(newAchievements[0]);
      setStudentScore(prev => prev + newAchievements[0].xpReward);
    }
  };

  const handleProfileSave = (avatar: string, title: string) => {
    setStudentAvatar(avatar);
    setStudentTitle(title);
    localStorage.setItem('student_avatar', avatar);
    localStorage.setItem('student_title', title);
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
          studentAvatar={studentAvatar}
          studentTitle={studentTitle}
          onLogout={logout}
          onAddScore={addScore}
          onOpenAchievements={() => setShowAchievements(true)}
          onOpenProfile={() => setShowProfile(true)}
          onOpenDictionary={() => setShowDictionary(true)}
          onOpenFeedback={() => setShowFeedback(true)}
          onOpenAdminFeedback={() => setView('adminFeedback')}
          onWordSubmission={handleWordSubmission}
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
      {view === 'vocabulary' && (
        <VocabularyCategory
          onBack={goBackToDashboard}
          onSelectSubcategory={openVocabSubcategory}
        />
      )}
      {view === 'vocabPractice' && activeVocabSubcategory && (
        <VocabularyPractice
          subcategory={activeVocabSubcategory}
          onBack={goBackToCategory}
          onComplete={addScore}
        />
      )}
      {view === 'grammar' && (
        <GrammarCategoryView
          onBack={goBackToDashboard}
          onSelectCategory={openGrammarCategory}
        />
      )}
      {view === 'grammarRule' && activeGrammarCategory && (
        <GrammarRuleViewer
          category={activeGrammarCategory}
          onBack={goBackToCategory}
          onComplete={addScore}
        />
      )}
      {view === 'adminFeedback' && isAdmin && (
        <AdminFeedback
          onBack={goBackToDashboard}
        />
      )}
      
      {/* Modals */}
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
      
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        studentName={studentName}
        studentLevel={levelInfo.level}
        currentAvatar={studentAvatar}
        currentTitle={studentTitle}
        onSave={handleProfileSave}
      />
      
      <DictionaryWidget
        isOpen={showDictionary}
        onClose={() => setShowDictionary(false)}
      />
      
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        studentName={studentName}
        studentCode={studentCode}
      />
      
      {toastAchievement && (
        <AchievementToast
          achievement={toastAchievement}
          onClose={() => setToastAchievement(null)}
        />
      )}
    </div>
  );
}
