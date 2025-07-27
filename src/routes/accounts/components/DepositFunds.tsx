import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FC, useState } from 'react';

import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import queryClient from '@/query/query';

interface DepositFundsProps {
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

const DepositFunds: FC<DepositFundsProps> = ({ account, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, isPending: isDepositing } = useMutation({
    mutationFn: async ({ amount, description }: { amount: number; description?: string }) =>
      await (
        await client.api.account[':id'].deposit.$post({
          json: {
            amount: Number(amount),
            description: description || `Deposit to account ${account.title}`,
          },
          param: { id: account.id },
        })
      ).json(),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error('Failed to deposit funds');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['account-details', account.id] });
      queryClient.invalidateQueries({ queryKey: ['all-accounts'] });
      toast.success('Deposit successful');
      onClose();
    },
  });

  function handleDeposit() {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount to deposit.');
      return;
    }

    mutate({
      amount: Number(amount),
      description: description || `Deposit to account ${account.title}`,
    });
  }

  return (
    <div>
      <div className='flex items-center gap-2 text-lg font-semibold'>Deposit Funds</div>
      <div className='text-muted-foreground text-sm'>This amount will be added to your account balance.</div>
      <div className='mt-4'>
        <Label>Amount to Deposit</Label>
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
      <div className='mt-4'>
        <Label>Description (optional)</Label>
        <Textarea
          placeholder='Enter a description for the deposit'
          className='mt-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <Button variant='outline' onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={handleDeposit}
          disabled={isDepositing || !amount || isNaN(Number(amount)) || Number(amount) <= 0}
        >
          {isDepositing ? 'Depositing...' : 'Deposit'}
        </Button>
      </div>
    </div>
  );
};

export default DepositFunds;
