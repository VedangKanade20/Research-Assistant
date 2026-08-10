import { registerHandler, loginHandler, getProfileHandler } from '../../controllers/auth.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const authBodySchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 }
  }
};

export async function authRoutes(fastify, options) {
  fastify.post('/auth/register', { schema: { body: authBodySchema } }, registerHandler);
  fastify.post('/auth/login', { schema: { body: authBodySchema } }, loginHandler);
  
  fastify.get('/auth/me', { preHandler: [authenticate] }, getProfileHandler);
}
