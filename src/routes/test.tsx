import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { createFileRoute } from '@tanstack/react-router';
import { getAuth } from 'firebase/auth';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = getAuth(app);
  // const [user, setUser] = useState<unknown | null>(null);

  // useEffect(() => {
  //   const newUser = auth.currentUser;
  //   setUser(newUser);
  // }, []);

  async function logout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async function testCookie() {
    try {
      const response = await client.api.auth.$get({
        credentials: 'include', // Ensure cookies are sent with the request
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data with session cookie:', error);
    }
  }

  // async function testCookie() {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/auth', {
  //       method: 'GET',
  //       credentials: 'include', // Ensure cookies are sent with the request
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data with session cookie:', error);
  //   }
  // }

  async function sendIdtoken() {
    const user = auth.currentUser;
    if (!user) {
      console.error('User not found');
      return;
    }

    const token = await user.getIdToken();
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
      console.log(data);
    } catch (error) {
      console.error('Error fetching data with session cookie:', error);
    }
  }

  return (
    <div>
      <Button onClick={testCookie}>Test Cookie</Button>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={sendIdtoken}>Send Token</Button>
    </div>
  );
}
