import { codeExecutionAPI } from './api';

class CodeExecutionService {
  // Supported languages
  languages = [
    { id: 'javascript', name: 'JavaScript', version: 'Node.js 18', extension: 'js' },
    { id: 'python', name: 'Python', version: '3.11', extension: 'py' },
    { id: 'java', name: 'Java', version: '17', extension: 'java' },
    { id: 'cpp', name: 'C++', version: '17', extension: 'cpp' },
    { id: 'c', name: 'C', version: '11', extension: 'c' },
    { id: 'go', name: 'Go', version: '1.21', extension: 'go' },
    { id: 'rust', name: 'Rust', version: '1.70', extension: 'rs' },
    { id: 'ruby', name: 'Ruby', version: '3.2', extension: 'rb' },
    { id: 'php', name: 'PHP', version: '8.2', extension: 'php' }
  ];

  // Get supported languages
  getLanguages() {
    return this.languages;
  }

  // Get language by ID
  getLanguage(id) {
    return this.languages.find(lang => lang.id === id);
  }

  // Execute code
  async executeCode(code, language, testCases = []) {
    try {
      const response = await codeExecutionAPI.executeCode({ code, language, testCases });
      return response.data;
    } catch (error) {
      return {
        success: false,
        output: error.response?.data?.output || 'Execution failed. Please try again.',
        error: error.response?.data?.error,
        executionTime: 0,
        memoryUsed: 0
      };
    }
  }

  // Validate code against question
  async validateCode(code, language, questionId) {
    try {
      const response = await codeExecutionAPI.validateCode({ code, language, questionId });
      return response.data;
    } catch (error) {
      return {
        success: false,
        passed: 0,
        total: 0,
        testCases: [],
        error: error.response?.data?.message || 'Validation failed'
      };
    }
  }

  // Format code output
  formatOutput(output, language) {
    if (typeof output !== 'string') {
      return JSON.stringify(output, null, 2);
    }

    // Add syntax highlighting for common languages
    return output;
  }

  // Create test case template
  createTestCase(input, expectedOutput, isHidden = false) {
    return {
      input,
      expectedOutput,
      isHidden,
      actualOutput: null,
      passed: null,
      executionTime: null
    };
  }

  // Run multiple test cases
  async runTestCases(code, language, testCases) {
    const results = [];
    let passed = 0;

    for (const testCase of testCases) {
      try {
        const startTime = performance.now();
        const result = await this.executeCode(
          this.wrapCodeWithInput(code, testCase.input, language),
          language
        );
        const executionTime = performance.now() - startTime;

        const passedCase = result.success && 
          result.output?.trim() === testCase.expectedOutput?.trim();

        const testResult = {
          ...testCase,
          actualOutput: result.output,
          passed: passedCase,
          executionTime,
          error: result.error
        };

        results.push(testResult);
        if (passedCase) passed++;
      } catch (error) {
        results.push({
          ...testCase,
          actualOutput: null,
          passed: false,
          executionTime: 0,
          error: error.message
        });
      }
    }

    return {
      success: passed === testCases.length,
      passed,
      total: testCases.length,
      percentage: (passed / testCases.length) * 100,
      testCases: results
    };
  }

  // Wrap code with input handling
  wrapCodeWithInput(code, input, language) {
    const inputStr = JSON.stringify(input);
    
    switch(language) {
      case 'python':
        return `${code}\n\n# Test input\nimport sys\ndata = ${inputStr}\n`;
      
      case 'javascript':
        return `${code}\n\n// Test input\nconst input = ${inputStr};\n`;
      
      case 'java':
        return `import java.util.*;\n\n${code}\n\n// Test input\npublic class Main {\n    public static void main(String[] args) {\n        Object input = ${inputStr};\n    }\n}`;
      
      default:
        return code;
    }
  }

  // Check syntax
  async checkSyntax(code, language) {
    // Simple syntax checking for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        const hasSyntaxErrors = Math.random() > 0.8; // 20% chance of error for demo
        resolve({
          valid: !hasSyntaxErrors,
          errors: hasSyntaxErrors ? ['Syntax error on line 1'] : []
        });
      }, 500);
    });
  }

  // Get code template
  getCodeTemplate(language) {
    const templates = {
      javascript: `function solution(input) {
  // Write your code here
  return input;
}`,
      python: `def solution(input):
    # Write your code here
    return input`,
      java: `public class Solution {
    public static Object solution(Object input) {
        // Write your code here
        return input;
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int solution(int input) {
    // Write your code here
    return input;
}`,
      c: `#include <stdio.h>

int solution(int input) {
    // Write your code here
    return input;
}`
    };

    return templates[language] || `// Write your ${language} code here`;
  }
}

export default new CodeExecutionService();