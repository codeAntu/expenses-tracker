import { useTheme } from '@/components/ui/theme-provider';
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <label className='switch'>
      <input type='checkbox' checked={theme === 'dark'} onChange={toggleTheme} className='sr-only' />
      {/* <span className=''>
              {theme === 'light' ? (
                <div>
                  <Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
                </div>
              ) : (
                <Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
              )}
            </span>
            <span className='sr-only'>Toggle theme</span> */}
      <div
        className={`border-primary/5 flex items-center justify-around rounded-full border p-0.5 transition duration-250 ${theme === 'dark' ? 'bg-secondary/70' : 'bg-secondary'}`}
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
