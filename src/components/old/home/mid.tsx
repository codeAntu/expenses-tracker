import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Chart } from '../chart';

const Mid: FC = () => {
  return (
    <div className='h-full'>
      <div className='space-y-6 p-4 md:p-6'>
        <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>Analytics Dashboard</h2>
        <p className='text-muted-foreground'>View your expense and income statistics at a glance.</p>

        <div className='grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2'>
          <Card className='shadow-md transition-shadow hover:shadow-lg'>
            <CardHeader className='pb-2'>
              <CardTitle>Monthly Expenses</CardTitle>
              <CardDescription>Track your spending patterns across devices</CardDescription>
            </CardHeader>
            <CardContent>
              <Chart />
            </CardContent>
          </Card>

          <Card className='shadow-md transition-shadow hover:shadow-lg'>
            <CardHeader className='pb-2'>
              <CardTitle>Income Analysis</CardTitle>
              <CardDescription>Monitor your revenue streams over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Chart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mid;
