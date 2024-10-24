import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { VideoUpload } from './components/VideoUpload';
import { AccountsManager } from './components/AccountsManager';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload' | 'accounts'>('dashboard');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'upload' && <VideoUpload />}
      {currentView === 'accounts' && <AccountsManager />}
    </Layout>
  );
}

export default App;