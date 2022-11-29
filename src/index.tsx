import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import {createTheme, ThemeProvider} from "@mui/material";
import {LinkProps} from '@mui/material/Link';
import orange from '@mui/material/colors/orange';
import CardProvider from './context/CardContext';
import UserProvider from './context/UserContext';
import Battle from './pages/battle';
import CatGenerator from './pages/catGenerator';
import CreateBoard from './pages/createBoard';
import ErrorPage from './pages/errorPage';
import RandomBattle from './pages/randomBattle';
import StartPage from './pages/frame';
import Link from "./components/Link";
import './utils/fonts';

const theme = createTheme({
  palette: {
    primary: orange,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createHashRouter([
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
    <ThemeProvider theme={theme}>
      <CardProvider>
        <UserProvider>
          <RouterProvider router={router} fallbackElement={<StartPage/>}/>
        </UserProvider>
      </CardProvider>
    </ThemeProvider>
  </React.StrictMode>
);
