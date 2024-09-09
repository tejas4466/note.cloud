//problems to analyze when user logouts username is not defined message comes to check this problem
import React, { useState } from 'react';
import './Profile.css'; // Import CSS for transitions
import { MdAccountCircle } from "react-icons/md";

const Profile = ({ user = {}, handleLogout }) => { // Added default value for user
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  

  return (
    <div className="relative">
      <button 
        className="flex items-center font-medium cursor-pointer hover:scale-110"
        onClick={toggleDropdown}
      >
        <MdAccountCircle className="text-4xl" />
      </button>
      <div
        className={`absolute z-10 w-50 p-3 mt-3 text-black bg-purple-200 shadow-xl right-[-16px] .transition-transform .transition-opacity duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="font-semibold text-center"><span className='text-lg'>Welcome</span>, {user.username || 'User'}</span>
          <button 
            className="mt-2 text-xl text-red-600 transition duration-300 ease-in-out hover:underline" // Corrected class names
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
