import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { createFileRoute } from '@tanstack/react-router';
import {
  getAuth
} from 'firebase/auth';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const [user, setUser] = useState<unknown>();
  const auth = getAuth(app);

  console.log(user);
  console.log(typeof user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // getToken(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  async function logout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async function testCookie() {
    try {
      const response = await client.api.auth.$get();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data with session cookie:', error);
    }
  }

  return (
    <div>
      <Button onClick={testCookie}>Test Cookie</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
