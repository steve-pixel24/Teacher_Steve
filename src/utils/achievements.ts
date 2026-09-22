// Achievements & Badges System

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: AchievementRequirement;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AchievementRequirement {
  type: 'lessons_completed' | 'stories_read' | 'perfect_test' | 'login_streak' | 'word_submissions';
  target: number;
  current: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your 1st lesson',
    icon: '🚀',
    xpReward: 50,
    requirement: { type: 'lessons_completed', target: 1, current: 0 },
    unlocked: false,
  },
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Read 3 stories',
    icon: '📚',
    xpReward: 100,
    requirement: { type: 'stories_read', target: 3, current: 0 },
    unlocked: false,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on any test',
    icon: '🎯',
    xpReward: 150,
    requirement: { type: 'perfect_test', target: 1, current: 0 },
    unlocked: false,
  },
  {
    id: 'consistency-king',
    title: 'Consistency King',
    description: 'Log in 3 days in a row',
    icon: '🔥',
    xpReward: 200,
    requirement: { type: 'login_streak', target: 3, current: 0 },
    unlocked: false,
  },
  {
    id: 'word-smith',
    title: 'Word Smith',
    description: 'Submit 5 correct Word of the Day sentences',
    icon: '💬',
    xpReward: 150,
    requirement: { type: 'word_submissions', target: 5, current: 0 },
    unlocked: false,
  },
];

const STORAGE_KEY = 'teacher_steve_achievements';
const STREAK_KEY = 'teacher_steve_login_streak';

// Load achievements from localStorage
export function loadAchievements(): Achievement[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return ACHIEVEMENTS;
  } catch {
    return ACHIEVEMENTS;
  }
}

// Save achievements to localStorage
export function saveAchievements(achievements: Achievement[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
}

// Check and unlock achievements
export function checkAchievements(
  type: AchievementRequirement['type'],
  value: number
): Achievement[] {
  const achievements = loadAchievements();
  const newlyUnlocked: Achievement[] = [];

  achievements.forEach(achievement => {
    if (!achievement.unlocked && achievement.requirement.type === type) {
      achievement.requirement.current = value;
      if (value >= achievement.requirement.target) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date().toISOString();
        newlyUnlocked.push(achievement);
      }
    }
  });

  saveAchievements(achievements);
  return newlyUnlocked;
}

// Update achievement progress
export function updateAchievementProgress(
  type: AchievementRequirement['type'],
  value: number
): void {
  const achievements = loadAchievements();
  
  achievements.forEach(achievement => {
    if (achievement.requirement.type === type) {
      achievement.requirement.current = Math.min(value, achievement.requirement.target);
    }
  });

  saveAchievements(achievements);
}

// Get total XP from achievements
export function getAchievementXP(): number {
  const achievements = loadAchievements();
  return achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.xpReward, 0);
}

// Login streak tracking
export function trackLoginStreak(): number {
  const today = new Date().toDateString();
  const streakData = localStorage.getItem(STREAK_KEY);
  
  let streak = 0;
  let lastLogin = '';
  
  if (streakData) {
    const data = JSON.parse(streakData);
    lastLogin = data.lastLogin;
    streak = data.streak;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastLogin === today) {
      // Already logged in today
      return streak;
    } else if (lastLogin === yesterday.toDateString()) {
      // Consecutive day
      streak++;
    } else {
      // Streak broken
      streak = 1;
    }
  } else {
    streak = 1;
  }
  
  localStorage.setItem(STREAK_KEY, JSON.stringify({ lastLogin: today, streak }));
  checkAchievements('login_streak', streak);
  
  return streak;
}

export function getLoginStreak(): number {
  const streakData = localStorage.getItem(STREAK_KEY);
  if (streakData) {
    return JSON.parse(streakData).streak;
  }
  return 0;
}
