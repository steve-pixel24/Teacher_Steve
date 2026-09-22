// XP and Leveling System

export interface StudentProfile {
  name: string;
  code: string;
  xp: number;
  level: number;
  activitiesCompleted: number;
  lessonsCompleted: number;
  storiesRead: number;
  gamesPlayed: number;
}

// Level thresholds
export const LEVEL_THRESHOLDS = [
  { level: 1, minXP: 0, maxXP: 100 },
  { level: 2, minXP: 101, maxXP: 250 },
  { level: 3, minXP: 251, maxXP: 500 },
  { level: 4, minXP: 501, maxXP: 800 },
  { level: 5, minXP: 801, maxXP: 1200 },
  { level: 6, minXP: 1201, maxXP: 1700 },
  { level: 7, minXP: 1701, maxXP: 2300 },
  { level: 8, minXP: 2301, maxXP: 3000 },
  { level: 9, minXP: 3001, maxXP: 3800 },
  { level: 10, minXP: 3801, maxXP: 5000 },
];

// XP rewards for different activities
export const XP_REWARDS = {
  completeLesson: 50,
  readStory: 30,
  playGame: 25,
  wordOfDay: 10,
  perfectQuiz: 100,
  goodQuiz: 50,
};

// Calculate level from XP
export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXP) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
}

// Get current level info
export function getLevelInfo(xp: number) {
  const level = calculateLevel(xp);
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  if (!threshold) return { level: 1, currentXP: xp, maxXP: 100, progress: 0 };
  
  const currentXP = xp - threshold.minXP;
  const maxXP = threshold.maxXP - threshold.minXP;
  const progress = Math.min((currentXP / maxXP) * 100, 100);
  
  return { level, currentXP, maxXP, progress };
}

// Sample leaderboard data
export const SAMPLE_LEADERBOARD: StudentProfile[] = [
  { name: 'Alex', code: 'ALEX', xp: 450, level: 4, activitiesCompleted: 28, lessonsCompleted: 8, storiesRead: 12, gamesPlayed: 8 },
  { name: 'Maria', code: 'MARIA', xp: 380, level: 3, activitiesCompleted: 24, lessonsCompleted: 7, storiesRead: 10, gamesPlayed: 7 },
  { name: 'John', code: 'JOHN', xp: 320, level: 3, activitiesCompleted: 20, lessonsCompleted: 6, storiesRead: 8, gamesPlayed: 6 },
  { name: 'Anna', code: 'ANNA', xp: 280, level: 3, activitiesCompleted: 18, lessonsCompleted: 5, storiesRead: 7, gamesPlayed: 6 },
  { name: 'Pedro', code: 'PEDRO', xp: 240, level: 3, activitiesCompleted: 16, lessonsCompleted: 5, storiesRead: 6, gamesPlayed: 5 },
  { name: 'Sophie', code: 'SOPHIE', xp: 180, level: 2, activitiesCompleted: 12, lessonsCompleted: 4, storiesRead: 5, gamesPlayed: 3 },
  { name: 'Nicolas', code: 'NICOLAS', xp: 150, level: 2, activitiesCompleted: 10, lessonsCompleted: 3, storiesRead: 4, gamesPlayed: 3 },
  { name: 'Demo Student', code: 'DEMO', xp: 50, level: 1, activitiesCompleted: 3, lessonsCompleted: 1, storiesRead: 1, gamesPlayed: 1 },
];

// Get top students
export function getTopStudents(count: number = 3): StudentProfile[] {
  return [...SAMPLE_LEADERBOARD]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, count);
}

// Get full leaderboard sorted by XP
export function getFullLeaderboard(): StudentProfile[] {
  return [...SAMPLE_LEADERBOARD].sort((a, b) => b.xp - a.xp);
}

// Rank badges
export function getRankBadge(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

// Level badge colors
export function getLevelColor(level: number): string {
  if (level >= 8) return '#FFD700'; // Gold
  if (level >= 5) return '#C0C0C0'; // Silver
  if (level >= 3) return '#CD7F32'; // Bronze
  return '#64748B'; // Default
}
