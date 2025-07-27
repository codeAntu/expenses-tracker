import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import queryClient from '@/query/query';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface AddExpenseProps {
  onClose?: () => void;
}

const AddExpense: FC<AddExpenseProps> = ({ onClose }) => {
  const [expense, setExpense] = useState({
    description: '',
    amount: 0,
    accountId: '',
  });

  // TODO: add option to select account
  
  const { mutate: createExpense } = useMutation({
    mutationFn: async () =>
      await (
        await client.api.expenses.expense.$post({
          json: {
            description: expense.description,
            amount: 100,
            accountId: '4e10c8bb-3906-4147-9079-03e30cd13d64',
          },
        })
      ).json(),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error('Failed to create expense');
        return;
      }

      toast.success('Expense created successfully');
      queryClient.invalidateQueries({ queryKey: ['expenses'] });

      if (onClose) {
        onClose();
      }
    },
  });

  return (
    <div className='max-w-md space-y-4'>
      <div>
        <div className='text-lg font-semibold opacity-70'>Add Expense</div>
        <div className='text-sm opacity-50'>This expense will be added to the default account</div>
      </div>
      <div>
        <Label className='mt-4 mb-2'>Amount</Label>
        <Input
          type='number'
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: parseFloat(e.target.value) })}
          placeholder='Enter expense amount'
        />
      </div>
      <div>
        <Label className='mb-2'>Description</Label>
        <Input
          type='text'
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          placeholder='Enter expense description'
        />
      </div>

      <div>
        <Label className='mt-4 mb-2'>Account</Label>
        <div>This is your account :</div>
      </div>
      <div className='text-right'>
        <Button
          className='mt-4'
          onClick={() => {
            createExpense();
            setExpense({ description: '', amount: 0, accountId: '' });
          }}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
