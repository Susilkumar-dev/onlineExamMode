import { EXAM_TYPES, QUESTION_DIFFICULTY } from './constants';

// Calculate exam statistics
export const calculateExamStats = (exam, submissions) => {
  const totalSubmissions = submissions.length;
  const completedSubmissions = submissions.filter(s => s.status === 'completed').length;
  const averageScore = submissions.length > 0 
    ? submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length
    : 0;
  
  return {
    totalSubmissions,
    completionRate: (completedSubmissions / totalSubmissions) * 100,
    averageScore,
    highestScore: Math.max(...submissions.map(s => s.score)),
    lowestScore: Math.min(...submissions.map(s => s.score))
  };
};

// Validate exam configuration
export const validateExamConfig = (config) => {
  const errors = {};
  
  if (!config.title || config.title.trim().length < 3) {
    errors.title = 'Exam title must be at least 3 characters';
  }
  
  if (!config.duration || config.duration < 1) {
    errors.duration = 'Duration must be at least 1 minute';
  }
  
  if (!config.startDate || !config.endDate) {
    errors.date = 'Start and end dates are required';
  } else if (new Date(config.startDate) >= new Date(config.endDate)) {
    errors.date = 'End date must be after start date';
  }
  
  if (!config.questions || config.questions.length === 0) {
    errors.questions = 'At least one question is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Generate exam code
export const generateExamCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Calculate time remaining
export const calculateTimeRemaining = (startTime, duration) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60000);
  
  if (now > end) return 0;
  
  const remaining = end - now;
  return Math.floor(remaining / 1000); // Return in seconds
};

// Check if exam is accessible
export const isExamAccessible = (exam, user) => {
  const now = new Date();
  const start = new Date(exam.startDate);
  const end = new Date(exam.endDate);
  
  if (now < start) return false; // Exam hasn't started
  if (now > end) return false; // Exam has ended
  
  // Check if user is enrolled/authorized
  if (exam.restricted && !exam.allowedUsers.includes(user.id)) {
    return false;
  }
  
  return true;
};

// Calculate question points
export const calculateQuestionPoints = (question, answer) => {
  if (!answer) return 0;
  
  switch (question.type) {
    case EXAM_TYPES.MCQ:
    case EXAM_TYPES.TRUE_FALSE:
      return answer === question.correctAnswer ? question.points : 0;
    
    case EXAM_TYPES.CODING:
      // For coding questions, need to run tests
      return 0; // Will be calculated separately
    
    case EXAM_TYPES.ESSAY:
    case EXAM_TYPES.SHORT_ANSWER:
      return 0; // Needs manual grading
    
    default:
      return 0;
  }
};

// Generate exam report
export const generateExamReport = (exam, submissions) => {
  const stats = calculateExamStats(exam, submissions);
  
  return {
    exam: {
      id: exam.id,
      title: exam.title,
      totalQuestions: exam.questions.length,
      totalPoints: exam.questions.reduce((sum, q) => sum + q.points, 0)
    },
    statistics: stats,
    submissions: submissions.map(submission => ({
      student: submission.student,
      score: submission.score,
      percentage: (submission.score / exam.maxScore) * 100,
      timeSpent: submission.timeSpent,
      submittedAt: submission.submittedAt
    })),
    generatedAt: new Date().toISOString()
  };
};