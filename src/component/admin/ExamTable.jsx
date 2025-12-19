import React, { useState } from 'react';
import Badge from '../common/Badge';
import { useTheme } from '../../context/ThemeContext';

const ExamTable = () => {
  const { isDark } = useTheme();
  const [exams] = useState([
    {
      id: 1,
      title: 'Data Structures Final',
      course: 'CS201',
      type: 'Coding',
      duration: '2h',
      participants: 145,
      status: 'active',
      date: '2024-12-20',
      progress: 85,
      category: 'tech'
    },
    {
      id: 2,
      title: 'Web Development Quiz',
      course: 'WD101',
      type: 'MCQ',
      duration: '1h',
      participants: 89,
      status: 'upcoming',
      date: '2024-12-18',
      progress: 0,
      category: 'tech'
    },
    {
      id: 3,
      title: 'Database Midterm',
      course: 'DB301',
      type: 'Mixed',
      duration: '1.5h',
      participants: 76,
      status: 'completed',
      date: '2024-12-10',
      progress: 100,
      category: 'tech'
    },
    {
      id: 4,
      title: 'Python Basics',
      course: 'PY101',
      type: 'Coding',
      duration: '45m',
      participants: 203,
      status: 'active',
      date: '2024-12-15',
      progress: 60,
      category: 'science'
    },
    {
      id: 5,
      title: 'Algorithms Test',
      course: 'CS202',
      type: 'Mixed',
      duration: '2h',
      participants: 92,
      status: 'draft',
      date: '2024-12-25',
      progress: 0,
      category: 'tech'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'completed': return 'info';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const getStatusBgColor = (status, isDark) => {
    switch(status) {
      case 'active': return isDark ? 'bg-green-900/30' : 'bg-green-100';
      case 'upcoming': return isDark ? 'bg-blue-900/30' : 'bg-blue-100';
      case 'completed': return isDark ? 'bg-purple-900/30' : 'bg-purple-100';
      case 'draft': return isDark ? 'bg-gray-700' : 'bg-gray-100';
      default: return isDark ? 'bg-gray-700' : 'bg-gray-100';
    }
  };

  const getStatusTextColor = (status, isDark) => {
    switch(status) {
      case 'active': return isDark ? 'text-green-400' : 'text-green-600';
      case 'upcoming': return isDark ? 'text-blue-400' : 'text-blue-600';
      case 'completed': return isDark ? 'text-purple-400' : 'text-purple-600';
      case 'draft': return isDark ? 'text-gray-400' : 'text-gray-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Coding': return 'primary';
      case 'MCQ': return 'secondary';
      case 'Mixed': return 'success';
      default: return 'default';
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

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

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
            }`}>Exam Management</span>
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
              Exam Analytics
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Monitor and manage all exams across your educational platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Exams', value: exams.length, icon: '📝', color: 'blue' },
            { label: 'Active Exams', value: exams.filter(e => e.status === 'active').length, icon: '✅', color: 'green' },
            { label: 'Total Participants', value: exams.reduce((acc, e) => acc + e.participants, 0), icon: '👥', color: 'purple' },
            { label: 'Avg. Progress', value: `${Math.round(exams.reduce((acc, e) => acc + e.progress, 0) / exams.length)}%`, icon: '📊', color: 'yellow' }
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
                  <div className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
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
              onClick={() => console.log('Add Exam clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>+</span>
                <span>Create Exam</span>
              </span>
            </button>
            
            <button
              onClick={() => console.log('Bulk Import clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10">Import Questions</span>
            </button>

            <button
              onClick={() => console.log('Schedule clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10">Schedule Bulk</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search exams..."
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
              <option>All Status</option>
              <option>Active</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Draft</option>
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
                      <span>Exam Title</span>
                      <span className="text-xs">↕️</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Course
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Type
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Status
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Progress
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Participants
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Date
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
                {exams.map((exam) => (
                  <tr 
                    key={exam.id} 
                    className={`group transition-all duration-300 ${
                      isDark 
                        ? 'hover:bg-dark-700/50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${
                          isDark ? 'bg-dark-700' : 'bg-gray-100'
                        }`}>
                          {exam.type === 'Coding' ? '💻' : exam.type === 'MCQ' ? '📋' : '📝'}
                        </div>
                        <div>
                          <div className={`text-sm font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {exam.title}
                          </div>
                          <div className={`flex items-center gap-2 text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <span>⏱️ {exam.duration}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        isDark 
                          ? 'bg-dark-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {exam.course}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getTypeColor(exam.type)}>{exam.type}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                        getStatusBgColor(exam.status, isDark)
                      } ${getStatusTextColor(exam.status, isDark)}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          exam.status === 'active' ? 'bg-green-500' :
                          exam.status === 'upcoming' ? 'bg-blue-500' :
                          exam.status === 'completed' ? 'bg-purple-500' : 'bg-gray-500'
                        }`}></span>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-24 h-2 rounded-full overflow-hidden ${
                          isDark ? 'bg-dark-700' : 'bg-gray-200'
                        }`}>
                          <div 
                            className={`h-full ${getProgressColor(exam.progress)} transition-all duration-500`}
                            style={{ width: `${exam.progress}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {exam.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDark ? 'bg-dark-700' : 'bg-gray-100'
                        }`}>
                          👥
                        </div>
                        <span className={`font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {exam.participants}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {formatDate(exam.date)}
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
                          onClick={() => console.log(`View ${exam.title}`)}
                          title="View Exam"
                        >
                          👁️
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'hover:bg-dark-700 text-gray-400 hover:text-gray-300'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`}
                          onClick={() => console.log(`Edit ${exam.title}`)}
                          title="Edit Exam"
                        >
                          ✏️
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'hover:bg-dark-700 text-red-400 hover:text-red-300'
                              : 'hover:bg-gray-100 text-red-600 hover:text-red-700'
                          }`}
                          onClick={() => console.log(`Delete ${exam.title}`)}
                          title="Delete Exam"
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
              Showing <span className="font-semibold">{exams.length}</span> exams
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
        {exams.length === 0 && (
          <div className={`text-center py-16 rounded-2xl mt-6 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="text-6xl mb-4">📝</div>
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              No exams found
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Create your first exam to get started
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className={`mb-6 text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Need help with exam management? Check out our documentation
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

export default ExamTable;