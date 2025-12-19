import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const TestCaseRunner = ({ testCases, onRunTest }) => {
  const [runningIndex, setRunningIndex] = useState(null);
  const [results, setResults] = useState({});
  const [customInput, setCustomInput] = useState('');
  const { isDark } = useTheme();

  const handleRunTest = async (testCase, index) => {
    setRunningIndex(index);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const success = Math.random() > 0.3; // 70% success rate for demo
    const result = {
      success,
      output: success ? testCase.expectedOutput : 'Error: Timeout exceeded',
      time: (1000 + Math.random() * 1000).toFixed(0) + 'ms',
      memory: (Math.random() * 10 + 5).toFixed(1) + 'MB'
    };
    
    setResults(prev => ({ ...prev, [index]: result }));
    setRunningIndex(null);
    
    if (onRunTest) {
      onRunTest(testCase, result);
    }
  };

  const handleRunAllTests = async () => {
    for (let i = 0; i < testCases.length; i++) {
      await handleRunTest(testCases[i], i);
    }
  };

  const handleRunCustomTest = async () => {
    if (!customInput.trim()) return;
    
    const customTestCase = {
      input: customInput,
      expectedOutput: 'N/A',
      isCustom: true
    };
    
    await handleRunTest(customTestCase, 'custom');
  };

  const getResultColor = (result) => {
    if (!result) return '';
    return result.success ? 'text-green-600' : 'text-red-600';
  };

  // Theme-based classes
  const containerClasses = `rounded-xl shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const headerClasses = `px-6 py-4 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-800 text-white'}`;
  const subheaderTextClasses = isDark ? 'text-gray-400' : 'text-gray-300';
  const titleClasses = `font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-900'}`;
  const inputClasses = `flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
    isDark 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
  }`;
  const testCaseHeaderClasses = `px-4 py-3 flex justify-between items-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`;
  const testCaseContentClasses = `p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const preClasses = (isOutput = false, result = null) => 
    `p-3 rounded text-sm font-mono whitespace-pre-wrap ${
      isOutput && result 
        ? (result.success 
            ? `${isDark ? 'bg-green-900/20 text-green-300' : 'bg-green-50 text-green-700'}` 
            : `${isDark ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-700'}`)
        : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'
    }`;
  const statCardClasses = (color) => 
    `text-center p-4 rounded-lg ${isDark ? `bg-${color}-900/20` : `bg-${color}-50`}`;
  const statTextClasses = (color) => `text-2xl font-bold ${isDark ? `text-${color}-400` : `text-${color}-600`}`;
  const statLabelClasses = (color) => `text-sm ${isDark ? `text-${color}-300` : `text-${color}-700`}`;
  const buttonClasses = (variant = 'primary') => {
    const base = 'px-6 py-2 rounded-lg font-medium';
    if (variant === 'primary') {
      return `${base} ${isDark ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'}`;
    }
    if (variant === 'success') {
      return `${base} ${isDark ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`;
    }
    return `${base} ${isDark ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`;
  };

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className={headerClasses}>
        <h3 className="text-lg font-semibold">Test Cases</h3>
        <p className={`text-sm mt-1 ${subheaderTextClasses}`}>Run and validate your code against test cases</p>
      </div>

      <div className="p-6">
        {/* Custom Test Input */}
        <div className="mb-8">
          <h4 className={titleClasses}>Custom Test Case</h4>
          <div className="flex space-x-3">
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter custom input..."
              className={inputClasses}
              rows="2"
            />
            <button
              onClick={handleRunCustomTest}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 self-start"
            >
              Run Custom
            </button>
          </div>
        </div>

        {/* Test Cases List */}
        <div className="space-y-4">
          {testCases.map((testCase, index) => {
            const result = results[index];
            return (
              <div key={index} className={`border rounded-lg overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={testCaseHeaderClasses}>
                  <div className="flex items-center">
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      Test Case {index + 1}
                    </span>
                    {testCase.isHidden && (
                      <span className={`ml-2 px-2 py-1 text-xs rounded ${
                        isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {result && (
                      <>
                        <span className={`font-medium ${getResultColor(result)}`}>
                          {result.success ? '✓ Passed' : '✗ Failed'}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {result.time}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {result.memory}
                        </span>
                      </>
                    )}
                    <button
                      onClick={() => handleRunTest(testCase, index)}
                      disabled={runningIndex === index}
                      className={`px-4 py-2 rounded text-sm font-medium ${
                        runningIndex === index
                          ? isDark 
                            ? 'bg-yellow-900/30 text-yellow-300' 
                            : 'bg-yellow-100 text-yellow-700'
                          : isDark 
                            ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' 
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {runningIndex === index ? 'Running...' : 'Run Test'}
                    </button>
                  </div>
                </div>
                
                <div className={testCaseContentClasses}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Input
                      </div>
                      <pre className={preClasses()}>
                        {testCase.input}
                      </pre>
                    </div>
                    <div>
                      <div className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {testCase.isHidden ? 'Expected Output' : 'Output'}
                      </div>
                      <pre className={preClasses(true, result)}>
                        {result ? result.output : (testCase.isHidden ? 'Hidden' : testCase.expectedOutput)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Test Results</div>
              <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {Object.values(results).filter(r => r?.success).length}/{testCases.length} passed
              </div>
            </div>
            <div className="space-x-3">
              <button
                onClick={handleRunAllTests}
                className={buttonClasses('success')}
              >
                Run All Tests
              </button>
              <button className={buttonClasses()}>
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {Object.keys(results).length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className={statCardClasses('blue')}>
              <div className={statTextClasses('blue')}>
                {Object.values(results).filter(r => r?.success).length}
              </div>
              <div className={statLabelClasses('blue')}>Passed</div>
            </div>
            <div className={statCardClasses('red')}>
              <div className={statTextClasses('red')}>
                {Object.values(results).filter(r => r && !r.success).length}
              </div>
              <div className={statLabelClasses('red')}>Failed</div>
            </div>
            <div className={statCardClasses('gray')}>
              <div className={statTextClasses('gray')}>
                {(
                  Object.values(results)
                    .filter(r => r)
                    .reduce((sum, r) => sum + parseInt(r.time), 0) / 
                  Object.values(results).filter(r => r).length || 0
                ).toFixed(0)}ms
              </div>
              <div className={statLabelClasses('gray')}>Avg. Time</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCaseRunner;