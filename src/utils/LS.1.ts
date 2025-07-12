import { LocalStorage } from './localStroge';

type LS = 'token' | 'user';

export const LS = new LocalStorage<LS>('expense-tracker_');
