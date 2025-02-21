import { Tilt } from '@/components/ui/tilt';
import { useEffect, useState } from 'react';
import { AnimatedNumber } from '../ui/animated-number';
import Box from '../box';
import { Home } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function Left() {
  return (
    <div className='flex flex-col gap-5 border-r'>
      <TiltCard1 />
      <Goals />
    </div>
  );
}

export function TiltCard1() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(2082);
  }, []);

  return (
    <Tilt rotationFactor={1} isRevese className='flex items-center justify-center border-b p-8'>
      <div className='bg-accent border-foreground/5 aspect-video w-full max-w-[400px] min-w-[340px] sm:min-w-[400px] flex-col items-center justify-center overflow-hidden rounded-xl border p-5'>
        <div className='flex h-full w-full flex-col justify-start'>
          <div className='text-accent-foreground/50 text-xl font-bold'>Total Money</div>
          <div className='flex h-full items-center justify-center space-x-2 px-10 py-10 text-zinc-800 dark:text-zinc-50'>
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
          {/* <div className='text-accent-foreground/50 text-xl font-bold'></div> */}
        </div>
      </div>
    </Tilt>
  );
}

const Goals = () => {
  return (
    <div className='grid gap-3 border-l px-3 sm:p-7 pt-4 pb-6'>
      <div className='flex items-center justify-between px-1'>
        <div className='text-secondary-foreground/90 flex items-center gap-2 pb-0.5 text-lg font-semibold'>Goals</div>
        <div className='rounded-sm px-4 py-1 text-sm font-semibold text-blue-500 hover:bg-blue-500/10 hover:text-blue-500'>
          See All
        </div>
      </div>
      <div className='flex flex-col gap-3.5'>
        {/* {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))} */}
        <Goal />
        <Goal />
        <Goal />
        <Goal />
      </div>
    </div>
  );
};

const Goal = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className='space-y-3'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Home className='rounded-2xl bg-blue-400/50 p-3' size={50} />
          <div>
            <div className='text-accent-foreground/90 text-base font-semibold'>Name </div>
            <div className='text-accent-foreground/70 line-clamp-1 text-xs font-semibold'>Description</div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className='text-sm font-semibold text-red-500/80'>12 days left</div>
          <div className='text-accent-foreground/70 text-xsm font-semibold'>3000 / 4000</div>
        </div>
      </div>
      <div className='w-full'>
        <Progress value={progress} className='rounded-2xl' />
      </div>
    </Box>
  );
};
