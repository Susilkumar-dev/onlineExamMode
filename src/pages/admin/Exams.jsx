import React, { useState } from 'react';
import ExamTable from '../../component/admin/ExamTable';
import ThemeCard from '../../component/common/ThemeCard';
import ThemeButton from '../../component/common/ThemeButton';
import PageWrapper from '../../layouts/PageWrapper';

const Exams = () => {
  const [filter, setFilter] = useState('all');

  return (
    <PageWrapper 
      title="Exam Management"
      description="Monitor and manage all platform exams"
      actions={
        <ThemeButton>
          <span className="mr-2">➕</span> Create New Exam
        </ThemeButton>
      }
    >
      <div className="p-6 space-y-6">
        {/* Filters */}
        <ThemeCard>
          <div className="flex flex-wrap gap-2 md:gap-4">
            <ThemeButton 
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Exams
            </ThemeButton>
            <ThemeButton 
              variant={filter === 'active' ? 'primary' : 'outline'}
              onClick={() => setFilter('active')}
            >
              Active
            </ThemeButton>
            <ThemeButton 
              variant={filter === 'upcoming' ? 'primary' : 'outline'}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </ThemeButton>
            <ThemeButton 
              variant={filter === 'completed' ? 'primary' : 'outline'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </ThemeButton>
            <ThemeButton 
              variant={filter === 'draft' ? 'primary' : 'outline'}
              onClick={() => setFilter('draft')}
            >
              Drafts
            </ThemeButton>
          </div>
        </ThemeCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ThemeCard className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            <div className="text-2xl font-bold">156</div>
            <div className="text-lg opacity-90">Active Exams</div>
          </ThemeCard>
          <ThemeCard>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">1,245</div>
            <div className="text-gray-600 dark:text-gray-300">Total Participants</div>
          </ThemeCard>
          <ThemeCard>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">78.5%</div>
            <div className="text-gray-600 dark:text-gray-300">Avg. Completion</div>
          </ThemeCard>
          <ThemeCard>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">12</div>
            <div className="text-gray-600 dark:text-gray-300">Exams Today</div>
          </ThemeCard>
        </div>

        {/* Exams Table */}
        <ThemeCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Exams</h2>
            <button className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              View All →
            </button>
          </div>
          <ExamTable />
        </ThemeCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ThemeButton variant="primary" fullWidth>
            <span className="mr-2">📋</span> Bulk Import
          </ThemeButton>
          <ThemeButton variant="outline" fullWidth>
            <span className="mr-2">📤</span> Export Data
          </ThemeButton>
          <ThemeButton variant="outline" fullWidth>
            <span className="mr-2">📊</span> Analytics
          </ThemeButton>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Exams;