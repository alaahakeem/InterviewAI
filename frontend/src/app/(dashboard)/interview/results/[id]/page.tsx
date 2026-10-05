'use client';
import { useEffect, useState } from 'react';
import TopBar from '@/components/shared/TopBar';
import { api } from '@/lib/api';
import Link from 'next/link';
import { ChevronDown, CheckCircle, AlertTriangle, TrendingUp, Search } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.interview.getResults(Number(params.id)).then(setData).catch(console.error);
  }, [params.id]);

  if (!data) return <div className="p-6">Loading results...</div>;

  const chartData = [
    { subject: 'Technical', A: data.technicalScore, fullMark: 100 },
    { subject: 'Communication', A: data.communicationScore, fullMark: 100 },
    { subject: 'Confidence', A: data.confidenceScore, fullMark: 100 },
    { subject: 'Problem Solving', A: data.problemSolvingScore, fullMark: 100 },
    { subject: 'Culture Fit', A: 85, fullMark: 100 }, // Mock
  ];

  return (
    <div>
      <TopBar title="Interview Results" />
      
      {/* Banner */}
      <div className="bg-blue-600 text-white p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Great job! You scored {data.overallScore}/100</h1>
            <p className="text-blue-100 opacity-90">Overall, you performed exceptionally well. The AI noticed strong technical knowledge.</p>
          </div>
          <Link href="/learning-path" className="mt-6 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
            View Learning Roadmap
          </Link>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto space-y-6 -mt-4">
        
        {/* Scores & Chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: 'Technical Depth', score: data.technicalScore, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Communication', score: data.communicationScore, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Confidence', score: data.confidenceScore, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Problem Solving', score: data.problemSolvingScore, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map(s => (
              <div key={s.label} className="card p-6 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{s.label}</span>
                <span className={`text-4xl font-black ${s.color}`}>{s.score}</span>
              </div>
            ))}
          </div>
          <div className="card p-6 flex items-center justify-center min-h-[250px]">
             <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid stroke="#f3f4f6" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip wrapperStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">🤖</div>
            <h3 className="font-bold text-blue-900">AI Sentiment & Tone Analysis</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Vocal Clarity</p>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden"><div className="w-[85%] bg-blue-500 h-full"></div></div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Pacing & Pauses</p>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden"><div className="w-[70%] bg-blue-500 h-full"></div></div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Filler Words</p>
              <p className="text-sm font-semibold text-gray-900">14 Detected (Slightly High)</p>
            </div>
          </div>
        </div>

        {/* Question Breakdown */}
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Detailed Breakdown</h2>
        <div className="space-y-4">
          {data.questions.map((q: any, i: number) => (
            <details key={q.id} className="card group">
              <summary className="p-5 flex items-center justify-between cursor-pointer font-medium text-gray-900">
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    q.rating === 'Excellent' ? 'bg-green-100 text-green-700' : 
                    q.rating === 'Average' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>Q{i+1}</span>
                  <span className="text-sm line-clamp-1 flex-1">{q.question}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    q.rating === 'Excellent' ? 'bg-green-100 text-green-700' : 
                    q.rating === 'Average' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>{q.rating}</span>
                  <ChevronDown size={18} className="text-gray-400 group-open:rotate-180 transition-transform" />
                </div>
              </summary>
              <div className="px-5 pb-5 pt-0 border-t border-gray-100 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-green-600 mb-2 flex items-center gap-1"><CheckCircle size={14}/> Strengths</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                      {q.strengths?.map((s:string, j:number) => <li key={j}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-red-600 mb-2 flex items-center gap-1"><AlertTriangle size={14}/> Areas to Improve</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                      {q.weaknesses?.map((w:string, j:number) => <li key={j}>{w}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-xs font-bold uppercase text-gray-700 mb-2 flex items-center gap-1"><Search size={14}/> Model Answer</h4>
                  <p className="text-sm text-gray-600 italic">{q.suggestedAnswer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
}
