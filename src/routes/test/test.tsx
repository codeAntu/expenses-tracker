import Logout from '@/components/logout';
import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

function Test() {
  const [message, setMessage] = useState('');

  // console.log('Test token:', token);

  // TODO: fix the token issue
  const testApiMutation = useMutation({
    mutationFn: async () => (await client.api.test.new.$post({ input: {} })).json(),
    onSuccess: () => {
      toast.success('API call successful');
    },
    onError: (err) => {
      setMessage('API error: ' + (err instanceof Error ? err.message : String(err)));
    },
  });

  return (
    <div className='flex min-h-[calc(100dvh-8rem)] w-full flex-col xl:flex-row'>
      <Logout>
        <Button variant='outline'>Logout</Button>
      </Logout>

      <Button
        onClick={() => {
          console.log('Deposit button clicked');
        }}
      >
        <span className='text-sm'>Deposit to Account</span>
      </Button>

      <div>
        <Button onClick={() => testApiMutation.mutate()}>Test</Button>
        {message && <div>API Response: {message}</div>}
      </div>
    </div>
  );
}

export default Test;
