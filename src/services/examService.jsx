import { examAPI, questionAPI } from './api';

class ExamService {
  // Get all exams
  async getExams(params = {}) {
    try {
      const response = await examAPI.getExams(params);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch exams');
    }
  }

  // Get single exam
  async getExam(id) {
    try {
      const response = await examAPI.getExam(id);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch exam');
    }
  }

  // Create exam
  async createExam(examData) {
    try {
      const response = await examAPI.createExam(examData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create exam');
    }
  }

  // Update exam
  async updateExam(id, examData) {
    try {
      const response = await examAPI.updateExam(id, examData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update exam');
    }
  }

  // Delete exam
  async deleteExam(id) {
    try {
      const response = await examAPI.deleteExam(id);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete exam');
    }
  }

  // Start exam
  async startExam(id) {
    try {
      const response = await examAPI.startExam(id);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to start exam');
    }
  }

  // Submit exam
  async submitExam(id, answers) {
    try {
      const response = await examAPI.submitExam(id, { answers });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit exam');
    }
  }

  // Get exam results
  async getResults(examId) {
    try {
      const response = await examAPI.getResults(examId);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch results');
    }
  }

  // Get user's exams
  async getMyExams() {
    try {
      const response = await examAPI.getMyExams();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch your exams');
    }
  }

  // Get questions
  async getQuestions(params = {}) {
    try {
      const response = await questionAPI.getQuestions(params);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch questions');
    }
  }

  // Create question
  async createQuestion(questionData) {
    try {
      const response = await questionAPI.createQuestion(questionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create question');
    }
  }

  // Bulk upload questions
  async uploadBulkQuestions(file) {
    try {
      const response = await questionAPI.uploadBulkQuestions(file);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload questions');
    }
  }

  // Validate exam access
  async validateExamAccess(examId) {
    try {
      const exam = await this.getExam(examId);
      const now = new Date();
      const start = new Date(exam.startDate);
      const end = new Date(exam.endDate);

      if (now < start) {
        throw new Error('Exam has not started yet');
      }

      if (now > end) {
        throw new Error('Exam has ended');
      }

      return { valid: true, exam };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  // Calculate exam statistics
  calculateExamStats(exam, submissions) {
    const totalSubmissions = submissions.length;
    const completedSubmissions = submissions.filter(s => s.status === 'completed').length;
    const averageScore = submissions.length > 0 
      ? submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length
      : 0;

    return {
      totalSubmissions,
      completionRate: totalSubmissions > 0 ? (completedSubmissions / totalSubmissions) * 100 : 0,
      averageScore,
      highestScore: submissions.length > 0 ? Math.max(...submissions.map(s => s.score)) : 0,
      lowestScore: submissions.length > 0 ? Math.min(...submissions.map(s => s.score)) : 0,
      passRate: submissions.length > 0 
        ? (submissions.filter(s => s.score >= exam.passingScore).length / submissions.length) * 100 
        : 0
    };
  }
}

export default new ExamService();