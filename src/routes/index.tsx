import Calendar from '@/components/calendar';
import { Tilt } from '@/components/ui/tilt';
import { createFileRoute } from '@tanstack/react-router';


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
