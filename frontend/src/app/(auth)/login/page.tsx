'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.auth.login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] flex flex-col">
      <div className="px-8 py-5">
        <Link href="/" className="text-blue-600 font-bold text-xl">InterviewAI</Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Welcome back</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Log in to continue your interview prep</p>

            {/* Social Login */}
            <div className="space-y-3 mb-5">
              <button className="w-full border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                <span className="font-bold tracking-widest text-xs">GOOGLE</span> Continue with Google
              </button>
              <button className="w-full border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Continue with LinkedIn
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                <input type="email" placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <button type="button" className="text-xs text-blue-500 hover:underline">Forgot?</button>
                </div>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-gray-400">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-5">
              Don&#39;t have an account? <Link href="/signup" className="text-blue-500 font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-[#E2E7FF] border-t border-[#C4C7D7] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© 2024 InterviewAI Simulator. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy','Terms of Service','Contact Support'].map(l => (
              <a key={l} href="#" className="text-xs text-gray-500 hover:text-gray-700">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
