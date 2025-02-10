import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
import client from '@/utils/client';
import { createFileRoute } from '@tanstack/react-router';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  }

  async function logOut() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(user);

  async function handleFetch() {
    try {
      const user = await signInWithGoogle();
      console.log(user);
      if (user) {
        const idToken = await user.getIdToken();
        const response = await client.api.auth.$post({
          form: {
            idToken,
          },
        });
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='flex h-[100dvh] items-center justify-center'>
        {user ? <Button onClick={logOut}>Log out</Button> : <Button onClick={handleFetch}>Log in with Google</Button>}
        <div>
          <Button
            onClick={async () => {
              const idToken = "test"
              const response = await client.api.auth.$post({
                form: {
                  idToken,
                },
              });
              const data = await response.json();
              console.log(data);
            }}
          >
            Test Client
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
