import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const StudentResults = () => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  const results = [
    {
      id: 1,
      student: 'John Doe',
      exam: 'Data Structures Final',
      score: 92,
      maxScore: 100,
      percentage: 92,
      status: 'passed',
      submitted: '2024-12-20 11:45 AM',
      timeSpent: '1h 45m',
      rank: 1
    },
    {
      id: 2,
      student: 'Jane Smith',
      exam: 'Data Structures Final',
      score: 85,
      maxScore: 100,
      percentage: 85,
      status: 'passed',
      submitted: '2024-12-20 11:30 AM',
      timeSpent: '1h 30m',
      rank: 2
    },
    {
      id: 3,
      student: 'Bob Johnson',
      exam: 'Data Structures Final',
      score: 42,
      maxScore: 100,
      percentage: 42,
      status: 'failed',
      submitted: '2024-12-20 10:45 AM',
      timeSpent: '1h 15m',
      rank: 15
    },
    {
      id: 4,
      student: 'Alice Brown',
      exam: 'Web Development Quiz',
      score: 48,
      maxScore: 50,
      percentage: 96,
      status: 'passed',
      submitted: '2024-12-18 2:30 PM',
      timeSpent: '45m',
      rank: 1
    },
    {
      id: 5,
      student: 'Charlie Wilson',
      exam: 'Web Development Quiz',
      score: 35,
      maxScore: 50,
      percentage: 70,
      status: 'passed',
      submitted: '2024-12-18 2:45 PM',
      timeSpent: '50m',
      rank: 8
    }
  ];

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    return result.status === filter;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'name') return a.student.localeCompare(b.student);
    if (sortBy === 'time') return a.timeSpent.localeCompare(b.timeSpent);
    return 0;
  });

  const getStatusColor = (status) => {
    if (status === 'passed') return isDark ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-green-100 text-green-700';
    return isDark ? 'bg-red-900/30 text-red-400 border border-red-800' : 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-8">
      {/* Controls & Stats Block */}
      <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          
          {/* Filter Buttons */}
          <div className={`flex p-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {['all', 'passed', 'failed'].map((item) => (
               <button
               key={item}
               onClick={() => setFilter(item)}
               className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                 filter === item 
                   ? 'bg-white text-indigo-600 shadow-sm dark:bg-gray-600 dark:text-white' 
                   : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
               }`}
             >
               {item} Results
             </button>
            ))}
          </div>

          {/* Sort & Export */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
              <option value="time">Sort by Time</option>
            </select>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium shadow-lg shadow-indigo-500/30">
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: results.length, color: 'blue' },
            { label: 'Passed', value: results.filter(r => r.status === 'passed').length, color: 'green' },
            { label: 'Failed', value: results.filter(r => r.status === 'failed').length, color: 'red' },
            { label: 'Avg. Score', value: `${Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)}%`, color: 'purple' },
          ].map((stat, idx) => (
            <div key={idx} className={`p-4 rounded-xl text-center border transition-all ${
              isDark 
                ? 'bg-gray-700/50 border-gray-600' 
                : `bg-${stat.color}-50 border-${stat.color}-100`
            }`}>
              <div className={`text-2xl font-bold text-${stat.color}-500`}>{stat.value}</div>
              <div className={`text-xs font-medium uppercase tracking-wider mt-1 ${isDark ? 'text-gray-400' : `text-${stat.color}-700`}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Table */}
      <div className={`rounded-xl shadow-lg overflow-hidden border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDark ? 'bg-gray-900/50' : 'bg-gray-50'}>
              <tr>
                {['Rank', 'Student', 'Exam', 'Score', 'Percentage', 'Status', 'Time Spent', 'Actions'].map((header) => (
                  <th key={header} className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {sortedResults.map((result) => (
                <tr key={result.id} className={`transition-colors ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      result.rank <= 3 
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' 
                        : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {result.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md mr-3">
                        {result.student.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.student}</div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{result.submitted}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {result.exam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {result.score} <span className="text-gray-400 font-normal text-xs">/ {result.maxScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-20 rounded-full h-1.5 mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-1.5 rounded-full ${
                            result.percentage >= 70 ? 'bg-green-500' : 
                            result.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${result.percentage}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{result.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {result.timeSpent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-500 hover:text-indigo-400 mr-4 transition-colors">Details</button>
                    <button className="text-gray-400 hover:text-gray-300 transition-colors">⇩</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing <span className="font-medium">{sortedResults.length}</span> of {results.length} results
          </span>
          <div className="flex gap-2">
            <button className={`px-3 py-1 text-sm border rounded hover:bg-opacity-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>Previous</button>
            <button className={`px-3 py-1 text-sm border rounded hover:bg-opacity-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>Next</button>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Performance Distribution</h3>
        <div className="h-48 flex items-end space-x-2 pt-4">
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((range) => {
            const count = results.filter(r => 
              r.percentage >= range && r.percentage < range + 10
            ).length;
            const maxCount = 5; // simplified max for visual scaling
            
            return (
              <div key={range} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex justify-center items-end h-32">
                  <div 
                    className={`w-full mx-1 rounded-t-md transition-all duration-300 group-hover:opacity-80 ${
                      range < 40 ? 'bg-red-500' : 
                      range < 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ height: `${(count / maxCount) * 100}%`, minHeight: '4px' }}
                  ></div>
                  {count > 0 && (
                    <div className={`absolute -top-6 text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {count}
                    </div>
                  )}
                </div>
                <div className={`text-[10px] mt-2 font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {range}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentResults;