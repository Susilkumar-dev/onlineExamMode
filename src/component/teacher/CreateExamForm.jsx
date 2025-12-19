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
    enableProctoring: true
  });

  const [questions, setQuestions] = useState([
    { id: 1, text: 'What is React?', type: 'mcq', points: 5 },
    { id: 2, text: 'Write a function to reverse a string', type: 'coding', points: 10 },
    { id: 3, text: 'Explain JavaScript closures', type: 'essay', points: 15 }
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
      points: 5
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  // Helper classes for consistent input styling
  const inputClasses = `w-full px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
    isDark 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  const labelClasses = `block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-200' : 'text-gray-700'}`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Header Background */}
      <div className={`w-full h-48 absolute top-0 left-0 z-0 ${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-indigo-600 to-indigo-800'}`}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Create New Exam
          </h1>
          <p className="mt-2 text-lg text-indigo-100 opacity-90">
            Configure assessment details, settings, and questions.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className={`mb-8 p-4 rounded-2xl shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center relative">
            {/* Connecting line background */}
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 z-0 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />
            
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isPast = sections.findIndex(s => s.id === activeSection) > index;
              
              return (
                <div key={section.id} className="relative z-10 flex flex-col items-center group">
                  <button
                    onClick={() => setActiveSection(section.id)}
                    type="button"
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 border-4 ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-100 text-white shadow-lg scale-110'
                        : isPast
                          ? 'bg-green-500 border-green-100 text-white'
                          : isDark 
                            ? 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
                            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl">{isPast ? '✓' : section.icon}</span>
                  </button>
                  <span className={`mt-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive 
                      ? (isDark ? 'text-white' : 'text-indigo-600') 
                      : (isDark ? 'text-gray-500' : 'text-gray-500')
                  }`}>
                    {section.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Content */}
        <form onSubmit={handleSubmit} className="animate-fade-in-up">
          <Card className={`overflow-hidden shadow-xl rounded-2xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="p-6 sm:p-8">
              
              {/* Basic Information Section */}
              {activeSection === 'basic' && (
                <div className="space-y-8">
                  <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <span className="text-2xl">📝</span> Basic Information
                    </h2>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Define the core details of your assessment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
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
                          className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                          <option value="mixed">Mixed (MCQ + Coding)</option>
                          <option value="mcq">Multiple Choice Only</option>
                          <option value="coding">Coding Only</option>
                          <option value="essay">Essay Only</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
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
                  <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <span className="text-2xl">⚙️</span> Exam Configuration
                    </h2>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Adjust scoring and proctoring controls.
                    </p>
                  </div>

                  <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Scoring Rules</h3>
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

                  <div className="space-y-4">
                    <h3 className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Advanced Controls</h3>
                    
                    {[
                      { id: 'randomizeQuestions', label: 'Randomize Questions', desc: 'Shuffle question order for each student' },
                      { id: 'showResults', label: 'Show Results Immediately', desc: 'Allow students to see score after submission' },
                      { id: 'enableProctoring', label: 'Enable AI Proctoring', desc: 'Monitor tab switching and presence' }
                    ].map((setting) => (
                      <div key={setting.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isDark ? 'bg-gray-700/30 border-gray-700 hover:bg-gray-700/50' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex flex-col">
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{setting.label}</span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{setting.desc}</span>
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
                          <div className={`w-11 h-6 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 transition-colors ${
                            isDark 
                              ? 'bg-gray-600 peer-checked:bg-indigo-500' 
                              : 'bg-gray-200 peer-checked:bg-indigo-600'
                          }`}></div>
                          <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform peer-checked:translate-x-full peer-checked:border-white`}></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions Section */}
              {activeSection === 'questions' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 border-gray-200 dark:border-gray-700 gap-4">
                    <div>
                      <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <span className="text-2xl">❓</span> Manage Questions
                      </h2>
                      <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Total Questions: <span className="font-semibold text-indigo-500">{questions.length}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-colors shadow-sm"
                    >
                      <span className="mr-2">➕</span> Add Question
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {questions.length === 0 ? (
                      <div className={`text-center py-12 border-2 border-dashed rounded-xl ${isDark ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-400'}`}>
                        <p>No questions added yet.</p>
                        <button type="button" onClick={handleAddQuestion} className="mt-2 text-indigo-500 hover:underline">Add your first question</button>
                      </div>
                    ) : (
                      questions.map((question, index) => (
                        <div key={question.id} className={`group relative p-5 rounded-xl border transition-all duration-200 hover:shadow-md ${
                          isDark ? 'bg-gray-700/50 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-indigo-200'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-8">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                  isDark ? 'bg-gray-600 text-gray-300' : 'bg-indigo-50 text-indigo-600'
                                }`}>
                                  {index + 1}
                                </span>
                                <Badge variant={getTypeBadge(question.type).color}>
                                  {getTypeBadge(question.type).label}
                                </Badge>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                  {question.points} Pts
                                </span>
                              </div>
                              <h3 className={`text-base font-medium ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                {question.text}
                              </h3>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(question.id)}
                              className={`absolute top-4 right-4 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all ${
                                isDark 
                                  ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600' 
                                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                              }`}
                              title="Remove Question"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className={`p-4 rounded-lg flex gap-3 ${isDark ? 'bg-blue-900/20 text-blue-200 border border-blue-900/50' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                    <span className="text-xl">💡</span>
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Tips for effective questions:</p>
                      <ul className="list-disc list-inside space-y-0.5 opacity-90">
                        <li>Mix question types to test different skills.</li>
                        <li>Ensure point distribution matches difficulty.</li>
                        <li>Review text for clarity.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Review Section */}
              {activeSection === 'review' && (
                <div className="space-y-8">
                  <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <span className="text-2xl">👁️</span> Final Review
                    </h2>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Verify all details before publishing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${isDark ? 'text-white border-gray-600' : 'text-gray-800 border-gray-200'}`}>
                        Exam Details
                      </h3>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>Title:</dt>
                          <dd className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{examData.title || <span className="italic opacity-50">Not set</span>}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>Course:</dt>
                          <dd className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{examData.course || <span className="italic opacity-50">Not set</span>}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>Duration:</dt>
                          <dd className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{examData.duration} mins</dd>
                        </div>
                        <div className="flex justify-between items-center">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>Type:</dt>
                          <dd><Badge variant={getTypeBadge(examData.type).color}>{getTypeBadge(examData.type).label}</Badge></dd>
                        </div>
                      </dl>
                    </div>

                    <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${isDark ? 'text-white border-gray-600' : 'text-gray-800 border-gray-200'}`}>
                        Configuration
                      </h3>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Questions:</dt>
                          <dd className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{questions.length}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>Max / Passing:</dt>
                          <dd className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{examData.maxScore} / {examData.passingScore}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>AI Proctoring:</dt>
                          <dd className={`font-medium flex items-center ${examData.enableProctoring ? 'text-green-600' : 'text-gray-500'}`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${examData.enableProctoring ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            {examData.enableProctoring ? 'Active' : 'Disabled'}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className={isDark ? 'text-gray-400' : 'text-gray-500'}>Randomization:</dt>
                          <dd className={`font-medium flex items-center ${examData.randomizeQuestions ? 'text-green-600' : 'text-gray-500'}`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${examData.randomizeQuestions ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            {examData.randomizeQuestions ? 'Active' : 'Disabled'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg flex items-start gap-3 ${isDark ? 'bg-yellow-900/20 text-yellow-200 border border-yellow-900/50' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                    <span className="text-xl">⚠️</span>
                    <div className="text-sm">
                      <p className="font-bold">Important Notes</p>
                      <p className="mt-1 opacity-90">Once published, core settings cannot be modified. Ensure dates and times are correct to prevent access issues.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className={`px-6 sm:px-8 py-5 border-t flex flex-col-reverse sm:flex-row justify-between gap-4 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={activeSection === sections[0].id}
              >
                ← Previous Step
              </Button>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" variant="outline" className="w-full sm:w-auto">
                  Save Draft
                </Button>
                
                {activeSection === sections[sections.length - 1].id ? (
                  <Button type="submit" variant="primary" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30">
                    🚀 Create Exam
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1].id);
                      }
                    }}
                  >
                    Next Step →
                  </Button>
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