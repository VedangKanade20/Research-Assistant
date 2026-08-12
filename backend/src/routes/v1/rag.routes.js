import { askQuestionHandler, getChatHistoryHandler } from '../../controllers/rag.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const askQuestionSchema = {
  type: 'object',
  required: ['question'],
  properties: {
    question: { type: 'string', minLength: 1 }
  }
};

export async function ragRoutes(fastify, options) {
  fastify.post('/documents/:id/chat', { preHandler: [authenticate], schema: { body: askQuestionSchema } }, askQuestionHandler);
  fastify.get('/documents/:id/chat-history', { preHandler: [authenticate] }, getChatHistoryHandler);
}
