import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import Search from './pages/Search';
import Tv from './pages/Tv';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>NotFound</div>,
    children: [
      { index: true, element: <Home /> },
      { path: 'tv', element: <Tv /> },
      { path: 'search', element: <Search /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
