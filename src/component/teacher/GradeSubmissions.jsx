import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const GradeSubmissions = () => {
  const { isDark } = useTheme();

  const [submissions] = useState([
    {
      id: 1,
      student: 'John Doe',
      exam: 'Data Structures Final',
      submitted: '2024-12-20 11:45 AM',
      status: 'pending',
      score: null,
      maxScore: 100,
      answers: [
        { question: 'Q1: What is a binary tree?', answer: 'A tree data structure...', score: 5, maxScore: 5 },
        { question: 'Q2: Implement DFS', answer: 'function dfs(node) {...}', score: null, maxScore: 10 }
      ]
    },
    {
      id: 2,
      student: 'Jane Smith',
      exam: 'Data Structures Final',
      submitted: '2024-12-20 11:30 AM',
      status: 'graded',
      score: 85,
      maxScore: 100,
      answers: [
        { question: 'Q1: What is a binary tree?', answer: 'Correct answer...', score: 5, maxScore: 5 },
        { question: 'Q2: Implement DFS', answer: 'Correct implementation...', score: 8, maxScore: 10 }
      ]
    },
    {
      id: 3,
      student: 'Bob Johnson',
      exam: 'Web Development Quiz',
      submitted: '2024-12-18 2:45 PM',
      status: 'pending',
      score: null,
      maxScore: 50,
      answers: [
        { question: 'Q1: What is React?', answer: 'A JavaScript library...', score: 5, maxScore: 5 },
        { question: 'Q2: What is JSX?', answer: 'JavaScript XML...', score: null, maxScore: 5 }
      ]
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState(submissions[0]);
  const [grading, setGrading] = useState({});

  const handleGradeChange = (answerIndex, score) => {
    setGrading(prev => ({
      ...prev,
      [answerIndex]: score
    }));
  };

  const handleSubmitGrade = () => {
    const totalScore = Object.values(grading).reduce((sum, score) => sum + score, 0);
    alert(`Grade submitted! Total score: ${totalScore}`);
  };

  const getStatusColor = (status) => {
    if (status === 'graded') return isDark ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-green-100 text-green-700 border-green-200';
    return isDark ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Submissions List (Sidebar) */}
      <div className="lg:col-span-1 space-y-6">
        <div className={`rounded-xl shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Submission Queue</h3>
          </div>
          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedSubmission.id === submission.id 
                    ? isDark 
                      ? 'border-indigo-500 bg-indigo-900/20 shadow-md' 
                      : 'border-indigo-500 bg-indigo-50 shadow-md'
                    : isDark
                      ? 'border-gray-700 bg-gray-750 hover:bg-gray-700'
                      : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{submission.student}</h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{submission.exam}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide border ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {submission.submitted}
                  </span>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                     {submission.score !== null ? `${submission.score} / ${submission.maxScore}` : '—'} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Queue Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold text-yellow-500">
                {submissions.filter(s => s.status === 'pending').length}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</div>
            </div>
            <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold text-indigo-500">
                {Math.round(
                  submissions.filter(s => s.score !== null).reduce((acc, s) => acc + s.score, 0) / 
                  Math.max(submissions.filter(s => s.score !== null).length, 1)
                )}%
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grading Panel (Main Area) */}
      <div className="lg:col-span-2">
        <div className={`rounded-xl shadow-lg overflow-hidden min-h-[600px] ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          
          {/* Header */}
          <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Grade Submission</h2>
              <div className={`flex items-center mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-medium mr-2">{selectedSubmission.student}</span>
                <span className="mx-2">•</span>
                <span>{selectedSubmission.exam}</span>
              </div>
            </div>
            <div className={`text-right px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {selectedSubmission.score !== null 
                  ? selectedSubmission.score
                  : Object.values(grading).reduce((sum, score) => sum + (score || 0), 0)
                }
                <span className={`text-base font-normal ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  / {selectedSubmission.maxScore}
                </span>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Score</div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {selectedSubmission.answers.map((answer, index) => (
              <div key={index} className={`border rounded-xl p-6 transition-colors ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                {/* Question Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="pr-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                      Question {index + 1}
                    </span>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                      {answer.question.split(':')[1] || answer.question}
                    </h3>
                  </div>
                  <div className={`shrink-0 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Max: {answer.maxScore} pts
                  </div>
                </div>

                {/* Student Answer */}
                <div className={`rounded-lg p-5 mb-6 ${isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-gray-50 border border-gray-100'}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wide mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Student Response
                  </h4>
                  <p className={`font-mono text-sm whitespace-pre-wrap ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                    {answer.answer}
                  </p>
                </div>

                {/* Grading Controls */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-blue-50/50'}`}>
                  <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Assign Score
                  </label>
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="range"
                      min="0"
                      max={answer.maxScore}
                      value={grading[index] !== undefined ? grading[index] : answer.score || 0}
                      onChange={(e) => handleGradeChange(index, parseInt(e.target.value))}
                      className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-indigo-600"
                    />
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max={answer.maxScore}
                        value={grading[index] !== undefined ? grading[index] : answer.score || 0}
                        onChange={(e) => handleGradeChange(index, parseInt(e.target.value) || 0)}
                        className={`w-16 px-2 py-1 text-center border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        / {answer.maxScore}
                      </span>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Add feedback (optional)..."
                    className={`w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
            ))}

            {/* Footer Actions */}
            <div className={`flex justify-end gap-3 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <button className={`px-6 py-2.5 rounded-lg border font-medium transition-colors ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                Save Draft
              </button>
              <button
                onClick={handleSubmitGrade}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 font-medium transition-all"
              >
                Submit Grades
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeSubmissions;