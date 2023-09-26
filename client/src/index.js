import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogIn from './pages/LogIn';
import Main from './components/Main';
import Register from './pages/Register';
import store from './store/store.js'
import { Provider } from 'react-redux'
import Upload from './pages/Upload';
import Detail from './pages/Detail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/create",
        element: <Upload />,
      },
      {
        path: "/detail/:postNum",
        element: <Detail />,
      }
    ],
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
