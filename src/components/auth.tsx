import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithEmail, signInWithProvider, signUpWithEmail } from '@/services/authService';
import { useUserStore } from '@/zustand/userStore';
import { useMutation } from '@tanstack/react-query';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AtSign, Github } from 'lucide-react';
import { useId, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from '@tanstack/react-router';

export function Auth({ children: props }: { children: React.ReactNode }) {
  const id = useId();
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const { mutate: googleMutate, isPending: googleIsPending } = useMutation({
    mutationKey: ['google'],
    mutationFn: () => signInWithProvider(googleProvider),
  });

  const { mutate: gitHubMutate, isPending: gitHubIsPending } = useMutation({
    mutationKey: ['github'],
    mutationFn: () => signInWithProvider(gitHubProvider),
  });

  if (user) {
    return (
      <Avatar
        className='size-9 cursor-pointer'
        onClick={() => {
          navigate({
            to: '/profile',
          });
        }}
      >
        <AvatarImage src={user.picture} alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{props}</DialogTrigger>
      <DialogContent className='max-w-[400px] rounded-xl'>
        <div className='flex flex-col items-center gap-2 pt-6'>
          <DialogHeader>
            <DialogTitle className='sm:text-center'>Sign up Expense Tracker</DialogTitle>
            <DialogDescription className='sm:text-center'>Login to your account</DialogDescription>
          </DialogHeader>
        </div>

        <form className='space-y-5'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder='hi@yourcompany.com'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder='Enter your password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {isSignInPage ? <SignIn email={email} password={password} /> : <SignUp email={email} password={password} />}
        </form>
        {isSignInPage ? (
          <div className='text-center text-sm font-normal'>
            Don't have an account?
            <Button
              variant='link'
              onClick={() => setIsSignInPage(!isSignInPage)}
              className='underline underline-offset-2'
            >
              Sign up
            </Button>
          </div>
        ) : (
          <div className='text-center text-sm font-normal'>
            Already have an account?
            <Button
              variant='link'
              onClick={() => setIsSignInPage(!isSignInPage)}
              className='underline underline-offset-2'
            >
              Sign in
            </Button>
          </div>
        )}
        <div className='before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1'>
          <span className='text-muted-foreground text-xs'>Or</span>
        </div>
        <div className='text-center text-sm font-medium'>Continue with</div>
        <div className='grid grid-cols-2 gap-4'>
          <Button
            onClick={() => {
              googleMutate();
            }}
            disabled={googleIsPending}
          >
            <AtSign size={20} className='mr-2' />
            Google
          </Button>
          <Button
            onClick={() => {
              gitHubMutate();
            }}
            disabled={gitHubIsPending}
          >
            <Github size={20} className='mr-2' />
            Github
          </Button>
        </div>

        <p className='text-muted-foreground text-center text-xs'>
          By signing up you agree to our{' '}
          <a className='underline hover:no-underline' href='#'>
            Terms
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}

function SignIn({ email, password }: { email: string; password: string }) {
  const mutation = useMutation({
    mutationFn: () => signInWithEmail(email, password),
  });

  if (mutation.isError) {
    console.log(mutation.error.message);
  }

  return (
    <Button type='button' className='w-full' onClick={() => mutation.mutate()}>
      {mutation.isPending ? 'Signing in...' : mutation.isError ? 'Try again' : 'Sign in'}
    </Button>
  );
}

function SignUp({ email, password }: { email: string; password: string }) {
  const mutation = useMutation({
    mutationFn: () => signUpWithEmail(email, password),
  });

  if (mutation.isError) {
    console.log(mutation.error);
  }

  return (
    <Button type='button' className='w-full' onClick={() => mutation.mutate()}>
      {mutation.isPending ? 'Signing up...' : mutation.isError ? 'Try again' : 'Sign up'}
    </Button>
  );
}
