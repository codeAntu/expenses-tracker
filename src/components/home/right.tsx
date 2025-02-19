import Box from '@/components/box';
import { Calendar as Cal } from '@/components/ui/calendar';
import { useState } from 'react';
import Transaction from '../transaction';

function Right() {
  const [date, setDate] = useState<Date>(new Date());
  const [key, setKey] = useState(0);
  const today = new Date();

  return (
    <div className='flex flex-col gap-1 sm:flex-row xl:flex-col'>
      <div className='grid gap-1.5 border-b border-l p-5 pb-6'>
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
        <Box className='p-2'>
          <Cal key={key} mode='single' selected={date} onSelect={(day) => day && setDate(day)} className='rounded-md' />
        </Box>
      </div>
      <Transactions date={date} />
    </div>
  );
}

function Transactions({ date } = { date: new Date() }) {
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className='grid gap-1.5 border-b border-l p-5 pt-4 pb-6'>
      <div className='flex items-center justify-between px-1'>
        <div className='text-secondary-foreground/90 flex items-center gap-2 pb-0.5 text-lg font-semibold'>
          Transactions
        </div>
        <div className='rounded-sm px-4 py-1 text-sm font-semibold text-blue-500 hover:bg-blue-500/10 hover:text-blue-500'>
          {formattedDate}
        </div>
      </div>
      <div>
        <Transaction />
      </div>
    </div>
  );
}

export default Right;
