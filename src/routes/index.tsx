import { Tilt } from '@/components/ui/tilt';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
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
    setValue(1000000000);
  }, []);

  return (
    <Tilt rotationFactor={4} isRevese>
      <div className='bg-accent border-foreground/5 flex inline-flex flex-col items-center justify-center overflow-hidden rounded-xl border p-5'>
        <div className='flex h-full w-full flex-col'>
          <div className='text-accent-foreground/50 text-xl font-bold'>Total Money</div>
          <div className='flex items-center justify-center space-x-2 px-10 py-10 text-zinc-800 dark:text-zinc-50'>
            <AnimatedNumber
              className='inline-flex items-center font-mono text-5xl font-bold'
              springOptions={{
                bounce: 0,
                duration: 1000,
              }}
              value={value}
            />
          </div>
          <div className='text-accent-foreground/50 text-xl font-bold'></div>
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
