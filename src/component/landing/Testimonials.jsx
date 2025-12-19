// Testimonials.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Professor, MIT',
      content: 'This platform transformed how we conduct programming exams. The code execution feature is flawless and the AI proctoring has reduced malpractice by 95%.',
      avatar: 'SJ',
      rating: 5,
      stats: { exams: 120, students: 5000, satisfaction: 98 }
    },
    {
      name: 'Robert Chen',
      role: 'University Director',
      content: 'The AI proctoring system caught several sophisticated malpractice attempts that traditional methods would have missed. Game-changer for academic integrity.',
      avatar: 'RC',
      rating: 5,
      stats: { exams: 85, students: 3200, satisfaction: 96 }
    },
    {
      name: 'Maria Garcia',
      role: 'Head of Examinations',
      content: 'Implementation was seamless. Our faculty loves the automated grading and analytics dashboard. Student feedback has been overwhelmingly positive.',
      avatar: 'MG',
      rating: 4,
      stats: { exams: 65, students: 2800, satisfaction: 94 }
    }
  ];

  const stats = [
    { number: '50K+', label: 'Exams Conducted' },
    { number: '200+', label: 'Institutions' },
    { number: '500K+', label: 'Students' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <section className={`py-20 md:py-32 transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-dark-800 to-dark-900' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mb-4">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>Testimonials</span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Loved by
            <span className={`block bg-gradient-to-r ${
              isDark 
                ? 'from-primary-400 to-secondary-400' 
                : 'from-primary-600 to-secondary-600'
            } bg-clip-text text-transparent`}>
              Educational Leaders
            </span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Join thousands of satisfied institutions using our platform to revolutionize education
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-dark-800 hover:bg-dark-700 border border-dark-700'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              } shadow-lg hover:shadow-xl`}
              onClick={() => console.log(`Clicked ${stat.label}`)}
            >
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-primary-400' : 'text-primary-600'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`rounded-3xl p-8 md:p-12 ${
                isDark
                  ? 'bg-gradient-to-br from-dark-800/80 to-dark-700/80 border border-dark-700'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
              } shadow-2xl`}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Testimonial content */}
                <div className="lg:w-2/3">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${
                        i < testimonials[activeIndex].rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-700'
                      }`}>
                        ★
                      </span>
                    ))}
                    <span className={`ml-3 text-sm font-medium ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {testimonials[activeIndex].rating}/5
                    </span>
                  </div>
                  
                  {/* Quote */}
                  <p className={`text-xl md:text-2xl italic mb-8 leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    "{testimonials[activeIndex].content}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                      isDark ? 'from-primary-600 to-secondary-600' : 'from-primary-500 to-secondary-500'
                    } flex items-center justify-center text-white text-xl font-bold`}>
                      {testimonials[activeIndex].avatar}
                    </div>
                    <div>
                      <div className={`text-xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {testimonials[activeIndex].name}
                      </div>
                      <div className={`text-lg ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {testimonials[activeIndex].role}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats sidebar */}
                <div className="lg:w-1/3">
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-dark-800' : 'bg-white'
                  } border ${
                    isDark ? 'border-dark-700' : 'border-gray-200'
                  }`}>
                    <h4 className={`font-semibold mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Impact Metrics
                    </h4>
                    
                    {Object.entries(testimonials[activeIndex].stats).map(([key, value]) => (
                      <div key={key} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <span className={`font-bold ${
                            isDark ? 'text-primary-400' : 'text-primary-600'
                          }`}>
                            {value}
                            {key === 'satisfaction' && '%'}
                          </span>
                        </div>
                        <div className={`h-2 rounded-full ${
                          isDark ? 'bg-dark-700' : 'bg-gray-200'
                        } overflow-hidden`}>
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${
                              isDark ? 'from-primary-500 to-secondary-500' : 'from-primary-400 to-secondary-400'
                            }`}
                            style={{ width: `${key === 'satisfaction' ? value : Math.min(value / 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? isDark
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                      : 'bg-gradient-to-r from-primary-600 to-secondary-600'
                    : isDark
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`rounded-3xl p-8 md:p-12 text-center relative overflow-hidden ${
          isDark
            ? 'bg-gradient-to-r from-primary-900/30 via-dark-800 to-secondary-900/30 border border-dark-700'
            : 'bg-gradient-to-r from-primary-50 via-white to-secondary-50 border border-gray-200'
        } shadow-2xl`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Transform Your
              <span className={`block bg-gradient-to-r ${
                isDark 
                  ? 'from-primary-400 to-secondary-400' 
                  : 'from-primary-600 to-secondary-600'
              } bg-clip-text text-transparent`}>
                Examination Process?
              </span>
            </h3>
            
            <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Start your free trial today. No credit card required. Experience the future of online examinations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
              } shadow-xl hover:shadow-2xl`}
              onClick={() => console.log('Clicked Start Free Trial')}>
                <span className="relative z-10">Start Free Trial</span>
                <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              
              <button className={`group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'border-primary-400 text-primary-400 hover:bg-primary-400/10 hover:border-primary-300 hover:text-primary-300'
                  : 'border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700'
              }`}
              onClick={() => console.log('Clicked Schedule Demo')}>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Schedule Demo
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </button>
            </div>
            
            <div className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Free 14-day trial</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>No setup fees</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;