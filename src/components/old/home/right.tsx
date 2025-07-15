import { Calendar as Cal } from '@/components/ui/calendar';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { FC, useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import Transactions from '../transactions';

const Right: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const today = new Date();

  const handlePrevMonth = () => {
    setMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + 1);
      return newMonth;
    });
  };

  return (
    <div className='border-border/60 h-full border-l'>
      <div className='flex flex-col gap-6 p-4 md:p-6'>
        <Card className='w-full max-w-md shadow-md transition-shadow hover:shadow-lg'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center text-xl font-bold'>
                <Calendar className='text-primary mr-2 h-5 w-5' />
                Calendar
              </CardTitle>
              <div className='flex items-center gap-2'>
                <Button variant='outline' size='icon' className='h-8 w-8' onClick={handlePrevMonth}>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8'
                  onClick={() => {
                    setDate(today);
                    setMonth(today);
                  }}
                >
                  Today
                </Button>
                <Button variant='outline' size='icon' className='h-8 w-8' onClick={handleNextMonth}>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='px-20'>
            <Cal
              mode='single'
              selected={date}
              onSelect={(day) => day && setDate(day)}
              month={month}
              onMonthChange={setMonth}
              className=''
              classNames={{
                head_row: 'flex justify-center',
                row: 'flex w-full mt-2 justify-center',
                month: 'space-y-4 w-full',
              }}
            />
          </CardContent>
        </Card>

        <div className='mt-2'>
          <Transactions date={date} />
        </div>
      </div>
    </div>
  );
};

export default Right;
