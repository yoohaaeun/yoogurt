import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
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
      { path: '/home/:contentId', element: <Home /> },
      { path: '/tvSeries', element: <TvSeries /> },
      { path: '/tvSeries/:contentId', element: <TvSeries /> },
      { path: '/movie', element: <Movie /> },
      { path: '/movie/:contentId', element: <Movie /> },
      { path: '/search', element: <Search /> },
      { path: '/search/:contentId', element: <Search /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
