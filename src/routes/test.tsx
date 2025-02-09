import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import client from '@/utils/client';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  async function testClient() {
    const res = await client.api.$get();
    console.log(res);
  }

  return (
    <div>
      <Button onClick={testClient}>Test Client</Button>
      {/* <Button onClick={test}>Test</Button> */}
    </div>
  );
}
