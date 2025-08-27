import { Button } from '@/components/ui/button';
import { useKeyAuthStore } from '@/zustand/keyAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function ProtectedPage() {
  const { token, clearToken } = useKeyAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    toast.success('Logged out successfully!');
  };

  useEffect(() => {
    if (!token) {
      toast.error('You must be logged in to access this page.');
      navigate('/key-auth/register');
    }
  });

  if (!token) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Access Denied</h2>
          <p className='text-gray-600 dark:text-gray-400'>You need to be authenticated to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-2xl space-y-8 rounded-xl border border-gray-200 bg-white/80 px-8 py-10 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80'>
        <div className='space-y-4 text-center'>
          <div className='mb-6'>
            <span className='inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300'>
              ✓ Authenticated
            </span>
          </div>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>Protected Page</h1>
          <p className='text-lg text-gray-700 dark:text-gray-300'>
            🎉 Success! You have accessed this protected page using key-based authentication.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='rounded-lg bg-gray-50 p-6 dark:bg-gray-800'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>Authentication Details</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>Status:</span>
                <span className='text-sm font-semibold text-green-600 dark:text-green-400'>Authenticated</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>Token:</span>
                <span className='font-mono text-sm text-gray-900 dark:text-white'>{token.substring(0, 20)}...</span>
              </div>
            </div>
          </div>

          <div className='flex space-x-4'>
            <Button onClick={handleLogout} variant='outline' className='flex-1'>
              Logout
            </Button>
            <Button onClick={() => (window.location.href = '/')} className='flex-1'>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
