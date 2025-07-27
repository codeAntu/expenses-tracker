import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import queryClient from '@/query/query';
import Loading from '@/routes/components/Loading';
import { SelectIcons } from '@/routes/components/SelectIcons';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Account } from '../types';
import { GetIcon } from './GetIcon';

const accountValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

const DEFAULT_COLOR = '#10b981';
const DEFAULT_ICON = 'wallet';

interface AddAccountProps {
  account?: Account;
  onClose?: () => void;
  isEditMode?: boolean;
}

export const AddAccount: FC<AddAccountProps> = ({ account: initialAccount, onClose, isEditMode }) => {
  const [account, setAccount] = useState({
    title: initialAccount?.title || '',
    description: initialAccount?.description || '',
    icon: initialAccount?.icon || DEFAULT_ICON,
    color: initialAccount?.color || DEFAULT_COLOR,
  });
  const [isEdit, setIsEdit] = useState(!!isEditMode);

  const { mutate: addAccount, isPending: isAdding } = useMutation({
    mutationFn: async () =>
      await (
        await client.api.account.$post({
          json: {
            title: account.title,
            description: account.description,
            icon: account.icon,
            color: account.color,
          },
        })
      ).json(),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error('Failed to add account');
        return;
      }
      toast.success('Account added successfully');
      queryClient.invalidateQueries({ queryKey: ['all-accounts'] });
      setAccount({ title: '', description: '', icon: DEFAULT_ICON, color: DEFAULT_COLOR });
      setIsEdit(false);
      if (onClose) onClose();
    },
  });

  const { mutate: updateAccount, isPending: isUpdating } = useMutation({
    mutationFn: async () =>
      await (
        await client.api.account[':id'].$put({
          json: {
            title: account.title,
            description: account.description,
            icon: account.icon,
            color: account.color,
          },
          param: { id: initialAccount!.id },
        })
      ).json(),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error('Failed to update account');
        return;
      }
      toast.success('Account updated successfully');
      queryClient.invalidateQueries({ queryKey: ['all-accounts'] });
      setAccount({ title: '', description: '', icon: DEFAULT_ICON, color: DEFAULT_COLOR });
      setIsEdit(false);
      if (onClose) onClose();
    },
  });

  const handleSubmit = () => {
    const result = accountValidation.safeParse(account);
    if (!result.success) {
      const fieldErrors: { title?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'title') fieldErrors.title = err.message;
      });
      toast.error(fieldErrors.title || 'Invalid account data');
      return;
    }
    if (isEdit && initialAccount?.id) {
      if (
        account.title === initialAccount.title &&
        account.description === initialAccount.description &&
        account.icon === initialAccount.icon &&
        account.color === initialAccount.color
      ) {
        toast.info('No changes to update.');
        return;
      }
      updateAccount();
    } else {
      addAccount();
    }
  };

  console.log('Account:', account);

  return (
    <div className='space-y-4'>
      <div className='pb-4 leading-tight'>
        <div className='text-lg font-semibold opacity-80'>{isEdit ? 'Edit Account' : 'Add New Account'}</div>
        <div className='text-muted-foreground text-sm'>This account will be used to track your finances.</div>
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Title</Label>
        <Input
          placeholder='Title'
          value={account.title}
          onChange={(e) => setAccount((a) => ({ ...a, title: e.target.value }))}
          disabled={isAdding || isUpdating}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Description</Label>
        <Textarea
          placeholder='Description'
          value={account.description}
          onChange={(e) => setAccount((a) => ({ ...a, description: e.target.value }))}
          disabled={isAdding || isUpdating}
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center gap-3'>
          <Label>Icon: </Label>
          <div className='bg-muted/30 hover:bg-muted/80 flex aspect-square w-10 cursor-pointer items-center justify-center rounded-md border p-2 transition-colors'>
            <GetIcon icon={account.icon} color={account.color} />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Label>Color</Label>
          <input
            type='color'
            value={account.color}
            onChange={(e) => setAccount((a) => ({ ...a, color: e.target.value }))}
            className='h-8 w-8 cursor-pointer border-0 bg-transparent p-0'
            style={{ borderRadius: '9999px' }}
            aria-label='Pick color'
            disabled={isAdding || isUpdating}
          />
        </div>
      </div>
      <SelectIcons icon={account.icon} onSelect={(icon) => setAccount((a) => ({ ...a, icon }))} color={account.color} />
      <div className='grid grid-cols-2 gap-4 pt-4'>
        <Button
          variant='outline'
          onClick={() => {
            if (onClose) onClose();
          }}
          disabled={isAdding || isUpdating}
        >
          cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isAdding || isUpdating} className=''>
          {isAdding || isUpdating ? <Loading /> : isEdit ? 'Update Account' : 'Add Account'}
        </Button>
      </div>
    </div>
  );
};
