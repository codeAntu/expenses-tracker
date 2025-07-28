import { Account } from '@/routes/accounts/types';
import client from '@/utils/client';
import { useDefaultAccountIdStore } from '@/zustand/defaultAccountId';
import { useQuery } from '@tanstack/react-query';

export function getDefaultAccount(): { account?: Account; isLoading: boolean } {
  const defaultAccountId = useDefaultAccountIdStore((s) => s.defaultAccountId);
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['account', defaultAccountId],
    queryFn: async () => {
      if (!defaultAccountId) throw new Error('Account ID is required');
      const res = await (await client.api.account[':id'].$get({ param: { id: defaultAccountId } })).json();
      return res.data as Account;
    },
    enabled: !!defaultAccountId,
  });
  return { account: data, isLoading };
}
