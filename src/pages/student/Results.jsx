import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeCard from '../../component/common/ThemeCard';
import ThemeButton from '../../component/common/ThemeButton';

const StudentResults = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const results = [
    {
      id: 1,
      examTitle: 'Data Structures Final',
      course: 'CS201 - Computer Science',
      date: 'Dec 20, 2024',
      score: 92,
      total: 100,
      percentage: 92,
      status: 'passed',
      rank: 1,
      timeSpent: '1h 45m'
    },
    {
      id: 2,
      examTitle: 'Web Development Quiz',
      course: 'WD101 - Web Technologies',
      date: 'Dec 18, 2024',
      score: 48,
      total: 50,
      percentage: 96,
      status: 'passed',
      rank: 3,
      timeSpent: '45m'
    },
    {
      id: 3,
      examTitle: 'Database Midterm',
      course: 'DB301 - Database Management',
      date: 'Dec 10, 2024',
      score: 78,
      total: 100,
      percentage: 78,
      status: 'passed',
      rank: 12,
      timeSpent: '1h 30m'
    }
  ];

  // Filter and sort results
  const filteredResults = filter === 'all' 
    ? results 
    : results.filter(result => result.status === filter);

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'score') return b.percentage - a.percentage;
    if (sortBy === 'course') return a.course.localeCompare(b.course);
    return 0;
  });

  // Calculate stats
  const averageScore = results.length > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)
    : 0;

  const passedExams = results.filter(r => r.status === 'passed').length;
  const avgRank = Math.round(results.reduce((acc, r) => acc + r.rank, 0) / results.length);

  // Handle view details
  const handleViewDetails = (resultId) => {
    navigate(`/student/results/${resultId}`);
  };

  // Handle retake exam
  const handleRetakeExam = (resultId) => {
    navigate(`/student/take-exam/${resultId}`);
  };

  // Handle download certificate
  const handleDownloadCertificate = (result) => {
    alert(`Downloading certificate for ${result.examTitle}`);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'} p-4 md:p-6`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Exam Results
        </h1>
        <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          View your performance and track progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ThemeCard className="text-center">
          <div className={`text-2xl font-bold ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
            {averageScore}%
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</div>
        </ThemeCard>
        
        <ThemeCard className="text-center">
          <div className="text-2xl font-bold text-green-500">{passedExams}</div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Passed</div>
        </ThemeCard>
        
        <ThemeCard className="text-center">
          <div className={`text-2xl font-bold ${isDark ? 'text-secondary-400' : 'text-secondary-600'}`}>
            #{avgRank}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Rank</div>
        </ThemeCard>
        
        <ThemeCard className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{results.length}</div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Exams</div>
        </ThemeCard>
      </div>

      {/* Filters and Sort */}
      <div className={`rounded-xl p-4 mb-6 ${
        isDark ? 'bg-dark-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'passed', 'failed'].map((tab) => (
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
                {tab === 'all' ? 'All Results' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm ${
                isDark 
                  ? 'bg-dark-700 text-white border-dark-600' 
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              } border`}
            >
              <option value="date">Date (Newest)</option>
              <option value="score">Score (Highest)</option>
              <option value="course">Course</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4 mb-8">
        {sortedResults.map((result) => (
          <div 
            key={result.id}
            className={`p-4 rounded-xl transition-all hover:scale-[1.01] ${
              isDark 
                ? 'bg-dark-800 hover:bg-dark-700' 
                : 'bg-white hover:bg-gray-50'
            } shadow-lg`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* Exam Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    result.percentage >= 90 ? 'bg-green-500/20 text-green-500' :
                    result.percentage >= 80 ? 'bg-blue-500/20 text-blue-500' :
                    result.percentage >= 70 ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {result.percentage}%
                  </div>
                  
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {result.examTitle}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {result.course} • {result.date} • {result.timeSpent}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        result.status === 'passed'
                          ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                          : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                      }`}>
                        {result.status === 'passed' ? 'Passed' : 'Failed'}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Rank: #{result.rank}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Score: {result.score}/{result.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleViewDetails(result.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  View Details
                </button>
                
                {result.status === 'passed' && (
                  <button
                    onClick={() => handleDownloadCertificate(result)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                  >
                    Certificate
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Performance
                </span>
                <span className={`text-sm font-medium ${
                  result.percentage >= 90 ? 'text-green-500' :
                  result.percentage >= 80 ? 'text-blue-500' :
                  result.percentage >= 70 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {result.percentage}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${
                isDark ? 'bg-dark-600' : 'bg-gray-200'
              }`}>
                <div 
                  className={`h-2 rounded-full ${
                    result.percentage >= 90 ? 'bg-green-500' :
                    result.percentage >= 80 ? 'bg-blue-500' :
                    result.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {sortedResults.length === 0 && (
        <div className={`text-center py-12 rounded-xl ${
          isDark ? 'bg-dark-800' : 'bg-white'
        } shadow-lg`}>
          <div className="text-6xl mb-4">📊</div>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No results found
          </h3>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {filter === 'failed' ? 'You have no failed exams!' : 'Take an exam to see results here.'}
          </p>
          <div className="flex gap-3 justify-center">
            <ThemeButton onClick={() => setFilter('all')}>
              Show All Results
            </ThemeButton>
            <button
              onClick={() => navigate('/student/exams')}
              className={`px-6 py-2 rounded-lg font-medium ${
                isDark 
                  ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Browse Exams
            </button>
          </div>
        </div>
      )}

      {/* Performance Summary */}
      <div className={`rounded-xl p-6 ${
        isDark ? 'bg-dark-800' : 'bg-white'
      } shadow-lg`}>
        <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Performance Summary
        </h3>
        
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="flex items-center justify-between">
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {result.examTitle}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {result.date} • Rank #{result.rank}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  result.percentage >= 90 ? 'text-green-500' :
                  result.percentage >= 80 ? 'text-blue-500' :
                  result.percentage >= 70 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {result.percentage}%
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {result.score}/{result.total}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-lg text-center ${
            isDark ? 'bg-dark-700' : 'bg-gray-50'
          }`}>
            <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Best Score
            </div>
            <div className="text-lg font-bold text-green-500">
              {Math.max(...results.map(r => r.percentage))}%
            </div>
          </div>
          <div className={`p-3 rounded-lg text-center ${
            isDark ? 'bg-dark-700' : 'bg-gray-50'
          }`}>
            <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Avg Time
            </div>
            <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              1h 20m
            </div>
          </div>
          <div className={`p-3 rounded-lg text-center ${
            isDark ? 'bg-dark-700' : 'bg-gray-50'
          }`}>
            <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Top Rank
            </div>
            <div className="text-lg font-bold text-yellow-500">
              #{Math.min(...results.map(r => r.rank))}
            </div>
          </div>
          <div className={`p-3 rounded-lg text-center ${
            isDark ? 'bg-dark-700' : 'bg-gray-50'
          }`}>
            <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Consistency
            </div>
            <div className="text-lg font-bold text-blue-500">
              85%
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => navigate('/student/exams')}
          className={`p-4 rounded-xl text-center cursor-pointer hover:scale-[1.02] transition-all ${
            isDark 
              ? 'bg-dark-800 hover:bg-dark-700' 
              : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="text-2xl mb-2">📝</div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Take New Exam
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Challenge yourself
          </p>
        </div>
        
        <div 
          onClick={() => navigate('/student/analytics')}
          className={`p-4 rounded-xl text-center cursor-pointer hover:scale-[1.02] transition-all ${
            isDark 
              ? 'bg-dark-800 hover:bg-dark-700' 
              : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="text-2xl mb-2">📊</div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Detailed Analytics
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            View detailed insights
          </p>
        </div>
        
        <div 
          onClick={() => navigate('/student/leaderboard')}
          className={`p-4 rounded-xl text-center cursor-pointer hover:scale-[1.02] transition-all ${
            isDark 
              ? 'bg-dark-800 hover:bg-dark-700' 
              : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="text-2xl mb-2">🏆</div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            View Leaderboard
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Compare with peers
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;