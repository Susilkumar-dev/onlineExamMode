export const EXAM_TYPES = {
  MCQ: 'mcq',
  CODING: 'coding',
  ESSAY: 'essay',
  MIXED: 'mixed',
  TRUE_FALSE: 'truefalse',
  SHORT_ANSWER: 'shortanswer'
};

export const QUESTION_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const EXAM_STATUS = {
  DRAFT: 'draft',
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ARCHIVED: 'archived'
};

export const SUBMISSION_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  REVIEWED: 'reviewed'
};

export const PROCTORING_ALERTS = {
  MULTIPLE_FACES: 'multiple_faces',
  NO_FACE: 'no_face',
  PHONE_DETECTED: 'phone_detected',
  VOICE_DETECTED: 'voice_detected',
  TAB_SWITCH: 'tab_switch'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 25, 50]
};