import React, { useState } from 'react';

const CodeEditor = ({ 
  language = 'javascript',
  initialCode = '',
  readOnly = false,
  theme = 'light',
  onCodeChange,
  height = '400px'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' }
  ];

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'monokai', label: 'Monokai' }
  ];

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate API call
    setTimeout(() => {
      setOutput(`Code executed successfully!
      
Input: Hello World
Output: HELLO WORLD

All test cases passed! 🎉
      `);
      setIsRunning(false);
    }, 2000);
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setOutput('');
    if (onCodeChange) {
      onCodeChange(initialCode);
    }
  };

  const handleFormatCode = () => {
    // Simple formatting simulation
    const formatted = code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .join('\n');
    
    setCode(formatted);
    if (onCodeChange) {
      onCodeChange(formatted);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select 
            value={language}
            onChange={(e) => {}}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
          <select 
            value={theme}
            onChange={(e) => {}}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-green-400">● Live</span>
          <span className="text-sm text-gray-400">Auto-save enabled</span>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-900 text-right pr-3 text-gray-500 font-mono text-sm overflow-hidden">
          {code.split('\n').map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={handleCodeChange}
          readOnly={readOnly}
          className={`w-full font-mono text-sm p-4 pl-16 resize-none focus:outline-none ${
            theme === 'dark' 
              ? 'bg-gray-900 text-gray-100' 
              : 'bg-gray-50 text-gray-900'
          }`}
          style={{ height, minHeight: '200px' }}
          placeholder="Write your code here..."
          spellCheck="false"
        />
      </div>

      {/* Actions */}
      <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg flex items-center ${
              isRunning 
                ? 'bg-yellow-500 text-white' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Running...
              </>
            ) : (
              <>
                <span className="mr-2">▶</span>
                Run Code
              </>
            )}
          </button>
          <button
            onClick={handleFormatCode}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Format Code
          </button>
          <button
            onClick={handleResetCode}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {code.length} characters, {code.split('\n').length} lines
        </div>
      </div>

      {/* Output Panel */}
      <div className="border-t">
        <div className="bg-gray-800 text-white px-4 py-2">
          <h3 className="font-medium">Output</h3>
        </div>
        <div className="p-4">
          <pre className={`font-mono text-sm whitespace-pre-wrap ${
            output.includes('successfully') 
              ? 'text-green-700' 
              : output.includes('error') 
                ? 'text-red-700' 
                : 'text-gray-700'
          }`}>
            {output || 'No output yet. Run your code to see results.'}
          </pre>
        </div>
      </div>

      {/* Test Cases */}
      <div className="border-t p-4">
        <h3 className="font-medium text-gray-900 mb-3">Test Cases</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <div className="font-medium">Test Case 1</div>
              <div className="text-sm text-gray-600">Input: [1, 2, 3]</div>
            </div>
            <span className="text-green-600 font-medium">✓ Passed</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <div className="font-medium">Test Case 2</div>
              <div className="text-sm text-gray-600">Input: "Hello"</div>
            </div>
            <span className="text-green-600 font-medium">✓ Passed</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <div className="font-medium">Test Case 3</div>
              <div className="text-sm text-gray-600">Edge case: Empty input</div>
            </div>
            <span className="text-yellow-600 font-medium">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;