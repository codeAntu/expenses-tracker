import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { createFileRoute } from '@tanstack/react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const [user, setUser] = useState<unknown>();
  const [idToken, setIdToken] = useState<string>('');
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  console.log(user);
  console.log(typeof user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getToken(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  async function getToken(user: any) {
    if (!user) return;
    const idToken = await user.getIdToken();
    setIdToken(idToken);
  }

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
      console.log('User:', user);
      const idToken = await user.getIdToken();
      setIdToken(idToken);
      console.log('ID Token:', idToken);

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

  async function logout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async function sendIdToken() {
    const response = await client.api.auth.$post({
      form: {
        idToken: idToken,
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
      <Button onClick={transaction}>Test Transaction</Button>

      {user ? <Button onClick={logout}>Logout </Button> : <Button onClick={authFun}>Login</Button>}
      <Home size={20} />
      {idToken && (
        <div>
          <Button onClick={sendIdToken}>Send ID Token</Button>
        </div>
      )}
    </div>
  );
}
