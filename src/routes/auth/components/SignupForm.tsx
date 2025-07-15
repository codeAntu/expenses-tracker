import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { signUpWithEmail } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import Provider from './Provider';

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const location = useLocation();
  const [email, setEmail] = useState(() => location.state?.email || '');
  const [password, setPassword] = useState(() => location.state?.password || '');
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { email: string; password: string }) => signUpWithEmail(data.email, data.password),
    onSuccess: (res) => {
      if (res.haveToVerify) {
        navigate('/verify', {
          state: {
            message: res.message,
            email,
          },
        });
        toast.info(res.message || 'Verification email sent. Please check your inbox.');
      } else {
        toast.success('Signup successful!');
      }
    },
    onError: (error) => {
      toast.error((error as Error)?.message || 'Signup failed.');
    },
  });

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    mutate({ email, password });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create an account</CardTitle>
          <CardDescription>Sign up with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6'>
            <Provider />
            <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
              <span className='bg-background text-muted-foreground relative z-10 px-2'>Or continue with</span>
            </div>
            <form onSubmit={handleSignup} className='grid gap-6'>
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
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Signing up...' : 'Sign up'}
              </Button>
              <div className='text-center text-sm'>
                Already have an account?{' '}
                <Link to='/login' className='underline underline-offset-4' state={{ email, password }}>
                  Login
                </Link>
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
