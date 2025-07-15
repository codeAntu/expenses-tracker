import { Button } from '@/components/ui/button';
import { signInWithProvider } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';

const Provider = () => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [providerError, setProviderError] = useState<string | null>(null);

  const githubMutation = useMutation({
    mutationFn: async () => {
      setProviderError(null);
      const result = await signInWithProvider(githubProvider);
      if (result instanceof Error) throw result;
      return result;
    },
    onError: (error: any) => {
      setProviderError(error?.message || 'Github login failed');
    },
  });

  const googleMutation = useMutation({
    mutationFn: async () => {
      setProviderError(null);
      const result = await signInWithProvider(googleProvider);
      if (result instanceof Error) throw result;
      return result;
    },
    onError: (error: any) => {
      setProviderError(error?.message || 'Google login failed');
    },
  });

  return (
    <div className='flex flex-col gap-4'>
      <Button
        variant='outline'
        className='w-full'
        onClick={() => githubMutation.mutate()}
        disabled={githubMutation.isPending || googleMutation.isPending}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
            fill='currentColor'
          />
        </svg>
        {githubMutation.isPending && (
          <svg className='text-muted-foreground ml-2 h-4 w-4 animate-spin' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
          </svg>
        )}
        {githubMutation.isPending ? 'Logging in...' : 'Login with Github'}
      </Button>
      <Button
        variant='outline'
        className='w-full'
        onClick={() => googleMutation.mutate()}
        disabled={googleMutation.isPending || githubMutation.isPending}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
            fill='currentColor'
          />
        </svg>
        {googleMutation.isPending && (
          <svg className='text-muted-foreground ml-2 h-4 w-4 animate-spin' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
          </svg>
        )}
        {googleMutation.isPending ? 'Logging in...' : 'Login with Google'}
      </Button>
      {providerError && <div className='text-center text-sm text-red-600'>{providerError}</div>}
    </div>
  );
};

export default Provider;
