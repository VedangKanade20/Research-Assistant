import { MetricsService } from '../services/metrics.service.js';

const metricsService = new MetricsService();

export async function getDashboardMetricsHandler(request, reply) {
  const userId = request.user.sub;
  const metrics = await metricsService.getDashboardMetrics(userId);

  return reply.status(200).send({
    message: 'Dashboard metrics retrieved successfully',
    data: metrics
  });
}
