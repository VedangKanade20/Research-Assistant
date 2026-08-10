import { getHealthHandler } from '../../controllers/health.controller.js';

export async function healthRoutes(fastify, options) {
  fastify.get('/health', getHealthHandler);
}
