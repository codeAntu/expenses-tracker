import Box from '@/components/box';
import { Calendar as Cal } from '@/components/ui/calendar';
import { useState } from 'react';
import Transactions from '../transactions';

function Right() {
  const [date, setDate] = useState<Date>(new Date());
  const [key, setKey] = useState(0);
  const today = new Date();

  return (
    <div className='flex h-full max-w-[400px] flex-col gap-1 self-center border-l sm:flex-row xl:flex-col'>
      <div className='flex flex-col justify-center gap-3 border-b p-8'>
        <div className='flex items-center justify-between px-1'>
          <div className='text-secondary-foreground/90 flex items-center gap-2 pb-0.5 text-lg font-semibold'>
            Calendar
          </div>
          <button
            className='rounded-sm px-4 py-1 text-sm font-semibold text-blue-500 hover:bg-blue-500/10 hover:text-blue-500'
            onClick={() => {
              setDate(today);
              setKey((prev) => prev + 1);
            }}
          >
            Today
          </button>
        </div>
        <div className='flex justify-baseline'>
          {/* <div className='flex grow transform items-center justify-center text-7xl font-extrabold'>
            <div className='grow rotate-[270deg] transform text-center'>
              {date.toLocaleDateString('en-US', {
                day: '2-digit',
                // month: 'short',
              })}{' '}
            </div>
          </div> */}
          <Box className='space-y-10 p-1'>
            <Cal
              key={key}
              mode='single'
              selected={date}
              onSelect={(day) => day && setDate(day)}
              // className='flex h-full w-full items-center justify-center rounded-md'
              // classNames={{
              //   months: 'w-full  min-w-[200px]  ',
              //   month: 'space-y-4 w-full flex flex-col ',
              //   table: 'w-full h-full border-collapse  space-y-10 ',
              //   head_row: ' space-x-10',
              //   row: 'w-full mt-2 ',
              // }}
            />
          </Box>
        </div>
      </div>
      <Transactions date={date} />
    </div>
  );
}

export default Right;
