import Link from 'next/link';
import { CheckCircle, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <span className="text-blue-600 font-bold text-xl">InterviewAI</span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#about" className="text-sm text-gray-600 hover:text-gray-900">About</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">Log In</Link>
          <Link href="/signup" className="btn-primary text-sm">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Master Your Next<br />Interview with <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Practice with the world&#39;s most advanced AI interview coach. Get personalized feedback, real-time analysis, and a structured roadmap to land your dream job.
          </p>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/login" className="btn-primary text-base">Get Started for Free</Link>
            <button className="btn-secondary text-base">Watch Demo</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['AT','SC','MJ'].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-blue-600">{i}</div>
              ))}
            </div>
            <span className="text-sm text-gray-500">Joined by 10k+ job seekers this month</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden aspect-video flex items-center justify-center bg-gray-100">
            <img src="/hero_image.jpg" alt="AI Interview Simulator" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">FEATURES</p>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Everything you need to succeed</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '🎯', title: 'AI Mock Interviews', desc: 'Practice role-specific questions with our AI that adapts to your answers in real-time for a true-to-life experience.' },
              { emoji: '📄', title: 'CV Analysis', desc: 'Get instant feedback on your resume. Our AI identifies gaps and optimizes your CV for the specific roles you&#39;re targeting.' },
              { emoji: '📊', title: 'Personalized Roadmaps', desc: 'Based on your mock performance, receive a custom learning path with curated resources to bridge your skill gaps.' },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <div className="text-2xl mb-4">{f.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Three steps to your next job</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: 1, title: 'Upload CV', desc: 'We analyze your background to tailor the interview experience to your specific expertise.' },
              { n: 2, title: 'Setup Interview', desc: 'Choose your target role and company. Our AI generates a custom set of industry-standard questions.' },
              { n: 3, title: 'Get Feedback', desc: 'Receive detailed performance metrics, sentiment analysis, and model answer comparisons.' },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">{s.n}</div>
                <div className="w-full h-0.5 bg-gray-200 mb-4 hidden md:block" />
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="py-20 px-6 bg-[#EEF1FF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Jenkins', role: 'Product Manager at TechFlow', quote: '\"The feedback on my body language and eye contact during the mock interview was a game-changer. I landed my PM role within two weeks of using InterviewAI.\"' },
              { name: 'David Chen', role: 'Senior Engineer at CloudScale', quote: '\"The personalized roadmap helped me focus on exactly what technical concepts I was missing. It&#39;s like having a senior mentor available 24/7.\"' },
              { name: 'Elena Rodriguez', role: 'Marketing Lead at VentureHub', quote: '\"I used to get so nervous before interviews. Practicing with the AI coach made me feel prepared for any curveball question they threw at me.\"' },
            ].map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-semibold text-blue-700">{t.name[0]}</div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">{t.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Choose your path to success</h2>
          <p className="text-center text-gray-500 mb-12">Plans tailored for every stage of your job hunt.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="card p-6">
              <p className="text-gray-500 font-medium mb-2">Free</p>
              <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-base font-normal text-gray-400">/mo</span></p>
              <ul className="space-y-2 mb-8">
                {['2 AI Mock Interviews','Basic CV Scan','Industry Standard Questions'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-blue-500" />{f}</li>
                ))}
              </ul>
              <Link href="/login" className="btn-secondary block text-center text-sm">Start Free</Link>
            </div>
            {/* Pro */}
            <div className="bg-blue-600 rounded-xl p-6 text-white relative">
              <span className="absolute top-4 right-4 text-xs bg-white text-blue-600 font-semibold px-2 py-0.5 rounded-full">MOST POPULAR</span>
              <p className="font-medium mb-2 opacity-90">Pro</p>
              <p className="text-4xl font-bold mb-6">$29<span className="text-base font-normal opacity-70">/mo</span></p>
              <ul className="space-y-2 mb-8">
                {['Unlimited AI Interviews','Advanced AI Feedback','Deep CV Analysis & Fixes','Full Personalized Roadmap'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="opacity-80" />{f}</li>
                ))}
              </ul>
              <Link href="/login" className="block text-center bg-white text-blue-600 font-semibold py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm">Get Pro Access</Link>
            </div>
            {/* Enterprise */}
            <div className="card p-6">
              <p className="text-gray-500 font-medium mb-2">Enterprise</p>
              <p className="text-4xl font-bold text-gray-900 mb-6">$99<span className="text-base font-normal text-gray-400">/mo</span></p>
              <ul className="space-y-2 mb-8">
                {['For Teams & Bootcamps','Custom Role Simulations','Bulk User Management','Priority Support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-blue-500" />{f}</li>
                ))}
              </ul>
              <button className="btn-secondary w-full text-sm">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How realistic are the AI mock interviews?', a: 'Our AI uses advanced language models trained on thousands of real interview transcripts to simulate authentic interview scenarios.' },
              { q: 'Is my data and resume secure?', a: 'Yes, all data is encrypted at rest and in transit. We never share your data with third parties.' },
              { q: 'Can I use InterviewAI for technical coding interviews?', a: 'Absolutely! Our Technical interview mode includes coding challenges, system design, and algorithmic thinking questions.' },
            ].map((faq, i) => (
              <details key={i} className="card p-5 group">
                <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-900 text-sm">
                  {faq.q}
                  <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-gray-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#E2E7FF] border-t border-[#C4C7D7] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-blue-600 mb-1">InterviewAI</p>
            <p className="text-xs text-gray-500">© 2024 InterviewAI Simulator. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy Policy','Terms of Service','Contact Support','Sitemap'].map(l => (
              <a key={l} href="#" className="text-xs text-gray-500 hover:text-gray-700">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
