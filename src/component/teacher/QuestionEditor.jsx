import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const QuestionEditor = () => {
  const { isDark } = useTheme();
  const [question, setQuestion] = useState({
    text: '',
    type: 'mcq',
    points: 5,
    options: [
      { id: 1, text: '', isCorrect: false },
      { id: 2, text: '', isCorrect: false },
      { id: 3, text: '', isCorrect: false },
      { id: 4, text: '', isCorrect: false }
    ],
    correctAnswer: '',
    explanation: '',
    category: '',
    difficulty: 'medium',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (id, field, value) => {
    setQuestion(prev => ({
      ...prev,
      options: prev.options.map(opt => 
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    }));
  };

  const addOption = () => {
    const newId = question.options.length > 0 
      ? Math.max(...question.options.map(o => o.id)) + 1 
      : 1;
    setQuestion(prev => ({
      ...prev,
      options: [...prev.options, { id: newId, text: '', isCorrect: false }]
    }));
  };

  const removeOption = (id) => {
    if (question.options.length > 2) {
      setQuestion(prev => ({
        ...prev,
        options: prev.options.filter(opt => opt.id !== id)
      }));
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !question.tags.includes(tagInput.trim())) {
      setQuestion(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setQuestion(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Question saved:', question);
    alert('Question saved successfully!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      e.preventDefault();
      handleTagAdd();
    }
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

  const inputClasses = `w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
    isDark 
      ? 'bg-dark-700 border-dark-600 text-gray-300 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500/20' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500'
  }`;

  const labelClasses = `block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  const buttonPrimary = `px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
    isDark
      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
      : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
  } shadow-lg hover:shadow-xl`;

  const buttonSecondary = `px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
    isDark
      ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
  } shadow-lg hover:shadow-xl`;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-6">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>Question Editor</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Create
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              New Question
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Design and configure questions for assessments and quizzes
          </p>
        </div>

        <div className={`rounded-2xl p-6 transition-all duration-300 ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg hover:shadow-xl`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-dark-700' : 'bg-gray-100'
            }`}>
              ❓
            </div>
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Question Editor
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question Text */}
            <div>
              <label className={labelClasses}>
                Question Text *
              </label>
              <textarea
                name="text"
                value={question.text}
                onChange={handleQuestionChange}
                required
                rows="3"
                className={inputClasses}
                placeholder="Enter your question here..."
              />
            </div>

            {/* Question Details */}
            <div className={`p-6 rounded-xl ${
              isDark 
                ? 'bg-dark-700/30 border border-dark-700' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span>📋</span> Question Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClasses}>
                    Question Type *
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      value={question.type}
                      onChange={handleQuestionChange}
                      className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                    >
                      <option value="mcq">Multiple Choice</option>
                      <option value="coding">Coding</option>
                      <option value="essay">Essay</option>
                      <option value="truefalse">True/False</option>
                      <option value="shortanswer">Short Answer</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>
                    Points *
                  </label>
                  <input
                    type="number"
                    name="points"
                    value={question.points}
                    onChange={handleQuestionChange}
                    required
                    min="1"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>
                    Difficulty *
                  </label>
                  <div className="relative">
                    <select
                      name="difficulty"
                      value={question.difficulty}
                      onChange={handleQuestionChange}
                      className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <span className={`text-sm ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className={labelClasses}>
                Category
              </label>
              <input
                type="text"
                name="category"
                value={question.category}
                onChange={handleQuestionChange}
                className={inputClasses}
                placeholder="e.g., Data Structures, Algorithms, Web Development"
              />
            </div>

            {/* MCQ Options (only show for MCQ type) */}
            {question.type === 'mcq' && (
              <div className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-dark-700/30 border border-dark-700' 
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`font-semibold flex items-center gap-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span>🔘</span> Multiple Choice Options *
                  </h3>
                  <button
                    type="button"
                    onClick={addOption}
                    className={`text-sm font-medium ${
                      isDark 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-700'
                    }`}
                  >
                    + Add Option
                  </button>
                </div>
                
                <div className="space-y-4">
                  {question.options.map((option, index) => (
                    <div key={option.id} className={`flex items-center gap-4 p-4 rounded-xl ${
                      isDark 
                        ? 'bg-dark-700/50 hover:bg-dark-700' 
                        : 'bg-white hover:bg-gray-50'
                    } border transition-colors duration-300 ${
                      isDark ? 'border-dark-600' : 'border-gray-200'
                    }`}>
                      <div className="flex-shrink-0">
                        <input
                          type="radio"
                          name="correctOption"
                          checked={option.isCorrect}
                          onChange={() => {
                            const newOptions = question.options.map(opt => ({
                              ...opt,
                              isCorrect: opt.id === option.id
                            }));
                            setQuestion(prev => ({ ...prev, options: newOptions }));
                          }}
                          className={`h-5 w-5 cursor-pointer ${
                            isDark 
                              ? 'text-primary-500 border-dark-500 bg-dark-700' 
                              : 'text-primary-600 border-gray-300'
                          }`}
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            isDark 
                              ? 'bg-dark-600 text-gray-300' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option.isCorrect && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                            }`}>
                              ✓ Correct Answer
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                          placeholder={`Enter option ${index + 1} text...`}
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            isDark 
                              ? 'bg-dark-600 border-dark-500 text-gray-300 placeholder-gray-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                        />
                      </div>
                      
                      {question.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(option.id)}
                          className={`flex-shrink-0 p-2 rounded-lg ${
                            isDark 
                              ? 'text-gray-400 hover:text-red-400 hover:bg-dark-600' 
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                          title="Remove Option"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className={`mt-4 p-3 rounded-lg ${
                  isDark ? 'bg-dark-700/50 text-gray-400' : 'bg-gray-100 text-gray-600'
                } text-sm`}>
                  <div className="flex items-center gap-2">
                    <span>💡</span>
                    <span>Select one correct answer by clicking the radio button</span>
                  </div>
                </div>
              </div>
            )}

            {/* Coding Question (only show for coding type) */}
            {question.type === 'coding' && (
              <div className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-dark-700/30 border border-dark-700' 
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>💻</span> Coding Solution
                </h3>
                
                <label className={labelClasses}>
                  Expected Solution
                </label>
                <div className={`rounded-xl overflow-hidden border ${
                  isDark ? 'border-dark-600' : 'border-gray-300'
                }`}>
                  <div className={`px-4 py-2 flex items-center justify-between ${
                    isDark ? 'bg-dark-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="text-sm font-medium">solution.js</span>
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-xs px-2 py-1 rounded">
                        Copy
                      </button>
                      <button type="button" className="text-xs px-2 py-1 rounded">
                        Format
                      </button>
                    </div>
                  </div>
                  <textarea
                    name="correctAnswer"
                    value={question.correctAnswer}
                    onChange={handleQuestionChange}
                    rows="8"
                    className={`w-full px-4 py-3 font-mono text-sm focus:outline-none ${
                      isDark 
                        ? 'bg-dark-800 text-gray-300 placeholder-gray-500' 
                        : 'bg-white text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="// Write the expected solution code here..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Language
                    </label>
                    <select className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-dark-700 border-dark-600 text-gray-300' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      <option>JavaScript</option>
                      <option>Python</option>
                      <option>Java</option>
                      <option>C++</option>
                      <option>TypeScript</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Time Complexity
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDark 
                          ? 'bg-dark-700 border-dark-600 text-gray-300' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="e.g., O(n)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Explanation */}
            <div>
              <label className={labelClasses}>
                Explanation (for correct answer)
              </label>
              <textarea
                name="explanation"
                value={question.explanation}
                onChange={handleQuestionChange}
                rows="3"
                className={inputClasses}
                placeholder="Explain why the correct answer is right and provide additional context..."
              />
            </div>

            {/* Tags */}
            <div className={`p-6 rounded-xl ${
              isDark 
                ? 'bg-dark-700/30 border border-dark-700' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span>🏷️</span> Tags & Metadata
              </h3>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`flex-grow px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isDark 
                      ? 'bg-dark-700 border-dark-600 text-gray-300 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                  placeholder="Enter a tag and press Enter"
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-primary-900/30 text-primary-400 hover:bg-primary-900/50' 
                        : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                    }`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className={`ml-2 p-1 rounded-full ${
                        isDark ? 'hover:bg-primary-900' : 'hover:bg-primary-200'
                      }`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              {question.tags.length === 0 && (
                <div className={`mt-4 p-3 rounded-lg ${
                  isDark ? 'bg-dark-700/50 text-gray-400' : 'bg-gray-100 text-gray-600'
                } text-sm`}>
                  <div className="flex items-center gap-2">
                    <span>💡</span>
                    <span>Add tags to categorize your question (e.g., "arrays", "recursion", "async")</span>
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            <div className={`p-6 rounded-xl ${
              isDark 
                ? 'bg-dark-700/30 border border-dark-700' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span>👁️</span> Question Preview
              </h3>
              
              <div className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-dark-800 border border-dark-700' 
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getDifficultyBg(question.difficulty)} ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty.toUpperCase()}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      isDark ? 'bg-dark-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {question.points} Points
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Type: {question.type.toUpperCase()}
                  </span>
                </div>
                
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {question.text || <span className="italic opacity-50">Question text will appear here</span>}
                </p>
                
                {question.type === 'mcq' && (
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <div key={option.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                        option.isCorrect
                          ? isDark
                            ? 'bg-green-900/30 border border-green-800'
                            : 'bg-green-50 border border-green-200'
                          : isDark
                            ? 'bg-dark-700 border border-dark-600'
                            : 'bg-gray-100 border border-gray-200'
                      }`}>
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          isDark 
                            ? 'bg-dark-600 text-gray-300' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {option.text || <span className="italic opacity-50">Option {index + 1}</span>}
                        </span>
                        {option.isCorrect && (
                          <span className="ml-auto text-green-500">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className={`pt-8 border-t ${
              isDark ? 'border-dark-700' : 'border-gray-200'
            }`}>
              <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
                <div>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    All changes are auto-saved
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuestion({
                        text: '',
                        type: 'mcq',
                        points: 5,
                        options: [
                          { id: 1, text: '', isCorrect: false },
                          { id: 2, text: '', isCorrect: false },
                          { id: 3, text: '', isCorrect: false },
                          { id: 4, text: '', isCorrect: false }
                        ],
                        correctAnswer: '',
                        explanation: '',
                        category: '',
                        difficulty: 'medium',
                        tags: []
                      });
                      setTagInput('');
                    }}
                    className={buttonSecondary}
                  >
                    Clear All
                  </button>
                  <button
                    type="submit"
                    className={buttonPrimary}
                  >
                    💾 Save Question
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;