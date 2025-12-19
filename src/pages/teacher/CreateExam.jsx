import React from 'react';
import CreateExamForm from '../../component/teacher/CreateExamForm';
import { useTheme } from '../../context/ThemeContext';

const CreateExam = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-6">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>Exam Creation</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Create
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              New Assessment
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Design and configure comprehensive assessments with multiple question types and settings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Exams Created', value: '156', change: '+12%', icon: '📊', color: 'blue' },
            { label: 'Average Duration', value: '45min', change: '-5%', icon: '⏱️', color: 'green' },
            { label: 'Success Rate', value: '92%', change: '+3%', icon: '📈', color: 'purple' },
            { label: 'Active Questions', value: '1,248', change: '+15%', icon: '❓', color: 'yellow' }
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
                  <div className={`mt-2 text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
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
              <div className={`mt-4 text-xs px-3 py-1.5 rounded-full inline-block ${
                stat.change.includes('+')
                  ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                  : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
              }`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className={`mb-8 p-6 rounded-2xl ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-dark-700' : 'bg-gray-100'
            }`}>
              💡
            </div>
            <h3 className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Tips for Effective Exams
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${
              isDark ? 'bg-dark-700/30' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Time Management
                </span>
              </div>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Allocate appropriate time based on question complexity and difficulty.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${
              isDark ? 'bg-dark-700/30' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Question Variety
                </span>
              </div>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Mix question types to assess different skills and knowledge levels.
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Content */}
        <div className={`rounded-2xl overflow-hidden ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-xl`}>
          <CreateExamForm />
        </div>

        {/* Help Section */}
        <div className={`mt-8 p-6 rounded-2xl ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-dark-700' : 'bg-gray-100'
              }`}>
                ❓
              </div>
              <div>
                <h3 className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Need Help?
                </h3>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Get support with exam creation and best practices
                </p>
              </div>
            </div>
            <button className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
            }`}>
              View Documentation
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: 'Exam Templates', 
                description: 'Use pre-built templates for common exam types',
                icon: '📋',
                link: '/templates'
              },
              { 
                title: 'Best Practices', 
                description: 'Guidelines for effective assessment design',
                icon: '⭐',
                link: '/best-practices'
              },
              { 
                title: 'Video Tutorials', 
                description: 'Step-by-step video guides for exam creation',
                icon: '🎥',
                link: '/tutorials'
              }
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'hover:bg-dark-700/50 border border-dark-700'
                    : 'hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className={`text-2xl p-3 rounded-xl ${
                  isDark ? 'bg-dark-700 group-hover:bg-dark-600' : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-medium mb-1 ${
                    isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {item.title}
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-500 group-hover:text-gray-400' : 'text-gray-600 group-hover:text-gray-700'
                  }`}>
                    {item.description}
                  </div>
                </div>
                <div className={`text-lg transition-transform duration-300 group-hover:translate-x-1 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  →
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;