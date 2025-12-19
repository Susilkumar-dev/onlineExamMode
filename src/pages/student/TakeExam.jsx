import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Timer from '../../component/student/Timer';
import MCQQuestion from '../../component/student/MCQQuestion';
import CodeEditor from '../../component/student/CodeEditor';
import QuestionNavigation from '../../component/exams/QuestionNavigation';
import ProctoringAlert from '../../component/exams/ProctoringAlert';
import SubmissionModal from '../../component/exams/SubmissionModal';

const TakeExam = () => {
  const { isDark } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const exam = {
    id: 1,
    title: 'Data Structures Final',
    duration: 7200, // 2 hours in seconds
    totalQuestions: 3,
    questions: [
      {
        id: 1,
        text: 'What is the time complexity of binary search?',
        type: 'mcq',
        points: 5,
        difficulty: 'easy',
        options: [
          { id: 1, text: 'O(1)', isCorrect: false },
          { id: 2, text: 'O(log n)', isCorrect: true },
          { id: 3, text: 'O(n)', isCorrect: false },
          { id: 4, text: 'O(n²)', isCorrect: false }
        ]
      },
      {
        id: 2,
        text: 'Implement a function to reverse a linked list',
        type: 'coding',
        points: 10,
        difficulty: 'medium',
        initialCode: 'function reverseLinkedList(head) {\n  // Write your code here\n  return head;\n}'
      },
      {
        id: 3,
        text: 'What is the difference between stack and queue?',
        type: 'mcq',
        points: 5,
        difficulty: 'easy',
        options: [
          { id: 1, text: 'Stack is LIFO, Queue is FIFO', isCorrect: true },
          { id: 2, text: 'Stack is FIFO, Queue is LIFO', isCorrect: false },
          { id: 3, text: 'Both are LIFO', isCorrect: false },
          { id: 4, text: 'Both are FIFO', isCorrect: false }
        ]
      }
    ]
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleFlagQuestion = (questionId) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  const handleSubmitExam = () => {
    setShowSubmissionModal(false);
    navigate('/student/results');
  };

  const handleTimeUp = () => {
    alert('Time is up! Submitting your exam...');
    handleSubmitExam();
  };

  const currentQuestionData = exam.questions.find(q => q.id === currentQuestion);

  // Calculate progress
  const progress = (Object.keys(answers).length / exam.totalQuestions) * 100;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'} p-4`}>
      {/* Header */}
      <div className={`rounded-xl p-4 mb-6 shadow-lg ${
        isDark ? 'bg-dark-800' : 'bg-white'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {exam.title}
            </h1>
            <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Question {currentQuestion} of {exam.totalQuestions} • {currentQuestionData.points} points
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <Timer 
              initialTime={exam.duration}
              onTimeUp={handleTimeUp}
              format="compact"
            />
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowSubmissionModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
              >
                Submit
              </button>
              
              <button
                onClick={() => navigate('/student/exams')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDark 
                    ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Exit
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Progress: {Object.keys(answers).length}/{exam.totalQuestions} answered
            </span>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className={`w-full rounded-full h-2 ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Area */}
        <div className="lg:col-span-3">
          <div className={`rounded-xl shadow-lg p-6 ${
            isDark ? 'bg-dark-800' : 'bg-white'
          }`}>
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentQuestionData.type === 'mcq' 
                    ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    : isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  {currentQuestionData.type === 'mcq' ? '📝' : '💻'}
                </div>
                <div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentQuestionData.type === 'mcq' ? 'Multiple Choice' : 'Coding Problem'}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Difficulty: {currentQuestionData.difficulty}
                  </div>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm ${
                flaggedQuestions.includes(currentQuestion)
                  ? isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                  : isDark ? 'bg-dark-700 text-gray-400' : 'bg-gray-100 text-gray-600'
              }`}>
                {flaggedQuestions.includes(currentQuestion) ? '⭐ Flagged' : '☆ Flag'}
              </div>
            </div>

            {/* Question Content */}
            <h2 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentQuestionData.text}
            </h2>

            {currentQuestionData.type === 'mcq' ? (
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <div
                    key={option.id}
                    onClick={() => handleAnswerSelect(currentQuestion, option.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion] === option.id
                        ? isDark
                          ? 'bg-primary-900/30 border-2 border-primary-500'
                          : 'bg-primary-50 border-2 border-primary-500'
                        : isDark
                          ? 'bg-dark-700 hover:bg-dark-600 border border-dark-600'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        answers[currentQuestion] === option.id
                          ? isDark ? 'bg-primary-500 text-white' : 'bg-primary-600 text-white'
                          : isDark ? 'bg-dark-600 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {option.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Write your solution in the editor below. Your code will be automatically tested.
                  </p>
                </div>
                
                <CodeEditor
                  language="javascript"
                  initialCode={currentQuestionData.initialCode}
                  onCodeChange={(code) => handleAnswerSelect(currentQuestion, code)}
                  height="300px"
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
                disabled={currentQuestion === 1}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentQuestion === 1
                    ? isDark 
                      ? 'bg-dark-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isDark
                      ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ← Previous
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleFlagQuestion(currentQuestion)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    flaggedQuestions.includes(currentQuestion)
                      ? isDark
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : isDark
                        ? 'bg-dark-700 text-gray-400 hover:bg-dark-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {flaggedQuestions.includes(currentQuestion) ? 'Remove Flag' : 'Flag'}
                </button>
                
                {currentQuestion < exam.totalQuestions ? (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      isDark
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmissionModal(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  >
                    Final Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Question Navigator */}
          <QuestionNavigation
            questions={exam.questions}
            currentQuestion={currentQuestion}
            onQuestionSelect={setCurrentQuestion}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
          />

          {/* Instructions */}
          <div className={`rounded-xl p-6 shadow-lg ${
            isDark ? 'bg-dark-800' : 'bg-white'
          }`}>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              💡 Tips & Instructions
            </h3>
            <ul className="space-y-3">
              <li className={`flex items-start text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="mr-2">✓</span>
                <span>Answers are auto-saved</span>
              </li>
              <li className={`flex items-start text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="mr-2">⏱️</span>
                <span>Timer continues even if you leave</span>
              </li>
              <li className={`flex items-start text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="mr-2">⭐</span>
                <span>Flag questions to review later</span>
              </li>
              <li className={`flex items-start text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="mr-2">👁️</span>
                <span>Proctoring is active</span>
              </li>
              <li className={`flex items-start text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="mr-2">⚠️</span>
                <span>Don't refresh or close this page</span>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowAlert(true)}
                className={`w-full py-2 rounded-lg font-medium text-sm ${
                  isDark
                    ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Test Proctoring Alert
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`rounded-xl p-6 shadow-lg ${
            isDark ? 'bg-dark-800' : 'bg-white'
          }`}>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📊 Exam Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Answered</span>
                  <span className="font-medium text-green-500">
                    {Object.keys(answers).length}/{exam.totalQuestions}
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(Object.keys(answers).length / exam.totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Flagged</span>
                  <span className="font-medium text-yellow-500">
                    {flaggedQuestions.length}
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(flaggedQuestions.length / exam.totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className={`p-3 rounded-lg text-center ${
                  isDark ? 'bg-dark-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Time Left</div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Timer 
                      initialTime={exam.duration}
                      format="compact"
                    />
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg text-center ${
                  isDark ? 'bg-dark-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current</div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Q{currentQuestion}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proctoring Alert */}
      {showAlert && (
        <ProctoringAlert
          type="warning"
          message="Multiple faces detected. Please ensure you're alone in the room."
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmitExam}
        examInfo={{
          title: exam.title,
          timeRemaining: '45:30'
        }}
        submissionStats={{
          answered: Object.keys(answers).length,
          total: exam.totalQuestions,
          flagged: flaggedQuestions.length
        }}
      />

      {/* Bottom Help Bar */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 ${
        isDark ? 'bg-dark-800' : 'bg-white'
      } border-t shadow-lg lg:hidden`}>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
            className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            ← Prev
          </button>
          
          <div className="text-center">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Question {currentQuestion}/{exam.totalQuestions}
            </div>
          </div>
          
          <button
            onClick={() => currentQuestion < exam.totalQuestions 
              ? setCurrentQuestion(currentQuestion + 1)
              : setShowSubmissionModal(true)
            }
            className={`px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-primary-600 text-white hover:bg-primary-700' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {currentQuestion < exam.totalQuestions ? 'Next →' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;