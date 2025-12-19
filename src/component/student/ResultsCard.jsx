import React from 'react';
import Badge from '../common/Badge';

const ResultsCard = ({ result }) => {
  const getStatusColor = (status) => {
    return status === 'passed' ? 'success' : 'danger';
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent! Outstanding performance.';
    if (percentage >= 70) return 'Good job! Solid understanding.';
    if (percentage >= 40) return 'Satisfactory. Needs improvement.';
    return 'Needs significant improvement.';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">{result.examTitle}</h2>
            <p className="opacity-90">{result.course}</p>
            <p className="text-sm opacity-80 mt-2">Completed on {result.completedDate}</p>
          </div>
          <Badge variant={getStatusColor(result.status)} size="large">
            {result.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        {/* Score Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className={`text-4xl font-bold ${getScoreColor(result.percentage)}`}>
              {result.score}/{result.maxScore}
            </div>
            <div className="text-gray-600 mt-2">Raw Score</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className={`text-4xl font-bold ${getScoreColor(result.percentage)}`}>
              {result.percentage}%
            </div>
            <div className="text-gray-600 mt-2">Percentage</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl font-bold text-gray-900">
              #{result.rank}
            </div>
            <div className="text-gray-600 mt-2">Class Rank</div>
          </div>
        </div>

        {/* Performance Message */}
        <div className={`p-4 rounded-lg mb-8 ${
          result.percentage >= 70 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="flex items-center">
            <span className="text-2xl mr-3">
              {result.percentage >= 70 ? '🎉' : '📝'}
            </span>
            <div>
              <h4 className="font-bold text-gray-900">Performance Summary</h4>
              <p className="text-gray-700 mt-1">{getPerformanceMessage(result.percentage)}</p>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.correctAnswers}</div>
              <div className="text-sm text-blue-700">Correct Answers</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{result.incorrectAnswers}</div>
              <div className="text-sm text-red-700">Incorrect Answers</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{result.skippedQuestions}</div>
              <div className="text-sm text-yellow-700">Skipped</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{result.timeSpent}</div>
              <div className="text-sm text-purple-700">Time Spent</div>
            </div>
          </div>
        </div>

        {/* Section-wise Performance */}
        {result.sections && result.sections.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Section-wise Performance</h3>
            <div className="space-y-4">
              {result.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{section.name}</h4>
                      <p className="text-sm text-gray-600">{section.questions} questions</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {section.score}/{section.maxScore}
                      </div>
                      <div className="text-sm text-gray-500">{section.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        section.percentage >= 70 ? 'bg-green-500' : 
                        section.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${section.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Your score is better than {result.betterThan}% of students
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
                View Detailed Report
              </button>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Retake Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;