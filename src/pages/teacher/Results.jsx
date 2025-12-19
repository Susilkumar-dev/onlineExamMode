import React, { useState } from 'react';
import GradeSubmissions from '../../component/teacher/GradeSubmissions';
import StudentResults from '../../component/teacher/StudentResults';

const Results = () => {
  const [activeTab, setActiveTab] = useState('submissions');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Results & Grading</h1>
        <p className="text-gray-600 mt-2">Review, grade, and analyze exam results</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'submissions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Grade Submissions
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'results'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Student Results
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'submissions' && <GradeSubmissions />}
      {activeTab === 'results' && <StudentResults />}
      
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Exam Analytics</h2>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-gray-500">Analytics charts and visualizations</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-2xl font-bold text-green-600">78.5%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-2xl font-bold text-blue-600">42</div>
              <div className="text-gray-600">Students Passed</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-2xl font-bold text-red-600">8</div>
              <div className="text-gray-600">Students Failed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;