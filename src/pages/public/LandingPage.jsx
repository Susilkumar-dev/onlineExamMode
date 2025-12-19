import React from 'react';
import HeroSection from '../../component/landing/HeroSection';
import Features from '../../component/landing/Features';
import Stats from '../../component/landing/Stats';
import Courses from '../../component/landing/Courses';
import Testimonials from '../../component/landing/Testimonials';
import { useTheme } from '../../context/ThemeContext';

const LandingPage = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Add floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 ${
          isDark 
            ? 'bg-primary-900/20' 
            : 'bg-primary-300/20'
        } rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-72 h-72 ${
          isDark 
            ? 'bg-secondary-900/20' 
            : 'bg-secondary-300/20'
        } rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float`} style={{ animationDelay: '2s' }}></div>
      </div>
      
      <HeroSection />
      <Features />
      <Stats />
      <Courses />
      <Testimonials />
    </div>
  );
};

export default LandingPage;