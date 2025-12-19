import React, { useState } from 'react';
import UserTable from '../../component/admin/UserTable';
import { useTheme } from '../../context/ThemeContext';

const Users = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-6">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>User Management</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Platform
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              User Management
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage all users, roles, permissions, and access across your educational platform
          </p>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { 
              label: 'Total Users', 
              value: '2,847', 
              change: '+12.5%', 
              icon: '👥', 
              gradient: 'from-blue-500 to-cyan-500',
              description: 'Registered platform users'
            },
            { 
              label: 'Active Users', 
              value: '156', 
              change: '+8.2%', 
              icon: '✅', 
              gradient: 'from-green-500 to-emerald-500',
              description: 'Users active in last 7 days'
            },
            { 
              label: 'Teachers', 
              value: '42', 
              change: '+5.3%', 
              icon: '👨‍🏫', 
              gradient: 'from-purple-500 to-pink-500',
              description: 'Teaching staff members'
            },
            { 
              label: 'Students', 
              value: '1,024', 
              change: '+15.7%', 
              icon: '👨‍🎓', 
              gradient: 'from-yellow-500 to-amber-500',
              description: 'Active student accounts'
            }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-dark-800/50 border border-dark-700' 
                  : 'bg-white border border-gray-200'
              } shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium mt-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {stat.description}
                  </div>
                </div>
                <div className={`text-2xl p-3 rounded-xl bg-gradient-to-r ${stat.gradient} bg-opacity-10`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className={`text-xs px-3 py-1.5 rounded-full ${
                  stat.change.includes('+')
                    ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                    : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change} from last month
                </div>
                <button 
                  onClick={() => console.log(`View ${stat.label}`)}
                  className={`text-xs font-medium ${
                    isDark 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-gray-600 hover:text-gray-900'
                  } transition-colors duration-300`}
                >
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Actions */}
        <div className={`rounded-2xl p-6 mb-8 transition-all duration-300 ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg hover:shadow-xl`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-700 border border-dark-600 text-gray-300 placeholder-gray-500 focus:border-primary-500'
                      : 'bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-500 focus:border-primary-500'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500/20 w-full md:w-64`}
                />
                <span className="absolute left-3 top-3.5 text-gray-500">🔍</span>
              </div>
              
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isDark
                    ? 'bg-dark-700 border border-dark-600 text-gray-300 hover:bg-dark-600'
                    : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrators</option>
                <option value="teacher">Teachers</option>
                <option value="student">Students</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isDark
                    ? 'bg-dark-700 border border-dark-600 text-gray-300 hover:bg-dark-600'
                    : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                }`}
                title="Advanced Filters"
              >
                ⚙️
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => console.log('Import Users clicked')}
                className={`group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                } shadow-lg hover:shadow-xl`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>📥</span>
                  <span>Import Users</span>
                </span>
              </button>
              
              <button 
                onClick={() => console.log('Export Users clicked')}
                className={`group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                } shadow-lg hover:shadow-xl`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>📤</span>
                  <span>Export Users</span>
                </span>
              </button>
              
              <button 
                onClick={() => console.log('Add User clicked')}
                className={`group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                } shadow-lg hover:shadow-xl`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>+</span>
                  <span>Add User</span>
                </span>
              </button>
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          {showFilters && (
            <div className={`mt-6 pt-6 border-t border-gray-200 dark:border-dark-700`}>
              <h4 className={`font-medium mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>Advanced Filters</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Date Joined
                  </label>
                  <select className={`w-full px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-700 border border-dark-600 text-gray-300'
                      : 'bg-gray-100 border border-gray-300 text-gray-700'
                  }`}>
                    <option>Any date</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Exam Activity
                  </label>
                  <select className={`w-full px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-700 border border-dark-600 text-gray-300'
                      : 'bg-gray-100 border border-gray-300 text-gray-700'
                  }`}>
                    <option>Any activity</option>
                    <option>Active (5+ exams)</option>
                    <option>Moderate (2-4 exams)</option>
                    <option>Low (0-1 exams)</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Department
                  </label>
                  <select className={`w-full px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-700 border border-dark-600 text-gray-300'
                      : 'bg-gray-100 border border-gray-300 text-gray-700'
                  }`}>
                    <option>All departments</option>
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Engineering</option>
                    <option>Business</option>
                    <option>Arts</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setRoleFilter('all');
                    setStatusFilter('all');
                    setSearchTerm('');
                    setShowFilters(false);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-700 hover:bg-dark-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isDark
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
            <div className="flex items-center flex-wrap gap-2 mt-4">
              <span className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active filters:
              </span>
              {searchTerm && (
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                  isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  Search: "{searchTerm}"
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-xs"
                  >
                    ✕
                  </button>
                </span>
              )}
              {roleFilter !== 'all' && (
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                  isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  Role: {roleFilter}
                  <button 
                    onClick={() => setRoleFilter('all')}
                    className="ml-2 text-xs"
                  >
                    ✕
                  </button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                  isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  Status: {statusFilter}
                  <button 
                    onClick={() => setStatusFilter('all')}
                    className="ml-2 text-xs"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className={`rounded-2xl overflow-hidden mb-8 ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <UserTable />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`rounded-2xl p-6 transition-all duration-300 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                📈
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  85%
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  User Activity Rate
                </div>
              </div>
            </div>
            <div className={`h-2 rounded-full ${
              isDark ? 'bg-dark-700' : 'bg-gray-200'
            } overflow-hidden`}>
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 transition-all duration-300 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                ⏱️
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  12.4 min
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Avg. Session Time
                </div>
              </div>
            </div>
            <div className={`text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              +2.3 min from last week
            </div>
          </div>

          <div className={`rounded-2xl p-6 transition-all duration-300 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                📊
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  92%
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Satisfaction Rate
                </div>
              </div>
            </div>
            <div className={`text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Based on 347 feedback responses
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className={`rounded-2xl p-6 ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className={`font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Bulk User Actions</h4>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Perform actions on multiple users at once
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
              }`}>
                Send Email to Selected
              </button>
              <button className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
              }`}>
                Change Role
              </button>
              <button className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-800'
                  : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
              }`}>
                Deactivate Selected
              </button>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className={`mb-6 text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Need help with user management? Check out our documentation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`group relative px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
            } shadow-lg hover:shadow-xl`}>
              <span className="relative z-10">View Documentation</span>
            </button>
            
            <button className={`group relative px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            } shadow-lg hover:shadow-xl`}>
              <span className="relative z-10">Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;