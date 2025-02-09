import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { z } from 'zod';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

export const testValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.string().nonempty(),
});

function RouteComponent() {
  const formData = new FormData();
  formData.append('name', 'John Doe');
  formData.append('email', 'test@gmail.com');
  formData.append('age', '25');

  async function postTest() {
    const res = await axios.post('http://localhost:3000/api/test', formData);
    console.log(res);
  }

  async function test() {
    const res = await axios.get('http://localhost:3000/api/test');
    console.log(res);
  }

  async function auth() {
    const res = await axios.get('http://localhost:3000/api/auth');
    console.log(res);
  }

  async function authPost() {
    const res = await axios.post('http://localhost:3000/api/auth', formData);
    console.log(res);
  }

  return (
    <div>
      <Button onClick={test}>Get Token</Button>
      <Button onClick={postTest}>Post Test</Button>
      <Button onClick={auth}>Auth</Button>
      <Button onClick={authPost}>Auth Post</Button>
      {/* <Button onClick={test}>Test</Button> */}
    </div>
  );
}
