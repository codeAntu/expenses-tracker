import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';

export function VerifyForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex min-w-sm flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Verify OTP</CardTitle>
          <CardDescription>Enter the OTP sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='otp'>OTP</Label>
                <Input id='otp' type='text' required />
              </div>
              <Button type='submit' className='w-full'>
                Verify OTP
              </Button>
              <div className='text-center text-sm'>
                <Link to='/login' className='underline underline-offset-4'>
                  Back to Login
                </Link>
                {' | '}
                <Link to='/signup' className='underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
