import {
  getDocumentsHandler,
  getDocumentByIdHandler,
  uploadDocumentHandler,
  deleteDocumentHandler
} from '../../controllers/document.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

export async function documentRoutes(fastify, options) {
  fastify.get('/documents', { preHandler: [authenticate] }, getDocumentsHandler);
  fastify.get('/documents/:id', { preHandler: [authenticate] }, getDocumentByIdHandler);
  fastify.post('/documents/upload', { preHandler: [authenticate] }, uploadDocumentHandler);
  fastify.delete('/documents/:id', { preHandler: [authenticate] }, deleteDocumentHandler);
}
