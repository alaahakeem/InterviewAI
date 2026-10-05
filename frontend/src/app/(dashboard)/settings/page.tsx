'use client';
import TopBar from '@/components/shared/TopBar';

export default function SettingsPage() {
  return (
    <div>
      <TopBar title="Settings" />
      <div className="p-6 max-w-4xl">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
              <input type="text" defaultValue="Alex Thompson" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
              <input type="email" defaultValue="alex@example.com" disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Current Plan</label>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4">
                <div>
                  <p className="font-bold text-blue-600">Pro Plan</p>
                  <p className="text-xs text-gray-500">Billed $29/month. Next billing date: Nov 5, 2024</p>
                </div>
                <button className="btn-secondary text-xs">Manage Subscription</button>
              </div>
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
