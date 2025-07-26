import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FC, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import client from '@/utils/client';

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

  const { mutate } = useMutation({
    mutationFn: async () =>
      await (
        await client.api.account[':id'].deposit.$post({
          json: {
            amount: Number(amount),
            description: description || `Deposit to account ${account.title}`,
          },
          param: { id: account.id },
        })
      ).json(),
    onSuccess: () => {
      console.log('Deposit successful');
      onClose();
    },
  });

  return (
    <div>
      <div className='flex items-center gap-2 text-lg font-semibold'>Deposit Funds</div>
      <div className='text-muted-foreground text-sm'>This amount will be added to your account balance.</div>
      <div className='mt-4'>
        <Label>Amount to Deposit</Label>
        <Input
          type='number'
          placeholder='Enter amount'
          className='mt-2'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
      <div className='mt-4 flex flex-col gap-4'>
        <Button
          onClick={() => {
            if (amount) {
              mutate();
            } else {
              alert('Please enter an amount to deposit');
            }
          }}
        >
          Deposit
        </Button>
        <Button variant='outline' onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default DepositFunds;
