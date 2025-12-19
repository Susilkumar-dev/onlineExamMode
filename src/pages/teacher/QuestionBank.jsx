import React, { useState } from 'react';
import QuestionEditor from '../../component/teacher/QuestionEditor';
import { useTheme } from '../../context/ThemeContext';

const QuestionBank = () => {
  const { isDark } = useTheme();
  const [questions] = useState([
    { id: 1, text: 'What is the time complexity of binary search?', type: 'mcq', difficulty: 'easy', category: 'Algorithms', points: 5 },
    { id: 2, text: 'Implement a function to reverse a linked list', type: 'coding', difficulty: 'medium', category: 'Data Structures', points: 10 },
    { id: 3, text: 'Explain the difference between HTTP and HTTPS', type: 'essay', difficulty: 'easy', category: 'Web', points: 8 },
    { id: 4, text: 'What is the output of console.log(1 + "2" + 3)?', type: 'mcq', difficulty: 'medium', category: 'JavaScript', points: 5 },
    { id: 5, text: 'Write SQL query to find duplicate emails', type: 'coding', difficulty: 'hard', category: 'Database', points: 12 }
  ]);

  const [filter, setFilter] = useState('all');
  const [showEditor, setShowEditor] = useState(false);

  const filteredQuestions = questions.filter(q => {
    if (filter === 'all') return true;
    return q.type === filter;
  });

  // Theme-based classes
  const containerClasses = `p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`;
  const titleClasses = `text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`;
  const subtitleClasses = `${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`;
  const addButtonClasses = `px-6 py-3 rounded-lg font-medium transition-colors ${
    isDark ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'
  }`;
  const filterCardClasses = `rounded-xl shadow-lg p-6 mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const filterButtonClasses = (isActive, activeColor = 'primary') => 
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive 
        ? isDark 
          ? `bg-${activeColor}-600 text-white` 
          : `bg-${activeColor}-600 text-white`
        : isDark 
          ? 'text-gray-300 hover:bg-gray-700' 
          : 'text-gray-600 hover:bg-gray-100'
    }`;
  const searchInputClasses = `w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
    isDark 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'border border-gray-300 text-gray-900 placeholder-gray-400'
  }`;
  const tableCardClasses = `rounded-xl shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const tableHeaderClasses = isDark ? 'bg-gray-700' : 'bg-gray-50';
  const tableHeaderCellClasses = `px-6 py-3 text-left text-xs font-medium uppercase ${
    isDark ? 'text-gray-300' : 'text-gray-500'
  }`;
  const tableRowClasses = isDark ? 'divide-gray-700 hover:bg-gray-700/50' : 'divide-gray-200 hover:bg-gray-50';
  const tableCellClasses = (isId = false) => 
    `px-6 py-4 whitespace-nowrap ${isId ? 'text-sm' : ''} ${
      isDark ? 'text-gray-300' : 'text-gray-900'
    }`;
  const typeBadgeClasses = (type) => {
    const base = 'px-2 py-1 text-xs rounded-full';
    if (type === 'mcq') {
      return `${base} ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`;
    }
    if (type === 'coding') {
      return `${base} ${isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`;
    }
    return `${base} ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'}`;
  };
  const difficultyBadgeClasses = (difficulty) => {
    const base = 'px-2 py-1 text-xs rounded-full';
    if (difficulty === 'easy') {
      return `${base} ${isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`;
    }
    if (difficulty === 'medium') {
      return `${base} ${isDark ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`;
    }
    return `${base} ${isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'}`;
  };
  const categoryTextClasses = `text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`;
  const actionButtonClasses = (color) => 
    `text-sm font-medium transition-colors ${isDark ? `text-${color}-400 hover:text-${color}-300` : `text-${color}-600 hover:text-${color}-900`}`;
  const emptyStateClasses = `text-center py-12 ${isDark ? 'text-gray-300' : 'text-gray-900'}`;
  const emptyStateTextClasses = `text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`;
  const emptyStateSubtextClasses = isDark ? 'text-gray-400' : 'text-gray-600';
  const statCardClasses = `rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const statValueClasses = `text-2xl font-bold ${isDark ? 'text-white' : ''}`;
  const statLabelClasses = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={containerClasses}>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={titleClasses}>Question Bank</h1>
            <p className={subtitleClasses}>Manage your repository of questions</p>
          </div>
          <button 
            onClick={() => setShowEditor(true)}
            className={addButtonClasses}
          >
            + Add Question
          </button>
        </div>
      </div>

      {/* Question Editor */}
      {showEditor && (
        <div className="mb-8">
          <QuestionEditor />
        </div>
      )}

      {/* Filters */}
      <div className={filterCardClasses}>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setFilter('all')}
            className={filterButtonClasses(filter === 'all')}
          >
            All Questions ({questions.length})
          </button>
          <button
            onClick={() => setFilter('mcq')}
            className={filterButtonClasses(filter === 'mcq', 'blue')}
          >
            Multiple Choice
          </button>
          <button
            onClick={() => setFilter('coding')}
            className={filterButtonClasses(filter === 'coding', 'green')}
          >
            Coding
          </button>
          <button
            onClick={() => setFilter('essay')}
            className={filterButtonClasses(filter === 'essay', 'purple')}
          >
            Essay
          </button>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className={searchInputClasses}
            />
            <span className={`absolute left-3 top-3.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className={tableCardClasses}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={tableHeaderClasses}>
              <tr>
                <th className={tableHeaderCellClasses}>ID</th>
                <th className={tableHeaderCellClasses}>Question</th>
                <th className={tableHeaderCellClasses}>Type</th>
                <th className={tableHeaderCellClasses}>Difficulty</th>
                <th className={tableHeaderCellClasses}>Category</th>
                <th className={tableHeaderCellClasses}>Points</th>
                <th className={tableHeaderCellClasses}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredQuestions.map((question) => (
                <tr key={question.id} className={tableRowClasses}>
                  <td className={tableCellClasses(true)}>
                    {question.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className={tableCellClasses()}>{question.text}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={typeBadgeClasses(question.type)}>
                      {question.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={difficultyBadgeClasses(question.difficulty)}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${categoryTextClasses}`}>
                    {question.category}
                  </td>
                  <td className={tableCellClasses()}>
                    {question.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className={`${actionButtonClasses('primary')} mr-3`}>
                      Edit
                    </button>
                    <button className={`${actionButtonClasses('green')} mr-3`}>
                      Preview
                    </button>
                    <button className={actionButtonClasses('red')}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className={emptyStateClasses}>
            <div className="text-6xl mb-4">📚</div>
            <h3 className={emptyStateTextClasses}>No questions found</h3>
            <p className={emptyStateSubtextClasses}>Try changing your filters or add a new question.</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={statCardClasses}>
          <div className={`${statValueClasses} ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
            {questions.length}
          </div>
          <div className={statLabelClasses}>Total Questions</div>
        </div>
        <div className={statCardClasses}>
          <div className={`${statValueClasses} ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {questions.filter(q => q.type === 'mcq').length}
          </div>
          <div className={statLabelClasses}>Multiple Choice</div>
        </div>
        <div className={statCardClasses}>
          <div className={`${statValueClasses} ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            {questions.filter(q => q.type === 'coding').length}
          </div>
          <div className={statLabelClasses}>Coding Questions</div>
        </div>
        <div className={statCardClasses}>
          <div className={`${statValueClasses} ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            {Math.round(questions.reduce((acc, q) => acc + q.points, 0) / questions.length)}
          </div>
          <div className={statLabelClasses}>Avg. Points</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;