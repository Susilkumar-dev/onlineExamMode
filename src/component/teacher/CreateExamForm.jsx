import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useTheme } from '../../context/ThemeContext';

const CreateExamForm = () => {
  const { isDark } = useTheme();
  
  const [examData, setExamData] = useState({
    title: '',
    course: '',
    description: '',
    duration: 60,
    type: 'mixed',
    startDate: '',
    endDate: '',
    maxScore: 100,
    passingScore: 40,
    randomizeQuestions: false,
    showResults: true,
    enableProctoring: true,
    allowRetakes: false,
    timeLimit: true,
    negativeMarking: false,
    questionBank: false
  });

  const [questions, setQuestions] = useState([
    { id: 1, text: 'What is React?', type: 'mcq', points: 5, difficulty: 'easy' },
    { id: 2, text: 'Write a function to reverse a string', type: 'coding', points: 10, difficulty: 'medium' },
    { id: 3, text: 'Explain JavaScript closures', type: 'essay', points: 15, difficulty: 'hard' }
  ]);

  const [activeSection, setActiveSection] = useState('basic');

  const handleExamChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExamData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: 'New Question',
      type: 'mcq',
      points: 5,
      difficulty: 'medium'
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exam created:', { ...examData, questions });
    alert('Exam created successfully!');
  };

  const sections = [
    { id: 'basic', name: 'Basic Info', icon: '📝' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
    { id: 'questions', name: 'Questions', icon: '❓' },
    { id: 'review', name: 'Review', icon: '👁️' }
  ];

  const getTypeBadge = (type) => {
    const types = {
      mcq: { color: 'primary', label: 'MCQ' },
      coding: { color: 'secondary', label: 'Coding' },
      essay: { color: 'success', label: 'Essay' },
      mixed: { color: 'info', label: 'Mixed' }
    };
    return types[type] || { color: 'default', label: type };
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: isDark ? 'text-green-400' : 'text-green-600',
      medium: isDark ? 'text-yellow-400' : 'text-yellow-600',
      hard: isDark ? 'text-red-400' : 'text-red-600'
    };
    return colors[difficulty] || colors.medium;
  };

  const getDifficultyBg = (difficulty) => {
    const backgrounds = {
      easy: isDark ? 'bg-green-900/30' : 'bg-green-100',
      medium: isDark ? 'bg-yellow-900/30' : 'bg-yellow-100',
      hard: isDark ? 'bg-red-900/30' : 'bg-red-100'
    };
    return backgrounds[difficulty] || backgrounds.medium;
  };

  // Helper classes for consistent input styling
  const inputClasses = `w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
    isDark 
      ? 'bg-dark-700 border-dark-600 text-gray-300 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500/20' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500'
  }`;

  const labelClasses = `block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      {/* Top Header Background */}
      <div className={`w-full h-48 absolute top-0 left-0 z-0 ${
        isDark 
          ? 'bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800' 
          : 'bg-gradient-to-b from-primary-600 via-primary-500 to-primary-600'
      }`}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-white'
            }`}>
              Exam Creation Wizard
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-white'
          }`}>
            Create New
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-white to-gray-100'
            } bg-clip-text text-transparent`}>
              Assessment
            </span>
          </h1>
          
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-white/90'
          }`}>
            Configure assessment details, settings, and questions
          </p>
        </div>

        {/* Progress Stepper */}
        <div className={`mb-8 p-6 rounded-2xl ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            {/* Connecting line background */}
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 z-0 hidden md:block ${
              isDark ? 'bg-dark-700' : 'bg-gray-200'
            }`} />
            
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isPast = sections.findIndex(s => s.id === activeSection) > index;
              
              return (
                <div key={section.id} className="relative z-10 flex flex-col items-center group mb-4 md:mb-0">
                  <button
                    onClick={() => setActiveSection(section.id)}
                    type="button"
                    className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 border-4 ${
                      isActive
                        ? isDark
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 border-primary-400/20 text-white shadow-lg scale-110'
                          : 'bg-gradient-to-r from-primary-600 to-secondary-600 border-primary-200 text-white shadow-lg scale-110'
                        : isPast
                          ? isDark
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400/20 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-200 text-white'
                          : isDark 
                            ? 'bg-dark-700 border-dark-600 text-gray-400 hover:bg-dark-600'
                            : 'bg-gray-100 border-gray-200 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl">{isPast ? '✓' : section.icon}</span>
                  </button>
                  <span className={`mt-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive 
                      ? (isDark ? 'text-white' : 'text-primary-600') 
                      : (isDark ? 'text-gray-500' : 'text-gray-500')
                  }`}>
                    {section.name}
                  </span>
                  <span className={`text-xs mt-1 ${
                    isDark ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    Step {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Content */}
        <form onSubmit={handleSubmit} className="animate-fade-in-up">
          <Card className={`overflow-hidden shadow-xl rounded-2xl ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <div className="p-6 sm:p-8">
              
              {/* Basic Information Section */}
              {activeSection === 'basic' && (
                <div className="space-y-8">
                  <div className="border-b pb-4 border-gray-200 dark:border-dark-700">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-dark-700' : 'bg-gray-100'
                      }`}>
                        📝
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Basic Information
                        </h2>
                        <p className={`mt-1 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Define the core details of your assessment
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className={labelClasses}>Exam Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={examData.title}
                        onChange={handleExamChange}
                        required
                        className={inputClasses}
                        placeholder="e.g., Final Exam: Advanced Algorithms"
                      />
                    </div>
                    
                    <div>
                      <label className={labelClasses}>Course *</label>
                      <input
                        type="text"
                        name="course"
                        value={examData.course}
                        onChange={handleExamChange}
                        required
                        className={inputClasses}
                        placeholder="e.g., CS-301"
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Exam Type *</label>
                      <div className="relative">
                        <select
                          name="type"
                          value={examData.type}
                          onChange={handleExamChange}
                          className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                        >
                          <option value="mixed">Mixed (MCQ + Coding)</option>
                          <option value="mcq">Multiple Choice Only</option>
                          <option value="coding">Coding Only</option>
                          <option value="essay">Essay Only</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Start Date & Time *</label>
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={examData.startDate}
                        onChange={handleExamChange}
                        required
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>End Date & Time *</label>
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={examData.endDate}
                        onChange={handleExamChange}
                        required
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Duration (minutes) *</label>
                      <input
                        type="number"
                        name="duration"
                        value={examData.duration}
                        onChange={handleExamChange}
                        required
                        min="1"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Description</label>
                    <textarea
                      name="description"
                      value={examData.description}
                      onChange={handleExamChange}
                      rows="4"
                      className={inputClasses}
                      placeholder="Enter exam instructions or welcome message..."
                    />
                  </div>
                </div>
              )}

              {/* Settings Section */}
              {activeSection === 'settings' && (
                <div className="space-y-8">
                  <div className="border-b pb-4 border-gray-200 dark:border-dark-700">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-dark-700' : 'bg-gray-100'
                      }`}>
                        ⚙️
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Exam Configuration
                        </h2>
                        <p className={`mt-1 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Adjust scoring and proctoring controls
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${
                    isDark 
                      ? 'bg-dark-700/30 border border-dark-700' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>📊</span> Scoring Rules
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Maximum Score</label>
                        <input
                          type="number"
                          name="maxScore"
                          value={examData.maxScore}
                          onChange={handleExamChange}
                          min="1"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Passing Score</label>
                        <input
                          type="number"
                          name="passingScore"
                          value={examData.passingScore}
                          onChange={handleExamChange}
                          min="0"
                          max={examData.maxScore}
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className={`font-semibold flex items-center gap-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>🔧</span> Advanced Controls
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'randomizeQuestions', label: 'Randomize Questions', desc: 'Shuffle question order for each student', icon: '🔀' },
                        { id: 'showResults', label: 'Show Results Immediately', desc: 'Allow students to see score after submission', icon: '📋' },
                        { id: 'enableProctoring', label: 'Enable AI Proctoring', desc: 'Monitor tab switching and presence', icon: '👁️' },
                        { id: 'allowRetakes', label: 'Allow Retakes', desc: 'Students can retake the exam', icon: '🔄' },
                        { id: 'timeLimit', label: 'Enforce Time Limit', desc: 'Strict timing for exam completion', icon: '⏱️' },
                        { id: 'negativeMarking', label: 'Negative Marking', desc: 'Penalty for wrong answers', icon: '📉' }
                      ].map((setting) => (
                        <div key={setting.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                          isDark 
                            ? 'bg-dark-700/30 border-dark-700 hover:bg-dark-700/50' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}>
                          <div className="flex items-start gap-3">
                            <div className={`text-lg p-2 rounded-lg ${
                              isDark ? 'bg-dark-700' : 'bg-gray-100'
                            }`}>
                              {setting.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className={`font-medium ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>{setting.label}</span>
                              <span className={`text-xs ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                              }`}>{setting.desc}</span>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id={setting.id}
                              name={setting.id}
                              checked={examData[setting.id]}
                              onChange={handleExamChange}
                              className="sr-only peer"
                            />
                            <div className={`w-12 h-6 rounded-full peer peer-focus:ring-4 transition-colors ${
                              examData[setting.id]
                                ? isDark
                                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 peer-focus:ring-primary-500/20'
                                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 peer-focus:ring-primary-500/20'
                                : isDark
                                  ? 'bg-dark-600' 
                                  : 'bg-gray-300'
                            }`}></div>
                            <div className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-transform ${
                              examData[setting.id] ? 'transform translate-x-6' : ''
                            } ${isDark ? 'border-dark-500' : 'border-gray-300'}`}></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Questions Section */}
              {activeSection === 'questions' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 border-gray-200 dark:border-dark-700 gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-dark-700' : 'bg-gray-100'
                      }`}>
                        ❓
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Manage Questions
                        </h2>
                        <p className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Total Questions: <span className={`font-bold ${
                            isDark ? 'text-primary-400' : 'text-primary-600'
                          }`}>{questions.length}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className={`group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                        isDark
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                          : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                      } shadow-lg hover:shadow-xl`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span>+</span>
                        <span>Add Question</span>
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {questions.length === 0 ? (
                      <div className={`text-center py-12 border-2 border-dashed rounded-xl ${
                        isDark 
                          ? 'border-dark-700 text-gray-500' 
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        <div className="text-5xl mb-4">📝</div>
                        <p className="text-lg font-medium mb-2">No questions added yet</p>
                        <p className={`text-sm mb-4 ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          Add questions to create your assessment
                        </p>
                        <button 
                          type="button" 
                          onClick={handleAddQuestion}
                          className={`font-medium ${
                            isDark 
                              ? 'text-primary-400 hover:text-primary-300' 
                              : 'text-primary-600 hover:text-primary-700'
                          }`}
                        >
                          + Add your first question
                        </button>
                      </div>
                    ) : (
                      questions.map((question, index) => (
                        <div key={question.id} className={`group relative p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                          isDark 
                            ? 'bg-dark-700/30 border-dark-700 hover:border-dark-600' 
                            : 'bg-white border-gray-200 hover:border-primary-200'
                        } shadow-lg hover:shadow-xl`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-10">
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                  isDark 
                                    ? 'bg-dark-600 text-gray-300' 
                                    : 'bg-primary-50 text-primary-600'
                                }`}>
                                  {index + 1}
                                </span>
                                <Badge variant={getTypeBadge(question.type).color}>
                                  {getTypeBadge(question.type).label}
                                </Badge>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getDifficultyBg(question.difficulty)} ${getDifficultyColor(question.difficulty)}`}>
                                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                </span>
                                <span className={`text-xs font-medium px-2 py-1 rounded ${
                                  isDark 
                                    ? 'bg-dark-600 text-gray-300' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {question.points} Points
                                </span>
                              </div>
                              <h3 className={`text-base font-medium mb-2 ${
                                isDark ? 'text-gray-100' : 'text-gray-800'
                              }`}>
                                {question.text}
                              </h3>
                              <div className="flex items-center gap-4 mt-4">
                                <button type="button" className={`text-xs font-medium ${
                                  isDark 
                                    ? 'text-gray-400 hover:text-gray-300' 
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}>
                                  Edit
                                </button>
                                <button type="button" className={`text-xs font-medium ${
                                  isDark 
                                    ? 'text-gray-400 hover:text-gray-300' 
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}>
                                  Preview
                                </button>
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(question.id)}
                              className={`absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                                isDark 
                                  ? 'text-gray-400 hover:text-red-400 hover:bg-dark-600' 
                                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                              }`}
                              title="Remove Question"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Tips Section */}
                  <div className={`p-5 rounded-xl ${
                    isDark 
                      ? 'bg-blue-900/20 border border-blue-900/50' 
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl p-2 rounded-lg ${
                        isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                      }`}>
                        💡
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-2 ${
                          isDark ? 'text-blue-300' : 'text-blue-700'
                        }`}>
                          Tips for effective questions
                        </h4>
                        <ul className={`space-y-1.5 text-sm ${
                          isDark ? 'text-blue-400/80' : 'text-blue-600'
                        }`}>
                          <li className="flex items-center gap-2">
                            <span>•</span>
                            <span>Mix question types to test different skills</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span>•</span>
                            <span>Ensure point distribution matches difficulty</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span>•</span>
                            <span>Review text for clarity and correctness</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span>•</span>
                            <span>Add clear instructions for each question type</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Review Section */}
              {activeSection === 'review' && (
                <div className="space-y-8">
                  <div className="border-b pb-4 border-gray-200 dark:border-dark-700">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-dark-700' : 'bg-gray-100'
                      }`}>
                        👁️
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Final Review
                        </h2>
                        <p className={`mt-1 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Verify all details before publishing
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-xl ${
                      isDark 
                        ? 'bg-dark-700/30 border border-dark-700' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <h3 className={`text-lg font-bold mb-4 pb-3 border-b ${
                        isDark 
                          ? 'text-white border-dark-600' 
                          : 'text-gray-800 border-gray-200'
                      }`}>
                        📋 Exam Details
                      </h3>
                      <dl className="space-y-4">
                        {[
                          { label: 'Title', value: examData.title || 'Not set', icon: '📝' },
                          { label: 'Course', value: examData.course || 'Not set', icon: '🏫' },
                          { label: 'Type', value: getTypeBadge(examData.type).label, icon: '📊' },
                          { label: 'Duration', value: `${examData.duration} minutes`, icon: '⏱️' },
                          { label: 'Schedule', value: examData.startDate && examData.endDate ? `${examData.startDate} to ${examData.endDate}` : 'Not set', icon: '📅' },
                          { label: 'Description', value: examData.description || 'No description provided', icon: '📄' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDark ? 'bg-dark-600' : 'bg-gray-100'
                            }`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <dt className={`text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {item.label}
                              </dt>
                              <dd className={`font-medium mt-1 ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.value}
                              </dd>
                            </div>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className={`p-6 rounded-xl ${
                      isDark 
                        ? 'bg-dark-700/30 border border-dark-700' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <h3 className={`text-lg font-bold mb-4 pb-3 border-b ${
                        isDark 
                          ? 'text-white border-dark-600' 
                          : 'text-gray-800 border-gray-200'
                      }`}>
                        ⚙️ Configuration
                      </h3>
                      <dl className="space-y-4">
                        {[
                          { label: 'Total Questions', value: questions.length, icon: '❓' },
                          { label: 'Maximum Score', value: examData.maxScore, icon: '⭐' },
                          { label: 'Passing Score', value: examData.passingScore, icon: '✅' },
                          { label: 'AI Proctoring', value: examData.enableProctoring ? 'Enabled' : 'Disabled', icon: '👁️', status: examData.enableProctoring },
                          { label: 'Randomization', value: examData.randomizeQuestions ? 'Enabled' : 'Disabled', icon: '🔀', status: examData.randomizeQuestions },
                          { label: 'Allow Retakes', value: examData.allowRetakes ? 'Enabled' : 'Disabled', icon: '🔄', status: examData.allowRetakes }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDark ? 'bg-dark-600' : 'bg-gray-100'
                            }`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <dt className={`text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {item.label}
                              </dt>
                              <dd className={`font-medium mt-1 flex items-center gap-2 ${
                                item.status === true ? 'text-green-600' : 
                                item.status === false ? 'text-gray-500' : 
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.status !== undefined && (
                                  <span className={`w-2 h-2 rounded-full ${
                                    item.status ? 'bg-green-500' : 'bg-gray-400'
                                  }`}></span>
                                )}
                                {item.value}
                              </dd>
                            </div>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>

                  {/* Warning Section */}
                  <div className={`p-5 rounded-xl ${
                    isDark 
                      ? 'bg-yellow-900/20 border border-yellow-900/50' 
                      : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl p-2 rounded-lg ${
                        isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        ⚠️
                      </div>
                      <div>
                        <h4 className={`font-bold mb-2 ${
                          isDark ? 'text-yellow-300' : 'text-yellow-700'
                        }`}>
                          Important Notes
                        </h4>
                        <p className={`text-sm ${
                          isDark ? 'text-yellow-400/80' : 'text-yellow-600'
                        }`}>
                          Once published, core settings cannot be modified. Ensure dates and times are correct to prevent access issues.
                          All changes will be logged and visible to students with appropriate permissions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className={`px-6 sm:px-8 py-6 border-t flex flex-col-reverse sm:flex-row justify-between gap-4 ${
              isDark 
                ? 'bg-dark-800/50 border-dark-700' 
                : 'bg-gray-50 border-gray-100'
            }`}>
              <button
                type="button"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={activeSection === sections[0].id}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600 disabled:opacity-50 disabled:cursor-not-allowed'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                } shadow-lg hover:shadow-xl`}
              >
                ← Previous Step
              </button>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                } shadow-lg hover:shadow-xl`}>
                  Save Draft
                </button>
                
                {activeSection === sections[sections.length - 1].id ? (
                  <button type="submit" className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                  } shadow-lg hover:shadow-xl`}>
                    <span className="relative z-10 flex items-center gap-2">
                      <span>🚀</span>
                      <span>Create & Publish Exam</span>
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1].id);
                      }
                    }}
                    className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                    } shadow-lg hover:shadow-xl`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Next Step</span>
                      <span>→</span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default CreateExamForm;