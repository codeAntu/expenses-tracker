import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { checkVerification, resendVerificationEmail } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { Loader2, MailCheck, MailWarning } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function VerifyPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await checkVerification(),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message || 'Email not verified. Please check your inbox for the verification link.');
        return;
      }
      toast.success(res.message || 'Email verified successfully!');
      navigate('/', { replace: true });
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => await resendVerificationEmail(),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || 'Verification email sent. Please check your inbox.');
      } else {
        toast.error(res.message || 'Failed to send verification email');
      }
    },
    onError: (error) => {
      toast.error((error as Error)?.message || 'Failed to send verification email');
    },
  });

  return (
    <div className='from-primary/20 to-background flex min-h-screen items-center justify-center bg-gradient-to-br px-2'>
      <Card className='w-full max-w-md border-0 shadow-lg'>
        <CardHeader className='text-center'>
          <div className='mb-2 flex justify-center py-3'>
            <MailCheck className='text-primary h-10 w-10' />
          </div>
          <CardTitle className='mb-1 text-2xl font-bold'>Email Verification Required</CardTitle>
          <CardDescription className='text-muted-foreground py-1 text-xs font-normal'>
            We have sent a verification link to your email address.
            <br />
            Please check your inbox and click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-5'>
          <Button
            onClick={() => mutate()}
            className='flex w-full items-center justify-center gap-2 rounded-lg py-2 text-base font-semibold shadow-sm transition-all duration-150'
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className='text-primary-foreground h-4 w-4 animate-spin' />
                Checking...
              </>
            ) : (
              <>
                <MailCheck className='h-4 w-4' />I have verified my email
              </>
            )}
          </Button>
          <div className='text-muted-foreground bg-muted/60 mt-2 flex flex-col items-center gap-1 rounded-lg px-6 py-3 text-center text-xs'>
            <MailWarning className='mb-1 h-5 w-5 text-yellow-500' />
            Didn&apos;t receive the email? <br />
            <span className='block'>
              Check your spam folder or{' '}
              <button
                type='button'
                className='text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition'
                onClick={() => resendMutation.mutate()}
                disabled={resendMutation.isPending}
              >
                {resendMutation.isPending ? 'Resending...' : 'Resend'}
              </button>{' '}
              from your email provider.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
