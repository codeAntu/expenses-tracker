import Header from '@/components/header';
import { ThemeProvider } from '@/components/ui/theme-provider';

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

export default App;
