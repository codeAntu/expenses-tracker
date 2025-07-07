import Logout from '@/components/logout';
import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { useUserStore } from '@/zustand/userStore';
import { createFileRoute } from '@tanstack/react-router';
import { getAuth } from 'firebase/auth';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = getAuth(app);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

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

  // async function getMe() {
  //   try {
  //     const response = await client.api.auth.test.$post(
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer Token`,
  //         },
  //       },
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data with token:', error);
  //   }
  // }

  // console.log(user);

  return (
    <div>
      <Logout>
        <Button>Logout</Button>
      </Logout>
      <Button onClick={sendIdToken}>Send Token</Button>
      {/* <Button onClick={getMe}>Get Me</Button> */}

      {user ? (
        <div>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      ) : null}
    </div>
  );
}
