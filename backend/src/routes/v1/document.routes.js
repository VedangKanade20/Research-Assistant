import { getDocumentsHandler } from '../../controllers/document.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

export async function documentRoutes(fastify, options) {
  fastify.get('/documents', { preHandler: [authenticate] }, getDocumentsHandler);
}
