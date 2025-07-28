import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import queryClient from '@/query/query';
import Loading from '@/routes/components/Loading';
import client from '@/utils/client';
import { SelectValue } from '@radix-ui/react-select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import { Account } from '../accounts/types';

interface AddExpenseProps {
  account?: Account;
  onClose?: () => void;
}

const AddExpense: FC<AddExpenseProps> = ({ account, onClose }) => {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
  });
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(account);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: allAccounts, isLoading: isAccountsLoading } = useQuery({
    queryKey: ['all-accounts'],
    queryFn: async () => await (await client.api.account.$get()).json(),
  });

  const accounts = allAccounts?.data || [];

  const { mutate: createExpense, isPending } = useMutation({
    mutationFn: async () => {
      setIsSubmitting(true);
      return await (
        await client.api.expenses.expense.$post({
          json: {
            description: expense.description,
            amount: Number(expense.amount),
            accountId: selectedAccount?.id || undefined,
          },
        })
      ).json();
    },
    onSuccess: (res) => {
      setIsSubmitting(false);
      if (!res.success) {
        toast.error('Failed to create expense');
        return;
      }
      toast.success('Expense created successfully');
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      if (selectedAccount) {
        queryClient.invalidateQueries({ queryKey: ['account', selectedAccount.id] });
      }

      setExpense({ description: '', amount: '' });
      if (onClose) onClose();
    },
    onError: () => setIsSubmitting(false),
  });

  function handleAddExpense() {
    if (!expense.amount || isNaN(Number(expense.amount)) || Number(expense.amount) <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }
    createExpense();
  }

  return (
    <div>
      <div className='flex items-center gap-2 text-lg font-semibold'>Add Expense</div>
      <div className='text-muted-foreground text-sm'>This amount will be subtracted from your account balance.</div>
      <div className='mt-4'>
        <Label>Amount</Label>
        <Input
          type='number'
          placeholder='Enter amount'
          className='no-spinner mt-2'
          value={expense.amount}
          min={0}
          step='any'
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || (!isNaN(Number(val)) && Number(val) >= 0)) {
              setExpense({ ...expense, amount: val });
            }
          }}
        />
      </div>
      <div className='mt-4 space-y-2'>
        <Label className='mt-4'>Description</Label>
        <Textarea
          placeholder='Enter expense description'
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
        />
      </div>
      <div className='py-2'>
        <div className='text-sm opacity-50'>
          This amount will be added to:
          <span className='font-semibold'>{' ' + (selectedAccount?.title || 'Default Account')}</span>
        </div>
        <div className='text-sm opacity-50'>
          Current Balance: <span className='font-semibold'>{selectedAccount?.balance || 'N/A'}</span>
        </div>
      </div>
      <div className='space-y-2 py-2'>
        <Label className=''>Select Account</Label>
        <Select
          value={selectedAccount?.id || 'none'}
          onValueChange={(val) => {
            if (val === 'none') {
              setSelectedAccount(undefined);
            } else {
              const acc = accounts.find((a) => a.id === val);
              if (acc) {
                setSelectedAccount(acc);
              }
            }
          }}
        >
          <SelectTrigger>
            <SelectValue>{selectedAccount ? selectedAccount.title : 'None'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='none'>None</SelectItem>
            {isAccountsLoading ? (
              <div className='p-4'>Loading accounts...</div>
            ) : (
              accounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.title}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <Button variant='outline' onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={handleAddExpense}
          disabled={
            isPending || isSubmitting || !expense.amount || isNaN(Number(expense.amount)) || Number(expense.amount) <= 0
          }
        >
          {isPending || isSubmitting ? <Loading /> : 'Add Expense'}
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
