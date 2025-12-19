import React, { useState } from 'react';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    platformName: 'ExamPro',
    supportEmail: 'support@exampro.com',
    maxFileSize: 10,
    examTimeLimit: 180,
    allowRetakes: false,
    enableProctoring: true,
    emailNotifications: true,
    maintenanceMode: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
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
      maintenanceMode: false
    });
  };

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Name
            </label>
            <input
              type="text"
              name="platformName"
              value={settings.platformName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Email
            </label>
            <input
              type="email"
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max File Size (MB)
            </label>
            <input
              type="number"
              name="maxFileSize"
              value={settings.maxFileSize}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Exam Time (minutes)
            </label>
            <input
              type="number"
              name="examTimeLimit"
              value={settings.examTimeLimit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Exam Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Exam Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowRetakes"
              name="allowRetakes"
              checked={settings.allowRetakes}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="allowRetakes" className="ml-3 text-sm text-gray-700">
              Allow exam retakes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableProctoring"
              name="enableProctoring"
              checked={settings.enableProctoring}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="enableProctoring" className="ml-3 text-sm text-gray-700">
              Enable AI Proctoring
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="emailNotifications" className="ml-3 text-sm text-gray-700">
              Send email notifications
            </label>
          </div>
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Maintenance Mode</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-700 mb-2">
              Enable maintenance mode to perform updates
            </p>
            <p className="text-xs text-yellow-600">
              Users will see a maintenance page when enabled
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="maintenanceMode"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-yellow-300 rounded"
            />
            <label htmlFor="maintenanceMode" className="ml-3 text-sm font-medium text-yellow-900">
              Enable
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleReset}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;