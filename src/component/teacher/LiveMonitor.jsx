import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const LiveMonitor = () => {
  const { isDark } = useTheme();

  const [activeExam] = useState({
    id: 1,
    title: 'Data Structures Final',
    totalStudents: 145,
    startedAt: '10:00 AM',
    duration: '2 hours'
  });

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', status: 'active', progress: 75, flagged: false, lastActive: '2 min ago' },
    { id: 2, name: 'Jane Smith', status: 'active', progress: 42, flagged: true, lastActive: '1 min ago' },
    { id: 3, name: 'Bob Johnson', status: 'inactive', progress: 15, flagged: false, lastActive: '5 min ago' },
    { id: 4, name: 'Alice Brown', status: 'active', progress: 90, flagged: false, lastActive: '30 sec ago' },
    { id: 5, name: 'Charlie Wilson', status: 'submitted', progress: 100, flagged: false, lastActive: 'Submitted' }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': 
        return isDark ? 'text-green-400 bg-green-900/30 border-green-800' : 'text-green-700 bg-green-100 border-green-200';
      case 'inactive': 
        return isDark ? 'text-yellow-400 bg-yellow-900/30 border-yellow-800' : 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'submitted': 
        return isDark ? 'text-blue-400 bg-blue-900/30 border-blue-800' : 'text-blue-700 bg-blue-100 border-blue-200';
      default: 
        return isDark ? 'text-gray-400 bg-gray-700' : 'text-gray-600 bg-gray-100';
    }
  };

  const handleFlagToggle = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, flagged: !student.flagged } : student
    ));
  };

  const handleSendMessage = (studentId) => {
    const message = prompt('Enter message to send:');
    if (message) {
      alert(`Message sent to student ${studentId}: ${message}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Exam Overview Hero Card */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{activeExam.title}</h2>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col">
                <span className="text-indigo-100 text-xs uppercase tracking-wider font-semibold">Started At</span>
                <span className="font-medium text-lg">{activeExam.startedAt}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-indigo-100 text-xs uppercase tracking-wider font-semibold">Duration</span>
                <span className="font-medium text-lg">{activeExam.duration}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-indigo-100 text-xs uppercase tracking-wider font-semibold">Attendance</span>
                <span className="font-medium text-lg">
                  {students.filter(s => s.status === 'active').length} <span className="opacity-60 text-sm">/ {activeExam.totalStudents}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-5xl font-extrabold mb-1">
              {Math.round((students.filter(s => s.status === 'submitted').length / activeExam.totalStudents) * 100)}%
            </div>
            <div className="text-sm font-medium text-indigo-100 uppercase tracking-wide">Completion Rate</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student List Table */}
        <div className="lg:col-span-2">
          <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Active Sessions</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Active</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Flagged</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDark ? 'bg-gray-900/50' : 'bg-gray-50'}>
                  <tr>
                    {['Student', 'Status', 'Progress', 'Flagged', 'Actions'].map((header) => (
                      <th key={header} className={`px-6 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {students.map((student) => (
                    <tr 
                      key={student.id} 
                      className={`transition-colors duration-150 cursor-pointer ${
                        selectedStudent?.id === student.id 
                          ? isDark ? 'bg-indigo-900/30' : 'bg-indigo-50'
                          : isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                            {student.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{student.name}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Last: {student.lastActive}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-24 rounded-full h-1.5 mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-500 ${student.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFlagToggle(student.id);
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            student.flagged 
                              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400' 
                              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600'
                          }`}
                          title={student.flagged ? "Unflag Student" : "Flag Suspicious Behavior"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendMessage(student.id);
                            }}
                            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                          >
                            Message
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Terminating exam for ${student.name}`);
                            }}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          >
                            Terminate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Selected Student & Stats */}
        <div className="space-y-8">
          <div className={`rounded-xl shadow-lg sticky top-6 overflow-hidden transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Student Inspector</h3>
            </div>
            
            <div className="p-6">
              {selectedStudent ? (
                <div className="animate-fade-in">
                  <div className="flex flex-col items-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 ring-4 ring-offset-2 ring-indigo-100 dark:ring-offset-gray-800 dark:ring-indigo-900">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.name}</h4>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      ID: STU{selectedStudent.id.toString().padStart(3, '0')}
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 mb-6 space-y-3 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-600">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getStatusColor(selectedStudent.status)}`}>
                        {selectedStudent.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-600">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
                      <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.progress}%</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-600">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Alerts</span>
                      <span className={`font-bold text-sm ${selectedStudent.flagged ? 'text-red-500' : 'text-green-500'}`}>
                        {selectedStudent.flagged ? '⚠️ Suspicious' : '✓ Clean'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last Active</span>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{selectedStudent.lastActive}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all font-medium text-sm">
                        <span className="mr-2">📺</span> View Screen Capture
                      </button>
                      <button className={`w-full px-4 py-2.5 border rounded-lg transition-colors font-medium text-sm ${
                        isDark 
                          ? 'border-indigo-500 text-indigo-400 hover:bg-indigo-900/30' 
                          : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                      }`}>
                        Send Warning
                      </button>
                      <button className={`w-full px-4 py-2.5 border rounded-lg transition-colors font-medium text-sm ${
                        isDark 
                          ? 'border-red-500 text-red-400 hover:bg-red-900/30' 
                          : 'border-red-600 text-red-600 hover:bg-red-50'
                      }`}>
                        Force Submit
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`text-4xl mb-3 opacity-50`}>👋</div>
                  <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>No Student Selected</p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Click on a row to view detailed monitoring info.</p>
                </div>
              )}
            </div>
          </div>

          {/* Mini Stats Cards */}
          <div className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Live Statistics</h3>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Class Average Progress</span>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`text-center p-4 rounded-xl border ${
                isDark 
                  ? 'bg-green-900/10 border-green-900/30' 
                  : 'bg-green-50 border-green-100'
              }`}>
                <div className="text-2xl font-bold text-green-500">
                  {students.filter(s => s.status === 'active').length}
                </div>
                <div className={`text-xs font-semibold uppercase ${isDark ? 'text-green-400' : 'text-green-700'}`}>Online</div>
              </div>
              <div className={`text-center p-4 rounded-xl border ${
                isDark 
                  ? 'bg-red-900/10 border-red-900/30' 
                  : 'bg-red-50 border-red-100'
              }`}>
                <div className="text-2xl font-bold text-red-500">
                  {students.filter(s => s.flagged).length}
                </div>
                <div className={`text-xs font-semibold uppercase ${isDark ? 'text-red-400' : 'text-red-700'}`}>Flagged</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitor;