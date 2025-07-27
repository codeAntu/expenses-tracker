import client from '@/utils/client';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import Loading from '../components/Loading';
import AddExpense from './AddExpense';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ExpensesProps {}

const Expenses: FC<ExpensesProps> = () => {
  const { data: res, isPending: isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => await (await client.api.expenses.$get()).json(),
  });

  const expenses = res?.data || [];

  return (
    <div>
      <div className='mb-6 flex items-center justify-between border-b pb-4'>
        <h1 className='mb-4 text-lg font-semibold opacity-80'>Expenses</h1>

        <Dialog>
          <DialogTrigger>
            <Button>Add Expense</Button>
          </DialogTrigger>
          <DialogContent>
            <AddExpense onClose={() => {}} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className='space-y-4'>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div key={expense.id} className='rounded-lg border p-4 shadow-sm'>
                <p className='text-muted-foreground text-sm'>{expense.description}</p>
                <p className='text-green-600'>${expense.amount}</p>
              </div>
            ))
          ) : (
            <p className='text-muted-foreground'>No expenses found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Expenses;
