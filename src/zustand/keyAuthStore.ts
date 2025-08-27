import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface KeyAuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useKeyAuthStore = create<KeyAuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'key-auth-storage',
    },
  ),
);
