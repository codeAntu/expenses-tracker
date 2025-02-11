import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { createFileRoute } from '@tanstack/react-router';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>
          <h1 className='text-3xl'>Hello from Home!</h1>
          <p className='text-lg'>This is the home page.</p>
        </div>
      </main>
    </SidebarProvider>
  );
}
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton >
                  <Home />
                  <div>
                    <div>Antu</div>
                    <div>Krmakar 2</div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
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
