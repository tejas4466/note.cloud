import { Link, NavLink } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[rgb(42,15,103)] flex justify-between items-center p-3 text-white fixed top-0 flex-wrap w-full z-50">
      <div className="flex items-center my-auto">
        <Link to='/'><h1 className="p-2 text-xl font-bold text-white md:text-3xl">note.cloud</h1></Link>
      </div>
      <div className="block lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 text-white border border-white rounded">
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M0 3h20v2H0zM0 7h20v2H0zM0 11h20v2H0z" />
          </svg>
        </button>
      </div>
      <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col flex-wrap items-center justify-center h-full gap-2 pr-2 text-lg lg:flex-row lg:gap-10">
          <li className="h-full">
            <NavLink
              to="/"
              className="flex items-center h-full px-4 py-2 lg:py-0 transition duration-300 ease-in-out
               hover:bg-[rgb(61,31,139)] hover:rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="h-full">
            <NavLink
              to="/create"
              className="flex items-center h-full px-4 py-2 lg:py-0 transition duration-300 ease-in-out
               hover:bg-[rgb(61,31,139)] hover:rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              Create
            </NavLink>
          </li>
          <li className="h-full">
            <NavLink
              to="/manage"
              className="flex items-center h-full px-4 py-2 lg:py-0 transition duration-300 ease-in-out 
              hover:bg-[rgb(61,31,139)] hover:rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              Manage
            </NavLink>
          </li>
          <DarkModeToggle />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
