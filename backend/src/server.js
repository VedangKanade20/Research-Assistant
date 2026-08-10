import { buildApp } from './app.js';
import { config } from './config/env.js';

const app = buildApp();

async function start() {
  try {
    await app.listen({ port: config.port, host: config.host });
    app.log.info(`Server listening on ${config.host}:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
