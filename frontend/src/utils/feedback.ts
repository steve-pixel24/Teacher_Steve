// Feedback & Feature Request System

export interface Feedback {
  id: string;
  type: 'general' | 'feature' | 'bug' | 'topic';
  rating?: number; // 1-5 stars
  message: string;
  category?: string; // For topic suggestions
  submittedAt: string;
  studentName: string;
  studentCode: string;
  status: 'new' | 'reviewed' | 'completed';
}

export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  votes: number;
  votedBy: string[]; // student codes
  status: 'proposed' | 'planned' | 'in-progress' | 'completed';
  createdAt: string;
  createdBy: string;
}

export interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'new' | 'investigating' | 'fixed';
  reportedAt: string;
  reportedBy: string;
}

const STORAGE_KEY = 'teacher_steve_feedback';
const FEATURES_KEY = 'teacher_steve_features';
const BUGS_KEY = 'teacher_steve_bugs';

// Default feature requests to start voting
export const DEFAULT_FEATURES: FeatureRequest[] = [
  {
    id: 'feat-1',
    title: 'More Business English Content',
    description: 'Add lessons focused on professional workplace communication, emails, and meetings.',
    votes: 0,
    votedBy: [],
    status: 'proposed',
    createdAt: new Date().toISOString(),
    createdBy: 'system'
  },
  {
    id: 'feat-2',
    title: 'Speaking Practice with Recording',
    description: 'Allow students to record themselves speaking and get feedback on pronunciation.',
    votes: 0,
    votedBy: [],
    status: 'proposed',
    createdAt: new Date().toISOString(),
    createdBy: 'system'
  },
  {
    id: 'feat-3',
    title: 'Mobile App Version',
    description: 'Create a mobile app so students can practice on their phones.',
    votes: 0,
    votedBy: [],
    status: 'proposed',
    createdAt: new Date().toISOString(),
    createdBy: 'system'
  },
  {
    id: 'feat-4',
    title: 'More Story Genres',
    description: 'Add sci-fi, mystery, and adventure stories for reading practice.',
    votes: 0,
    votedBy: [],
    status: 'proposed',
    createdAt: new Date().toISOString(),
    createdBy: 'system'
  },
  {
    id: 'feat-5',
    title: 'Progress Charts & Analytics',
    description: 'Visual charts showing learning progress over time.',
    votes: 0,
    votedBy: [],
    status: 'proposed',
    createdAt: new Date().toISOString(),
    createdBy: 'system'
  }
];

// Load feedback from localStorage
export function loadFeedback(): Feedback[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save feedback to localStorage
export function saveFeedback(feedback: Feedback[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}

// Submit new feedback
export function submitFeedback(
  type: Feedback['type'],
  message: string,
  studentName: string,
  studentCode: string,
  rating?: number,
  category?: string
): Feedback {
  const feedback = loadFeedback();
  const newFeedback: Feedback = {
    id: `feedback-${Date.now()}`,
    type,
    message,
    rating,
    category,
    submittedAt: new Date().toISOString(),
    studentName,
    studentCode,
    status: 'new'
  };
  feedback.push(newFeedback);
  saveFeedback(feedback);
  return newFeedback;
}

// Load feature requests
export function loadFeatures(): FeatureRequest[] {
  try {
    const stored = localStorage.getItem(FEATURES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with defaults
    saveFeatures(DEFAULT_FEATURES);
    return DEFAULT_FEATURES;
  } catch {
    return DEFAULT_FEATURES;
  }
}

// Save feature requests
export function saveFeatures(features: FeatureRequest[]): void {
  localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
}

// Vote for a feature
export function voteFeature(featureId: string, studentCode: string): FeatureRequest[] {
  const features = loadFeatures();
  const feature = features.find(f => f.id === featureId);
  
  if (feature && !feature.votedBy.includes(studentCode)) {
    feature.votes++;
    feature.votedBy.push(studentCode);
    saveFeatures(features);
  }
  
  return features;
}

// Remove vote from a feature
export function unvoteFeature(featureId: string, studentCode: string): FeatureRequest[] {
  const features = loadFeatures();
  const feature = features.find(f => f.id === featureId);
  
  if (feature && feature.votedBy.includes(studentCode)) {
    feature.votes--;
    feature.votedBy = feature.votedBy.filter(code => code !== studentCode);
    saveFeatures(features);
  }
  
  return features;
}

// Submit new feature request
export function submitFeatureRequest(
  title: string,
  description: string,
  studentName: string,
  studentCode: string
): FeatureRequest {
  const features = loadFeatures();
  const newFeature: FeatureRequest = {
    id: `feat-${Date.now()}`,
    title,
    description,
    votes: 1,
    votedBy: [studentCode],
    status: 'proposed',
    createdAt: new Date().toISOString(),
    createdBy: studentName
  };
  features.push(newFeature);
  saveFeatures(features);
  return newFeature;
}

// Load bug reports
export function loadBugs(): BugReport[] {
  try {
    const stored = localStorage.getItem(BUGS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save bug reports
export function saveBugs(bugs: BugReport[]): void {
  localStorage.setItem(BUGS_KEY, JSON.stringify(bugs));
}

// Submit bug report
export function submitBugReport(
  title: string,
  description: string,
  severity: BugReport['severity'],
  studentName: string,
  studentCode: string
): BugReport {
  const bugs = loadBugs();
  const newBug: BugReport = {
    id: `bug-${Date.now()}`,
    title,
    description,
    severity,
    status: 'new',
    reportedAt: new Date().toISOString(),
    reportedBy: studentName
  };
  bugs.push(newBug);
  saveBugs(bugs);
  return newBug;
}

// Get feedback statistics
export function getFeedbackStats() {
  const feedback = loadFeedback();
  const features = loadFeatures();
  const bugs = loadBugs();
  
  return {
    totalFeedback: feedback.length,
    newFeedback: feedback.filter(f => f.status === 'new').length,
    totalFeatures: features.length,
    totalVotes: features.reduce((sum, f) => sum + f.votes, 0),
    totalBugs: bugs.length,
    openBugs: bugs.filter(b => b.status !== 'fixed').length
  };
}
