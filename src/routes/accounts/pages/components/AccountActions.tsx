import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import queryClient from '@/query/query';
import { IconBorder } from '@/routes/components/Icon';
import { useDefaultAccountStore } from '@/zustand/defaultAccount';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AddAccount } from '../../components/AddAccount';
import DeleteAccount from '../../components/DeleteAccount';
import { Account } from '../../types';

export function AccountActions({ account }: { account: Account }) {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setDefaultAccount } = useDefaultAccountStore();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBorder>
            <MoreHorizontal className='h-4 w-4' />
          </IconBorder>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)} className='text-red-500'>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDefaultAccount(account);
            }}
          >
            Set as Default{' '}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <AddAccount
            account={account}
            onClose={() => {
              setOpen(false);
              queryClient.invalidateQueries({ queryKey: ['account-details', account.id] });
            }}
            isEditMode
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <DeleteAccount
            account={account}
            onDelete={async () => {
              setDeleteDialogOpen(false);
              navigate('/accounts');
              await queryClient.invalidateQueries({ queryKey: ['account-details', account.id] });
            }}
            onCancel={() => setDeleteDialogOpen(false)}
          />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
