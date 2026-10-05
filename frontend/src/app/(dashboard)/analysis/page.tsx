'use client';
import { useEffect, useState } from 'react';
import TopBar from '@/components/shared/TopBar';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { CvAnalysis } from '@/types';

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState<CvAnalysis | null>(null);

  useEffect(() => {
    if (id) {
      api.cv.getAnalysis(Number(id)).then(setData).catch(console.error);
    } else {
      // Mock data if accessed directly
      setData({
        id: 0, fileName: 'Alex_Thompson_CV.pdf', atsScore: 85, uploadedAt: '',
        extractedSkills: ['User Experience (UX)', 'Visual Design', 'Prototyping', 'Design Systems', 'Accessibility'],
        missingKeywords: ['Strategic Vision', 'Cross-functional Leadership', 'Market Research', 'Stakeholder Management'],
        strengths: ['Strong quantitative metrics used in experience descriptions.', 'Consistent career progression with clear leadership roles.', 'Excellent formatting for ATS readability.'],
        suggestions: ['Quantify your early career achievements more specifically.', 'Add a brief Professional Summary section at the top.', 'Link to your portfolio site more prominently.']
      });
    }
  }, [id]);

  if (!data) return <div className="p-6">Loading analysis...</div>;

  return (
    <div>
      <TopBar title="CV Analysis Results" />
      <div className="p-6 max-w-6xl space-y-6">
        <p className="text-sm text-gray-500 -mt-2 mb-4">Optimizing your profile for Senior Product Designer roles.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ATS Score */}
          <div className="card p-6 flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-gray-900 mb-6">ATS Score</h3>
            <div className="relative w-40 h-40 mb-6">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1D4ED8" strokeWidth="12"
                  strokeDasharray={`${2.51 * data.atsScore} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-blue-700">{data.atsScore}</span>
                <span className="text-xs text-gray-500 font-medium">Optimal</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Your CV ranks in the top 15% for modern Applicant Tracking Systems.</p>
          </div>

          {/* Missing Keywords */}
          <div className="card p-6 border-l-4 border-l-red-400">
            <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} /> Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.missingKeywords.map(kw => (
                <span key={kw} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Extracted Skills */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Extracted Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.extractedSkills.map(skill => (
                <span key={skill} className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1">
                  <CheckCircle size={12} /> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 border-t-4 border-t-blue-500">
            <h3 className="font-semibold text-blue-600 mb-4">Strengths</h3>
            <ul className="space-y-3">
              {data.strengths.map((str, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" /> {str}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 border-t-4 border-t-blue-500">
            <h3 className="font-semibold text-blue-600 mb-4">Suggestions</h3>
            <ul className="space-y-3">
              {data.suggestions.map((sug, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 shrink-0 mt-0.5">💡</span> {sug}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-6 flex flex-col md:flex-row items-center justify-between bg-white shadow-sm mt-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">🤖</div>
            <div>
              <h3 className="font-semibold text-gray-900">Next Step: Interview Setup</h3>
              <p className="text-sm text-gray-500">Ready to practice for this role?</p>
            </div>
          </div>
          <Link href="/interview/setup" className="btn-primary whitespace-nowrap mt-4 md:mt-0">
            Continue to Interview Setup →
          </Link>
        </div>
      </div>
    </div>
  );
}
