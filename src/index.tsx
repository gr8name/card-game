import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Battle from './pages/battle';
import CatGenerator from './pages/CatGenerator';
import RandomBattle from './pages/randomBattle';
import StartPage from './pages/startPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage/>,
    children: [
      {
        path   : "/generator",
        element: <CatGenerator/>,
      }, {
        path   : "/random/:catName",
        element: <Battle/>,
      }, {
        path   : "/random",
        element: <RandomBattle/>,
      }
    ]
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
