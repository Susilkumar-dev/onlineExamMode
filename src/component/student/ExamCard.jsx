import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';

const ExamCard = ({ exam, showAction = true }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'warning';
      case 'completed': return 'success';
      case 'missed': return 'danger';
      case 'active': return 'primary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'coding': return '💻';
      case 'mcq': return '📝';
      case 'mixed': return '🔀';
      default: return '📄';
    }
  };

  const getActionButton = () => {
    switch(exam.status) {
      case 'upcoming':
        return (
          <Link
            to={`/student/take-exam/${exam.id}`}
            className="btn-primary px-6 py-2 rounded-lg text-sm"
          >
            Start Exam
          </Link>
        );
      case 'completed':
        return (
          <Link
            to={`/student/results/${exam.id}`}
            className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 text-sm"
          >
            View Results
          </Link>
        );
      case 'missed':
        return (
          <button className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm" disabled>
            Missed
          </button>
        );
      case 'active':
        return (
          <Link
            to={`/student/take-exam/${exam.id}`}
            className="btn-primary px-6 py-2 rounded-lg text-sm"
          >
            Continue
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{getTypeIcon(exam.type)}</span>
              <h3 className="text-lg font-bold text-gray-900">{exam.title}</h3>
            </div>
            <p className="text-gray-600">{exam.course}</p>
          </div>
          <Badge variant={getStatusColor(exam.status)}>
            {exam.status.toUpperCase()}
          </Badge>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-500">Date & Time</div>
            <div className="font-medium">{exam.date}</div>
            <div className="text-sm text-gray-600">{exam.time}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Duration</div>
            <div className="font-medium">{exam.duration}</div>
          </div>
        </div>

        {/* Progress/Score (for completed exams) */}
        {exam.score !== undefined && (
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Score</span>
              <span className="text-sm font-bold text-green-600">{exam.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${exam.score}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {showAction && (
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-500">
              {exam.status === 'upcoming' && 'Starts in 2 days'}
              {exam.status === 'completed' && 'Completed successfully'}
              {exam.status === 'missed' && 'Exam window closed'}
              {exam.status === 'active' && 'In progress'}
            </div>
            {getActionButton()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCard;