import { LocalStorage } from './localStroge';

type LS = 'token' | 'user' | 'default-account' | 'expenses';

export const LS = new LocalStorage<LS>('expense-tracker_');
