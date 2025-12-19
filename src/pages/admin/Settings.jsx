import React, { useState } from 'react';
import SettingsPanel from '../../component/admin/SettingsPanel';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'integrations', name: 'Integrations', icon: '🔄' },
    { id: 'billing', name: 'Billing', icon: '💰' },
    { id: 'advanced', name: 'Advanced', icon: '⚡' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl mr-3">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t">
              <button className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                Save All Changes
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Changes are auto-saved every 5 minutes
              </p>
            </div>
          </div>

          {/* System Info */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">System Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">v2.1.4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">Dec 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage</span>
                <span className="font-medium">45.2 GB / 100 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {tabs.find(t => t.id === activeTab)?.name} Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Configure your {tabs.find(t => t.id === activeTab)?.name.toLowerCase()} preferences
            </p>

            {activeTab === 'general' && <SettingsPanel />}
            
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Add an extra layer of security</div>
                      </div>
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">IP Whitelisting</div>
                        <div className="text-sm text-gray-600">Restrict access to specific IPs</div>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {!['general', 'security'].includes(activeTab) && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">{tabs.find(t => t.id === activeTab)?.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tabs.find(t => t.id === activeTab)?.name} Settings
                </h3>
                <p className="text-gray-600">Configure your {activeTab.toLowerCase()} settings here</p>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Reset Platform Data</div>
                  <div className="text-sm text-gray-600">This will delete all exam data</div>
                </div>
                <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
                  Reset Data
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Delete Platform</div>
                  <div className="text-sm text-gray-600">Permanently delete the platform</div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Delete Platform
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;