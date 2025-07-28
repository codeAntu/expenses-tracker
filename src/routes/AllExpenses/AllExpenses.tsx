import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import client from '@/utils/client';
import { getDefaultAccount } from '@/utils/useDefaultAccount';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import Loading from '../components/Loading';
import AddExpense from '../expenses/AddExpense';

const AllExpenses = () => {
  const [open, setOpen] = useState(false);

  const { data: res, isPending: isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => await (await client.api.expenses.$get()).json(),
  });

  const expenses = res?.data || [];

  return (
    <div>
      <div className='mb-6 flex items-center justify-between border-b pb-4'>
        <h1 className='mb-4 text-lg font-semibold opacity-80'>Expenses</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Add Expense</Button>
          </DialogTrigger>
          <DialogContent>
            <AddExpense onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className='space-y-4'>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className='flex flex-col gap-2 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between dark:bg-zinc-900/60'
              >
                <div className='flex-1'>
                  <div className='mb-1 flex items-center gap-2'>
                    <span className='text-base font-semibold text-zinc-900 dark:text-zinc-100'>
                      {expense.description || 'No description'}
                    </span>
                    <span className='ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'>
                      {expense.transactionType.charAt(0).toUpperCase() + expense.transactionType.slice(1)}
                    </span>
                  </div>
                  <div className='text-xs text-zinc-500 dark:text-zinc-400'>
                    {format(new Date(expense.createdAt), 'dd MMM, yyyy')}
                  </div>
                  {expense.accountId && (
                    <div className='mt-1 text-xs text-zinc-400'>
                      Account ID: <span className='font-mono'>{expense.accountId}</span>
                    </div>
                  )}
                </div>
                <div className='flex min-w-[100px] flex-col items-end'>
                  <span className='text-lg font-bold text-red-600 dark:text-red-400'>
                    -${Number(expense.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className='mt-1 text-xs text-zinc-400'>
                    Updated: {new Date(expense.updatedAt).toLocaleDateString()}
                  </span>
                </div>
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

export default AllExpenses;
