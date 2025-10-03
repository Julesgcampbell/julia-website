import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'overview' | 'category' | 'featured' | 'upload' | 'videos' | 'about' | 'contact'>('overview');

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 pt-20 admin-dashboard">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light text-stone-800">Website Management</h1>
            <button onClick={handleLogout} className="flex items-center space-x-2 text-stone-600 hover:text-stone-800">
              <span>Logout</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
            <div className="text-center py-12 text-stone-500">
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">Admin Dashboard</h2>
              <p className="text-lg">Content management features coming soon!</p>
              <p className="text-sm">This will allow you to manage photos, content, and website settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;