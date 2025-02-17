import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme-provider';
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className='border-none bg-transparent hover:border-none hover:bg-transparent focus:border-none focus:bg-transparent active:border-none active:bg-transparent'
    >
      {theme === 'light' ? (
        <Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
      ) : (
        <Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
