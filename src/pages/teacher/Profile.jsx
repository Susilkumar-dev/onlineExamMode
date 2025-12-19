import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Profile = () => {
  const { isDark } = useTheme();
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    position: 'Professor',
    bio: 'Computer Science professor with 10+ years of experience. Specialized in Algorithms and Data Structures.',
    notifications: {
      email: true,
      examSubmissions: true,
      studentMessages: true,
      systemUpdates: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleSave = () => {
    alert('Profile saved successfully!');
  };

  // Theme-based classes
  const containerClasses = `p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`;
  const titleClasses = `text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`;
  const subtitleClasses = `${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`;
  const cardClasses = `rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`;
  const cardTitleClasses = `text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`;
  const labelClasses = `block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;
  const inputClasses = `w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
    isDark 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'border border-gray-300 text-gray-900 placeholder-gray-400'
  }`;
  const toggleButtonClasses = (value) => 
    `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      value 
        ? 'bg-primary-600' 
        : isDark ? 'bg-gray-700' : 'bg-gray-200'
    }`;
  const toggleInnerClasses = `inline-block h-4 w-4 transform rounded-full bg-white transition ${
    isDark ? '' : 'shadow'
  }`;
  const textClasses = (isTitle = false) => 
    `${isTitle ? 'font-bold' : 'font-medium'} ${isDark ? 'text-white' : 'text-gray-900'}`;
  const mutedTextClasses = `text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`;
  const statItemClasses = `flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`;
  const buttonClasses = (variant = 'primary') => {
    const base = 'w-full px-4 py-3 rounded-lg font-medium transition-colors';
    switch(variant) {
      case 'primary':
        return `${base} ${isDark ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'}`;
      case 'outline':
        return `${base} ${isDark ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`;
      case 'danger':
        return `${base} ${isDark ? 'border border-red-600 text-red-400 hover:bg-red-900/30' : 'border border-red-300 text-red-600 hover:bg-red-50'}`;
      default:
        return `${base} ${isDark ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'}`;
    }
  };
  const saveButtonClasses = `px-8 py-3 rounded-lg font-medium transition-colors ${
    isDark 
      ? 'bg-primary-600 hover:bg-primary-700 text-white' 
      : 'bg-primary-600 hover:bg-primary-700 text-white'
  }`;
  const profileIconClasses = `w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 ${
    isDark ? 'bg-primary-700' : 'bg-primary-600'
  }`;
  const profileButtonClasses = `absolute bottom-4 right-0 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow ${
    isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'
  }`;
  const profilePositionClasses = isDark ? 'text-gray-400' : 'text-gray-600';
  const profileDeptClasses = `text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`;

  return (
    <div className={containerClasses}>
      <div className="mb-8">
        <h1 className={titleClasses}>Profile Settings</h1>
        <p className={subtitleClasses}>Manage your profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className={cardClasses}>
            <h2 className={cardTitleClasses}>Profile Information</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={profile.department}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={profile.position}
                  onChange={handleInputChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className={`mt-8 ${cardClasses}`}>
            <h2 className={cardTitleClasses}>Notifications</h2>
            
            <div className="space-y-4">
              {Object.entries(profile.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className={textClasses(true)}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className={mutedTextClasses}>
                      {key === 'email' && 'Receive email notifications'}
                      {key === 'examSubmissions' && 'Get notified when students submit exams'}
                      {key === 'studentMessages' && 'Receive student messages'}
                      {key === 'systemUpdates' && 'Get system update notifications'}
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={toggleButtonClasses(value)}
                  >
                    <span
                      className={`${toggleInnerClasses} ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Profile Picture */}
          <div className={`${cardClasses} mb-8`}>
            <div className="text-center">
              <div className="inline-block relative">
                <div className={profileIconClasses}>
                  {profile.name.charAt(0)}
                </div>
                <button className={profileButtonClasses}>
                  📷
                </button>
              </div>
              <h3 className={textClasses(true)}>{profile.name}</h3>
              <p className={profilePositionClasses}>{profile.position}</p>
              <p className={profileDeptClasses}>{profile.department}</p>
            </div>
          </div>

          {/* Stats */}
          <div className={`${cardClasses} mb-8`}>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Teaching Stats
            </h3>
            <div className="space-y-4">
              <div className={statItemClasses}>
                <span>Active Exams</span>
                <span className={textClasses()}>12</span>
              </div>
              <div className={statItemClasses}>
                <span>Total Students</span>
                <span className={textClasses()}>240</span>
              </div>
              <div className={statItemClasses}>
                <span>Avg. Student Score</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
              <div className={statItemClasses}>
                <span>Questions Created</span>
                <span className={textClasses()}>156</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={cardClasses}>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className={buttonClasses('primary')}>
                Change Password
              </button>
              <button className={buttonClasses('outline')}>
                View Activity Log
              </button>
              <button className={buttonClasses('danger')}>
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className={saveButtonClasses}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;