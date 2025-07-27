import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import { Account } from '../types';
import { toast } from 'sonner';

interface DeleteAccountProps {
  account: Account;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteAccount: FC<DeleteAccountProps> = ({ account, onDelete, onCancel }) => {
  const { mutate } = useMutation({
    mutationKey: ['deleteAccount', account.id],
    mutationFn: async () =>
      await (
        await client.api.account[':id'].$delete({
          param: {
            id: account.id,
          },
        })
      ).json(),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error('Failed to delete account');
        return;
      }
      toast.success('Account deleted successfully');
      onDelete();
    },
  });

  return (
    <div className='delete-account flex flex-col items-center gap-2 p-4'>
      <Trash2 size={32} className='mb-1 text-red-500' />
      <h2 className='text-base font-semibold text-red-600'>Delete Account</h2>
      <p className='text-muted-foreground text-center text-sm'>
        Are you sure you want to delete the account: <span className='font-semibold'>{account.title}</span>?
      </p>
      <div className='mt-3 flex gap-2'>
        <Button variant='outline' onClick={onCancel} className='px-4'>
          Cancel
        </Button>
        <Button variant='destructive' onClick={() => mutate()} className='px-4'>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
