import React from 'react';
import { BarChart3 } from 'lucide-react';

export function AnalyticsChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Analytics Overview</h3>
        <select className="text-sm border-gray-300 rounded-md">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Analytics data will appear here</p>
        </div>
      </div>
    </div>
  );
}