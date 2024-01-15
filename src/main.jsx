import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Registration from './pages/Registration.jsx';
import { Link } from "react-router-dom";
import firebaseConfig from './firebase.config.js';
import Login from './pages/Login.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import Home from './pages/Home.jsx';
import { store } from './Store.js';
import userSlice from './Slices/userSlice.js';
import { Provider } from 'react-redux';
// import Test from '../Test.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Registration",
    element: <Registration />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  // {
  //   path: "/Login",
  //   element: <Login/>,
  // },
  {
    path: "/forgetpassword",
    element: <ForgetPassword />,
  },
  // {
  //   path: "/test",
  //   element: <Test />,
  // },

  
 

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,

)
