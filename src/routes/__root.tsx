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
      <Header />
      <main className='flex h-[100dvh] w-full flex-col gap-3 p-3 sm:gap-5 sm:p-5'>{children}</main>
      {/* </SidebarProvider> */}
    </ThemeProvider>
  );
}
