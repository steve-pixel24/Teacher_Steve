import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LessonTab from './components/LessonTab';
import TestTab from './components/TestTab';
import GameTab from './components/GameTab';

type TabName = 'lesson' | 'test' | 'game';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('lesson');
  const [totalSeconds, setTotalSeconds] = useState(50 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, []);

  const progress = ((50 * 60 - totalSeconds) / (50 * 60)) * 100;

  const tabs: { name: TabName; label: string; icon: string }[] = [
    { name: 'lesson', label: 'Lesson', icon: '📖' },
    { name: 'test', label: 'Test', icon: '✏️' },
    { name: 'game', label: 'Game', icon: '🎮' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        timeDisplay={formatTime(totalSeconds)}
        progress={progress}
      />

      {/* Tabs */}
      <div className="flex bg-[var(--navy2)] border-b border-[var(--border)] px-4 sm:px-8">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`font-space px-4 sm:px-6 py-3.5 text-sm font-medium cursor-pointer border-b-2 transition-all duration-200 select-none ${
              activeTab === tab.name
                ? 'text-[var(--blue-light)] border-[var(--blue)]'
                : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text)]'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {activeTab === 'lesson' && <LessonTab />}
        {activeTab === 'test' && <TestTab />}
        {activeTab === 'game' && <GameTab />}
      </div>
    </div>
  );
}
