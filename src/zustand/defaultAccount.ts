import { Account } from '@/routes/accounts/types';
import { LS } from '@/utils/LS.1';
import { create } from 'zustand';

interface DefaultAccountState {
  defaultAccount: Account | null;
  setDefaultAccount: (account: Account | null) => void;
  resetDefaultAccount: () => void;
}

const DEFAULT_ACCOUNT_KEY = 'default-account';

function getStoredAccount(): Account | null {
  try {
    const raw = LS.getItem(DEFAULT_ACCOUNT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useDefaultAccountStore = create<DefaultAccountState>((set) => ({
  defaultAccount: getStoredAccount(),
  setDefaultAccount: (account) => {
    set({ defaultAccount: account });
    if (account) {
      LS.setItem(DEFAULT_ACCOUNT_KEY, JSON.stringify(account));
    } else {
      LS.removeItem(DEFAULT_ACCOUNT_KEY);
    }
  },
  resetDefaultAccount: () => {
    set({ defaultAccount: null });
    LS.removeItem(DEFAULT_ACCOUNT_KEY);
  },
}));
