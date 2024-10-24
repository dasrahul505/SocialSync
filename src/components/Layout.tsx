import React from 'react';
import { LayoutGrid, Upload, Users2, LogOut, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'upload' | 'accounts';
  onViewChange: (view: 'dashboard' | 'upload' | 'accounts') => void;
}

export function Layout({ children, currentView, onViewChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6" />
            SocialSync
          </h1>
        </div>
        <nav className="mt-6">
          <div className="px-3 space-y-1">
            {[
              { name: 'Dashboard', icon: LayoutGrid, view: 'dashboard' },
              { name: 'Upload Video', icon: Upload, view: 'upload' },
              { name: 'Connected Accounts', icon: Users2, view: 'accounts' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => onViewChange(item.view as any)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  currentView === item.view
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </div>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </button>
            <button className="flex items-center text-sm text-red-600 hover:text-red-700">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}