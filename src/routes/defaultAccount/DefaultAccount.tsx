import { getDefaultAccount } from '@/utils/useDefaultAccount';

const DefaultAccount = () => {
  const account = getDefaultAccount().account;

  return (
    <div>
      <div className='w-full p-6'>
        <h2 className='text-xl font-semibold'>Default Account</h2>
        {account ? (
          <div className='mt-4'>
            <div className='text-lg font-semibold'>{account.title}</div>
            <div className='text-muted-foreground text-sm'>{account.description}</div>
            <div className='mt-2 text-xl font-bold'>${account.balance}</div>
            <div className='text-muted-foreground text-xs'>
              Created on: {new Date(account.createdAt || '').toLocaleDateString()}
            </div>
          </div>
        ) : (
          <p className='text-muted-foreground'>No default account set.</p>
        )}
      </div>
    </div>
  );
};

export default DefaultAccount;
