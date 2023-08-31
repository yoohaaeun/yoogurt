import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Root from './pages/Root';
import Search from './pages/Search';
import TvSeries from './pages/TvSeries';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies/:contentId', element: <Home /> },
      { path: '/tvSeries', element: <TvSeries /> },
      { path: '/tvSeries/:contentId', element: <TvSeries /> },
      { path: '/search', element: <Search /> },
      { path: '/search/:contentId', element: <Search /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
