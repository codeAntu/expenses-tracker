import client from '@/utils/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { AccountActions } from './components/AccountActions';
import Loading from '@/routes/components/Loading';

const AccountDetails = () => {
  const { accountId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ['account-details', accountId],
    queryFn: async () => {
      if (!accountId) throw new Error('Account ID is required');
      return await (await client.api.account[':id'].$get({ param: { id: accountId } })).json();
    },
  });

  const account = data?.data
    ? {
        ...data.data,
        description: data.data.description ?? '',
      }
    : null;

  if (isPending) {
    return <Loading className='h-full w-full' variant='primary' />;
  }

  if (!account) {
    return (
      <div className='w-full p-6'>
        <h2 className='text-xl font-semibold'>Account Not Found</h2>
        <p className='text-muted-foreground'>The account you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-xl font-semibold opacity-70'>Account Details</h2>
        <AccountActions account={account} />
      </div>

      <div className='bg-card mt-4 flex flex-col justify-center rounded-lg border p-6 shadow-sm'>
        <div className='text-right'>
          <span className='rounded-full border border-amber-200 bg-amber-200 px-2 py-1 text-xs font-semibold text-black'>
            This is a temporary design
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-lg font-semibold'>{account?.title}</div>
          <div className='text-muted-foreground text-sm'>{account?.description}</div>
          <div className='mt-2 text-xl font-bold'>${account?.balance}</div>
          <div className='text-muted-foreground text-xs'>
            Created on: {new Date(account?.createdAt || '').toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
