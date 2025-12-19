import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ExamCard from '../../component/student/ExamCard';
import ThemeCard from '../../component/common/ThemeCard';
import ThemeButton from '../../component/common/ThemeButton';

const StudentExams = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  
  const exams = [
    {
      id: 1,
      title: 'Data Structures Final',
      course: 'CS201 - Computer Science',
      date: 'Dec 20, 2024',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      type: 'coding',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Web Development Quiz',
      course: 'WD101 - Web Technologies',
      date: 'Dec 18, 2024',
      time: '2:00 PM - 3:00 PM',
      duration: '1 hour',
      type: 'mcq',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Database Systems Midterm',
      course: 'DB301 - Database Management',
      date: 'Dec 22, 2024',
      time: '9:00 AM - 11:00 AM',
      duration: '2 hours',
      type: 'mixed',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Python Programming',
      course: 'PY101 - Python Basics',
      date: 'Dec 10, 2024',
      time: 'Completed',
      duration: '1.5 hours',
      type: 'coding',
      status: 'completed',
      score: 92
    },
    {
      id: 5,
      title: 'Algorithms Quiz',
      course: 'CS202 - Algorithms',
      date: 'Dec 5, 2024',
      time: 'Completed',
      duration: '45 mins',
      type: 'mcq',
      status: 'completed',
      score: 85
    }
  ];

  const filteredExams = filter === 'all' 
    ? exams 
    : exams.filter(exam => exam.status === filter);

  // Handle start exam
  const handleStartExam = (examId) => {
    navigate(`/student/take-exam/${examId}`);
  };

  // Handle view results
  const handleViewResults = (examId) => {
    navigate(`/student/results/${examId}`);
  };

  // Handle calendar day click
  const handleDayClick = (day) => {
    const examsOnDay = exams.filter(exam => {
      const examDate = parseInt(exam.date.split(' ')[1]);
      return examDate === day;
    });
    
    if (examsOnDay.length > 0) {
      alert(`Exams on Dec ${day}: ${examsOnDay.map(e => e.title).join(', ')}`);
    }
  };

  // Handle create practice exam
  const handlePracticeExam = () => {
    navigate('/student/take-exam/practice');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'} p-4 md:p-6`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My Exams
        </h1>
        <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Track and manage all your examinations
        </p>
      </div>

      {/* Stats & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <ThemeCard className="text-center cursor-pointer hover:scale-[1.02] transition-transform">
          <div className={`text-2xl font-bold ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
            {exams.filter(e => e.status === 'upcoming').length}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Upcoming</div>
        </ThemeCard>
        
        <ThemeCard className="text-center cursor-pointer hover:scale-[1.02] transition-transform">
          <div className="text-2xl font-bold text-green-500">85%</div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</div>
        </ThemeCard>
        
        <ThemeCard className="text-center cursor-pointer hover:scale-[1.02] transition-transform">
          <div className={`text-2xl font-bold ${isDark ? 'text-secondary-400' : 'text-secondary-600'}`}>
            {exams.length}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Exams</div>
        </ThemeCard>
        
        <div 
          onClick={handlePracticeExam}
          className={`p-4 rounded-xl text-center cursor-pointer hover:scale-[1.02] transition-all ${
            isDark 
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg' 
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg'
          }`}
        >
          <div className="text-2xl font-bold">📝</div>
          <div className="text-sm font-medium">Practice Exam</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={`rounded-xl p-4 mb-6 ${
        isDark ? 'bg-dark-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex flex-wrap gap-2">
          {['all', 'upcoming', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                filter === tab
                  ? isDark
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-600 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-dark-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab === 'all' ? 'All Exams' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4 mb-8">
        {filteredExams.map((exam) => (
          <div 
            key={exam.id}
            className={`p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01] ${
              isDark 
                ? 'bg-dark-800 hover:bg-dark-700' 
                : 'bg-white hover:bg-gray-50'
            } shadow-lg`}
            onClick={() => exam.status === 'upcoming' ? handleStartExam(exam.id) : handleViewResults(exam.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    exam.type === 'coding' ? 'bg-blue-500/20 text-blue-500' :
                    exam.type === 'mcq' ? 'bg-green-500/20 text-green-500' :
                    'bg-purple-500/20 text-purple-500'
                  }`}>
                    {exam.type === 'coding' ? '💻' : exam.type === 'mcq' ? '📝' : '🔀'}
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {exam.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {exam.course} • {exam.date} • {exam.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    exam.status === 'upcoming'
                      ? isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                      : isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                  }`}>
                    {exam.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    ⏱️ {exam.duration}
                  </span>
                  {exam.score && (
                    <span className={`text-sm font-medium ${
                      exam.score >= 90 ? 'text-green-500' :
                      exam.score >= 80 ? 'text-blue-500' :
                      exam.score >= 70 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      Score: {exam.score}%
                    </span>
                  )}
                </div>
              </div>
              
              <div className={`ml-4 px-4 py-2 rounded-lg text-center ${
                exam.status === 'upcoming'
                  ? isDark ? 'bg-primary-600 text-white' : 'bg-primary-600 text-white'
                  : isDark ? 'bg-dark-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {exam.status === 'upcoming' ? 'Start' : 'View Results'}
                <div className="text-xs mt-1">Click →</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Exams Message */}
      {filteredExams.length === 0 && (
        <div className={`text-center py-12 rounded-xl ${
          isDark ? 'bg-dark-800' : 'bg-white'
        } shadow-lg`}>
          <div className="text-6xl mb-4">📚</div>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No exams found
          </h3>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Try changing your filters or check back later.
          </p>
          <ThemeButton onClick={() => setFilter('all')}>
            Show All Exams
          </ThemeButton>
        </div>
      )}

      {/* Calendar */}
      <div className={`rounded-xl p-6 ${
        isDark ? 'bg-dark-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Exam Calendar - December 2024
          </h2>
          <button 
            onClick={() => navigate('/student/calendar')}
            className={`text-sm font-medium ${
              isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            View Full Calendar →
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div 
              key={day} 
              className={`font-medium py-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {day}
            </div>
          ))}
          
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const hasExam = [18, 20, 22].includes(day);
            return (
              <div 
                key={day}
                onClick={() => hasExam && handleDayClick(day)}
                className={`py-2 rounded-lg cursor-pointer transition-colors ${
                  hasExam
                    ? isDark
                      ? 'bg-primary-900/50 text-primary-300 hover:bg-primary-800/70'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    : isDark
                      ? 'hover:bg-dark-700'
                      : 'hover:bg-gray-100'
                } ${day === new Date().getDate() ? 'ring-2 ring-primary-500' : ''}`}
              >
                <div className="font-medium">{day}</div>
                {hasExam && (
                  <div className="text-xs mt-1">📝</div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex items-center text-sm">
          <div className="flex items-center mr-4">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              isDark ? 'bg-primary-500' : 'bg-primary-500'
            }`}></div>
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Exam Day</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 ring-2 ring-primary-500 rounded-full mr-2"></div>
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Today</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={handlePracticeExam}
          className={`p-4 rounded-xl text-center cursor-pointer hover:scale-[1.02] transition-all ${
            isDark 
              ? 'bg-dark-800 hover:bg-dark-700' 
              : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="text-2xl mb-2">📝</div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Take Practice Test
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Test your knowledge
          </p>
        </div>
        
        <div 
          onClick={() => navigate('/student/results')}
          className={`p-4 rounded-xl text-center cursor-pointer hover:scale-[1.02] transition-all ${
            isDark 
              ? 'bg-dark-800 hover:bg-dark-700' 
              : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="text-2xl mb-2">📊</div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            View All Results
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            See complete history
          </p>
        </div>
        
        <div 
          onClick={() => navigate('/student/calendar')}
          className={`p-4 rounded-xl text-center cursor-pointer hover:scale-[1.02] transition-all ${
            isDark 
              ? 'bg-dark-800 hover:bg-dark-700' 
              : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="text-2xl mb-2">📅</div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Full Calendar
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            View all events
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentExams;