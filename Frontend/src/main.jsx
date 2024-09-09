import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Components/Home/Home.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Create from './Components/Create/Create.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store.js';  // Import persistor
import View from './Components/View/View.jsx';
import Update from './Components/Update/Update.jsx';
import Login from './Components/Login/Login.jsx';
import Signup from './Components/Signup/Signup.jsx';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

// Define your routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='view/:_id' element={<View />} /> 
      <Route path='update/:id' element={<Update />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
