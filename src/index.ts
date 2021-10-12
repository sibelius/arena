import Arena from 'bull-arena';
import Koa from 'koa';
import express from 'koa-express';
import Bull from 'bull';

import { config } from './config';
import Redis from 'ioredis';

const app = new Koa();

// eslint-disable-next-line
const redis = new Redis(config.REDIS_HOST);

console.log({
  config,
});

(async () => {
  const arena = Arena(
    {
      Bull,
      queues: [
        {
          name: 'named',
          type: 'bull',
          hostId: 'Bull-Worker',
          redis,
          // ioredis config does not work well, use host, port and password instead
          // redis: {
          //   host: '',
          //   port: '',
          //   password: '',
          // },
        },
      ],
    },
    {
      port: Number.parseInt(config.PORT, 10),
    },
  );

  app.use(express(arena));
})();
