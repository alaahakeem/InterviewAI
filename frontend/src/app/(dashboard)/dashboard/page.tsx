'use client';
import { useEffect, useState } from 'react';
import TopBar from '@/components/shared/TopBar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Star, Target, Award } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.dashboard.get().then(setData).catch(() => {
      // Fallback mock data if API unavailable
      setData({
        stats: { interviewsCompleted: 24, averageScore: 82, improvementPercent: 18.4, nextGoal: 'Senior Role', dailyGoalPercent: 75 },
        recentInterviews: [
          { id: 1, role: 'Senior Frontend Engineer', date: 'Oct 12, 2024', score: 88, status: 'Completed' },
          { id: 2, role: 'Technical Architect', date: 'Oct 10, 2024', score: 72, status: 'Completed' },
          { id: 3, role: 'Engineering Manager', date: 'Oct 05, 2024', score: 81, status: 'Completed' },
        ],
        performanceChart: [
          { week: 'W1', score: 65 }, { week: 'W2', score: 58 }, { week: 'W3', score: 72 },
          { week: 'W4', score: 68 }, { week: 'W5', score: 78 }, { week: 'W6', score: 82 }, { week: 'Current', score: 88 }
        ],
        recommended: [
          { title: 'Behavioral Deep-Dive', desc: 'Improve your STAR technique response scores.', duration: '15 MIN', difficulty: 'HARD' },
          { title: 'System Design Basics', desc: 'Practice scalability and load balancing topics.', duration: '30 MIN', difficulty: 'EXPERT' },
          { title: 'Tone & Clarity Drill', desc: 'Refine your vocal delivery for better confidence.', duration: '10 MIN', difficulty: 'EASY' },
        ]
      });
    });
  }, []);

  const statusColor = (s: string) => s === 'Completed' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50';
  const scoreColor = (s: number) => s >= 85 ? 'text-green-600' : s >= 70 ? 'text-blue-600' : 'text-yellow-600';

  return (
    <div>
      <TopBar title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* Welcome */}
        <div className="card p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, Alex!</h2>
            <p className="text-gray-500 text-sm mb-4">You&#39;re doing great. Your last session score improved by 12%. Ready to level up your interview game today?</p>
            <Link href="/interview/setup" className="btn-primary text-sm">Start New Mock Interview</Link>
          </div>
          <div className="text-4xl">🎯</div>
        </div>

        {/* Stats */}
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Interviews Completed', value: data.stats.interviewsCompleted, sub: '+2 this week', icon: TrendingUp, color: 'text-blue-500' },
              { label: 'Average Score', value: `${data.stats.averageScore}/100`, sub: 'Top 15%', icon: Star, color: 'text-yellow-500' },
              { label: 'Improvement %', value: `${data.stats.improvementPercent}%`, sub: '+12%', icon: TrendingUp, color: 'text-green-500' },
              { label: 'Next Goal', value: data.stats.nextGoal, sub: 'In 4 days', icon: Award, color: 'text-purple-500' },
            ].map((s, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <s.icon size={16} className={s.color} />
                  <span className="text-xs text-gray-400">{s.sub}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          {data && (
            <div className="card p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Performance</h3>
                <span className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-500">Last 30 Days</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.performanceChart}>
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#BFDBFE" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Daily Goal */}
          {data && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Daily Goal</h3>
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="10"
                    strokeDasharray={`${2.51 * data.stats.dailyGoalPercent} 251`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{data.stats.dailyGoalPercent}%</span>
                  <span className="text-xs text-gray-400">Complete</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">3/4 practice modules finished.<br />One more mock session to reach your target!</p>
            </div>
          )}
        </div>

        {/* Recent Interviews Table */}
        {data && (
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Interviews</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                  <th className="text-left pb-3">ROLE</th>
                  <th className="text-left pb-3">DATE</th>
                  <th className="text-left pb-3">SCORE</th>
                  <th className="text-left pb-3">STATUS</th>
                  <th className="text-left pb-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.recentInterviews.map((iv: any) => (
                  <tr key={iv.id} className="py-3">
                    <td className="py-3 font-medium text-gray-900">{iv.role}</td>
                    <td className="py-3 text-gray-500">{iv.date}</td>
                    <td className="py-3">
                      <span className={`font-bold ${scoreColor(iv.score)}`}>{iv.score}</span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(iv.status)}`}>{iv.status}</span>
                    </td>
                    <td className="py-3">
                      <Link href={`/interview/results/${iv.id}`} className="text-blue-500 hover:underline text-xs font-medium">Review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
