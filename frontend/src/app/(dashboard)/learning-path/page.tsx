'use client';
import { useEffect, useState } from 'react';
import TopBar from '@/components/shared/TopBar';
import { api } from '@/lib/api';

export default function LearningPathPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.learning.getRoadmap().then(setData).catch(() => {
      setData({
        currentLevel: "Senior Engineer",
        progressPercent: 75,
        nextMilestone: "Staff Engineer",
        roadmapSteps: [
          { title: "Data Structures Review", status: "Completed", completedDate: "Jul 12", description: "Mastered Big O analysis, Hash Maps, and Complex Tree traversals." },
          { title: "System Design Basics", status: "Active", stepNumber: "Step 2 of 5", progressPercent: 45, description: "Active Module - Priority High", upcomingMock: "Load Balancing & Caching", keyReading: "Distributed Systems Primer" },
          { title: "Scalability & Reliability", status: "Locked", description: "Deep dive into sharding, replication, and disaster recovery strategies." },
        ],
        weeklyPlan: [
          { day: "MON", activity: "Mock 1", type: "mock" },
          { day: "TUE", activity: "Review", type: "active" },
          { day: "WED", activity: "Reading", type: "reading" },
        ],
        aiCoachMessage: "You're making great progress in Distributed Systems. I've updated your roadmap to prioritize 'CAP Theorem' as it's a common gap for Staff level roles."
      });
    });
  }, []);

  if (!data) return <div className="p-6">Loading roadmap...</div>;

  return (
    <div>
      <TopBar title="Your Path to Mastery" />
      <div className="p-6 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {/* Roadmap Steps */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Learning Roadmap</h2>
              <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-1 rounded">Q3 2024 Focus</span>
            </div>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {data.roadmapSteps.map((step: any, i: number) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {step.status === 'Completed' ? '✓' : step.status === 'Active' ? '🚀' : '🔒'}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                      <span className="text-xs text-gray-500">{step.completedDate || step.stepNumber || 'Next in Path'}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{step.description}</p>
                    {step.status === 'Active' && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${step.progressPercent}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI Coach */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">🤖</div>
              <div>
                <h3 className="font-bold text-gray-900">AI Career Coach</h3>
                <p className="text-xs text-blue-500">Always active</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic border-l-2 border-blue-500 pl-3 mb-4">"{data.aiCoachMessage}"</p>
            <button className="bg-gray-900 text-white w-full py-2.5 rounded-lg text-sm font-semibold">Ask for Advice</button>
          </div>
        </div>
      </div>
    </div>
  );
}
