// Mock API implementation for Vercel demo (Bypassing .NET backend)
export const api = {
  auth: {
    login: async (email: string, password: string) => ({
      token: 'mock-jwt-token',
      user: { id: 1, name: 'Alex Thompson', email: email, plan: 'Pro' }
    }),
    register: async (name: string, email: string, password: string) => ({
      token: 'mock-jwt-token',
      user: { id: 1, name: name, email: email, plan: 'Free' }
    }),
  },
  dashboard: {
    get: async () => ({
      stats: { interviewsCompleted: 12, averageScore: 84.5, improvementPercent: 18.4, nextGoal: "Senior Role", dailyGoalPercent: 75 },
      recentInterviews: [
        { id: 1, role: "Senior Engineer", date: "Oct 12, 2024", score: 88, status: "Completed" },
        { id: 2, role: "Frontend Dev", date: "Oct 05, 2024", score: 72, status: "Completed" }
      ],
      performanceChart: [
        { week: "W1", score: 65 }, { week: "W2", score: 58 }, { week: "W3", score: 72 },
        { week: "W4", score: 68 }, { week: "W5", score: 78 }, { week: "W6", score: 82 }, { week: "Current", score: 88 }
      ],
      recommended: [
        { title: "Behavioral Deep-Dive", desc: "Improve your STAR technique.", duration: "15 MIN", difficulty: "HARD" }
      ]
    }),
  },
  cv: {
    upload: async (file: File) => ({ id: 1, message: "CV uploaded successfully" }),
    getAnalysis: async (id: number) => ({
      id: id, fileName: "Resume.pdf", atsScore: 85, uploadedAt: new Date().toISOString(),
      extractedSkills: ["React", "TypeScript", "UI/UX", "System Design"],
      missingKeywords: ["Leadership", "Agile", "Cloud Architecture"],
      strengths: ["Great formatting", "Clear metrics"],
      suggestions: ["Add a summary section", "Quantify achievements"]
    }),
  },
  interview: {
    setup: async (data: any) => ({
      interviewId: 101,
      questions: [
        { question: "Tell me about a time you handled a difficult technical challenge.", tags: ["BEHAVIORAL", "TECHNICAL"] },
        { question: "How do you approach learning a new technology?", tags: ["SOFT SKILLS"] }
      ]
    }),
    complete: async (id: number) => ({ message: "Completed", interviewId: id }),
    getResults: async (id: number) => ({
      overallScore: 88, technicalScore: 92, communicationScore: 85, confidenceScore: 80, problemSolvingScore: 90,
      questions: [
        { id: 1, question: "Tell me about a time...", rating: "Excellent", strengths: ["Used STAR method"], weaknesses: ["Talked a bit fast"], suggestedAnswer: "Structure it clearly with exact metrics." }
      ]
    }),
    getHistory: async () => ([
      { id: 1, role: "Senior Frontend Engineer", type: "Technical", difficulty: "Senior", overallScore: 88, status: "Completed", date: "Oct 12, 2024" }
    ]),
  },
  learning: {
    getRoadmap: async () => ({
      currentLevel: "Senior Engineer", progressPercent: 75, nextMilestone: "Staff Engineer",
      roadmapSteps: [
        { title: "Data Structures", status: "Completed", description: "Mastered Big O" },
        { title: "System Design", status: "Active", progressPercent: 45, description: "Load Balancing" }
      ],
      weeklyPlan: [{ day: "MON", activity: "Mock 1", type: "mock" }],
      aiCoachMessage: "You're doing great! Let's focus on System Design today."
    }),
    getResources: async () => ([]),
  },
};
