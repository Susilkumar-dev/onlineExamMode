import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import examService from '../../services/examService';

// Async thunks
export const fetchExams = createAsyncThunk(
  'exams/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await examService.getExams(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchExam = createAsyncThunk(
  'exams/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await examService.getExam(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createExam = createAsyncThunk(
  'exams/create',
  async (examData, { rejectWithValue }) => {
    try {
      const response = await examService.createExam(examData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitExam = createAsyncThunk(
  'exams/submit',
  async ({ id, answers }, { rejectWithValue }) => {
    try {
      const response = await examService.submitExam(id, answers);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const examSlice = createSlice({
  name: 'exams',
  initialState: {
    exams: [],
    currentExam: null,
    myExams: [],
    results: [],
    isLoading: false,
    error: null,
    submissionStatus: 'idle'
  },
  reducers: {
    setCurrentExam: (state, action) => {
      state.currentExam = action.payload;
    },
    updateAnswer: (state, action) => {
      if (state.currentExam) {
        const { questionId, answer } = action.payload;
        if (!state.currentExam.answers) {
          state.currentExam.answers = {};
        }
        state.currentExam.answers[questionId] = answer;
      }
    },
    flagQuestion: (state, action) => {
      if (state.currentExam) {
        const questionId = action.payload;
        if (!state.currentExam.flaggedQuestions) {
          state.currentExam.flaggedQuestions = [];
        }
        if (state.currentExam.flaggedQuestions.includes(questionId)) {
          state.currentExam.flaggedQuestions = state.currentExam.flaggedQuestions.filter(
            id => id !== questionId
          );
        } else {
          state.currentExam.flaggedQuestions.push(questionId);
        }
      }
    },
    clearCurrentExam: (state) => {
      state.currentExam = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch exams
      .addCase(fetchExams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch single exam
      .addCase(fetchExam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentExam = action.payload;
      })
      .addCase(fetchExam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create exam
      .addCase(createExam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Submit exam
      .addCase(submitExam.pending, (state) => {
        state.submissionStatus = 'loading';
        state.error = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.submissionStatus = 'succeeded';
        state.results.push(action.payload);
        state.currentExam = null;
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.submissionStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export const {
  setCurrentExam,
  updateAnswer,
  flagQuestion,
  clearCurrentExam,
  clearError
} = examSlice.actions;

export default examSlice.reducer;