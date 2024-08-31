import React from 'react';

function Footer() {
  return (
    <footer className="fixed bottom-0 flex flex-wrap items-center justify-center w-full p-2 text-center text-white md:justify-between bg-purple-950 sm:p-2">
      <div className="md:pl-2">
        <p className="text-xs sm:text-sm lg:text-base">&copy; 2024 note.cloud. All rights reserved.</p>
      </div>

      <div className="flex items-center gap-1 text-xs md:pr-2 md:gap-2 sm:text-sm lg:text-base">
        <p>Created by @Tejas Pokale</p>
        <a
          href="https://www.linkedin.com/in/tejas-pokale-5047061b3/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-blue-500 hover:text-blue-700"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100.28 448H7.4V148.9h92.78zM53.79 108.1c-29.82 0-53.95-24.33-53.95-54.28S23.97 0 53.79 0s53.95 24.33 53.95 54.28-24.13 53.82-53.95 53.82zM447.1 448h-92.59V302.4c0-34.71-12.4-58.48-43.44-58.48-23.68 0-37.79 15.97-43.98 31.34-2.26 5.44-2.84 13.08-2.84 20.75V448H171.45s1.24-243.53 0-268.89h92.61v38.07c-0.19 0.31-0.46 0.62-0.65 0.92h0.65v-0.92c12.32-19.02 34.38-46.14 83.74-46.14 61.18 0 107.06 39.74 107.06 125.15V448z" />
          </svg>
        </a>
        <a
          href="https://github.com/tejas4466"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-500 hover:text-gray-900"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 496 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
