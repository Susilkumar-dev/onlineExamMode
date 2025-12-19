import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeButton from '../../component/common/ThemeButton';
import ThemeCard from '../../component/common/ThemeCard';

const StudentProfile = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@student.edu',
    studentId: 'STU2024001',
    phone: '+1 (555) 123-4567',
    program: 'Computer Science',
    semester: 'Fall 2024',
    bio: 'Passionate Computer Science student with a focus on AI and Machine Learning. Currently working on my final year project about predictive analytics.',
    posts: 24,
    followers: 156,
    following: 89,
    joinDate: 'January 2024',
    website: 'https://johndoe.dev',
    location: 'New York, USA',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=300&fit=crop'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear user session
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const handleImageUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfile(prev => ({
            ...prev,
            [type === 'profile' ? 'profileImage' : 'coverImage']: event.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const mockPosts = [
    { id: 1, type: 'exam', title: 'Aced my Data Structures exam!', date: '2 days ago', score: 95 },
    { id: 2, type: 'achievement', title: 'Top performer in Algorithms class', date: '1 week ago' },
    { id: 3, type: 'project', title: 'Machine Learning project completed', date: '2 weeks ago' },
    { id: 4, type: 'exam', title: 'Web Development midterm', date: '3 weeks ago', score: 88 },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500"
          style={{ backgroundImage: `url(${profile.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-black/20'}`}></div>
        </div>
        
        {/* Cover Photo Edit Button */}
        <button
          onClick={() => handleImageUpload('cover')}
          className={`absolute top-4 right-4 px-4 py-2 rounded-lg backdrop-blur-sm ${
            isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'
          }`}
        >
          ✏️ Edit Cover
        </button>
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-dark-800 overflow-hidden shadow-xl">
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => handleImageUpload('profile')}
              className={`absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                isDark ? 'bg-dark-700 text-white hover:bg-dark-600' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              📷
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 md:ml-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {profile.name}
                </h1>
                <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  @{profile.email.split('@')[0]}
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <ThemeButton
                  variant={isEditing ? 'success' : 'outline'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </ThemeButton>
                
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isDark 
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/30' 
                      : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                  }`}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {profile.posts}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Posts</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {profile.followers}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Followers</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {profile.following}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Following</div>
              </div>
            </div>

            {/* Bio */}
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {profile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-white'} shadow-lg`}>
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {['posts', 'exams', 'achievements', 'projects'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? isDark
                          ? 'border-b-2 border-primary-500 text-primary-400'
                          : 'border-b-2 border-primary-500 text-primary-600'
                        : isDark
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-dark-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Posts Content */}
              <div className="p-6">
                {mockPosts.map((post) => (
                  <div 
                    key={post.id}
                    className={`p-4 rounded-lg mb-4 transition-colors ${
                      isDark 
                        ? 'bg-dark-700 hover:bg-dark-600' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        post.type === 'exam' ? 'bg-green-500/20 text-green-500' :
                        post.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {post.type === 'exam' ? '📝' : 
                         post.type === 'achievement' ? '🏆' : '💻'}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {post.title}
                        </h3>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.date}
                        </p>
                        {post.score && (
                          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
                            Score: {post.score}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Profile Form (when editing) */}
            {isEditing && (
              <ThemeCard>
                <h2 className="text-xl font-bold mb-6">Edit Profile Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          isDark 
                            ? 'bg-dark-700 border-dark-600 text-white' 
                            : 'border border-gray-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          isDark 
                            ? 'bg-dark-700 border-dark-600 text-white' 
                            : 'border border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        isDark 
                          ? 'bg-dark-700 border-dark-600 text-white' 
                          : 'border border-gray-300'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={profile.website}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          isDark 
                            ? 'bg-dark-700 border-dark-600 text-white' 
                            : 'border border-gray-300'
                        }`}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          isDark 
                            ? 'bg-dark-700 border-dark-600 text-white' 
                            : 'border border-gray-300'
                        }`}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <ThemeButton
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </ThemeButton>
                    <ThemeButton
                      variant="primary"
                      onClick={handleSave}
                    >
                      Save Changes
                    </ThemeButton>
                  </div>
                </div>
              </ThemeCard>
            )}
          </div>

          {/* Right Column - Stats and Info */}
          <div className="space-y-6">
            {/* Student Info */}
            <ThemeCard>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Student Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Student ID</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {profile.studentId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Program</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {profile.program}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Semester</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {profile.semester}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-900'}`}>Joined</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {profile.joinDate}
                  </span>
                </div>
              </div>
            </ThemeCard>

            {/* Contact Info */}
            <ThemeCard>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="mr-3 text-gray-500">📧</span>
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {profile.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-gray-500">📱</span>
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {profile.phone}
                  </span>
                </div>
                {profile.website && (
                  <div className="flex items-center">
                    <span className="mr-3 text-gray-500">🌐</span>
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`hover:underline ${isDark ? 'text-primary-400' : 'text-primary-600'}`}
                    >
                      {profile.website.replace('https://', '')}
                    </a>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center">
                    <span className="mr-3 text-gray-500">📍</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {profile.location}
                    </span>
                  </div>
                )}
              </div>
            </ThemeCard>

            {/* Quick Stats */}
            <ThemeCard>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Academic Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      GPA
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      3.8/4.0
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${
                    isDark ? 'bg-dark-600' : 'bg-gray-200'
                  }`}>
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Exam Completion
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      85%
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${
                    isDark ? 'bg-dark-600' : 'bg-gray-200'
                  }`}>
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Assignment Score
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      92%
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${
                    isDark ? 'bg-dark-600' : 'bg-gray-200'
                  }`}>
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </ThemeCard>

            {/* Theme Toggle */}
            <ThemeCard>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Theme
                  </h4>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-8 rounded-full p-1 transition-all ${
                    isDark 
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600' 
                      : 'bg-gradient-to-r from-primary-400 to-secondary-400'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transform transition-transform ${
                      isDark ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  >
                    {isDark ? '🌙' : '☀️'}
                  </div>
                </button>
              </div>
            </ThemeCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;