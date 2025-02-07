import { useEffect, useState } from 'react';
import { AnimatedNumber } from './components/ui/animated-number';

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(1000);
  }, []);

  return (
    <>
      <div className='flex h-[100dvh] items-center justify-center'>
        <AnimatedNumber
          className='inline-flex items-center font-mono text-5xl font-bold text-zinc-800 dark:text-zinc-50'
          springOptions={{
            bounce: 0,
            duration: 2000,
          }}
          value={value}
        />
      </div>
    </>
  );
}

export default App;
