import React from 'react';
import { toggleDarkMode } from '../../Slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import lightModeIcon from '../../assets/brightness.png';
import darkModeIcon from '../../assets/moon.png';

function DarkModeToggle() {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div>
      <button 
        className='flex items-center justify-center w-10 bg-gray-400 rounded-lg'
        onClick={handleToggle}
      >
        {darkMode ? (
   <img width="90" src="https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/78/1A1A1A/external-Light-Mode-interface-glyph-silhouettes-icons-papa-vector.png" alt="light"/>
      
        
        ) : (
<img width="36" src="https://img.icons8.com/ios-filled/50/do-not-disturb-2.png" alt="dark"/>
        )}
      </button>
    </div>
  );
}

export default DarkModeToggle;
