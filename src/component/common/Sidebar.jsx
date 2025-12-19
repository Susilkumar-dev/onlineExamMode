import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  HelpCircle, 
  LogOut, 
  Sun, 
  Moon,
  LayoutDashboard 
} from 'lucide-react';

const Sidebar = ({ navItems }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const handleNewExamClick = () => window.location.href = '/teacher/create-exam';
  const handleNeedHelpClick = () => window.location.href = '/help';

  const handleLogout = async () => {
    try {
      // Clear Redux state
      await dispatch(logoutUser()).unwrap();
      
      // Clear all browser storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(";").forEach(c => {
        document.cookie = c.replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Force hard redirect to login page
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect even if there's an error
      window.location.href = '/login';
    }
  };

  return (
    <aside className={`h-screen sticky top-0 transition-all duration-500 ease-in-out flex flex-col shadow-2xl ${
      isExpanded ? 'w-72' : 'w-20'
    } ${
      isDark 
        ? 'bg-[#0f172a] border-r border-slate-800 text-slate-200' 
        : 'bg-white border-r border-slate-200 text-slate-600'
    }`}>
      
      {/* Header & Toggle */}
      <div className="p-6 flex items-center justify-between">
        {isExpanded && (
          <div className="flex items-center gap-3 animate-in fade-in duration-500">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
              EduPortal
            </span>
          </div>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1.5 rounded-xl transition-all duration-200 ${
            isDark ? 'hover:bg-slate-800 bg-slate-900 text-slate-400' : 'hover:bg-slate-100 bg-slate-50 text-slate-500'
          }`}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 overflow-y-auto no-scrollbar">
        
        {/* Navigation Menu */}
        <nav className="space-y-1.5 mb-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : isDark ? 'hover:bg-slate-800/50 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                }
                ${!isExpanded && 'justify-center'}
              `}
            >
              <span className={`transition-transform duration-300 group-hover:scale-110`}>
                {item.icon}
              </span>
              {isExpanded && (
                <span className="font-semibold tracking-wide text-sm">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mb-8">
          <button
            onClick={handleLogout}
            className={`w-full group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
              ${isDark 
                ? 'bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white' 
                : 'bg-red-50 hover:bg-red-600 text-red-600 hover:text-white'
              }
              ${!isExpanded && 'justify-center'}
            `}
          >
            <LogOut size={22} className="group-hover:rotate-12 transition-transform" />
            {isExpanded && <span className="font-bold text-sm tracking-wide uppercase">Log Out</span>}
          </button>
        </div>

        {/* Quick Actions Card */}
        {isExpanded && (
          <div className={`p-4 rounded-2xl border mb-6 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100'
          }`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">
              Quick Actions
            </p>
            <button 
              onClick={handleNewExamClick}
              className="w-full flex items-center gap-3 p-2.5 mb-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-md shadow-indigo-500/20"
            >
              <Plus size={18} />
              <span className="text-sm font-medium">New Exam</span>
            </button>
            <button 
              onClick={handleNeedHelpClick}
              className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-sm'
              }`}
            >
              <HelpCircle size={18} />
              <span className="text-sm font-medium">Need Help?</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer - Theme Toggle */}
      <div className={`p-4 ${isDark ? 'border-t border-slate-800' : 'border-t border-slate-100'}`}>
        <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} p-2 rounded-2xl ${
          isDark ? 'bg-slate-900/80' : 'bg-slate-100'
        }`}>
          {isExpanded && (
            <span className="text-xs font-bold uppercase tracking-widest ml-2 text-slate-500">
              {isDark ? 'Dark' : 'Light'}
            </span>
          )}
          <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-xl transition-all duration-500 ${
              isDark ? 'bg-indigo-500 text-white' : 'bg-white text-amber-500 shadow-sm'
            }`}
          >
            {isDark ? <Moon size={18} fill="currentColor" /> : <Sun size={18} fill="currentColor" />}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;