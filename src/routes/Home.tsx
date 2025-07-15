import AddAmount from '@/components/old/addAmount';
import Left from '@/components/old/home/left';
import Mid from '@/components/old/home/mid';
import Right from '@/components/old/home/right';
import { Moon, Sun } from 'lucide-react';

import Logout from '@/components/logout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import Content from './components/content';

function Home() {
  return (
    <>
      <Content />
    </>
  );

  return (
    <div className='flex min-h-[calc(100dvh-8rem)] w-full flex-col xl:flex-row'>
      <ModeToggle />
      <Logout>
        <Button variant='outline'>Logout</Button>
      </Logout>
      <div className='flex flex-1 flex-col md:flex-row'>
        <Left />
        <div className='max-h-screen w-full overflow-y-auto md:w-2/3 xl:w-3/4'>
          <Mid />
        </div>
      </div>
      <Right />
      <div className='fixed right-4 bottom-4 z-50 sm:right-10 sm:bottom-10'>
        <AddAmount />
      </div>
    </div>
  );
}

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Home;
