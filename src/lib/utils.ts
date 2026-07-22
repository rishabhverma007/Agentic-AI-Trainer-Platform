import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserRole, User, Trainer, CollegeRequest } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getScoreColor(score: number): { text: string; bg: string; border: string; glow: string } {
  if (score >= 90) {
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    };
  } else if (score >= 80) {
    return {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      glow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    };
  } else if (score >= 70) {
    return {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    };
  } else {
    return {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    };
  }
}

export const MOCK_USERS: Record<UserRole, User> = {
  ADMIN: {
    id: "usr_admin_01",
    name: "Alex Vance",
    email: "alex.vance@allocator.ai",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    organization: "Platform Operations",
    title: "Chief System Administrator",
  },
  MANAGER: {
    id: "usr_mgr_01",
    name: "Sarah Jenkins",
    email: "s.jenkins@allocator.ai",
    role: "MANAGER",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    organization: "Enterprise Allocation Team",
    title: "Senior Allocation Manager",
  },
  COLLEGE: {
    id: "usr_col_01",
    name: "Dr. Rajesh Sharma",
    email: "dean.academics@iitd.ac.in",
    role: "COLLEGE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    organization: "IIT Delhi - Dept of CSE",
    title: "Head of Academic Partnerships",
  },
  TRAINER: {
    id: "usr_trn_01",
    name: "Marcus Aurelius Chen",
    email: "m.chen@ai-trainers.org",
    role: "TRAINER",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    organization: "Independent Specialist",
    title: "Principal GenAI Architect",
  },
};

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: "trn_101",
    name: "Dr. Aris Thorne",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    title: "Ex-Google AI Specialist & LangChain Core Contributor",
    bio: "Specializing in Large Language Models, Multi-Agent Orchestration, and Enterprise RAG Architecture with 9+ years of hands-on delivery.",
    experienceYears: 9,
    location: "Bengaluru / Remote",
    hourlyRate: 3500,
    rating: 4.95,
    totalTrainings: 48,
    skills: ["Python", "GenAI", "LangChain", "CrewAI", "FastAPI", "PyTorch"],
    certifications: ["AWS Certified Machine Learning Specialty", "Google Cloud ML Engineer", "NVIDIA Deep Learning Institute"],
    pastColleges: ["IIT Bombay", "BITS Pilani", "IIT Madras", "RVCE Bangalore"],
    availability: "Available Now",
    matchScore: 96,
    aiRecommendationReason: "Direct match for PyTorch & Agentic Workflows with top-tier student satisfaction (4.95★ across 48 bootcamps).",
  },
  {
    id: "trn_102",
    name: "Elena Rostova",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    title: "Senior Full Stack & AI Applications Lead",
    bio: "Building production Next.js 15 apps powered by Gemini & OpenAI APIs. Trained over 3,200 engineering graduates.",
    experienceYears: 7,
    location: "Hyderabad / Hybrid",
    hourlyRate: 2800,
    rating: 4.88,
    totalTrainings: 36,
    skills: ["Next.js 15", "TypeScript", "Tailwind CSS", "Gemini API", "FastAPI", "Vector DBs"],
    certifications: ["Meta Front-End Professional", "Vercel Partner Developer"],
    pastColleges: ["IIIT Hyderabad", "NIT Warangal", "SRM Chennai"],
    availability: "Available Now",
    matchScore: 92,
    aiRecommendationReason: "Optimal budget alignment with high expertise in Next.js + Gemini integration.",
  },
  {
    id: "trn_103",
    name: "Vikramaditya Kulkarni",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    title: "Cloud Native DevOps & MLOps Architect",
    bio: "Expert in Kubernetes, Kubeflow, PyTorch Model Serving, ML Pipelines, and Enterprise Infrastructure.",
    experienceYears: 11,
    location: "Pune / Offline",
    hourlyRate: 4000,
    rating: 4.92,
    totalTrainings: 62,
    skills: ["MLOps", "Kubeflow", "Docker", "Kubernetes", "AWS SageMaker", "Python"],
    certifications: ["CKA Kubernetes Administrator", "AWS Solutions Architect Professional"],
    pastColleges: ["COEP Pune", "VNIT Nagpur", "VJTI Mumbai"],
    availability: "Available Next Week",
    matchScore: 88,
    aiRecommendationReason: "Top choice for deep industrial infrastructure & deployment workflows.",
  },
  {
    id: "trn_104",
    name: "Priya Sundaram",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300",
    title: "Cybersecurity & AI Threat Analysis Lead",
    bio: "Focusing on LLM Security, OWASP Top 10 for AI, Guardrails, and Ethical Hacking for AI applications.",
    experienceYears: 8,
    location: "Chennai / Remote",
    hourlyRate: 3200,
    rating: 4.91,
    totalTrainings: 29,
    skills: ["Cybersecurity", "LLM Guardrails", "Python", "Ethical Hacking", "NeMo Guardrails"],
    certifications: ["CISSP", "Certified Ethical Hacker (CEH)"],
    pastColleges: ["Anna University", "VIT Vellore", "IIT Madras"],
    availability: "Available Now",
    matchScore: 84,
    aiRecommendationReason: "Unmatched expertise in AI safety, red-teaming, and security compliance.",
  },
];

export const INITIAL_REQUESTS: CollegeRequest[] = [
  {
    id: "req_901",
    collegeName: "IIT Delhi - Dept of CSE",
    location: "New Delhi",
    skillsRequired: ["Python", "GenAI", "LangChain", "FastAPI"],
    technology: "Generative AI & Agentic Workflows",
    budgetPerDay: 25000,
    trainingDates: { start: "2026-08-10", end: "2026-08-15" },
    trainingMode: "Offline",
    numberOfStudents: 120,
    durationDays: 5,
    remarks: "Requires expert trainer with experience conducting live coding labs and multi-agent orchestrations.",
    status: "AI_MATCHING",
    createdAt: "2026-07-21T18:30:00Z",
  },
  {
    id: "req_902",
    collegeName: "BITS Pilani - Hyderabad Campus",
    location: "Hyderabad",
    skillsRequired: ["Next.js 15", "TypeScript", "Gemini API", "Tailwind CSS"],
    technology: "Full-Stack AI Application Development",
    budgetPerDay: 20000,
    trainingDates: { start: "2026-08-20", end: "2026-08-23" },
    trainingMode: "Hybrid",
    numberOfStudents: 85,
    durationDays: 4,
    remarks: "Students need end-to-end guidance building RAG-enabled web apps.",
    status: "MATCHED",
    createdAt: "2026-07-20T14:15:00Z",
  },
];
