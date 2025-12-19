import React from 'react';
import DashboardCards from '../../component/admin/DashboardCards';
import AnalyticsChart from '../../component/admin/AnalyticsChart';
import UserTable from '../../component/admin/UserTable';
import ThemeCard from '../../component/common/ThemeCard';
import ThemeButton from '../../component/common/ThemeButton';
import PageWrapper from '../../layouts/PageWrapper';

const AdminDashboard = () => {
  return (
    <PageWrapper 
      title="Admin Dashboard"
      description="Welcome back! Here's what's happening with your platform."
      actions={
        <ThemeButton>
          Refresh Data
        </ThemeButton>
      }
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <DashboardCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ThemeCard>
            <h2 className="text-xl font-bold mb-4">Platform Usage Analytics</h2>
            <AnalyticsChart type="usage" />
          </ThemeCard>
          <ThemeCard>
            <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
            <AnalyticsChart type="revenue" />
          </ThemeCard>
        </div>

        {/* Recent Users */}
        <ThemeCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Users</h2>
            <button className="font-medium text-primary-600 hover:text-primary-700">
              View All →
            </button>
          </div>
          <UserTable limit={5} />
        </ThemeCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ThemeButton variant="primary" fullWidth>
            <span className="mr-2">👥</span> Add New User
          </ThemeButton>
          <ThemeButton variant="outline" fullWidth>
            <span className="mr-2">📊</span> Generate Report
          </ThemeButton>
          <ThemeButton variant="outline" fullWidth>
            <span className="mr-2">⚙️</span> System Settings
          </ThemeButton>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;