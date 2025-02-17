import Calendar from '@/components/calendar';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Tilt } from '@/components/ui/tilt';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className='flex justify-between'>
      <TiltCard1 />
      <Calendar />

    </div>
  );
}

export function TiltCard1() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(1000000000);
  }, []);

  return (
    <Tilt rotationFactor={1} isRevese>
      <div className='bg-accent border-foreground/5 inline-flex flex-col items-center justify-center overflow-hidden rounded-xl border p-5'>
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
