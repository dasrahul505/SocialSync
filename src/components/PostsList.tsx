import React from 'react';
import { MoreVertical } from 'lucide-react';

export function PostsList() {
  const posts = [
    {
      title: 'Summer Collection Launch',
      platform: 'All Platforms',
      date: '2h ago',
      status: 'Published',
      views: '1.2K',
      engagement: '23%',
    },
    {
      title: 'Behind the Scenes',
      platform: 'Instagram, YouTube',
      date: '5h ago',
      status: 'Published',
      views: '856',
      engagement: '18%',
    },
    {
      title: 'Product Tutorial',
      platform: 'Facebook, YouTube',
      date: '1d ago',
      status: 'Published',
      views: '2.1K',
      engagement: '31%',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Posts</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.title}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {post.title}
                </p>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-1 flex items-center space-x-4">
                <p className="text-xs text-gray-500">{post.platform}</p>
                <span className="text-gray-300">•</span>
                <p className="text-xs text-gray-500">{post.date}</p>
                <span className="text-gray-300">•</span>
                <p className="text-xs font-medium text-green-600">{post.status}</p>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">{post.views}</span> views
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">{post.engagement}</span> engagement
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}