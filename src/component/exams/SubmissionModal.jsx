import React from 'react';
import ProgressBar from '../common/ProgressBar';
import { useTheme } from '../../context/ThemeContext';

const SubmissionModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  examInfo,
  submissionStats
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  // Theme-based classes
  const overlayClasses = `fixed inset-0 transition-opacity ${isDark ? 'bg-gray-900 bg-opacity-75' : 'bg-gray-500 bg-opacity-75'}`;
  const modalClasses = `inline-block align-bottom rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const textClasses = isDark ? 'text-gray-300' : 'text-gray-900';
  const mutedTextClasses = isDark ? 'text-gray-400' : 'text-gray-600';
  const sectionBgClasses = isDark ? 'bg-gray-700/50' : 'bg-gray-50';
  const warningBgClasses = isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200';
  const warningTextClasses = isDark ? 'text-red-300' : 'text-red-700';
  const warningTitleClasses = isDark ? 'text-red-200' : 'text-red-800';
  const borderClasses = isDark ? 'border-gray-700' : 'border-gray-200';
  const buttonClasses = (isPrimary = false) => 
    `flex-1 px-4 py-3 rounded-lg font-medium ${
      isPrimary 
        ? 'bg-red-600 hover:bg-red-700 text-white'
        : isDark 
          ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
          : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className={overlayClasses}
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className={modalClasses}>
          <div className={`px-6 pt-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${
                isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'
              }`}>
                <span className="text-2xl text-yellow-600">⚠️</span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${textClasses}`}>
                Submit Your Exam?
              </h3>
              <p className={`${mutedTextClasses} mb-6`}>
                Are you sure you want to submit your exam? This action cannot be undone.
              </p>
            </div>

            {/* Exam Info */}
            <div className={`rounded-lg p-4 mb-6 ${sectionBgClasses}`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className={`text-sm ${mutedTextClasses}`}>Exam</div>
                  <div className={`font-medium ${textClasses}`}>{examInfo.title}</div>
                </div>
                <div>
                  <div className={`text-sm ${mutedTextClasses}`}>Time Remaining</div>
                  <div className="font-medium text-green-600">{examInfo.timeRemaining}</div>
                </div>
              </div>
            </div>

            {/* Submission Stats */}
            <div className="space-y-6 mb-8">
              <div>
                <div className={`flex justify-between text-sm mb-2 ${mutedTextClasses}`}>
                  <span>Answered Questions</span>
                  <span>{submissionStats.answered}/{submissionStats.total}</span>
                </div>
                <ProgressBar 
                  value={submissionStats.answered} 
                  max={submissionStats.total}
                  color="primary"
                  isDark={isDark}
                />
              </div>

              <div>
                <div className={`flex justify-between text-sm mb-2 ${mutedTextClasses}`}>
                  <span>Flagged Questions</span>
                  <span>{submissionStats.flagged}</span>
                </div>
                <ProgressBar 
                  value={submissionStats.flagged} 
                  max={submissionStats.total}
                  color="warning"
                  isDark={isDark}
                />
              </div>

              <div>
                <div className={`flex justify-between text-sm mb-2 ${mutedTextClasses}`}>
                  <span>Unanswered Questions</span>
                  <span>{submissionStats.total - submissionStats.answered}</span>
                </div>
                <ProgressBar 
                  value={submissionStats.total - submissionStats.answered} 
                  max={submissionStats.total}
                  color="danger"
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Warnings */}
            <div className={`rounded-lg p-4 mb-6 border ${warningBgClasses}`}>
              <div className="flex items-start">
                <span className="text-red-600 mr-2">⚠️</span>
                <div>
                  <h4 className={`font-medium mb-1 ${warningTitleClasses}`}>Important Notes</h4>
                  <ul className={`text-sm list-disc pl-4 space-y-1 ${warningTextClasses}`}>
                    <li>Once submitted, you cannot return to the exam</li>
                    <li>All unanswered questions will be marked as incorrect</li>
                    <li>Your exam will be automatically graded</li>
                    <li>Results will be available after teacher review</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={`px-6 py-4 border-t ${borderClasses} ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex justify-between space-x-4">
              <button
                onClick={onClose}
                className={buttonClasses(false)}
              >
                Cancel and Return
              </button>
              <button
                onClick={handleSubmit}
                className={buttonClasses(true)}
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;