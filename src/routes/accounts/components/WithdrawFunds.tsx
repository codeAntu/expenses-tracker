import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import queryClient from '@/query/query';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface WithdrawFundsProps {
  account: {
    id: string;
    title: string;
    description?: string;
    balance: string;
    icon?: string;
    color?: string;
    createdAt: string;
  };
  onClose: () => void;
}

const WithdrawFunds: FC<WithdrawFundsProps> = ({ account, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, isPending: isWithdrawing } = useMutation({
    mutationFn: async ({ amount, description }: { amount: number; description?: string }) =>
      await (
        await client.api.account[':id'].withdraw.$post({
          json: {
            amount: Number(amount),
            description: description || `Withdrawal from account ${account.title}`,
          },
          param: { id: account.id },
        })
      ).json(),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error('Failed to withdraw funds');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['account-details', account.id] });
      queryClient.invalidateQueries({ queryKey: ['all-accounts'] });
      toast.success('Withdrawal successful');
      onClose();
    },
  });

  function handleWithdraw() {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount to withdraw.');
      return;
    }
    mutate({
      amount: Number(amount),
      description: description || `Withdrawal from account ${account.title}`,
    });
  }

  return (
    <div>
      <div className='flex items-center gap-2 text-lg font-semibold'>Withdraw Funds</div>
      <div className='text-muted-foreground text-sm'>This amount will be subtracted from your account balance.</div>
      <div className='mt-4'>
        <Label>Amount to Withdraw</Label>
        <Input
          type='number'
          placeholder='Enter amount'
          className='no-spinner mt-2'
          value={amount}
          min={0}
          step='any'
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || (!isNaN(Number(val)) && Number(val) >= 0)) {
              setAmount(val);
            }
          }}
        />
      </div>
      <div className='mt-4 space-y-2'>
        <Label className='mt-4'>Description</Label>
        <Textarea
          placeholder={`Withdrawal from account ${account.title}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
      </div>

      <div className='py-2'>
        <div className='text-sm opacity-50'>
          This amount will be added to:
          <span className='font-semibold'>{' ' + account.title}</span>
        </div>
        <div className='text-sm opacity-50'>
          Current Balance: <span className='font-semibold'>{account.balance}</span>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <Button variant='outline' onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={handleWithdraw}
          disabled={isWithdrawing || !amount || isNaN(Number(amount)) || Number(amount) <= 0}
        >
          {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
        </Button>
      </div>
    </div>
  );
};

export default WithdrawFunds;
