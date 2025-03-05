import hcWithType from '@/rpc/hcWithType';

// @ts-expect-error: hc import is not typed correctly
// import { hc } from 'hono/dist/client/client';
// import { hc } from 'hono/client';
import { hc } from '../../node_modules/hono/dist/client/client';

const address = 'http://localhost:3000';

const client = (hc as typeof hcWithType)(address);

// const client = hc<AppType>('/api', {
//   headers: {
//     Authorization: 'Bearer TOKEN',
//   },
// })

export default client;
