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
    { name: 'Create', active: authStatus }, // Create only when logged in
    { name: 'About', slug: '/about', active: !authStatus }, // About only when not logged in
    { name: 'Login', slug: '/login', active: !authStatus }, // Login only when not logged in
  ];

  return (
    <nav className="bg-[rgb(42,15,103)] text-white fixed top-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
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

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:items-center md:ml-auto">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name} className="flex text-center md:ml-4">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-lg transition duration-300 ease-in-out hover:underline"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {/* Conditional Profile component rendering */}
          {authStatus && (
            <li className="md:ml-4">
              <Profile user={user} handleLogout={handleLogout}/>
            </li>
          )}

        
        </ul>

        {/* Mobile Dropdown Menu */}
        <div
          className={`fixed top-0 right-0 w-40 h-full bg-[rgb(42,15,103)] text-white transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50 flex flex-col items-center`}
        >
          <button onClick={toggleMenu} className="absolute text-white top-3 right-3">
            <FaTimes size={24} />
          </button>

          <ul className="flex flex-col items-center mt-16 space-y-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="w-full text-center">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false); // Close menu on navigation
                        navigate(item.slug);
                      }}
                      className="block text-lg transition duration-300 ease-in-out hover:underline"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Conditional Profile component rendering */}
            {authStatus && (
              <li className="w-full text-center">
                <Profile user={user} handleLogout={handleLogout} />
              </li>
            )}
          </ul>

          {/* Footer Text */}
          <div className="absolute w-full text-xl font-bold text-center text-gray-200 bottom-4">
            <h1>@note.cloud</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
