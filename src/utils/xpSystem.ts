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

// Enhanced Level System - 100 levels with exponential progression
export const LEVEL_THRESHOLDS = [
  // Beginner (1-10): 0-500 XP
  { level: 1, minXP: 0, maxXP: 50 },
  { level: 2, minXP: 51, maxXP: 100 },
  { level: 3, minXP: 101, maxXP: 150 },
  { level: 4, minXP: 151, maxXP: 200 },
  { level: 5, minXP: 201, maxXP: 250 },
  { level: 6, minXP: 251, maxXP: 300 },
  { level: 7, minXP: 301, maxXP: 350 },
  { level: 8, minXP: 351, maxXP: 400 },
  { level: 9, minXP: 401, maxXP: 450 },
  { level: 10, minXP: 451, maxXP: 500 },
  // Elementary (11-20): 500-2000 XP
  { level: 11, minXP: 501, maxXP: 600 },
  { level: 12, minXP: 601, maxXP: 700 },
  { level: 13, minXP: 701, maxXP: 800 },
  { level: 14, minXP: 801, maxXP: 900 },
  { level: 15, minXP: 901, maxXP: 1000 },
  { level: 16, minXP: 1001, maxXP: 1200 },
  { level: 17, minXP: 1201, maxXP: 1400 },
  { level: 18, minXP: 1401, maxXP: 1600 },
  { level: 19, minXP: 1601, maxXP: 1800 },
  { level: 20, minXP: 1801, maxXP: 2000 },
  // Intermediate (21-35): 2000-8000 XP
  { level: 21, minXP: 2001, maxXP: 2300 },
  { level: 22, minXP: 2301, maxXP: 2600 },
  { level: 23, minXP: 2601, maxXP: 2900 },
  { level: 24, minXP: 2901, maxXP: 3200 },
  { level: 25, minXP: 3201, maxXP: 3500 },
  { level: 26, minXP: 3501, maxXP: 3800 },
  { level: 27, minXP: 3801, maxXP: 4100 },
  { level: 28, minXP: 4101, maxXP: 4400 },
  { level: 29, minXP: 4401, maxXP: 4700 },
  { level: 30, minXP: 4701, maxXP: 5000 },
  { level: 31, minXP: 5001, maxXP: 5500 },
  { level: 32, minXP: 5501, maxXP: 6000 },
  { level: 33, minXP: 6001, maxXP: 6500 },
  { level: 34, minXP: 6501, maxXP: 7000 },
  { level: 35, minXP: 7001, maxXP: 8000 },
  // Upper Intermediate (36-50): 8000-20000 XP
  { level: 36, minXP: 8001, maxXP: 9000 },
  { level: 37, minXP: 9001, maxXP: 10000 },
  { level: 38, minXP: 10001, maxXP: 11000 },
  { level: 39, minXP: 11001, maxXP: 12000 },
  { level: 40, minXP: 12001, maxXP: 13000 },
  { level: 41, minXP: 13001, maxXP: 14000 },
  { level: 42, minXP: 14001, maxXP: 15000 },
  { level: 43, minXP: 15001, maxXP: 16000 },
  { level: 44, minXP: 16001, maxXP: 17000 },
  { level: 45, minXP: 17001, maxXP: 18000 },
  { level: 46, minXP: 18001, maxXP: 19000 },
  { level: 47, minXP: 19001, maxXP: 20000 },
  { level: 48, minXP: 20001, maxXP: 22000 },
  { level: 49, minXP: 22001, maxXP: 24000 },
  { level: 50, minXP: 24001, maxXP: 26000 },
  // Advanced (51-70): 26000-80000 XP
  { level: 51, minXP: 26001, maxXP: 28000 },
  { level: 52, minXP: 28001, maxXP: 30000 },
  { level: 53, minXP: 30001, maxXP: 32000 },
  { level: 54, minXP: 32001, maxXP: 34000 },
  { level: 55, minXP: 34001, maxXP: 36000 },
  { level: 56, minXP: 36001, maxXP: 38000 },
  { level: 57, minXP: 38001, maxXP: 40000 },
  { level: 58, minXP: 40001, maxXP: 43000 },
  { level: 59, minXP: 43001, maxXP: 46000 },
  { level: 60, minXP: 46001, maxXP: 50000 },
  { level: 61, minXP: 50001, maxXP: 54000 },
  { level: 62, minXP: 54001, maxXP: 58000 },
  { level: 63, minXP: 58001, maxXP: 62000 },
  { level: 64, minXP: 62001, maxXP: 66000 },
  { level: 65, minXP: 66001, maxXP: 70000 },
  { level: 66, minXP: 70001, maxXP: 74000 },
  { level: 67, minXP: 74001, maxXP: 78000 },
  { level: 68, minXP: 78001, maxXP: 82000 },
  { level: 69, minXP: 82001, maxXP: 86000 },
  { level: 70, minXP: 86001, maxXP: 90000 },
  // Expert (71-85): 90000-200000 XP
  { level: 71, minXP: 90001, maxXP: 100000 },
  { level: 72, minXP: 100001, maxXP: 110000 },
  { level: 73, minXP: 110001, maxXP: 120000 },
  { level: 74, minXP: 120001, maxXP: 130000 },
  { level: 75, minXP: 130001, maxXP: 140000 },
  { level: 76, minXP: 140001, maxXP: 150000 },
  { level: 77, minXP: 150001, maxXP: 160000 },
  { level: 78, minXP: 160001, maxXP: 170000 },
  { level: 79, minXP: 170001, maxXP: 180000 },
  { level: 80, minXP: 180001, maxXP: 190000 },
  { level: 81, minXP: 190001, maxXP: 200000 },
  { level: 82, minXP: 200001, maxXP: 220000 },
  { level: 83, minXP: 220001, maxXP: 240000 },
  { level: 84, minXP: 240001, maxXP: 260000 },
  { level: 85, minXP: 260001, maxXP: 280000 },
  // Master (86-100): 280000-1000000+ XP
  { level: 86, minXP: 280001, maxXP: 300000 },
  { level: 87, minXP: 300001, maxXP: 330000 },
  { level: 88, minXP: 330001, maxXP: 360000 },
  { level: 89, minXP: 360001, maxXP: 400000 },
  { level: 90, minXP: 400001, maxXP: 450000 },
  { level: 91, minXP: 450001, maxXP: 500000 },
  { level: 92, minXP: 500001, maxXP: 560000 },
  { level: 93, minXP: 560001, maxXP: 630000 },
  { level: 94, minXP: 630001, maxXP: 700000 },
  { level: 95, minXP: 700001, maxXP: 780000 },
  { level: 96, minXP: 780001, maxXP: 860000 },
  { level: 97, minXP: 860001, maxXP: 940000 },
  { level: 98, minXP: 940001, maxXP: 1000000 },
  { level: 99, minXP: 1000001, maxXP: 1200000 },
  { level: 100, minXP: 1200001, maxXP: 999999999 },
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
  if (level >= 96) return '#FFD700'; // Master Gold
  if (level >= 86) return '#E5C100'; // Expert Gold
  if (level >= 71) return '#C0C0C0'; // Expert Silver
  if (level >= 51) return '#CD7F32'; // Advanced Bronze
  if (level >= 36) return '#B87333'; // Upper Intermediate
  if (level >= 21) return '#A0522D'; // Intermediate
  if (level >= 11) return '#6B8E23'; // Elementary
  return '#808080'; // Beginner Gray
}

export function getLevelTitle(level: number): string {
  if (level >= 96) return 'Grand Master';
  if (level >= 86) return 'Master';
  if (level >= 71) return 'Expert';
  if (level >= 51) return 'Advanced';
  if (level >= 36) return 'Upper Intermediate';
  if (level >= 21) return 'Intermediate';
  if (level >= 11) return 'Elementary';
  return 'Beginner';
}
