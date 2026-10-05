'use client';
import { useState } from 'react';
import TopBar from '@/components/shared/TopBar';
import { Shield, Rocket, Mic, Code, Users, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function InterviewSetupPage() {
  const router = useRouter();
  const [role, setRole] = useState('Software Engineer');
  const [difficulty, setDifficulty] = useState('Entry');
  const [type, setType] = useState('Technical');
  const [voiceMode, setVoiceMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await api.interview.setup({ role, type, difficulty, voiceMode });
      // Store questions in session storage or state management for the session page
      sessionStorage.setItem('interview_session', JSON.stringify(res));
      router.push('/interview/session');
    } catch (e) {
      alert('Failed to setup interview');
      setLoading(false);
    }
  };

  return (
    <div>
      <TopBar title="Configure Your Session" />
      <div className="p-6 max-w-5xl flex flex-col md:flex-row gap-8">
        
        <div className="flex-1 space-y-8">
          <p className="text-sm text-gray-500 -mt-4">Tailor your AI interviewer to match your career goals and preparation level.</p>
          
          <div className="card p-6 grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-blue-600 uppercase mb-2 flex items-center gap-2"><Briefcase size={14}/> Job Role Selection</label>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                <option>Software Engineer</option>
                <option>Product Manager</option>
                <option>Data Scientist</option>
                <option>UX Designer</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-blue-600 uppercase mb-2 flex items-center gap-2"><Shield size={14}/> Difficulty Level</label>
              <div className="flex bg-blue-50 rounded-lg p-1">
                {['Entry', 'Mid', 'Senior'].map(lvl => (
                  <button key={lvl} onClick={() => setDifficulty(lvl)} className={`flex-1 text-sm py-1.5 rounded-md font-medium transition-colors ${difficulty === lvl ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{lvl}</button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Interview Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: 'Technical', icon: Code, desc: 'Coding challenges, system design, and algorithmic thinking.' },
                { t: 'Behavioral', icon: Users, desc: 'STAR method focus, soft skills, and culture-fit assessments.' },
                { t: 'Mixed', icon: Shield, desc: 'A balanced simulation of technical depth and professional soft skills.' }
              ].map(opt => (
                <div key={opt.t} onClick={() => setType(opt.t)} className={`card p-5 cursor-pointer transition-all border-2 ${type === opt.t ? 'border-blue-500 bg-blue-50/30' : 'border-transparent hover:border-blue-200'}`}>
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3"><opt.icon size={20} /></div>
                  <h3 className="font-bold text-gray-900 mb-2">{opt.t}</h3>
                  <p className="text-xs text-gray-500">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Mic size={20} /></div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Voice Mode Engagement</h3>
                <p className="text-xs text-gray-500">Enable high-fidelity speech-to-text for a natural verbal interview experience.</p>
              </div>
            </div>
            <button onClick={() => setVoiceMode(!voiceMode)} className={`w-12 h-6 rounded-full transition-colors relative ${voiceMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${voiceMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full md:w-80">
          <div className="card overflow-hidden">
            <div className="bg-blue-600 p-6 text-center text-white">
              <Shield size={32} className="mx-auto mb-2 opacity-90" />
              <h3 className="font-bold text-xs tracking-widest uppercase">INTERVIEW PACKAGE</h3>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Role Focus</span><span className="font-bold text-gray-900">{role}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Proficiency</span><span className="font-bold text-gray-900">{difficulty} Level</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Mode</span><span className="font-bold text-gray-900">{type}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-4"><span className="text-gray-500">Est. Duration</span><span className="font-bold text-gray-900">45 Minutes</span></div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800 flex gap-3">
                <span className="text-blue-600">ℹ️</span> AI will generate custom questions based on your recent LinkedIn profile sync.
              </div>

              <button onClick={handleStart} disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                {loading ? 'Setting up...' : <><Rocket size={18} /> Start AI Interview</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
