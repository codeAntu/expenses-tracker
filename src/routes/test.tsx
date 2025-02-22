import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { createFileRoute } from '@tanstack/react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Home } from 'lucide-react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

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

  async function transaction() {
    const response = await client.api.transaction.$get();
    const data = await response.json();
    console.log(data);
  }

  async function authFun() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      console.log('ID Token:', idToken);

      // Send the token to the backend
      const response = await client.api.auth.$post({
        form: {
          idToken: idToken,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }

  return (
    <div>
      <Button onClick={handleFetch}>Test Client</Button>
      <Button onClick={test}>Test Client Index</Button>
      <Button onClick={text}>Test Fetch</Button>
      <Button onClick={testPost}>Test Post</Button>
      <Button onClick={transaction}>Test Transaction</Button>
      <Button onClick={authFun}>Test New</Button>
      <Home size={20} />
    </div>
  );
}
