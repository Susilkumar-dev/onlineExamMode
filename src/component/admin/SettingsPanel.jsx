import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const SettingsPanel = () => {
  const { isDark } = useTheme();
  const [settings, setSettings] = useState({
    platformName: 'ExamPro',
    supportEmail: 'support@exampro.com',
    maxFileSize: 10,
    examTimeLimit: 180,
    allowRetakes: false,
    enableProctoring: true,
    emailNotifications: true,
    maintenanceMode: false,
    timezone: 'UTC',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    autoSave: true,
    sessionTimeout: 30,
    twoFactorAuth: false,
    privacyMode: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // You could add a toast notification here
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setSettings({
      platformName: 'ExamPro',
      supportEmail: 'support@exampro.com',
      maxFileSize: 10,
      examTimeLimit: 180,
      allowRetakes: false,
      enableProctoring: true,
      emailNotifications: true,
      maintenanceMode: false,
      timezone: 'UTC',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      autoSave: true,
      sessionTimeout: 30,
      twoFactorAuth: false,
      privacyMode: true
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-6">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>Platform Configuration</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            System
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              Settings & Preferences
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Configure platform behavior, security, and user preferences
          </p>
        </div>

        {/* Settings Sections Grid */}
        <div className="space-y-8">
          {/* General Settings */}
          <div className={`rounded-2xl p-6 transition-all duration-300 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-dark-700' : 'bg-gray-100'
              }`}>
                ⚙️
              </div>
              <h3 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>General Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: 'Platform Name',
                  name: 'platformName',
                  type: 'text',
                  value: settings.platformName,
                  placeholder: 'Enter platform name'
                },
                {
                  label: 'Support Email',
                  name: 'supportEmail',
                  type: 'email',
                  value: settings.supportEmail,
                  placeholder: 'support@example.com'
                },
                {
                  label: 'Max File Size (MB)',
                  name: 'maxFileSize',
                  type: 'number',
                  value: settings.maxFileSize,
                  min: 1,
                  max: 100
                },
                {
                  label: 'Default Exam Time (minutes)',
                  name: 'examTimeLimit',
                  type: 'number',
                  value: settings.examTimeLimit,
                  min: 1,
                  max: 360
                },
                {
                  label: 'Timezone',
                  name: 'timezone',
                  type: 'select',
                  value: settings.timezone,
                  options: ['UTC', 'EST', 'PST', 'GMT', 'IST', 'CET']
                },
                {
                  label: 'Language',
                  name: 'language',
                  type: 'select',
                  value: settings.language,
                  options: [
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' },
                    { value: 'zh', label: 'Chinese' }
                  ]
                }
              ].map((field, index) => (
                <div key={index}>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={settings[field.name]}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-dark-700 border border-dark-600 text-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                          : 'bg-white border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500'
                      }`}
                    >
                      {field.options.map((option, i) => (
                        <option 
                          key={i} 
                          value={typeof option === 'object' ? option.value : option}
                        >
                          {typeof option === 'object' ? option.label : option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={settings[field.name]}
                      onChange={handleChange}
                      min={field.min}
                      max={field.max}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-dark-700 border border-dark-600 text-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                          : 'bg-white border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exam Settings */}
          <div className={`rounded-2xl p-6 transition-all duration-300 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-dark-700' : 'bg-gray-100'
              }`}>
                📝
              </div>
              <h3 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Exam Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { id: 'allowRetakes', label: 'Allow exam retakes', checked: settings.allowRetakes },
                  { id: 'enableProctoring', label: 'Enable AI Proctoring', checked: settings.enableProctoring },
                  { id: 'emailNotifications', label: 'Send email notifications', checked: settings.emailNotifications },
                  { id: 'autoSave', label: 'Auto-save progress', checked: settings.autoSave }
                ].map((checkbox) => (
                  <div key={checkbox.id} className="flex items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={checkbox.id}
                        name={checkbox.id}
                        checked={settings[checkbox.id]}
                        onChange={handleChange}
                        className={`sr-only peer`}
                      />
                      <div className={`w-11 h-6 rounded-full transition-all duration-300 peer-checked:bg-primary-500 ${
                        isDark 
                          ? 'bg-dark-700 border border-dark-600 peer-checked:border-primary-500'
                          : 'bg-gray-300 border border-gray-400 peer-checked:border-primary-500'
                      }`}>
                        <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 transform peer-checked:translate-x-5 ${
                          isDark ? 'bg-gray-400' : 'bg-white'
                        }`}></div>
                      </div>
                    </div>
                    <label 
                      htmlFor={checkbox.id} 
                      className={`ml-3 text-sm font-medium cursor-pointer ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {checkbox.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Session Timeout (minutes)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      name="sessionTimeout"
                      min="5"
                      max="120"
                      step="5"
                      value={settings.sessionTimeout}
                      onChange={handleChange}
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                        isDark 
                          ? 'bg-dark-700 [&::-webkit-slider-thumb]:bg-primary-500 [&::-moz-range-thumb]:bg-primary-500'
                          : 'bg-gray-300 [&::-webkit-slider-thumb]:bg-primary-500 [&::-moz-range-thumb]:bg-primary-500'
                      }`}
                    />
                    <span className={`text-sm font-medium min-w-[3ch] ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {settings.sessionTimeout}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date Format
                  </label>
                  <div className="flex gap-2">
                    {['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map((format) => (
                      <button
                        key={format}
                        type="button"
                        onClick={() => setSettings(prev => ({ ...prev, dateFormat: format }))}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          settings.dateFormat === format
                            ? isDark
                              ? 'bg-primary-600 text-white'
                              : 'bg-primary-500 text-white'
                            : isDark
                              ? 'bg-dark-700 text-gray-400 hover:bg-dark-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className={`rounded-2xl p-6 transition-all duration-300 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-dark-700' : 'bg-gray-100'
              }`}>
                🔒
              </div>
              <h3 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Security Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { id: 'twoFactorAuth', label: 'Enable Two-Factor Authentication', checked: settings.twoFactorAuth },
                  { id: 'privacyMode', label: 'Privacy Mode', checked: settings.privacyMode }
                ].map((checkbox) => (
                  <div key={checkbox.id} className="flex items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={checkbox.id}
                        name={checkbox.id}
                        checked={settings[checkbox.id]}
                        onChange={handleChange}
                        className={`sr-only peer`}
                      />
                      <div className={`w-11 h-6 rounded-full transition-all duration-300 peer-checked:bg-primary-500 ${
                        isDark 
                          ? 'bg-dark-700 border border-dark-600 peer-checked:border-primary-500'
                          : 'bg-gray-300 border border-gray-400 peer-checked:border-primary-500'
                      }`}>
                        <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 transform peer-checked:translate-x-5 ${
                          isDark ? 'bg-gray-400' : 'bg-white'
                        }`}></div>
                      </div>
                    </div>
                    <label 
                      htmlFor={checkbox.id} 
                      className={`ml-3 text-sm font-medium cursor-pointer ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {checkbox.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Security level: <span className="font-semibold">High</span>
                </p>
                <div className={`h-2 rounded-full ${
                  isDark ? 'bg-dark-700' : 'bg-gray-200'
                } overflow-hidden`}>
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className={`rounded-2xl p-6 transition-all duration-300 ${
            isDark 
              ? 'bg-yellow-900/20 border border-yellow-800' 
              : 'bg-yellow-50 border border-yellow-200'
          } shadow-lg hover:shadow-xl`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'
                }`}>
                  🚧
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    isDark ? 'text-yellow-300' : 'text-yellow-900'
                  } mb-2`}>Maintenance Mode</h3>
                  <p className={`text-sm ${
                    isDark ? 'text-yellow-400/80' : 'text-yellow-700'
                  } mb-1`}>
                    Enable maintenance mode to perform updates
                  </p>
                  <p className={`text-xs ${
                    isDark ? 'text-yellow-500/60' : 'text-yellow-600'
                  }`}>
                    Users will see a maintenance page when enabled
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className={`sr-only peer`}
                  />
                  <div className={`w-12 h-6 rounded-full transition-all duration-300 peer-checked:bg-yellow-500 ${
                    isDark 
                      ? 'bg-yellow-900/40 border border-yellow-800 peer-checked:border-yellow-500'
                      : 'bg-yellow-200 border border-yellow-300 peer-checked:border-yellow-500'
                  }`}>
                    <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 transform peer-checked:translate-x-6 ${
                      isDark ? 'bg-yellow-400' : 'bg-white'
                    }`}></div>
                  </div>
                </div>
                <label 
                  htmlFor="maintenanceMode" 
                  className={`ml-3 text-sm font-medium cursor-pointer ${
                    isDark ? 'text-yellow-300' : 'text-yellow-900'
                  }`}
                >
                  {settings.maintenanceMode ? 'Enabled' : 'Disabled'}
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={`flex flex-col sm:flex-row justify-between gap-4 p-6 rounded-2xl ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div>
              <h4 className={`font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>Save your changes</h4>
              <p className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}>
                Apply settings to all users immediately
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleReset}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                } shadow-lg hover:shadow-xl`}
              >
                Reset to Default
              </button>
              <button
                onClick={handleSave}
                className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                } shadow-lg hover:shadow-xl`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>💾</span>
                  <span>Save Changes</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone (Optional) */}
        <div className={`mt-12 rounded-2xl p-6 border-2 ${
          isDark 
            ? 'border-red-800/50 bg-red-900/10' 
            : 'border-red-200 bg-red-50'
        }`}>
          <h4 className={`text-lg font-bold mb-4 ${
            isDark ? 'text-red-400' : 'text-red-700'
          }`}>⚠️ Danger Zone</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className={`font-medium mb-1 ${
                isDark ? 'text-red-300' : 'text-red-600'
              }`}>Reset All Data</p>
              <p className={`text-sm ${
                isDark ? 'text-red-400/70' : 'text-red-500'
              }`}>
                This will delete all exams, users, and configurations
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure? This action cannot be undone.')) {
                  console.log('Reset all data');
                }
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-red-800 hover:bg-red-700 text-white border border-red-700'
                  : 'bg-red-600 hover:bg-red-700 text-white border border-red-600'
              }`}
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;