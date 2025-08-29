import { Button } from '@/components/ui/button';
import { useKeyAuthStore } from '@/zustand/keyAuthStore';
import { ShieldCheck } from 'lucide-react';
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
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white/80 p-6 shadow-xl md:m-4 md:p-10 lg:m-10 dark:bg-gray-900/80'>
        <div className='space-y-4 text-center'>
          <div className='mb-6'>
            <div className='mb-2 flex items-center justify-center'>
              <ShieldCheck className='h-8 w-8 text-green-600 dark:text-green-400' />
            </div>
            <span className='inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300'>
              ✓ Authenticated
            </span>
          </div>
          <h1 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>Protected Page</h1>
          <p className='text-xs text-gray-700 dark:text-gray-300'>
            🎉 Success! You have accessed this protected page using key-based authentication.
          </p>
        </div>

        <Button onClick={handleLogout} variant='outline' className='w-full flex-1'>
          Logout
        </Button>
      </div>
    </div>
  );
}
