import { Button } from '@/components/ui/button';
import app from '@/firebase/firebaseConfig';
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

  return (
    <>
      <div className='flex h-[100dvh] items-center justify-center'>
        {user ? (
          <Button onClick={logOut}>Log out</Button>
        ) : (
          <Button
            onClick={() =>
              signInWithGoogle()
                .then((user) => console.log(user))
                .catch((error) => console.error(error))
            }
          >
            Log in with Google
          </Button>
        )}
      </div>
    </>
  );
}

export default App;
