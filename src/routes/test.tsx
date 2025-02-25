import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { useStore } from '@/zustand/store';
import { createFileRoute } from '@tanstack/react-router';
import { getAuth } from 'firebase/auth';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = getAuth(app);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const logout = useStore((state) => state.logout);

  async function logoutUser() {
    try {
      await auth.signOut();
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async function sendIdToken() {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) {
      console.error('User not found');
      return;
    }
    const token = await firebaseUser.getIdToken();
    console.log(token, 'token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    try {
      const response = await client.api.auth.$post({
        form: {
          idToken: token,
        },
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching data with session cookie:', error);
    }
  }

  async function getMe() {
    if (!user) {
      console.error('User not found');
      return;
    }

    console.log(user.token);

    try {
      const response = await client.api.auth.$get({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data with session cookie:', error);
    }
  }

  console.log(user);

  return (
    <div>
      <Button onClick={logoutUser}>Logout</Button>
      <Button onClick={sendIdToken}>Send Token</Button>
      <Button onClick={getMe}>Get Me</Button>

      {user ? (
        <div>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      ) : null}
    </div>
  );
}
