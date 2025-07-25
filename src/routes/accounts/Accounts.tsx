import client from '@/utils/client';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

const Accounts: FC = () => {
  const { data } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => await (await client.api.account.$get()).json(),
  });

  console.log('Accounts data:', data);

  return (
    <div className='flex min-h-screen items-center justify-center bg-white dark:bg-[#0F0F12]'>
      <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Accounts Page</h1>
    </div>
  );
};

export default Accounts;
