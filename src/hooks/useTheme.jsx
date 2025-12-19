import { useTheme } from '../context/ThemeContext';

export const useThemeClasses = () => {
  const { isDark } = useTheme();
  
  return {
    // Text colors
    text: {
      primary: isDark ? 'text-gray-100' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
      muted: isDark ? 'text-gray-500' : 'text-gray-500',
    },
    
    // Background colors
    bg: {
      primary: isDark ? 'bg-dark-800' : 'bg-white',
      secondary: isDark ? 'bg-dark-700' : 'bg-gray-100',
      card: isDark ? 'bg-dark-800/80' : 'bg-white/80',
    },
    
    // Border colors
    border: {
      primary: isDark ? 'border-dark-700' : 'border-gray-200',
      secondary: isDark ? 'border-dark-600' : 'border-gray-300',
    },
    
    // Button variants
    button: {
      primary: isDark 
        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
        : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white',
      secondary: isDark 
        ? 'bg-dark-700 hover:bg-dark-600 text-gray-100'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    },
    
    // Utility
    isDark,
  };
};