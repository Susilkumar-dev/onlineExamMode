import React, { useState } from 'react';
import SettingsPanel from '../../component/admin/SettingsPanel';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'security', name: 'Security', icon: '🔒', color: 'green', gradient: 'from-green-500 to-emerald-500' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', color: 'yellow', gradient: 'from-yellow-500 to-amber-500' },
    { id: 'integrations', name: 'Integrations', icon: '🔄', color: 'purple', gradient: 'from-purple-500 to-pink-500' },
    { id: 'billing', name: 'Billing', icon: '💰', color: 'indigo', gradient: 'from-indigo-500 to-violet-500' },
    { id: 'advanced', name: 'Advanced', icon: '⚡', color: 'red', gradient: 'from-red-500 to-orange-500' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              Settings & Configuration
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Configure platform behavior, security, and user preferences across all settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg hover:shadow-xl`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-dark-700' : 'bg-gray-100'
                }`}>
                  📋
                </div>
                <h3 className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Settings Menu</h3>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-300 group ${
                      activeTab === tab.id
                        ? isDark
                          ? `bg-gradient-to-r ${tab.gradient} bg-opacity-20 border border-${tab.color}-500/30`
                          : `bg-gradient-to-r ${tab.gradient} bg-opacity-10 border border-${tab.color}-400`
                        : `border ${
                            isDark 
                              ? 'border-dark-600 hover:border-dark-500 hover:bg-dark-700/50' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`
                    }`}
                  >
                    <div className={`text-2xl p-2 rounded-lg mr-3 transition-all duration-300 ${
                      activeTab === tab.id
                        ? isDark
                          ? `bg-gradient-to-r ${tab.gradient} text-white`
                          : `bg-gradient-to-r ${tab.gradient} text-white`
                        : isDark
                          ? 'bg-dark-700 text-gray-400 group-hover:text-gray-300'
                          : 'bg-gray-100 text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {tab.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className={`font-semibold transition-colors duration-300 ${
                        activeTab === tab.id
                          ? isDark ? 'text-white' : 'text-gray-900'
                          : isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {tab.name}
                      </div>
                      <div className={`text-xs mt-1 ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Configure {tab.name.toLowerCase()} settings
                      </div>
                    </div>
                    
                    {activeTab === tab.id && (
                      <div className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-white' : 'bg-gray-900'
                      }`}></div>
                    )}
                  </button>
                ))}
              </nav>

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
                <button className={`group relative w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                } shadow-lg hover:shadow-xl`}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>💾</span>
                    <span>Save All Changes</span>
                  </span>
                </button>
                <p className={`text-sm text-center mt-3 ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  Changes are auto-saved every 5 minutes
                </p>
              </div>
            </div>

            {/* System Info */}
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg hover:shadow-xl`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-dark-700' : 'bg-gray-100'
                }`}>
                  ℹ️
                </div>
                <h3 className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>System Information</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Platform Version', value: 'v2.1.4', icon: '📦', color: 'blue' },
                  { label: 'Last Updated', value: 'Dec 15, 2024', icon: '📅', color: 'green' },
                  { label: 'System Uptime', value: '99.9%', icon: '📈', color: 'purple' },
                  { label: 'Storage Used', value: '45.2 GB / 100 GB', icon: '💾', color: 'yellow' },
                  { label: 'Active Users', value: '2,847', icon: '👥', color: 'red' },
                  { label: 'API Status', value: 'Operational', icon: '🔌', color: 'indigo' }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    isDark ? 'bg-dark-700/30 hover:bg-dark-700/50' : 'bg-gray-50 hover:bg-gray-100'
                  } transition-colors duration-300`}>
                    <div className="flex items-center gap-3">
                      <div className={`text-lg p-2 rounded-lg ${
                        isDark 
                          ? item.color === 'blue' ? 'bg-blue-900/30 text-blue-400' :
                            item.color === 'green' ? 'bg-green-900/30 text-green-400' :
                            item.color === 'purple' ? 'bg-purple-900/30 text-purple-400' :
                            item.color === 'yellow' ? 'bg-yellow-900/30 text-yellow-400' :
                            item.color === 'red' ? 'bg-red-900/30 text-red-400' : 'bg-indigo-900/30 text-indigo-400'
                          : item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            item.color === 'green' ? 'bg-green-100 text-green-600' :
                            item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                            item.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                            item.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {item.icon}
                      </div>
                      <span className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <span className={`font-medium ${
                      item.label === 'System Uptime'
                        ? isDark ? 'text-green-400' : 'text-green-600'
                        : item.label === 'API Status'
                        ? isDark ? 'text-green-400' : 'text-green-600'
                        : isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Storage Progress */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-700">
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>Storage Usage</span>
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>45.2%</span>
                </div>
                <div className={`h-2 rounded-full ${
                  isDark ? 'bg-dark-700' : 'bg-gray-200'
                } overflow-hidden`}>
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '45.2%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDark 
                ? 'bg-dark-800/50 border border-dark-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg hover:shadow-xl`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`text-3xl p-3 rounded-xl ${
                  isDark ? 'bg-dark-700' : 'bg-gray-100'
                }`}>
                  {tabs.find(t => t.id === activeTab)?.icon}
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tabs.find(t => t.id === activeTab)?.name} Settings
                  </h2>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Configure your {tabs.find(t => t.id === activeTab)?.name.toLowerCase()} preferences and behaviors
                  </p>
                </div>
              </div>

              {activeTab === 'general' && <SettingsPanel />}
              
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className={`rounded-2xl p-6 ${
                    isDark 
                      ? 'bg-yellow-900/20 border border-yellow-800' 
                      : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'
                      }`}>
                        🔒
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        isDark ? 'text-yellow-300' : 'text-yellow-900'
                      }`}>Security Settings</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-dark-700">
                        <div>
                          <div className={`font-medium mb-1 ${
                            isDark ? 'text-gray-300' : 'text-gray-900'
                          }`}>Two-Factor Authentication</div>
                          <div className={`text-sm ${
                            isDark ? 'text-gray-500' : 'text-gray-600'
                          }`}>Add an extra layer of security to your account</div>
                        </div>
                        <button className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                        } shadow-lg hover:shadow-xl`}>
                          <span className="relative z-10">Enable</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-dark-700">
                        <div>
                          <div className={`font-medium mb-1 ${
                            isDark ? 'text-gray-300' : 'text-gray-900'
                          }`}>IP Whitelisting</div>
                          <div className={`text-sm ${
                            isDark ? 'text-gray-500' : 'text-gray-600'
                          }`}>Restrict access to specific IP addresses</div>
                        </div>
                        <button className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                            : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                        } shadow-lg hover:shadow-xl`}>
                          <span className="relative z-10">Configure</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-dark-700">
                        <div>
                          <div className={`font-medium mb-1 ${
                            isDark ? 'text-gray-300' : 'text-gray-900'
                          }`}>Session Management</div>
                          <div className={`text-sm ${
                            isDark ? 'text-gray-500' : 'text-gray-600'
                          }`}>Manage active sessions and timeout settings</div>
                        </div>
                        <button className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                            : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                        } shadow-lg hover:shadow-xl`}>
                          <span className="relative z-10">Manage</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-dark-700">
                        <div>
                          <div className={`font-medium mb-1 ${
                            isDark ? 'text-gray-300' : 'text-gray-900'
                          }`}>Audit Logs</div>
                          <div className={`text-sm ${
                            isDark ? 'text-gray-500' : 'text-gray-600'
                          }`}>View security events and access logs</div>
                        </div>
                        <button className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                            : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                        } shadow-lg hover:shadow-xl`}>
                          <span className="relative z-10">View Logs</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Security Status */}
                  <div className={`rounded-2xl p-6 ${
                    isDark 
                      ? 'bg-dark-800/50 border border-dark-700' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Security Status</h4>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Password Strength', status: 'Strong', color: 'green', progress: 90 },
                        { label: 'Encryption', status: 'Enabled', color: 'green', progress: 100 },
                        { label: 'Firewall', status: 'Active', color: 'green', progress: 100 },
                        { label: 'Backup Frequency', status: 'Daily', color: 'yellow', progress: 70 },
                        { label: 'Vulnerability Scan', status: 'Pending', color: 'red', progress: 20 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className={`text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>{item.label}</span>
                            <span className={`text-sm font-medium ${
                              item.color === 'green' ? isDark ? 'text-green-400' : 'text-green-600' :
                              item.color === 'yellow' ? isDark ? 'text-yellow-400' : 'text-yellow-600' :
                              isDark ? 'text-red-400' : 'text-red-600'
                            }`}>{item.status}</span>
                          </div>
                          <div className={`h-1.5 rounded-full ${
                            isDark ? 'bg-dark-700' : 'bg-gray-200'
                          } overflow-hidden`}>
                            <div className={`h-full ${
                              item.color === 'green' ? 'bg-green-500' :
                              item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} style={{ width: `${item.progress}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {!['general', 'security'].includes(activeTab) && (
                <div className="text-center py-16">
                  <div className={`text-6xl p-6 rounded-2xl inline-flex mb-6 ${
                    isDark ? 'bg-dark-700' : 'bg-gray-100'
                  }`}>
                    {tabs.find(t => t.id === activeTab)?.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tabs.find(t => t.id === activeTab)?.name} Settings
                  </h3>
                  <p className={`text-lg max-w-md mx-auto mb-8 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Configure your {activeTab.toLowerCase()} settings and preferences
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                    }`}>
                      <span className="relative z-10">Learn More</span>
                    </button>
                    <button className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                    }`}>
                      <span className="relative z-10">Configure Settings</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            <div className={`rounded-2xl p-6 border-2 ${
              isDark 
                ? 'border-red-800/50 bg-red-900/10' 
                : 'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-red-900/30' : 'bg-red-100'
                }`}>
                  ⚠️
                </div>
                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-red-400' : 'text-red-700'
                }`}>Danger Zone</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-200 dark:border-red-800">
                  <div>
                    <div className={`font-medium mb-1 ${
                      isDark ? 'text-red-300' : 'text-red-600'
                    }`}>Reset Platform Data</div>
                    <div className={`text-sm ${
                      isDark ? 'text-red-400/70' : 'text-red-500'
                    }`}>
                      This will delete all exam data, user progress, and submissions
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure? This will delete all exam data. This action cannot be undone.')) {
                        console.log('Reset platform data');
                      }
                    }}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? 'bg-red-800 hover:bg-red-700 text-white border border-red-700'
                        : 'bg-white hover:bg-red-50 text-red-600 border border-red-600'
                    }`}
                  >
                    Reset Data
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-200 dark:border-red-800">
                  <div>
                    <div className={`font-medium mb-1 ${
                      isDark ? 'text-red-300' : 'text-red-600'
                    }`}>Delete Platform</div>
                    <div className={`text-sm ${
                      isDark ? 'text-red-400/70' : 'text-red-500'
                    }`}>
                      Permanently delete the platform and all associated data
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you absolutely sure? This will permanently delete the entire platform. This action cannot be undone.')) {
                        console.log('Delete platform');
                      }
                    }}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? 'bg-red-600 hover:bg-red-700 text-white border border-red-700'
                        : 'bg-red-600 hover:bg-red-700 text-white border border-red-600'
                    }`}
                  >
                    Delete Platform
                  </button>
                </div>
              </div>
              
              <div className={`mt-6 text-sm ${
                isDark ? 'text-red-400/70' : 'text-red-500'
              }`}>
                ⚠️ These actions are irreversible. Please proceed with extreme caution.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;