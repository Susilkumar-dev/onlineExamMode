import React, { useState } from 'react';

const QuestionEditor = () => {
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
    alert('Question saved successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Create Question</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text *
          </label>
          <textarea
            name="text"
            value={question.text}
            onChange={handleQuestionChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your question here..."
          />
        </div>

        {/* Question Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type *
            </label>
            <select
              name="type"
              value={question.type}
              onChange={handleQuestionChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="coding">Coding</option>
              <option value="essay">Essay</option>
              <option value="truefalse">True/False</option>
              <option value="shortanswer">Short Answer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Points *
            </label>
            <input
              type="number"
              name="points"
              value={question.points}
              onChange={handleQuestionChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty *
            </label>
            <select
              name="difficulty"
              value={question.difficulty}
              onChange={handleQuestionChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={question.category}
            onChange={handleQuestionChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="e.g., Data Structures, Algorithms"
          />
        </div>

        {/* MCQ Options (only show for MCQ type) */}
        {question.type === 'mcq' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Options *</h3>
              <button
                type="button"
                onClick={addOption}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                + Add Option
              </button>
            </div>
            
            {question.options.map((option, index) => (
              <div key={option.id} className="flex items-center space-x-4">
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
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Coding Question (only show for coding type) */}
        {question.type === 'coding' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Solution
            </label>
            <textarea
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={handleQuestionChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
              placeholder="Write the expected solution code..."
            />
          </div>
        )}

        {/* Explanation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Explanation (for correct answer)
          </label>
          <textarea
            name="explanation"
            value={question.explanation}
            onChange={handleQuestionChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Explain why the correct answer is right..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Save Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionEditor;