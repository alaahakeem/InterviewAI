'use client';
import { useEffect, useState } from 'react';
import TopBar from '@/components/shared/TopBar';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    api.interview.getHistory().then(setHistory).catch(() => {
      setHistory([
        { id: 1, role: 'Senior Frontend Engineer', type: 'Technical', difficulty: 'Senior', overallScore: 88, status: 'Completed', date: 'Oct 12, 2024' },
        { id: 2, role: 'Technical Architect', type: 'Mixed', difficulty: 'Senior', overallScore: 72, status: 'Completed', date: 'Oct 10, 2024' },
      ]);
    });
  }, []);

  return (
    <div>
      <TopBar title="Interview History" />
      <div className="p-6">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Past Sessions</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left pb-3">Date</th>
                <th className="text-left pb-3">Role</th>
                <th className="text-left pb-3">Type</th>
                <th className="text-left pb-3">Score</th>
                <th className="text-left pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map(item => (
                <tr key={item.id} className="py-3">
                  <td className="py-3 text-gray-500">{item.date}</td>
                  <td className="py-3 font-medium text-gray-900">{item.role}</td>
                  <td className="py-3 text-gray-500">{item.type} • {item.difficulty}</td>
                  <td className="py-3 font-bold text-blue-600">{item.overallScore}/100</td>
                  <td className="py-3">
                    <Link href={`/interview/results/${item.id}`} className="text-blue-500 font-medium hover:underline text-xs">View Results</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
