'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Mic, Video, Settings, X, Loader2 } from 'lucide-react';

export default function InterviewSessionPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12 * 60 + 44); // 12:44

  useEffect(() => {
    const data = sessionStorage.getItem('interview_session');
    if (data) setSession(JSON.parse(data));
    else router.push('/interview/setup');

    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [router]);

  if (!session) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;

  const question = session.questions[currentQ];
  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2, '0')}:${(s%60).toString().padStart(2, '0')}`;

  const handleNext = async () => {
    if (currentQ < session.questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setCompleting(true);
      try {
        await api.interview.complete(session.interviewId);
        router.push(`/interview/results/${session.interviewId}`);
      } catch {
        alert('Failed to complete interview');
        setCompleting(false);
      }
    }
  };

  return (
    <div className="h-screen bg-[#FAF8FF] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-blue-600 font-bold text-xl">InterviewAI</span>
          <div className="h-8 w-px bg-gray-200 mx-2" />
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Senior Product Manager Role</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${((currentQ + 1) / session.questions.length) * 100}%` }} />
              </div>
              <span className="text-[10px] text-gray-500 font-semibold uppercase">Question {currentQ + 1} of {session.questions.length}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2">
            ⏱ {formatTime(timeLeft)}
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><Settings size={18} /></button>
          <button onClick={() => router.push('/dashboard')} className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors"><X size={18} /></button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 min-h-0">
        
        {/* Left Column (Video & Question) */}
        <div className="w-[55%] flex flex-col gap-6">
          {/* AI Video Area */}
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video shadow-lg flex-1">
            <img src="/hero_image.jpg" alt="AI Interviewer" className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white">
              <Video size={18} />
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-wider uppercase">AI Interviewer Active</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">"{question.question}"</h2>
            <div className="flex gap-2">
              {question.tags.map((t: string) => (
                <span key={t} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Transcription & Controls) */}
        <div className="w-[45%] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">🎙 Live Transcription</span>
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Recording...</span>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            <p className="text-gray-800 text-sm leading-relaxed mb-4">
              In my previous role at a fintech startup, I encountered a major conflict when our Engineering lead wanted to prioritize architectural debt, while the Sales head was pushing for a custom integration for a tier-one client...
            </p>
            <p className="text-gray-400 text-sm italic animate-pulse">Processing audio signal...</p>
          </div>

          <div className="p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
            <div className="flex justify-center mb-6">
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`}
              >
                <Mic size={24} />
              </button>
            </div>
            
            <div className="flex gap-4 mb-6">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm transition-colors flex justify-center gap-2">
                ↺ Re-record
              </button>
              <button onClick={handleNext} disabled={completing} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors flex justify-center gap-2 shadow-md shadow-blue-500/20">
                {completing ? 'Finishing...' : 'Next Question →'}
              </button>
            </div>

            <div className="flex gap-6 px-4">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 mb-1">
                  <span>Confidence</span> <span className="text-blue-600">82%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-[82%]" /></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 mb-1">
                  <span>Clarity</span> <span className="text-purple-600">Good</span>
                </div>
                <div className="flex gap-1 h-1">
                  <div className="h-full flex-1 bg-purple-600 rounded-full" />
                  <div className="h-full flex-1 bg-purple-600 rounded-full" />
                  <div className="h-full flex-1 bg-purple-600 rounded-full" />
                  <div className="h-full flex-1 bg-purple-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer bar */}
      <div className="h-8 bg-blue-50 flex items-center justify-between px-6 shrink-0">
        <span className="text-[10px] text-blue-600 font-semibold uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Audio Input: MacBook Pro Mic</span>
        <span className="text-[10px] text-blue-600 font-semibold uppercase">🤖 AI is analyzing non-verbal cues...</span>
      </div>
    </div>
  );
}
