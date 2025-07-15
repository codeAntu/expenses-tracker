import { Filter, PlusCircle, Search } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import Transaction from './transaction';

export const transactions = [
  {
    id: 1,
    title: 'Transaction',
    description:
      'Transaction description goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt nobis consequuntur iure quas. Iusto iste vitae, nulla deleniti soluta esse eveniet tempora quia dicta atque. Repellat placeat velit vitae?  ',
    amount: 1000000000,
    type: 'income',
    date: new Date(),
    tags: [
      {
        name: 'tag1',
        color: '',
      },
      {
        name: 'tag2',
        color: 'green',
      },
    ],
    goal: 'goal1',
  },
  {
    id: 2,
    title: 'Transaction',
    description:
      'Transaction description goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt nobis consequuntur iure quas. Iusto iste vitae, nulla deleniti soluta esse eveniet tempora quia dicta atque. Repellat placeat velit vitae?  ',
    amount: 656415,
    type: 'expense',
    date: new Date(),
    tags: [
      {
        name: 'tag1',
        color: '',
      },
      {
        name: 'tag2',
        color: 'green',
      },
    ],
    goal: 'goal1',
  },
  {
    id: 3,
    title: 'Transaction',
    description:
      'Transaction description goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt nobis consequuntur iure quas. Iusto iste vitae, nulla deleniti soluta esse eveniet tempora quia dicta atque. Repellat placeat velit vitae?  ',
    amount: 656415,
    type: 'expense',
    date: new Date(),
    tags: [
      {
        name: 'tag1',
        color: '',
      },
      {
        name: 'tag2',
        color: 'green',
      },
    ],
    goal: 'goal1',
  },
];

const Transactions: FC<{ date?: Date }> = ({ date = new Date() }) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card className='max-w-md min-w-sm shadow-md transition-shadow hover:shadow-lg'>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-xl font-bold'>Recent Transactions</CardTitle>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='h-8 text-xs'>
              <Filter className='mr-1 h-3.5 w-3.5' />
              Filter
            </Button>
            <Button variant='outline' size='sm' className='h-8 text-xs'>
              {formattedDate}
            </Button>
          </div>
        </div>

        <div className='mt-2 flex items-center gap-2'>
          <div className='relative flex-1'>
            <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
            <Input placeholder='Search transactions...' className='pl-8' />
          </div>
          <Button size='sm' className='h-10'>
            <PlusCircle className='mr-1 h-4 w-4' />
            New
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-3.5'>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Transactions;
