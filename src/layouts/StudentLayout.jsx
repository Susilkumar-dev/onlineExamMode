import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/common/Sidebar';
// import NavigationArrows from '../component/common/NavigationArrows';

const StudentLayout = () => {
  const navItems = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/exams', label: 'Exams', icon: '📝' },
    { path: '/student/take-exam', label: 'Take Exam', icon: '✏️' },
    { path: '/student/results', label: 'Results', icon: '📈' },
    { path: '/student/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        {/* <NavigationArrows /> */}
      </div>
    </div>
  );
};

export default StudentLayout;