import { Calendar as Cal } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import Box from './box';

export default function Calendar({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [date]);

  return (
    <div className=''>
      <Box className='p-2'>
        <Cal key={key} mode='single' selected={date} onSelect={setDate} className='rounded-md' />
      </Box>
    </div>
  );
}
