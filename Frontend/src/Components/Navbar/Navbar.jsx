import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import Profile from './Profile';

function Navbar({ user, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Mobile menu state
  const [authStatus, setAuthStatus] = useState(false);  // Local auth state
  const navigate = useNavigate();

  // Update authStatus based on user login state
  useEffect(() => {
    if (user) {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, [user]);

  // Toggle menu visibility in mobile view
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation items with conditional rendering based on authStatus
  const navItems = [
    { name: 'Home', slug: '/', active: authStatus }, // Home should always be visible
    { name: 'Create',  active: authStatus }, // Create only when logged in
    { name: 'Login', slug: '/login', active: !authStatus }, // Login only when not logged in
  ];

  return (
    <nav className="bg-[rgb(42,15,103)] text-white fixed top-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div>
          <Link to='/'>
            <h1 className="text-lg font-extrabold text-white md:text-2xl">note.cloud</h1>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu & Mobile Dropdown */}
        <ul
          className={`fixed top-0 right-0 w-40 bg-[rgb(42,15,103)] text-white h-full md:static md:flex md:w-auto md:h-auto transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'block' : 'hidden'
          } z-50 md:z-0`}
        >
          {isMenuOpen && (
            <li className="absolute top-3 right-3 md:hidden">
              <button onClick={toggleMenu} className="text-white">
                <FaTimes size={24} />
              </button>
            </li>
          )}

          <div className={`flex flex-col md:flex-row mt-12 md:mt-0 md:items-center md:ml-auto`}>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="mt-2 md:mt-0 md:ml-4">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false); // Close menu on navigation
                        navigate(item.slug);
                      }}
                      className="block px-1 transition duration-300 ease-in-out text-md hover:underline"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Conditional Profile component rendering */}
            {authStatus && (
              <li className="mt-2 md:ml-4 md:mt-0">
                <Profile user={user} handleLogout={handleLogout} />
              </li>
            )}

            {/* Dark Mode Toggle */}
            {/* <li className="flex items-center mt-2 md:ml-4 md:mt-0">
              <DarkModeToggle />
            </li> */}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
