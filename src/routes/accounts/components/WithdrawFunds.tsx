import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';

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

  const { mutate } = useMutation({
    mutationFn: async () =>
      await (
        await client.api.account[':id'].withdraw.$post({
          json: {
            amount: Number(amount),
            description: `Withdrawal from account ${account.title}`,
          },
          param: { id: account.id },
        })
      ).json(),
    onSuccess: () => {
      console.log('Withdrawal successful');
      onClose(); // Close the modal on success
    },
  });

  return (
    <div>
      <div className='flex items-center gap-2 text-lg font-semibold'>Withdraw Funds</div>
      <div className='text-muted-foreground text-sm'>This amount will be subtracted from your account balance.</div>
      <div className='mt-4'>
        <Label>Amount to Withdraw</Label>
        <Input
          type='number'
          placeholder='Enter amount'
          className='mt-2'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className='mt-4 space-y-2'>
        <Label className='mt-4'>Description</Label>
        <Textarea></Textarea>
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
          onClick={() => {
            if (amount) {
              mutate();
            } else {
              alert('Please enter an amount to withdraw');
            }
          }}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default WithdrawFunds;
