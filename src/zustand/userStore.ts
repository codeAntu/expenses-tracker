// import { User } from '@/types/user';
// import { LS } from '@/utils/LS.1';
// import { create } from 'zustand';

// interface Store {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   logout: () => void;
// }

// export const useUserStore = create<Store>((set) => {
//   const savedUser = JSON.parse(LS.getItem('user') || 'null');
//   return {
//     user: savedUser,
//     setUser: (user) => {
//       LS.setItem('user', JSON.stringify(user));
//       set({ user });
//     },
//     logout: () => {
//       LS.removeItem('user');
//       set({ user: null });
//     },
//   };
// });
