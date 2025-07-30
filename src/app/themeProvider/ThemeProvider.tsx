'use client';
import { useState, useEffect, useContext } from 'react';
import ThemeContext from '@/context/themeContext';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const lsTheme: boolean =
    typeof localStorage !== 'undefined' && localStorage.getItem('hotel-theme')
      ? JSON.parse(localStorage.getItem('hotel-theme')!)
      : false;
  const [darkTheme, setDarkTheme] = useState<boolean>(lsTheme);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? 'dark' : ''} min-h-screen`}>
        <div className='dark:text-white dark:bg-black text-[#1e1e1e]'>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeProvider;
