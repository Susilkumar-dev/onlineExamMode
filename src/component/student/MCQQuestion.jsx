import React, { useState } from 'react';
import Badge from '../common/Badge';

const MCQQuestion = ({ 
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelect,
  selectedAnswer = null,
  showCorrectAnswer = false,
  isReviewMode = false
}) => {
  const [selected, setSelected] = useState(selectedAnswer);

  const handleOptionSelect = (optionId) => {
    if (!isReviewMode) {
      setSelected(optionId);
      if (onAnswerSelect) {
        onAnswerSelect(optionId);
      }
    }
  };

  const getOptionClass = (optionId) => {
    if (isReviewMode) {
      if (optionId === question.correctAnswer) {
        return 'border-green-500 bg-green-50';
      }
      if (optionId === selected && optionId !== question.correctAnswer) {
        return 'border-red-500 bg-red-50';
      }
    }
    
    if (selected === optionId) {
      return 'border-primary-500 bg-primary-50';
    }
    
    return 'border-gray-200 hover:bg-gray-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Question Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center mb-2">
            <Badge variant="primary">Question {questionNumber}</Badge>
            <span className="mx-2 text-gray-400">•</span>
            <Badge variant="secondary">{question.points} points</Badge>
            <span className="mx-2 text-gray-400">•</span>
            <Badge variant={question.difficulty === 'hard' ? 'danger' : 'warning'}>
              {question.difficulty}
            </Badge>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-2">{question.text}</h2>
          {question.description && (
            <p className="text-gray-600 mt-2">{question.description}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Progress</div>
          <div className="text-lg font-bold text-gray-900">
            {questionNumber}/{totalQuestions}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${getOptionClass(option.id)} ${
              isReviewMode ? 'cursor-default' : 'cursor-pointer hover:border-primary-300'
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                selected === option.id 
                  ? 'border-primary-500 bg-primary-100 text-primary-600' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {String.fromCharCode(65 + option.id - 1)}
              </div>
              <div className="flex-grow">
                <p className="text-gray-900">{option.text}</p>
                {isReviewMode && option.explanation && (
                  <p className="text-sm text-gray-600 mt-2">{option.explanation}</p>
                )}
              </div>
              
              {/* Review Mode Indicators */}
              {isReviewMode && (
                <div className="ml-4">
                  {option.id === question.correctAnswer && (
                    <span className="text-green-600 font-medium">✓ Correct</span>
                  )}
                  {option.id === selected && option.id !== question.correctAnswer && (
                    <span className="text-red-600 font-medium">✗ Your Answer</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Explanation (in review mode) */}
      {isReviewMode && question.explanation && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
          <p className="text-blue-800">{question.explanation}</p>
        </div>
      )}

      {/* Stats (in review mode) */}
      {isReviewMode && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {question.stats?.correct || 0}%
            </div>
            <div className="text-sm text-gray-600">Correct Rate</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {question.stats?.avgTime || 0}s
            </div>
            <div className="text-sm text-gray-600">Avg. Time</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {question.stats?.attempts || 0}
            </div>
            <div className="text-sm text-gray-600">Total Attempts</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;