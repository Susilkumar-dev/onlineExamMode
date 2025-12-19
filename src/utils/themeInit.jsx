export const initializeTheme = () => {
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('exampro-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    return 'dark';
  }
  
  document.documentElement.classList.add('light');
  return 'light';
};

export const setTheme = (theme) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  localStorage.setItem('exampro-theme', theme);
};