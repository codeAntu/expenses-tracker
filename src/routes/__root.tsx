import Header from '@/components/header';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <App>
        <Outlet />
        <TanStackRouterDevtools />
      </App>
    </>
  ),
});

function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* <SidebarProvider className=''> */}
      {/* <AppSidebar /> */}

      <main className='min-h-[100dvh] w-full'>
        <Header />
        {children}
      </main>
      {/* </SidebarProvider> */}
    </ThemeProvider>
  );
}
