import { healthRoutes } from "./health.routes.js";
import { authRoutes } from "./auth.routes.js";
import { documentRoutes } from "./document.routes.js";

export async function v1Routes(fastify, options) {
  fastify.register(healthRoutes);
  fastify.register(authRoutes); // -> /api/v1/auth/register, /api/v1/auth/login
  fastify.register(documentRoutes); // -> /api/v1/documents/upload, /api/v1/documents
}
