class StorageService {
  constructor() {
    this.prefix = 'exampro_';
  }

  // Set item
  set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serialized);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // Get item
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  // Remove item
  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }

  // Clear all exampro data
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Exam-specific storage
  saveExamProgress(examId, data) {
    return this.set(`exam_${examId}_progress`, data);
  }

  getExamProgress(examId) {
    return this.get(`exam_${examId}_progress`, {});
  }

  clearExamProgress(examId) {
    return this.remove(`exam_${examId}_progress`);
  }

  saveAnswers(examId, answers) {
    return this.set(`exam_${examId}_answers`, answers);
  }

  getAnswers(examId) {
    return this.get(`exam_${examId}_answers`, {});
  }

  saveTimer(examId, time) {
    return this.set(`exam_${examId}_timer`, time);
  }

  getTimer(examId) {
    return this.get(`exam_${examId}_timer`, 0);
  }

  // User preferences
  savePreferences(preferences) {
    return this.set('user_preferences', preferences);
  }

  getPreferences() {
    return this.get('user_preferences', {
      theme: 'light',
      notifications: true,
      fontSize: 'medium'
    });
  }

  // Draft exams
  saveDraft(examData) {
    const drafts = this.get('exam_drafts', []);
    drafts.push({
      ...examData,
      id: `draft_${Date.now()}`,
      createdAt: new Date().toISOString()
    });
    return this.set('exam_drafts', drafts);
  }

  getDrafts() {
    return this.get('exam_drafts', []);
  }

  deleteDraft(draftId) {
    const drafts = this.get('exam_drafts', []);
    const filtered = drafts.filter(draft => draft.id !== draftId);
    return this.set('exam_drafts', filtered);
  }

  // Temporary storage (clears on page refresh)
  setTemp(key, value) {
    try {
      const tempKey = `temp_${key}`;
      sessionStorage.setItem(this.prefix + tempKey, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
      return false;
    }
  }

  getTemp(key, defaultValue = null) {
    try {
      const tempKey = `temp_${key}`;
      const item = sessionStorage.getItem(this.prefix + tempKey);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  }

  removeTemp(key) {
    try {
      const tempKey = `temp_${key}`;
      sessionStorage.removeItem(this.prefix + tempKey);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  }

  // Check storage availability
  isAvailable() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get storage usage
  getUsage() {
    try {
      let total = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        total += key.length + value.length;
      }
      return total * 2; // Approximate bytes (UTF-16)
    } catch (error) {
      return 0;
    }
  }
}

export default new StorageService();