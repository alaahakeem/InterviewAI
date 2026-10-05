'use client';
import { Search, Bell, User } from 'lucide-react';

export default function TopBar({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-xl font-bold text-blue-600">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-600 transition-colors"><Search size={20} /></button>
        <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
