import Calendar from '@/components/calendar';
import { Button } from '@/components/ui/button';
import { Tilt } from '@/components/ui/tilt';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className='flex justify-between'>
      <div className='border-r p-2'>
        <TiltCard1 />
      </div>
      <div className='grid gap-1 border-b border-l p-5'>
        <div className='flex items-center justify-between px-1'>
          <div className='text-secondary-foreground/90 flex items-center gap-2 pb-0.5 text-lg font-semibold'>
            Calendar
          </div>
          <Button
            variant='ghost'
            className='px-4 py-0 text-base font-semibold text-blue-500 hover:bg-blue-500/10 hover:text-blue-500'
          >
            Add{' '}
          </Button>
        </div>
        <Calendar />
        <div className='flex items-center justify-between px-1'>
          <div className='text-secondary-foreground/90 flex items-center gap-2 pb-0.5 text-lg font-semibold'>
            Calendar
          </div>
          <Button
            variant='ghost'
            className='px-4 py-0 text-base font-semibold text-blue-500 hover:bg-blue-500/10 hover:text-blue-500'
          >
            Add{' '}
          </Button>
        </div>
      </div>
    </div>
  );
}
export function TiltCard1() {
  return (
    <Tilt rotationFactor={1} isRevese>
      <div className='bg-accent border-foreground/5 inline-flex flex-col items-center justify-center overflow-hidden rounded-xl border p-5'>
        <div className='flex h-full w-full flex-col'>
          <div className='text-accent-foreground/50 text-xl font-bold'>Total Money</div>
          <div className='flex items-center justify-center space-x-2 px-10 py-10 text-zinc-800 dark:text-zinc-50'>
            {/* <AnimatedNumber
              className='inline-flex items-center font-mono text-5xl font-bold'
              springOptions={{
                bounce: 0,
                duration: 1000,
              }}
              value={value}
            /> */}
            <div className='inline-flex items-center font-mono text-5xl font-bold'>100,000,000</div>
          </div>
          <div className='text-accent-foreground/50 text-xl font-bold'></div>
        </div>
      </div>
    </Tilt>
  );
}
