import { getDashboardMetricsHandler } from '../../controllers/metrics.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

export async function metricsRoutes(fastify, options) {
  fastify.get('/dashboard/metrics', { preHandler: [authenticate] }, getDashboardMetricsHandler);
}
