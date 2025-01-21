

import { createClient } from 'contentful';

const client = createClient({
  space: 'rrrdxlcb7vsn', // Reemplaza con tu Space ID
  accessToken: 'CjYYXwIkNP44oA80IM4CEbmt1z2hwuiuZh2P2n-J5EE', // Reemplaza con tu Content Delivery API Access Token
});

export default client;
