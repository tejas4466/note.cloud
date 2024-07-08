import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Components/Home/Home.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Manage from './Components/Manage/Manage.jsx'
import Create from './Components/Create/Create.jsx'
import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Layout from './Layout.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'; 
import View from './Components/View/View.jsx'
import Update from './Components/Update/Update.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='create' element={<Create/>}/>
      <Route path='manage' element={<Manage/>}/>
      <Route path='view/:id' element={<View/>}/> 
      <Route path='update/:id' element={<Update/>}/>
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
)
