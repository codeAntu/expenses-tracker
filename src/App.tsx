import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { ProtectedRoute, UnprotectedRoute } from './components/ProtectedRoute';
import Layout from './components/layout';
import { ThemeProvider } from './components/theme-provider';
import LoginPage from './routes/auth/Login';
import SignupPage from './routes/auth/Signup';
import VerifyPage from './routes/auth/Verify';
import Test from './routes/test/test';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    element: (
      <UnprotectedRoute>
        <Outlet />
      </UnprotectedRoute>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/verify',
        element: <VerifyPage />,
      },
    ],
  },
  { path: '/test', element: <Test /> },
]);

const App = () => {
  return (
    <>
      <Toaster richColors />
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
