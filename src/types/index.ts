export type UserRole = 'ADMIN' | 'MANAGER' | 'COLLEGE' | 'TRAINER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization?: string;
  title?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'AI/ML' | 'Web Development' | 'Cloud/DevOps' | 'Cybersecurity' | 'Data Science' | 'Mobile';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Trainer {
  id: string;
  name: string;
  photo: string;
  title: string;
  bio: string;
  experienceYears: number;
  location: string;
  hourlyRate: number;
  rating: number;
  totalTrainings: number;
  skills: string[];
  certifications: string[];
  pastColleges: string[];
  availability: 'Available Now' | 'Booked' | 'Available Next Week';
  matchScore?: number;
  aiRecommendationReason?: string;
  resumeUrl?: string;
}

export interface CollegeRequest {
  id: string;
  collegeName: string;
  location: string;
  skillsRequired: string[];
  technology: string;
  budgetPerDay: number;
  trainingDates: {
    start: string;
    end: string;
  };
  trainingMode: 'Offline' | 'Online' | 'Hybrid';
  numberOfStudents: number;
  durationDays: number;
  remarks: string;
  status: 'PENDING' | 'AI_MATCHING' | 'MATCHED' | 'ASSIGNED' | 'COMPLETED';
  createdAt: string;
  matchResults?: MatchResult[];
}

export interface MatchResult {
  trainerId: string;
  trainer: Trainer;
  overallScore: number;
  skillScore: number;
  experienceScore: number;
  availabilityScore: number;
  budgetScore: number;
  ratingScore: number;
  aiReasoning: string;
  rank: number;
}

export interface Assignment {
  id: string;
  requestId: string;
  collegeName: string;
  trainerId: string;
  trainerName: string;
  technology: string;
  startDate: string;
  endDate: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED';
  totalBudget: number;
  contractStatus: 'DRAFT' | 'SENT' | 'SIGNED';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'ASSIGNMENT' | 'MATCH' | 'SYSTEM' | 'APPROVAL';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface PlatformAnalytics {
  totalRequests: number;
  totalTrainingsCompleted: number;
  totalTrainers: number;
  avgMatchScore: number;
  revenueThisMonth: number;
  monthlyGrowthRate: number;
  popularSkills: { name: string; count: number }[];
  requestStatusBreakdown: { status: string; count: number }[];
}
