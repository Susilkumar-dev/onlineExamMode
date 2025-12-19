import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Courses = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      code: 'CS201',
      department: 'Computer Science',
      instructor: 'Dr. Sarah Johnson',
      students: 156,
      status: 'active',
      semester: 'Fall 2024',
      icon: '💻',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      topics: ['Algorithms', 'Data Structures', 'Complexity Analysis', 'Sorting', 'Searching'],
      category: 'tech'
    },
    {
      id: 2,
      title: 'Web Development',
      code: 'WD101',
      department: 'Information Technology',
      instructor: 'Prof. Michael Chen',
      students: 89,
      status: 'active',
      semester: 'Fall 2024',
      icon: '🌐',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      topics: ['HTML/CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB'],
      category: 'tech'
    },
    {
      id: 3,
      title: 'Database Systems',
      code: 'DB301',
      department: 'Computer Science',
      instructor: 'Dr. Robert Wilson',
      students: 76,
      status: 'active',
      semester: 'Fall 2024',
      icon: '🗄️',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      topics: ['SQL', 'NoSQL', 'Database Design', 'Normalization', 'Transactions'],
      category: 'tech'
    },
    {
      id: 4,
      title: 'Machine Learning',
      code: 'ML401',
      department: 'Artificial Intelligence',
      instructor: 'Dr. Emma Davis',
      students: 45,
      status: 'upcoming',
      semester: 'Spring 2025',
      icon: '🤖',
      color: 'red',
      gradient: 'from-red-500 to-orange-500',
      topics: ['Neural Networks', 'Deep Learning', 'Python', 'TensorFlow', 'Data Science'],
      category: 'science'
    },
    {
      id: 5,
      title: 'Software Engineering',
      code: 'SE501',
      department: 'Computer Science',
      instructor: 'Prof. David Brown',
      students: 92,
      status: 'archived',
      semester: 'Spring 2024',
      icon: '🔧',
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-500',
      topics: ['Agile', 'DevOps', 'Testing', 'Architecture', 'Project Management'],
      category: 'tech'
    },
    {
      id: 6,
      title: 'English Literature',
      code: 'EN101',
      department: 'Languages',
      instructor: 'Prof. Maria Garcia',
      students: 65,
      status: 'active',
      semester: 'Fall 2024',
      icon: '📚',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-500',
      topics: ['Poetry', 'Drama', 'Novels', 'Literary Theory', 'Creative Writing'],
      category: 'language'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Courses', count: courses.length },
    { id: 'tech', label: 'Technology', count: courses.filter(c => c.category === 'tech').length },
    { id: 'science', label: 'Science', count: courses.filter(c => c.category === 'science').length },
    { id: 'language', label: 'Languages', count: courses.filter(c => c.category === 'language').length }
  ];

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600';
      case 'upcoming': return 'text-blue-600';
      case 'archived': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100';
      case 'upcoming': return 'bg-blue-100';
      case 'archived': return 'bg-gray-100';
      default: return 'bg-gray-100';
    }
  };

  const getDarkStatusBgColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-900/30';
      case 'upcoming': return 'bg-blue-900/30';
      case 'archived': return 'bg-gray-700';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-6">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>Course Management</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Manage All
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              Platform Courses
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Configure and monitor all courses across your educational institution
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="text-3xl font-bold text-primary-500">
              {courses.length}
            </div>
            <div className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Courses</div>
          </div>
          
          <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="text-3xl font-bold text-green-500">
              {courses.filter(c => c.status === 'active').length}
            </div>
            <div className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Courses</div>
          </div>
          
          <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="text-3xl font-bold text-blue-500">
              {courses.reduce((acc, c) => acc + c.students, 0)}
            </div>
            <div className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Students</div>
          </div>
          
          <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="text-3xl font-bold text-yellow-500">
              6
            </div>
            <div className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Departments</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? isDark
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : isDark
                    ? 'bg-dark-700 text-gray-300 hover:bg-dark-600 border border-dark-600'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="relative z-10">{category.label}</span>
              <span className={`relative z-10 ml-2 px-2 py-1 text-xs rounded-full ${
                activeCategory === category.id
                  ? 'bg-white/20'
                  : isDark ? 'bg-dark-600' : 'bg-gray-100'
              }`}>
                {category.count}
              </span>
              
              {/* Hover effect */}
              {activeCategory !== category.id && (
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                  isDark ? 'bg-white' : 'bg-black'
                }`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-6 rounded-2xl ${
          isDark 
            ? 'bg-dark-800/50 border border-dark-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => console.log('Add Course clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>+</span>
                <span>Add Course</span>
              </span>
            </button>
            
            <button
              onClick={() => console.log('Bulk Import clicked')}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10">Bulk Import</span>
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                isDark
                  ? 'bg-dark-800/50 hover:bg-dark-700 border border-dark-700'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              } shadow-lg hover:shadow-2xl`}
              onClick={() => console.log(`Clicked ${course.title}`)}
            >
              {/* Top gradient bar */}
              <div className={`h-2 bg-gradient-to-r ${course.gradient}`}></div>
              
              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.gradient} flex items-center justify-center text-3xl`}>
                    {course.icon}
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    isDark ? getDarkStatusBgColor(course.status) : getStatusBgColor(course.status)
                  } ${getStatusColor(course.status)}`}>
                    {course.status.toUpperCase()}
                  </span>
                </div>
                
                {/* Title and Code */}
                <div className="mb-4">
                  <h3 className={`text-xl font-bold group-hover:translate-x-2 transition-transform duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {course.title}
                  </h3>
                  <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {course.code} • {course.department}
                  </p>
                </div>
                
                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Instructor:</span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Students:</span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{course.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Semester:</span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{course.semester}</span>
                  </div>
                </div>
                
                {/* Topics */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.slice(0, 3).map((topic, i) => (
                      <span 
                        key={i}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                    {course.topics.length > 3 && (
                      <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                        isDark ? 'bg-dark-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                      }`}>
                        +{course.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                  <button
                    className={`font-medium transition-colors duration-300 ${
                      isDark 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`View details for ${course.title}`);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className={`font-medium transition-colors duration-300 ${
                      isDark 
                        ? 'text-gray-400 hover:text-gray-300' 
                        : 'text-gray-600 hover:text-gray-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Edit ${course.title}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${course.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className={`text-center py-16 rounded-2xl ${
            isDark 
              ? 'bg-dark-800/50 border border-dark-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="text-6xl mb-4">📚</div>
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              No courses found
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try changing your filters or add a new course
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className={`mb-6 text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Need help managing your courses? Contact our support team
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`group relative px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
            } shadow-lg hover:shadow-xl`}>
              <span className="relative z-10">Contact Support</span>
            </button>
            
            <button className={`group relative px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-dark-700 hover:bg-dark-600 text-gray-300 border border-dark-600'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            } shadow-lg hover:shadow-xl`}>
              <span className="relative z-10">View Documentation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;