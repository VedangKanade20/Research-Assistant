import { v1Routes } from './v1/index.js';

export async function router(fastify, options) {
  fastify.register(v1Routes, { prefix: '/api/v1' });
}
