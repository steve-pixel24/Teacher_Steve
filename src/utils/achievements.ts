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
  type: 'lessons_completed' | 'stories_read' | 'perfect_test' | 'login_streak' | 'word_submissions' | 'grammar_completed' | 'vocab_learned' | 'tests_completed' | 'games_played' | 'spelling_completed' | 'level_reached' | 'total_xp' | 'categories_completed';
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
  {
    id: 'grammar-guru',
    title: 'Grammar Guru',
    description: 'Complete 10 grammar lessons',
    icon: '📝',
    xpReward: 300,
    requirement: { type: 'grammar_completed', target: 10, current: 0 },
    unlocked: false,
  },
  {
    id: 'vocab-virtuoso',
    title: 'Vocabulary Virtuoso',
    description: 'Learn 50 vocabulary words',
    icon: '📖',
    xpReward: 250,
    requirement: { type: 'vocab_learned', target: 50, current: 0 },
    unlocked: false,
  },
  {
    id: 'story-teller',
    title: 'Story Teller',
    description: 'Read 10 stories',
    icon: '📚',
    xpReward: 200,
    requirement: { type: 'stories_read', target: 10, current: 0 },
    unlocked: false,
  },
  {
    id: 'test-champion',
    title: 'Test Champion',
    description: 'Complete 20 tests',
    icon: '🏆',
    xpReward: 400,
    requirement: { type: 'tests_completed', target: 20, current: 0 },
    unlocked: false,
  },
  {
    id: 'game-master',
    title: 'Game Master',
    description: 'Play 30 games',
    icon: '🎮',
    xpReward: 350,
    requirement: { type: 'games_played', target: 30, current: 0 },
    unlocked: false,
  },
  {
    id: 'spelling-bee',
    title: 'Spelling Bee',
    description: 'Complete 15 spelling exercises',
    icon: '🐝',
    xpReward: 200,
    requirement: { type: 'spelling_completed', target: 15, current: 0 },
    unlocked: false,
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Log in 7 days in a row',
    icon: '⚔️',
    xpReward: 500,
    requirement: { type: 'login_streak', target: 7, current: 0 },
    unlocked: false,
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: 'Log in 30 days in a row',
    icon: '👑',
    xpReward: 1000,
    requirement: { type: 'login_streak', target: 30, current: 0 },
    unlocked: false,
  },
  {
    id: 'level-10',
    title: 'Rising Star',
    description: 'Reach Level 10',
    icon: '⭐',
    xpReward: 300,
    requirement: { type: 'level_reached', target: 10, current: 0 },
    unlocked: false,
  },
  {
    id: 'level-25',
    title: 'Dedicated Learner',
    description: 'Reach Level 25',
    icon: '🌟',
    xpReward: 500,
    requirement: { type: 'level_reached', target: 25, current: 0 },
    unlocked: false,
  },
  {
    id: 'level-50',
    title: 'Advanced Scholar',
    description: 'Reach Level 50',
    icon: '💫',
    xpReward: 1000,
    requirement: { type: 'level_reached', target: 50, current: 0 },
    unlocked: false,
  },
  {
    id: 'xp-1000',
    title: 'XP Hunter',
    description: 'Earn 1000 total XP',
    icon: '💎',
    xpReward: 200,
    requirement: { type: 'total_xp', target: 1000, current: 0 },
    unlocked: false,
  },
  {
    id: 'xp-5000',
    title: 'XP Master',
    description: 'Earn 5000 total XP',
    icon: '💠',
    xpReward: 400,
    requirement: { type: 'total_xp', target: 5000, current: 0 },
    unlocked: false,
  },
  {
    id: 'xp-10000',
    title: 'XP Legend',
    description: 'Earn 10000 total XP',
    icon: '🔮',
    xpReward: 800,
    requirement: { type: 'total_xp', target: 10000, current: 0 },
    unlocked: false,
  },
  {
    id: 'all-rounder',
    title: 'All-Rounder',
    description: 'Complete at least 1 of each category',
    icon: '🎯',
    xpReward: 500,
    requirement: { type: 'categories_completed', target: 5, current: 0 },
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

// Achievement statistics tracking
const STATS_KEY = 'teacher_steve_achievement_stats';

export interface AchievementStats {
  [achievementId: string]: {
    unlocked: number;
    total: number;
  };
}

export function getAchievementStats(): AchievementStats {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function updateAchievementStats(achievementId: string): void {
  const stats = getAchievementStats();
  if (!stats[achievementId]) {
    stats[achievementId] = { unlocked: 1, total: 1 };
  } else {
    stats[achievementId].unlocked++;
    stats[achievementId].total++;
  }
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function getAchievementPercentage(achievementId: string): number {
  const stats = getAchievementStats();
  if (!stats[achievementId] || stats[achievementId].total === 0) return 0;
  return Math.round((stats[achievementId].unlocked / stats[achievementId].total) * 100);
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
        updateAchievementStats(achievement.id);
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
