import { healthRoutes } from "./health.routes.js";
import { authRoutes } from "./auth.routes.js";
import { documentRoutes } from "./document.routes.js";
import { ragRoutes } from "./rag.routes.js";
import { metricsRoutes } from "./metrics.routes.js";

export async function v1Routes(fastify, options) {
  fastify.register(healthRoutes);
  fastify.register(authRoutes);
  fastify.register(documentRoutes);
  fastify.register(ragRoutes);
  fastify.register(metricsRoutes);
}
