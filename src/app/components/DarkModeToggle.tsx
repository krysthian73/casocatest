'use client'
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
    >
      <div className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300`}>
        <div
          className={`w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform duration-500 ${theme === 'light' ? '' : 'translate-x-6'
            }`}
        >
          {theme === 'light' ? (
            <span className="flex items-center justify-center h-full w-full text-yellow-500">🌞</span>
          ) : (
            <span className="flex items-center justify-center h-full w-full text-yellow-300">🌜</span>
          )}
        </div>
      </div>
    </div>
  );
}
