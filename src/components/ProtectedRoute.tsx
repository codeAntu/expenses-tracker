import { useAuthStore } from '@/zustand/authStore';
import { Navigate } from 'react-router';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}

function UnprotectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}

export { ProtectedRoute, UnprotectedRoute };
