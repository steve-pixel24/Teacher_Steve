// Progress tracking system for all content types

export interface ProgressItem {
  id: string;
  type: 'lesson' | 'story' | 'test' | 'game';
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // 0-100
  xpEarned: number;
  completedAt?: string;
  lastAccessedAt?: string;
}

const STORAGE_KEY = 'teacher_steve_progress';

// Load all progress from localStorage
export function loadProgress(): ProgressItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save progress to localStorage
export function saveProgress(progress: ProgressItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Get progress for a specific item
export function getItemProgress(type: string, id: string): ProgressItem | null {
  const progress = loadProgress();
  return progress.find(p => p.type === type && p.id === id) || null;
}

// Update or create progress for an item
export function updateItemProgress(
  type: 'lesson' | 'story' | 'test' | 'game',
  id: string,
  updates: Partial<ProgressItem>
): ProgressItem {
  const progress = loadProgress();
  const existing = progress.find(p => p.type === type && p.id === id);

  if (existing) {
    Object.assign(existing, updates, { lastAccessedAt: new Date().toISOString() });
  } else {
    progress.push({
      id,
      type,
      status: 'not-started',
      progress: 0,
      xpEarned: 0,
      lastAccessedAt: new Date().toISOString(),
      ...updates,
    });
  }

  saveProgress(progress);
  return progress.find(p => p.type === type && p.id === id)!;
}

// Mark item as completed
export function completeItem(
  type: 'lesson' | 'story' | 'test' | 'game',
  id: string,
  xpReward: number
): ProgressItem {
  return updateItemProgress(type, id, {
    status: 'completed',
    progress: 100,
    xpEarned: xpReward,
    completedAt: new Date().toISOString(),
  });
}

// Get total XP earned
export function getTotalXP(): number {
  const progress = loadProgress();
  return progress.reduce((sum, item) => sum + item.xpEarned, 0);
}

// Get completion stats
export function getCompletionStats() {
  const progress = loadProgress();
  return {
    total: progress.length,
    completed: progress.filter(p => p.status === 'completed').length,
    inProgress: progress.filter(p => p.status === 'in-progress').length,
    notStarted: progress.filter(p => p.status === 'not-started').length,
  };
}

// Clear all progress (for testing)
export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
