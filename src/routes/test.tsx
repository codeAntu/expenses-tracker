import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  
  const formData = new FormData();
  formData.append('name', 'test');

  async function postTest() {
    const res = await axios.post('http://localhost:3000/api/test', formData);
    console.log(res);
  }

  async function test() {
    const res = await axios.get('http://localhost:3000/api/test');
    console.log(res);
  }

  return (
    <div>
      <Button onClick={test}>Get Token</Button>
      <Button onClick={postTest}>Post Test</Button>
      {/* <Button onClick={test}>Test</Button> */}
    </div>
  );
}
