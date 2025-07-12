import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
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
    </div>
  );
}
