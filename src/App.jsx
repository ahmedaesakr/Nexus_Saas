import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AssetLibrary from './components/AssetLibrary';
import AssetDetail from './components/AssetDetail';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import Integrations from './components/Integrations';
import NotificationPanel from './components/NotificationPanel';
import UploadModal from './components/UploadModal';

function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/library" replace />} />
          <Route path="/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/library" element={<AssetLibrary onUpload={() => setShowUpload(true)} />} />
          <Route path="/detail" element={<AssetDetail />} />
          <Route path="/detail-rejected" element={<AssetDetail rejected />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/integrations" element={<Integrations />} />
        </Routes>
      </Layout>

      {/* Global Overlays */}
      <div className="fixed top-4 right-6 z-30">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="size-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-500 hover:text-primary transition-colors border border-slate-100"
        >
          <span className="material-symbols-outlined">notifications</span>
          <div className="absolute top-0 right-0 size-3 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
      </div>

      {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}

export default App;
