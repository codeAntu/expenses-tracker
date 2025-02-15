import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { createFileRoute } from '@tanstack/react-router';
import { Home } from 'lucide-react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  async function handleFetch() {
    const data = await (await client.api.hello.$get()).json();
    console.log(data);
  }

  async function test() {
    const response = await client.api.test.$get();
    const data = await response.json();
    console.log(data);
  }

  async function text() {
    const response = await fetch('http://localhost:3000/api/test');
    const data = await response.json();
    console.log(data);
  }

  async function testPost() {
    const response = await client.api.test.$post({
      form: {
        name: 'test',
        email: 'test@gmail.com',
        age: '20',
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <Button onClick={handleFetch}>Test Client</Button>
      <Button onClick={test}>Test Client Index</Button>
      <Button onClick={text}>Test Fetch</Button>
      <Button onClick={testPost}>Test Post</Button>
      <Home size={20} />
    </div>
  );
}
