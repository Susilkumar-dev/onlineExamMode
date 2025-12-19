import React, { useState } from 'react';
import Badge from '../common/Badge';
import { useTheme } from '../../context/ThemeContext';

const UserTable = ({ limit }) => {
  const { isDark } = useTheme();
  const [users] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'student',
      status: 'active',
      joined: '2024-12-01',
      exams: 12,
      avatarColor: 'bg-blue-500',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@university.edu',
      role: 'teacher',
      status: 'active',
      joined: '2024-11-15',
      exams: 8,
      avatarColor: 'bg-purple-500',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@college.com',
      role: 'admin',
      status: 'active',
      joined: '2024-10-20',
      exams: 25,
      avatarColor: 'bg-green-500',
      lastActive: 'Just now'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'student',
      status: 'inactive',
      joined: '2024-09-05',
      exams: 5,
      avatarColor: 'bg-yellow-500',
      lastActive: '1 week ago'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert@university.edu',
      role: 'teacher',
      status: 'active',
      joined: '2024-08-12',
      exams: 15,
      avatarColor: 'bg-red-500',
      lastActive: '3 hours ago'
    },
    {
      id: 6,
      name: 'Lisa Wang',
      email: 'lisa@tech.edu',
      role: 'student',
      status: 'active',
      joined: '2024-12-10',
      exams: 7,
      avatarColor: 'bg-pink-500',
      lastActive: '5 hours ago'
    },
    {
      id: 7,
      name: 'David Brown',
      email: 'david@college.com',
      role: 'admin',
      status: 'suspended',
      joined: '2024-07-22',
      exams: 18,
      avatarColor: 'bg-gray-500',
      lastActive: '2 days ago'
    },
    {
      id: 8,
      name: 'Maria Garcia',
      email: 'maria@university.edu',
      role: 'teacher',
      status: 'active',
      joined: '2024-06-30',
      exams: 22,
      avatarColor: 'bg-indigo-500',
      lastActive: 'Yesterday'
    }
  ]);

  const displayedUsers = limit ? users.slice(0, limit) : users;

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'suspended': return 'danger';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return '🟢';
      case 'inactive': return '🟡';
      case 'suspended': return '🔴';
      default: return '⚪';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'primary';
      case 'teacher': return 'secondary';
      case 'student': return 'default';
      default: return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return '👑';
      case 'teacher': return '👨‍🏫';
      case 'student': return '👨‍🎓';
      default: return '👤';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // If limit is provided, just render the table (for dashboard widgets)
  if (limit) {
    return (
      <div className={`rounded-2xl overflow-hidden ${
        isDark 
          ? 'bg-dark-800/50 border border-dark-700' 
          : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
            <thead className={isDark ? 'bg-dark-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    User
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Role
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Status
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {displayedUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className={`transition-all duration-300 ${
                    isDark 
                      ? 'hover:bg-dark-700/50' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white ${user.avatarColor}`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {user.name}
                        </div>
                        <div className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getRoleIcon(user.role)}</span>
                      <Badge variant={getRoleColor(user.role)}>{user.role}</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{getStatusIcon(user.status)}</span>
                      <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'hover:bg-dark-700 text-gray-400 hover:text-gray-300'
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => console.log(`Edit ${user.name}`)}
                        title="Edit User"
                      >
                        ✏️
                      </button>
                      <button
                        className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'hover:bg-dark-700 text-red-400 hover:text-red-300'
                            : 'hover:bg-gray-100 text-red-600 hover:text-red-700'
                        }`}
                        onClick={() => console.log(`Remove ${user.name}`)}
                        title="Remove User"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Full page mode
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
              User Directory
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage all users, roles, and permissions across your educational platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: users.length, icon: '👥', color: 'blue', change: '+12%' },
            { label: 'Active Users', value: users.filter(u => u.status === 'active').length, icon: '✅', color: 'green', change: '+8%' },
            { label: 'Total Exams', value: users.reduce((acc, u) => acc + u.exams, 0), icon: '📝', color: 'purple', change: '+15%' },
            { label: 'Avg. Activity', value: 'High', icon: '📊', color: 'yellow', change: '+5%' }
          ].map((stat, index) => (
            <div key={index} className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-3xl font-bold ${
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    stat.color === 'purple' ? 'text-purple-500' : 'text-yellow-500'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`mt-2 flex items-center gap-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.change.includes('+') 
                        ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                        : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`text-2xl p-3 rounded-xl ${
                  isDark 
                    ? stat.color === 'blue' ? 'bg-blue-900/30' :
                      stat.color === 'green' ? 'bg-green-900/30' :
                      stat.color === 'purple' ? 'bg-purple-900/30' : 'bg-yellow-900/30'
                    : stat.color === 'blue' ? 'bg-blue-100' :
                      stat.color === 'green' ? 'bg-green-100' :
                      stat.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'
                }`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-6 rounded-2xl ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => console.log('Add User clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
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
            
            <button
              onClick={() => console.log('Import Users clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10">Import Users</span>
            </button>

            <button
              onClick={() => console.log('Export clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10">Export Data</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className={`pl-10 pr-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                  isDark
                    ? 'bg-dark-700 border border-dark-600 text-gray-300 placeholder-gray-500 focus:border-primary-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-500 focus:border-primary-500'
                } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              />
              <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
            </div>

            <select className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              isDark
                ? 'bg-dark-700 border border-dark-600 text-gray-300 hover:bg-dark-600'
                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}>
              <option>All Roles</option>
              <option>Admin</option>
              <option>Teacher</option>
              <option>Student</option>
            </select>

            <select className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              isDark
                ? 'bg-dark-700 border border-dark-600 text-gray-300 hover:bg-dark-600'
                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}>
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
              <thead className={isDark ? 'bg-dark-800' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={`flex items-center gap-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>User</span>
                      <span className="text-xs">↕️</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Role
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Status
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Exams
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Joined
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Last Active
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                isDark ? 'divide-dark-700' : 'divide-gray-200'
              }`}>
                {displayedUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className={`group transition-all duration-300 ${
                      isDark 
                        ? 'hover:bg-dark-700/50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white ${user.avatarColor}`}>
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {user.name}
                          </div>
                          <div className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getRoleIcon(user.role)}</span>
                        <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          user.role === 'admin' 
                            ? isDark ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-700'
                            : user.role === 'teacher'
                            ? isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                            : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{getStatusIcon(user.status)}</span>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          user.status === 'active'
                            ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                            : user.status === 'inactive'
                            ? isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                            : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-16 h-2 rounded-full overflow-hidden ${
                          isDark ? 'bg-dark-700' : 'bg-gray-200'
                        }`}>
                          <div 
                            className={`h-full ${
                              user.exams > 15 ? 'bg-green-500' : user.exams > 10 ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(100, (user.exams / 25) * 100)}%` }}
                          ></div>
                        </div>
                        <span className={`font-medium ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {user.exams}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {formatDate(user.joined)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {user.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'hover:bg-dark-700 text-gray-400 hover:text-gray-300'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`}
                          onClick={() => console.log(`View ${user.name}`)}
                          title="View Profile"
                        >
                          👁️
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'hover:bg-dark-700 text-gray-400 hover:text-gray-300'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`}
                          onClick={() => console.log(`Edit ${user.name}`)}
                          title="Edit User"
                        >
                          ✏️
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'hover:bg-dark-700 text-red-400 hover:text-red-300'
                              : 'hover:bg-gray-100 text-red-600 hover:text-red-700'
                          }`}
                          onClick={() => console.log(`Remove ${user.name}`)}
                          title="Remove User"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className={`px-6 py-4 flex items-center justify-between border-t ${
            isDark ? 'border-dark-700' : 'border-gray-200'
          }`}>
            <div className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Showing <span className="font-semibold">{displayedUsers.length}</span> of <span className="font-semibold">{users.length}</span> users
            </div>
            <div className="flex items-center gap-2">
              <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                ← Previous
              </button>
              <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}>
                1
              </button>
              <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                2
              </button>
              <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {displayedUsers.length === 0 && (
          <div className={`text-center py-16 rounded-2xl mt-6 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="text-6xl mb-4">👥</div>
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              No users found
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try adjusting your filters or add a new user
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className={`mb-6 text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Need help with user management? Contact our support team
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`group relative px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
            } shadow-lg hover:shadow-xl`}>
              <span className="relative z-10">Contact Support</span>
            </button>
            
            <button className={`group relative px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            } shadow-lg hover:shadow-xl`}>
              <span className="relative z-10">View Documentation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;