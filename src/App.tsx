import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { ProtectedRoute, UnprotectedRoute } from './components/ProtectedRoute';
import Layout from './components/layout';
import { ThemeProvider } from './components/theme-provider';
import Home from './routes/Home';
import NotFoundPage from './routes/NotFoundPage';
import Accounts from './routes/accounts/Accounts';
import LoginPage from './routes/auth/Login';
import SignupPage from './routes/auth/Signup';
import VerifyPage from './routes/auth/Verify';
import Test from './routes/test/test';
import AccountDetails from './routes/accounts/pages/AccountDetails';

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
      {
        path: '/accounts',
        element: <Accounts />,
      },
      {
        path: '/accounts/:accountId',
        element: <AccountDetails />,
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
  {
    path: '/test',
    element: (
      <Layout>
        <Test />
      </Layout>
    ),
  },
  { path: '*', element: <NotFoundPage /> },
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
