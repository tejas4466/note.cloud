import React, { useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './Slices/authSlice';

function Layout() {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const user = useSelector((state) => state.auth.userData); // Fetch user data from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.querySelector('html').classList.remove("light", "dark");
      document.querySelector('html').classList.add("dark");
    } else {
      document.querySelector('html').classList.remove("light", "dark");
      document.querySelector('html').classList.add("light");
    }
  }, [darkMode]);

// Client-side example for logout
const handleLogout = () => {

  dispatch(logoutUser());
// Redirect user to login page or home
  window.location.href = "/login";
};


  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
