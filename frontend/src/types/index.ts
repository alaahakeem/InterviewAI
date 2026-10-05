export interface User {
  id: number;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
}

export interface DashboardStats {
  interviewsCompleted: number;
  averageScore: number;
  improvementPercent: number;
  nextGoal: string;
  dailyGoalPercent: number;
}

export interface InterviewHistoryItem {
  id: number;
  role: string;
  type: string;
  difficulty: string;
  overallScore: number;
  status: string;
  date: string;
}

export interface CvAnalysis {
  id: number;
  fileName: string;
  atsScore: number;
  extractedSkills: string[];
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
  uploadedAt: string;
}
