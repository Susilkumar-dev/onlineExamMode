import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/common/Sidebar';

const TeacherLayout = () => {
  const navItems = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/teacher/create-exam', label: 'Create Exam', icon: '✏️' },
    { path: '/teacher/question-bank', label: 'Question Bank', icon: '📚' },
    { path: '/teacher/live-monitor', label: 'Live Monitor', icon: '👁️' },
    { path: '/teacher/results', label: 'Results', icon: '📈' },
    { path: '/teacher/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;