import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import CardProvider from './context/CardContext';
import UserProvider from './context/UserContext';
import Battle from './pages/battle';
import CatGenerator from './pages/catGenerator';
import CreateBoard from './pages/createBoard';
import ErrorPage from './pages/errorPage';
import RandomBattle from './pages/randomBattle';
import StartPage from './pages/startPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path   : "/generator",
        element: <CatGenerator/>,
      }, {
        path   : "/create-board",
        element: <CreateBoard/>,
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
    <CardProvider>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
    </CardProvider>
  </React.StrictMode>
);
