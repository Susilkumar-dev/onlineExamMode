import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const QuestionNavigation = ({ 
  questions, 
  currentQuestion, 
  onQuestionSelect,
  answers = {},
  flaggedQuestions = [],
  showStatus = true
}) => {
  const [filter, setFilter] = useState('all');
  const { isDark } = useTheme();

  const getQuestionStatus = (questionId) => {
    if (flaggedQuestions.includes(questionId)) return 'flagged';
    if (answers[questionId] !== undefined) return 'answered';
    if (questionId === currentQuestion) return 'current';
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'answered': return 'bg-green-500';
      case 'flagged': return 'bg-yellow-500';
      case 'current': return 'bg-primary-500';
      case 'unanswered': return isDark ? 'bg-gray-600' : 'bg-gray-300';
      default: return isDark ? 'bg-gray-600' : 'bg-gray-300';
    }
  };

  const filteredQuestions = questions.filter(question => {
    if (filter === 'all') return true;
    if (filter === 'answered') return answers[question.id] !== undefined;
    if (filter === 'unanswered') return answers[question.id] === undefined;
    if (filter === 'flagged') return flaggedQuestions.includes(question.id);
    return true;
  });

  // Theme-based classes
  const containerClasses = `rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const countClasses = `text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`;
  const titleClasses = `text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`;
  
  const filterButtonClasses = (isActive, activeClasses, inactiveClasses) => 
    `px-3 py-1 rounded-full text-sm font-medium transition-colors ${
      isActive 
        ? activeClasses 
        : `${inactiveClasses} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
    }`;

  const questionButtonClasses = (status) => 
    `relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
      status === 'current'
        ? `ring-2 ring-primary-500 ${isDark ? 'bg-primary-900/30 text-primary-300' : 'bg-primary-50 text-primary-700'}`
        : isDark ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
    }`;

  const legendTextClasses = `text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`;
  
  const quickActionClasses = (color, textColor) => 
    `px-4 py-2 rounded-lg text-sm font-medium ${
      isDark 
        ? `${color}/20 ${textColor} hover:${color}/30` 
        : `${color} ${textColor} hover:${color.replace('100', '200')}`
    }`;

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className={titleClasses}>Question Navigation</h3>
        <div className={countClasses}>
          {Object.keys(answers).length}/{questions.length} answered
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={filterButtonClasses(
            filter === 'all',
            isDark ? 'bg-primary-900/50 text-primary-300' : 'bg-primary-100 text-primary-800',
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          )}
        >
          All ({questions.length})
        </button>
        <button
          onClick={() => setFilter('answered')}
          className={filterButtonClasses(
            filter === 'answered',
            isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800',
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          )}
        >
          Answered ({Object.keys(answers).length})
        </button>
        <button
          onClick={() => setFilter('unanswered')}
          className={filterButtonClasses(
            filter === 'unanswered',
            isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800',
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          )}
        >
          Unanswered ({questions.length - Object.keys(answers).length})
        </button>
        <button
          onClick={() => setFilter('flagged')}
          className={filterButtonClasses(
            filter === 'flagged',
            isDark ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800',
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          )}
        >
          Flagged ({flaggedQuestions.length})
        </button>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
        {filteredQuestions.map((question) => {
          const status = getQuestionStatus(question.id);
          return (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(question.id)}
              className={questionButtonClasses(status)}
            >
              {question.id}
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {showStatus && (
        <div className={`border-t pt-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
              <span className={legendTextClasses}>Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className={legendTextClasses}>Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className={legendTextClasses}>Flagged</span>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
              <span className={legendTextClasses}>Unanswered</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className={`border-t pt-6 mt-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              const nextUnanswered = questions.find(q => 
                !answers[q.id] && q.id !== currentQuestion
              );
              if (nextUnanswered) onQuestionSelect(nextUnanswered.id);
            }}
            className={quickActionClasses(
              isDark ? 'bg-gray-700' : 'bg-gray-100',
              isDark ? 'text-gray-300' : 'text-gray-700'
            )}
          >
            Next Unanswered
          </button>
          <button
            onClick={() => {
              const flagged = questions.find(q => 
                flaggedQuestions.includes(q.id) && q.id !== currentQuestion
              );
              if (flagged) onQuestionSelect(flagged.id);
            }}
            className={quickActionClasses(
              'bg-yellow-100',
              'text-yellow-700'
            )}
          >
            Next Flagged
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;