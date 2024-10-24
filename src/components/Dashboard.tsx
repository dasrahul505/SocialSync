import React from 'react';
import { BarChart3, TrendingUp, Users, Video } from 'lucide-react';
import { PostsList } from './PostsList';
import { AnalyticsChart } from './AnalyticsChart';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Posts',
      value: '2,345',
      change: '+12%',
      icon: BarChart3,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Reach',
      value: '1.2M',
      change: '+23%',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Followers',
      value: '45.6K',
      change: '+8%',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Videos',
      value: '156',
      change: '+18%',
      icon: Video,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-600"> vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsChart />
        <PostsList />
      </div>
    </div>
  );
}