import { Search } from '@/components/Search';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import client from '@/utils/client';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, ClockArrowDown, ClockArrowUp } from 'lucide-react';
import { FC, useMemo, useState } from 'react';
import Loading from '../components/Loading';
import Account from './components/Account';
import { AddAccount } from './components/AddAccount';
import NoAccounts from './components/NoAccounts';

const Accounts: FC = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | 'latest' | 'oldest'>('latest');

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

  const isLoading = !data && !accounts.length;

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
            <Select value={sortOrder} onValueChange={(v: 'desc' | 'asc' | 'latest' | 'oldest') => setSortOrder(v)}>
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

            <Dialog>
              <DialogTrigger asChild>
                <button className='btn btn-primary'>Add Account</button>
              </DialogTrigger>
              <DialogContent>
                <AddAccount />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {isLoading ? (
          <Loading className='h-[80dvh] w-full' variant='primary' />
        ) : filteredAccounts.length === 0 ? (
          <NoAccounts />
        ) : (
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredAccounts.map((acc) => (
              <Account
                key={acc.id}
                account={{
                  id: acc.id,
                  title: acc.title,
                  description: acc.description || '',
                  balance: acc.balance,
                  icon: acc.icon,
                  color: acc.color,
                  createdAt: acc.createdAt,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Accounts;
