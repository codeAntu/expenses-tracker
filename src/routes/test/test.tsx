import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

function Test() {
  const [message, setMessage] = useState('');

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
    <div>
      <Button onClick={() => testApiMutation.mutate()}>Test</Button>
      {message && <div>API Response: {message}</div>}
    </div>
  );
}

export default Test;
