import { create } from 'zustand';

interface DefaultAccountIdState {
  defaultAccountId: string | null;
  setDefaultAccountId: (id: string | null) => void;
  resetDefaultAccountId: () => void;
}

const DEFAULT_ACCOUNT_KEY = 'default-account-id';

function getStoredAccountId(): string | null {
  try {
    return localStorage.getItem(DEFAULT_ACCOUNT_KEY) || null;
  } catch {
    return null;
  }
}

export const useDefaultAccountIdStore = create<DefaultAccountIdState>((set) => ({
  defaultAccountId: getStoredAccountId(),
  setDefaultAccountId: (id) => {
    set({ defaultAccountId: id });
    if (id) {
      localStorage.setItem(DEFAULT_ACCOUNT_KEY, id);
    } else {
      localStorage.removeItem(DEFAULT_ACCOUNT_KEY);
    }
  },
  resetDefaultAccountId: () => {
    set({ defaultAccountId: null });
    localStorage.removeItem(DEFAULT_ACCOUNT_KEY);
  },
}));
