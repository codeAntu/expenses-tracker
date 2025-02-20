import { Tilt } from '@/components/ui/tilt';
import { useEffect, useState } from 'react';
import { AnimatedNumber } from '../ui/animated-number';

export default function Left() {
  return (
    <div className='flex-1 border-r p-5 '>
      <TiltCard1 />
    </div>
  );
}

export function TiltCard1() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(2082);
  }, []);

  return (
    <Tilt rotationFactor={1} isRevese className='flex items-center justify-center'>
      <div className='bg-accent border-foreground/5 inline-flex aspect-video w-full max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-xl border p-5'>
        <div className='flex h-full w-full flex-col justify-center'>
          <div className='text-accent-foreground/50 text-xl font-bold'>Total Money</div>
          <div className='flex items-center justify-center space-x-2 px-10 py-10 text-zinc-800 dark:text-zinc-50'>
            <div className='inline-flex items-center font-mono text-5xl font-bold'>
              <span>&#8377;</span>
              <AnimatedNumber
                className=''
                springOptions={{
                  bounce: 0,
                  duration: 1500,
                }}
                value={value}
              />
            </div>
          </div>
          <div className='text-accent-foreground/50 text-xl font-bold'></div>
        </div>
      </div>
    </Tilt>
  );
}
