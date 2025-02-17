import { Tilt } from '@/components/ui/tilt';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AnimatedNumber } from '@/components/ui/animated-number';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className=''>
      <TiltCard1 />
    </div>
  );
}

export function TiltCard1() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(1000);
  }, []);




  return (
    <Tilt rotationFactor={1} isRevese>
      <div className='flex h-48 max-w-72 flex-col overflow-hidden border border-zinc-950/10 bg-white p-5 dark:border-zinc-50/10 dark:bg-zinc-900'>
        <div className='text-3xl'>
          <div className='flex items-center justify-center space-x-2 text-zinc-800 dark:text-zinc-50'>
            <button aria-label='Decrement' onClick={() => setValue((prev) => prev - 100)}>
              <Minus className='h-4 w-4' />
            </button>
            {/* <SlidingNumber padStart={true} value={value} /> */}

            <AnimatedNumber
              className='inline-flex items-center font-mono text-2xl font-light'
              springOptions={{
                bounce: 0,
                duration: 1000,
              }}
              value={value}
            />
            <button aria-label='Increment' onClick={() => setValue((prev) => prev + 100)}>
              <Plus className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

// function App() {
//   const [user, setUser] = useState<User | null>(null);
//   const auth = getAuth(app);

//   async function signInWithGoogle() {
//     const provider = new GoogleAuthProvider();
//     const auth = getAuth(app);
//     const userCredential = await signInWithPopup(auth, provider);
//     return userCredential.user;
//   }

//   async function logOut() {
//     await signOut(auth);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   console.log(user);

//   async function handleFetch() {
//     try {
//       const user = await signInWithGoogle();
//       console.log(user);
//       if (user) {
//         const idToken = await user.getIdToken();
//         const response = await client.api.auth.$post({
//           form: {
//             idToken,
//           },
//         });
//         const data = await response.json();
//         console.log(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <div className='flex h-[100dvh] items-center justify-center'>
//         {user ? <Button onClick={logOut}>Log out</Button> : <Button onClick={handleFetch}>Log in with Google</Button>}
//         <div>
//           <Button
//             onClick={async () => {
//               // const idToken = 'test';
//               const response = await client.api.protected.$get();
//               const data = await response.json();
//               console.log(data);
//             }}
//           >
//             Test Client
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }

export default App;
