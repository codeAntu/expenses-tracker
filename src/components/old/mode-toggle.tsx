import { useTheme } from '@/components/ui/theme-provider';
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <label className=''>
      <input type='checkbox' checked={theme === 'dark'} onChange={toggleTheme} className='sr-only' />
      <div
        className={`bg-secondary/70 hover:bg-secondary/60 border-primary/5 text-secondary-foreground cursor-pointer rounded-full border p-1.5 transition duration-250 lg:hidden`}
      >
        {theme === 'light' ? (
          <div className=''>
            <Sun className='h-5 w-5' />
          </div>
        ) : (
          <div className=''>
            <Moon className='h-5 w-5' />
          </div>
        )}
      </div>
      <span className='sr-only'>Toggle theme</span>
      <div
        className={`border-primary/5 hidden items-center justify-around rounded-full border p-0.5 transition duration-250 lg:flex ${theme === 'dark' ? 'bg-secondary/70' : 'bg-secondary'}`}
      >
        <div className={`rounded-full p-1.5 ${theme === 'dark' ? 'bg-background' : ''}`}>
          <Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
        </div>
        <div className={`rounded-full p-1.5 ${theme === 'light' ? 'bg-background border-foreground/10 border' : ''}`}>
          <Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
        </div>
      </div>
    </label>
  );
}
