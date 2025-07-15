import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import signInWithEmail from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Provider from './Provider';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const location = useLocation();
  const [email, setEmail] = useState(() => location.state?.email || '');
  const [password, setPassword] = useState(() => location.state?.password || '');
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: { email: string; password: string }) => signInWithEmail(data.email, data.password),
    onSuccess: (res) => {
      if (res?.haveToVerify) {
        navigate('/verify', {
          state: {
            message: res.message,
            email,
          },
        });
      }
    },
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    mutate({ email, password });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Login with your Apple or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6'>
            <Provider />
            <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
              <span className='bg-background text-muted-foreground relative z-10 px-2'>Or continue with</span>
            </div>
            <form onSubmit={handleLogin} className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? 'Logging in...' : 'Login'}
                </Button>
                {isError && (
                  <div className='text-center text-sm text-red-600'>{(error as Error)?.message || 'Login failed.'}</div>
                )}
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link to='/signup' className='underline underline-offset-4' state={{ email, password }}>
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className='text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
