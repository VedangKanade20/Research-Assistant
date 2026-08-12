import { MetricsRepository } from '../repositories/metrics.repository.js';

export class MetricsService {
  constructor() {
    this.metricsRepository = new MetricsRepository();
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return mb < 0.1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(2)} MB`;
  }

  async getDashboardMetrics(userId) {
    const rawMetrics = await this.metricsRepository.getUserMetrics(userId);

    return {
      totalDocuments: rawMetrics.totalDocuments,
      totalStorageFormatted: this.formatBytes(rawMetrics.totalStorageBytes),
      totalStorageBytes: rawMetrics.totalStorageBytes,
      totalQuestionsAsked: rawMetrics.totalQuestions,
      totalTokensConsumed: rawMetrics.totalTokensUsed
    };
  }
}
