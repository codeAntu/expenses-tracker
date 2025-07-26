import { Wallet } from 'lucide-react';
import { AddAccount } from './AddAccount';

const NoAccounts = () => (
  <div className='flex h-64 w-full flex-col items-center justify-center'>
    <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10'>
      <Wallet className='h-6 w-6 text-emerald-500' />
    </div>
    <span className='text-muted-foreground mb-2 text-base font-medium opacity-50 sm:text-lg'>No accounts found</span>
    <AddAccount />
  </div>
);

export default NoAccounts;
