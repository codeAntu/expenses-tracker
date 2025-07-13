import { Auth } from '@/components/auth';
import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

function Test() {
  const [message, setMessage] = useState('');

  const testApiMutation = useMutation({
    mutationFn: async () => (await client.api.test.new.$post({ input: {} })).json(),
    onSuccess: (res) => {
      console.log('API response:', res);
    },
    onError: (err) => {
      setMessage('API error: ' + (err instanceof Error ? err.message : String(err)));
    },
  });

  return (
    <div>
      <Button onClick={() => testApiMutation.mutate()}>Test</Button>
      {message && <div>API Response: {message}</div>}
      <Auth>
        <div>login</div>
      </Auth>
    </div>
  );
}

export default Test;
