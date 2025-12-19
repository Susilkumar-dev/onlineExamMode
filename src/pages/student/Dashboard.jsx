import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeCard from '../../component/common/ThemeCard';
import ThemeButton from '../../component/common/ThemeButton';

const StudentDashboard = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('dashboard'); // dashboard, calendar, analytics

  // Mock Data
  const stats = {
    upcomingExams: 3,
    gpa: 3.8,
    enrolledCourses: 5,
    studyHours: 15,
    completedExams: 12,
    avgScore: 85
  };

  const upcomingExams = [
    {
      id: 1,
      title: 'Data Structures Final',
      course: 'CS201',
      date: 'Dec 20, 2024',
      time: '10:00 AM',
      duration: '2h',
      type: 'coding'
    },
    {
      id: 2,
      title: 'Web Development Quiz',
      course: 'WD101',
      date: 'Dec 18, 2024',
      time: '2:00 PM',
      duration: '1h',
      type: 'mcq'
    }
  ];

  const recentResults = [
    {
      id: 1,
      exam: 'Python Programming',
      score: 92,
      total: 100,
      date: 'Dec 10, 2024'
    },
    {
      id: 2,
      exam: 'Database Systems',
      score: 85,
      total: 100,
      date: 'Dec 5, 2024'
    }
  ];

  const calendarDays = [
    { date: 18, event: 'Web Dev Quiz', type: 'exam' },
    { date: 20, event: 'Data Structures', type: 'exam' },
    { date: 22, event: 'Algorithms', type: 'exam' },
    { date: 24, event: 'Project Due', type: 'assignment' },
    { date: 28, event: 'Networks', type: 'exam' }
  ];

  const analyticsData = [
    { subject: 'Programming', score: 95 },
    { subject: 'Algorithms', score: 88 },
    { subject: 'Database', score: 82 },
    { subject: 'Networks', score: 90 },
    { subject: 'Mathematics', score: 85 }
  ];

  // Handle calendar navigation
  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  // Handle exam click
  const handleExamClick = (examId) => {
    navigate(`/student/take-exam/${examId}`);
  };

  // Handle view results
  const handleViewResults = () => {
    navigate('/student/results');
  };

  // Handle calendar view
  const handleCalendarView = () => {
    setView('calendar');
  };

  // Handle analytics view
  const handleAnalyticsView = () => {
    setView('analytics');
  };

  // Handle dashboard view
  const handleDashboardView = () => {
    setView('dashboard');
  };

  // Format month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'} p-4 md:p-6 transition-colors duration-300`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Student Dashboard
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Welcome back! Ready for your next challenge?
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={handleDashboardView}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${view === 'dashboard' 
                ? isDark ? 'bg-primary-600 text-white' : 'bg-primary-600 text-white'
                : isDark ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={handleCalendarView}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${view === 'calendar' 
                ? isDark ? 'bg-primary-600 text-white' : 'bg-primary-600 text-white'
                : isDark ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={handleAnalyticsView}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${view === 'analytics' 
                ? isDark ? 'bg-primary-600 text-white' : 'bg-primary-600 text-white'
                : isDark ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard View */}
      {view === 'dashboard' && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <ThemeCard className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                {stats.upcomingExams}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Upcoming Exams</div>
            </ThemeCard>
            
            <ThemeCard className="text-center">
              <div className="text-2xl font-bold text-green-500">{stats.gpa}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>GPA</div>
            </ThemeCard>
            
            <ThemeCard className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-secondary-400' : 'text-secondary-600'}`}>
                {stats.enrolledCourses}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Courses</div>
            </ThemeCard>
            
            <ThemeCard className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{stats.studyHours}h</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Study Hours</div>
            </ThemeCard>
            
            <ThemeCard className="text-center">
              <div className="text-2xl font-bold text-blue-500">{stats.completedExams}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Exams Done</div>
            </ThemeCard>
            
            <ThemeCard className="text-center">
              <div className="text-2xl font-bold text-purple-500">{stats.avgScore}%</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</div>
            </ThemeCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Upcoming Exams */}
            <ThemeCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Upcoming Exams
                </h2>
                <Link 
                  to="/student/exams" 
                  className={`font-medium ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div 
                    key={exam.id} 
                    className={`p-4 rounded-lg cursor-pointer transition duration-300 ${isDark ? 'bg-dark-700 hover:bg-dark-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                    onClick={() => handleExamClick(exam.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {exam.title}
                        </h3>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {exam.course} • {exam.date} • {exam.time}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-800'}`}>
                        {exam.type}
                      </div>
                    </div>
                    <div className="flex items-center mt-3 text-sm">
                      <span className={`mr-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ⏱️ {exam.duration}
                      </span>
                      <span className={`${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                        Click to start →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ThemeCard>

            {/* Recent Results */}
            <ThemeCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Results
                </h2>
                <button 
                  onClick={handleViewResults}
                  className={`font-medium ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <div 
                    key={result.id} 
                    className={`p-4 rounded-lg ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {result.exam}
                        </h3>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {result.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-500">
                          {result.score}%
                        </div>
                        <div className="text-sm text-green-500">
                          {result.score}/{result.total}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className={`w-full rounded-full h-2 ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${result.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ThemeCard>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleCalendarView}
              className={`p-4 rounded-xl text-left transition duration-300 ${isDark ? 'bg-dark-800 hover:bg-dark-700' : 'bg-white hover:bg-gray-50'} shadow-lg`}
            >
              <div className="text-2xl mb-2">📅</div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>View Calendar</h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>See all upcoming events</p>
            </button>
            
            <button
              onClick={handleAnalyticsView}
              className={`p-4 rounded-xl text-left transition duration-300 ${isDark ? 'bg-dark-800 hover:bg-dark-700' : 'bg-white hover:bg-gray-50'} shadow-lg`}
            >
              <div className="text-2xl mb-2">📊</div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Performance Analytics</h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>View detailed insights</p>
            </button>
            
            <Link to="/student/take-exam/1">
              <div className={`p-4 rounded-xl text-left transition duration-300 ${isDark ? 'bg-dark-800 hover:bg-dark-700' : 'bg-white hover:bg-gray-50'} shadow-lg`}>
                <div className="text-2xl mb-2">📝</div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Practice Test</h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Take a practice exam</p>
              </div>
            </Link>
          </div>
        </>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <ThemeCard>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handlePrevMonth}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}
              >
                ← Previous
              </button>
              
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getMonthName(selectedDate)}
              </h2>
              
              <button
                onClick={handleNextMonth}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}
              >
                Next →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className={`text-center font-medium py-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                const event = calendarDays.find(e => e.date === day);
                return (
                  <div 
                    key={day}
                    className={`min-h-20 p-2 rounded-lg ${event 
                      ? event.type === 'exam' 
                        ? isDark ? 'bg-red-900/30 border border-red-700/50' : 'bg-red-50 border border-red-200'
                        : isDark ? 'bg-blue-900/30 border border-blue-700/50' : 'bg-blue-50 border border-blue-200'
                      : isDark ? 'bg-dark-700' : 'bg-gray-50'
                    } ${day === new Date().getDate() ? 'ring-2 ring-primary-500' : ''}`}
                  >
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {day}
                    </div>
                    {event && (
                      <div className={`text-xs mt-1 p-1 rounded ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        {event.event}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Exam</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Assignment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 ring-2 ring-primary-500 rounded-full mr-2"></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Today</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <ThemeButton onClick={handleDashboardView}>
                Back to Dashboard
              </ThemeButton>
            </div>
          </div>
        </ThemeCard>
      )}

      {/* Analytics View */}
      {view === 'analytics' && (
        <ThemeCard>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Performance Analytics
              </h2>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Overall Score: {stats.avgScore}%
              </div>
            </div>

            <div className="space-y-6">
              {analyticsData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.subject}
                    </span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.score}%
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-3 rounded-full ${
                        item.score >= 90 ? 'bg-green-500' :
                        item.score >= 80 ? 'bg-blue-500' :
                        item.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.gpa}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>GPA</div>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.avgScore}%
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Average Score</div>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.studyHours}h
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Study Hours</div>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.completedExams}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Exams Completed</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <ThemeButton onClick={handleDashboardView}>
                Back to Dashboard
              </ThemeButton>
            </div>
          </div>
        </ThemeCard>
      )}
    </div>
  );
};

export default StudentDashboard;