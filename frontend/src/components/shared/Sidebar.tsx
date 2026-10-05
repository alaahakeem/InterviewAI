'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Upload, BarChart2, History, Map, Settings, HelpCircle, LogOut, Menu } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upload-cv', label: 'Upload CV', icon: Upload },
  { href: '/analysis', label: 'Analysis', icon: BarChart2 },
  { href: '/history', label: 'History', icon: History },
  { href: '/learning-path', label: 'Learning Path', icon: Map },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <Link href="/dashboard" className="text-blue-600 font-bold text-xl">InterviewAI</Link>
      </div>
      {/* User */}
      <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">AT</div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Alex Thompson</p>
          <p className="text-xs text-blue-500 font-medium">Premium Member</p>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'sidebar-link',
              pathname === href && 'active'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      {/* Bottom CTA */}
      <div className="px-3 pb-3 space-y-1">
        <Link href="/dashboard" className="btn-primary w-full text-center block text-sm">Start New Mock</Link>
        <Link href="#" className="sidebar-link"><HelpCircle size={18} />Help Center</Link>
        <button
          onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
          className="sidebar-link w-full text-left text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />Log Out
        </button>
      </div>
    </aside>
  );
}
