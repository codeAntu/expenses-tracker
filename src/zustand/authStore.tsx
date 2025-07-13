import { setAuthToken } from '@/query/exe';
import { LS } from '@/utils/LS.1';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: LS.getItem('token') !== null,
  token: LS.getItem('token') ?? null,
  setToken: (token) => {
    set({ isAuthenticated: !!token, token });
    LS.setItem('token', token || '');
    setAuthToken(token || '');
  },
  logout: () => {
    set({ isAuthenticated: false, token: null });
    setAuthToken('');
    LS.removeItem('token');
  },
}));
