import { User } from '@/types/user';
import { ls } from '@/utils/ls';
import { create } from 'zustand';

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<Store>((set) => {
  const savedUser = JSON.parse(ls.get('savedUser') || '{}');
  return {
    user: savedUser,
    setUser: (user) => {
      ls.set('savedUser', JSON.stringify(user));
      set({ user });
    },
    logout: () => {
      ls.clear();
      set({ user: null });
    },
  };
});
