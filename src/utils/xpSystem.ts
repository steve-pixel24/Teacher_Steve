// XP and Leveling System

export interface StudentProfile {
  firstName: string;
  surname: string;
  name: string; // Full name (firstName + surname)
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

// Dynamic student management
const STORAGE_KEY = 'teacher_steve_students';

// Load students from localStorage
export function loadStudents(): StudentProfile[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save students to localStorage
export function saveStudents(students: StudentProfile[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// Generate unique 4-digit code
export function generateUniqueCode(existingStudents: StudentProfile[]): string {
  const existingCodes = new Set(existingStudents.map(s => s.code));
  let code: string;
  do {
    code = Math.floor(1000 + Math.random() * 9000).toString();
  } while (existingCodes.has(code));
  return code;
}

// Create new student
export function createStudent(
  firstName: string,
  surname: string,
  code: string,
  students: StudentProfile[]
): StudentProfile {
  const newStudent: StudentProfile = {
    firstName,
    surname,
    name: `${firstName} ${surname}`,
    code,
    xp: 0,
    level: 1,
    activitiesCompleted: 0,
    lessonsCompleted: 0,
    storiesRead: 0,
    gamesPlayed: 0,
  };
  
  const updated = [...students, newStudent];
  saveStudents(updated);
  return newStudent;
}

// Update student
export function updateStudent(
  code: string,
  updates: Partial<StudentProfile>,
  students: StudentProfile[]
): StudentProfile[] {
  const updated = students.map(s => 
    s.code === code ? { ...s, ...updates } : s
  );
  saveStudents(updated);
  return updated;
}

// Delete student
export function deleteStudent(code: string, students: StudentProfile[]): StudentProfile[] {
  const updated = students.filter(s => s.code !== code);
  saveStudents(updated);
  return updated;
}

// Get top students
export function getTopStudents(students: StudentProfile[], count: number = 3): StudentProfile[] {
  return [...students]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, count);
}

// Get full leaderboard sorted by XP
export function getFullLeaderboard(students: StudentProfile[]): StudentProfile[] {
  return [...students].sort((a, b) => b.xp - a.xp);
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
