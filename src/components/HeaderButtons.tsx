import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { twJoin } from 'tailwind-merge';

export const HeaderButtons = () => {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.dataset.theme ?? 'dark';
  });
  return (
    <div className="flex gap-2">
      <a
        href="https://github.com/yunarch/pdf2image"
        className={twJoin(
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2',
          'transition-all duration-200 hover:bg-gray-300 dark:hover:bg-slate-600'
        )}
      >
        <FaGithub />
      </a>
      <button
        className={twJoin(
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2',
          'transition-all duration-200 hover:bg-gray-300 dark:hover:bg-slate-600'
        )}
        type="button"
        onClick={() => {
          const newTheme = theme === 'dark' ? 'light' : 'dark';
          setTheme(newTheme);
          document.documentElement.dataset.theme = newTheme;
        }}
      >
        {theme === 'dark' ? <MdDarkMode /> : <MdOutlineLightMode />}
      </button>
    </div>
  );
};
