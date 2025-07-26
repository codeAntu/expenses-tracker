import { Loader2 } from 'lucide-react';
import { FC } from 'react';

const AccountsLoading: FC = () => (
  <div className='flex h-[80dvh] w-full flex-col items-center justify-center'>
    <Loader2 className='mb-4 h-10 w-10 animate-spin text-primary' />
    <span className='text-muted-foreground text-lg font-medium'>Loading accounts...</span>
  </div>
);

export default AccountsLoading;
