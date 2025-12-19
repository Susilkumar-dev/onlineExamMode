import React from 'react';
import { Link } from 'react-router-dom';
import ThemeCard from '../../component/common/ThemeCard';
import ThemeButton from '../../component/common/ThemeButton';
import { useTheme } from '../../context/ThemeContext';

const TeacherDashboard = () => {
  const { isDark } = useTheme();
  
  const upcomingExams = [
    { id: 1, title: 'Midterm Exam - Data Structures', date: 'Tomorrow, 10:00 AM', students: 45 },
    { id: 2, title: 'Programming Quiz', date: 'Dec 20, 2:00 PM', students: 60 },
    { id: 3, title: 'Final Assessment', date: 'Dec 25, 9:00 AM', students: 50 }
  ];

  const recentResults = [
    { student: 'John Doe', exam: 'Python Basics', score: '95%', status: 'Graded' },
    { student: 'Jane Smith', exam: 'Web Development', score: '88%', status: 'Graded' },
    { student: 'Bob Johnson', exam: 'Database Systems', score: 'Pending', status: 'In Review' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>Teacher Dashboard</h1>
        <p className={`mt-2 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>Manage your courses, exams, and student performance.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ThemeCard>
          <div className={`text-2xl font-bold ${
            isDark ? 'text-primary-400' : 'text-primary-600'
          }`}>12</div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Active Exams</div>
        </ThemeCard>
        <ThemeCard>
          <div className={`text-2xl font-bold ${
            isDark ? 'text-secondary-400' : 'text-secondary-600'
          }`}>240</div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total Students</div>
        </ThemeCard>
        <ThemeCard>
          <div className="text-2xl font-bold text-green-500">85%</div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Avg. Success Rate</div>
        </ThemeCard>
        <ThemeCard>
          <div className="text-2xl font-bold text-yellow-500">3</div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Pending Reviews</div>
        </ThemeCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Exams */}
        <ThemeCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>Upcoming Exams</h2>
            <Link to="/teacher/create-exam">
              <ThemeButton size="small">Create New</ThemeButton>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className={`p-4 rounded-lg ${
                isDark 
                  ? 'bg-dark-700/50 hover:bg-dark-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition duration-300`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>{exam.title}</h3>
                    <p className={`text-sm mt-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>{exam.date}</p>
                  </div>
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>{exam.students} students</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className={`text-sm font-medium ${
                    isDark 
                      ? 'text-primary-400 hover:text-primary-300' 
                      : 'text-primary-600 hover:text-primary-700'
                  }`}>
                    Edit
                  </button>
                  <button className={`text-sm font-medium ${
                    isDark 
                      ? 'text-green-400 hover:text-green-300' 
                      : 'text-green-600 hover:text-green-700'
                  }`}>
                    Preview
                  </button>
                  <button className={`text-sm font-medium ${
                    isDark 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}>
                    Monitor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ThemeCard>

        {/* Recent Results */}
        <ThemeCard>
          <h2 className={`text-xl font-bold mb-6 ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}>Recent Results</h2>
          <div className="space-y-4">
            {recentResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className={`font-medium ${
                    isDark ? 'text-gray-100' : 'text-gray-900'
                  }`}>{result.student}</h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>{result.exam}</p>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    result.score === 'Pending' 
                      ? 'text-yellow-500' 
                      : 'text-green-500'
                  }`}>
                    {result.score}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    result.status === 'Graded' 
                      ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800')
                      : (isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800')
                  }`}>
                    {result.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className={`w-full mt-6 text-center font-medium py-2 ${
            isDark 
              ? 'text-primary-400 hover:text-primary-300' 
              : 'text-primary-600 hover:text-primary-700'
          }`}>
            View All Results →
          </button>
        </ThemeCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/teacher/create-exam" className="block">
          <ThemeCard hover>
            <div className="text-center">
              <div className="text-3xl mb-3">📝</div>
              <div className={`font-medium ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>Create Exam</div>
              <div className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Design new assessment</div>
            </div>
          </ThemeCard>
        </Link>
        <Link to="/teacher/question-bank" className="block">
          <ThemeCard hover>
            <div className="text-center">
              <div className="text-3xl mb-3">📚</div>
              <div className={`font-medium ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>Question Bank</div>
              <div className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Manage questions</div>
            </div>
          </ThemeCard>
        </Link>
        <Link to="/teacher/live-monitor" className="block">
          <ThemeCard hover>
            <div className="text-center">
              <div className="text-3xl mb-3">👁️</div>
              <div className={`font-medium ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>Live Monitor</div>
              <div className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Active exams</div>
            </div>
          </ThemeCard>
        </Link>
        <Link to="/teacher/results" className="block">
          <ThemeCard hover>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <div className={`font-medium ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>Results</div>
              <div className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>View & grade</div>
            </div>
          </ThemeCard>
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;