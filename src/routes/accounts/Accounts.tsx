import { IconButton } from '@/components/lib/iconutton';
import { Search } from '@/components/Search';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import client from '@/utils/client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, ClockArrowDown, ClockArrowUp, CreditCard, PlusIcon, Wallet } from 'lucide-react';
import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { AddAccount } from './components/AddAccount';

const Accounts: FC = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | 'latest' | 'oldest'>('latest');
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['all-accounts'],
    queryFn: async () => await (await client.api.account.$get()).json(),
  });
  const accounts = data?.data || [];

  const filteredAccounts = useMemo(() => {
    let filtered = accounts;
    if (search) {
      filtered = filtered.filter(
        (acc) =>
          acc.title?.toLowerCase().includes(search.toLowerCase()) ||
          acc.description?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    filtered = filtered.slice();
    if (sortOrder === 'desc') {
      filtered.sort((a, b) => (Number(b.balance) || 0) - (Number(a.balance) || 0));
    } else if (sortOrder === 'asc') {
      filtered.sort((a, b) => (Number(a.balance) || 0) - (Number(b.balance) || 0));
    } else if (sortOrder === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    return filtered;
  }, [accounts, search, sortOrder]);

  return (
    <div className='w-full'>
      <section className='space-y-4'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-2xl font-semibold'>Your Accounts</h2>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2'>
            <Search
              value={search}
              onSearch={(query) => setSearch(query)}
              placeholder='Search accounts...'
              className='w-full sm:w-64'
              onClear={() => setSearch('')}
            />
            <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'desc' | 'asc' | 'latest' | 'oldest')}>
              <SelectTrigger className='bg-card max-w-24'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='latest'>
                  <div className='flex items-center gap-2'>
                    <span>Latest</span>
                    <ClockArrowDown className='mr-2 h-4 w-4 text-emerald-500/50' />
                  </div>
                </SelectItem>
                <SelectItem value='oldest'>
                  <div className='flex items-center gap-2'>
                    <span>Oldest</span>
                    <ClockArrowUp className='mr-2 h-4 w-4 text-red-500/50' />
                  </div>
                </SelectItem>
                <SelectItem value='desc'>
                  <div className='flex items-center gap-2'>
                    <span>Balance</span>
                    <ArrowUp className='mr-2 h-4 w-4 text-emerald-500/50' />
                  </div>
                </SelectItem>
                <SelectItem value='asc'>
                  <div className='flex items-center gap-2'>
                    <span>Balance</span>
                    <ArrowDown className='mr-2 h-4 w-4 text-red-500/50' />
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <AddAccount />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredAccounts.map((acc) => (
            <motion.div key={acc.id} whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}>
              <div className='card space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex aspect-square w-10 items-center justify-center rounded-lg bg-emerald-500/10'>
                    <Wallet className='aspect-square w-5 text-emerald-600 dark:text-emerald-400' />
                  </div>
                  <div className='flex items-center gap-2'>
                    <IconButton className='' size='sm'>
                      <CreditCard className='' />
                    </IconButton>
                    <IconButton className='' size='sm'>
                      <PlusIcon />
                    </IconButton>
                  </div>
                </div>
                <div className=''>
                  <div className='text-xl font-bold'>{acc.balance}</div>
                  <div className='line-clamp-1 text-sm font-medium'> {acc.title}</div>
                  <CardDescription className='line-clamp-2 text-xs'>{acc.description}</CardDescription>
                </div>
                <div className='pt1'>
                  <Button
                    className='w-full rounded-full'
                    variant='outline'
                    onClick={() => navigate(`/accounts/${acc.id}`)}
                  >
                    <CreditCard className='h-4 w-4' />
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Accounts;
