import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { checkVerification } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function VerifyPage() {
  const navigate = useNavigate();
  // Mutation to check if the email is verified

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async () => await checkVerification(),
    onSuccess: (verified) => {
      if (verified) {
        navigate('/', { replace: true });
      }
    },
  });

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle>Email Verification Required</CardTitle>
          <CardDescription>
            We have sent a verification link to your email address. Please check your inbox and click the link to verify
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-4'>
          <Button onClick={() => mutate()} className='w-full' disabled={isPending || isSuccess}>
            {isPending ? 'Checking...' : isSuccess ? 'Verified! Redirecting...' : 'I have verified my email'}
          </Button>
          {isError && <div className='text-red-600'>Error checking email verification. Please try again.</div>}
          {!isSuccess && !isPending && (
            <div className='text-muted-foreground text-center text-sm'>
              Didn&apos;t receive the email? Check your spam folder or <b>resend</b> from your email provider.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
