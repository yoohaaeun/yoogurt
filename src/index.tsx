import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './GlobalStyle';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import TvSeries from './pages/TvSeries';
import { theme } from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
