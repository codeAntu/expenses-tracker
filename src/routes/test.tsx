import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  async function handleFetch() {
    const data = await (await client.api.hello.$get()).json();
    console.log(data);
  }

  async function handlePost() {
    const response = await client.api.hello.$post({
      form: {
        name: 'John',
      },
    });

    const data = await response.json();
    console.log(data);
  }

  

  return (
    <div>
      <Button onClick={handleFetch}>Test Client</Button>
      <Button onClick={handlePost}>Test Client Post</Button>
    </div>
  );
}
