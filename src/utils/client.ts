import hcWithType from '@/rpc/hcWithType';

// @ts-expect-error: hc import is not typed correctly
// import { hc } from 'hono/dist/client/client';
// import { hc } from 'hono/client';
import { hc } from '../../node_modules/hono/dist/client/client';
import { useAuthStore } from '@/zustand/authStore';

const isProduction = import.meta.env.MODE === 'production';

const address = isProduction ? 'https://expenses-tracker-backend-one.vercel.app/' : 'http://localhost:3000/';

let client = hc<typeof hcWithType>(address, {
  headers() {
    const { token } = useAuthStore.getState();
    if (!token)
      return {
        Authorization: '',
      };
    return {
      Authorization: `Bearer ${token}`,
    };
  },
});

export function updateClientHeader(token: string) {
  client = (hc as typeof hcWithType)(address, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// const client = hc<AppType>('/api', {
//   headers: {
//     Authorization: 'Bearer TOKEN',
//   },
// })

export default client;
