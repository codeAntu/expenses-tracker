import { Calendar as Cal } from '@/components/ui/calendar';
import { useState } from 'react';
import Box from './box';

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className=''>
      <Box className='p-2'>
        <Cal mode='single' selected={date} onSelect={setDate} className='rounded-md' 
          
        />
      </Box>
    </div>
  );
}
