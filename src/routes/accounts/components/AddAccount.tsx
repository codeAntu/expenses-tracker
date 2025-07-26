import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import queryClient from '@/query/query';
import { SelectIcons } from '@/routes/components/SelectIcons';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { GetIcon } from './GetIcon';

const accountValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

const DEFAULT_COLOR = '#10b981';
const DEFAULT_ICON = 'wallet';

export const AddAccount = () => {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState({ title: '', description: '', icon: DEFAULT_ICON, color: DEFAULT_COLOR });

  const handleAdd = () => {
    const result = accountValidation.safeParse(account);
    if (!result.success) {
      const fieldErrors: { title?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'title') fieldErrors.title = err.message;
      });
      toast.error(fieldErrors.title || 'Invalid account data');

      return;
    }
    mutate();
  };

  const { mutate, isPending } = useMutation({
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
      queryClient.invalidateQueries({
        queryKey: ['all-accounts'],
      });
      setOpen(false);
      setAccount({ title: '', description: '', icon: '', color: '' });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Account</Button>
      </DialogTrigger>
      <DialogContent>
        <div className='pb-4 leading-tight'>
          <div className='text-lg font-semibold opacity-80'>Add New Account</div>
          <div className='text-muted-foreground text-sm'>This account will be used to track your finances.</div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Title</Label>
          <Input
            placeholder='Title'
            value={account.title}
            onChange={(e) => setAccount((a) => ({ ...a, title: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Description</Label>

          <Textarea
            placeholder='Description'
            value={account.description}
            onChange={(e) => setAccount((a) => ({ ...a, description: e.target.value }))}
            disabled={isPending}
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-3'>
            <Label>Icon: </Label>
            <div
              className='bg-muted/30 hover:bg-muted/80 flex aspect-square w-10 cursor-pointer items-center justify-center rounded-md border p-2 transition-colors'
              onClick={() => setOpen(true)}
            >
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
              disabled={isPending}
            />
          </div>
        </div>
        <SelectIcons
          icon={account.icon}
          onSelect={(icon) => setAccount((a) => ({ ...a, icon }))}
          color={account.color}
        />
        <DialogFooter>
          <Button onClick={handleAdd} disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Account'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
