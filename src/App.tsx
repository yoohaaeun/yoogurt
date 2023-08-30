import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Root from './pages/Root';
import Search from './pages/Search';
import Tv from './pages/Tv';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies/:movieId', element: <Home /> },
      { path: '/tv', element: <Tv /> },
      { path: '/movies', element: <Tv /> },
      { path: '/new-and-popular', element: <Tv /> },
      { path: '/search', element: <Search /> },
      { path: '/search/movies/:movieId', element: <Search /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
