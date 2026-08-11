import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import { config } from './config/env.js';
import { router } from './routes/index.js';
import { AppError } from './utils/errors.js';

export function buildApp() {
  const app = Fastify({
    logger: config.nodeEnv !== 'test'
  });

  app.register(fastifyJwt, {
    secret: config.jwtSecret
  });

  app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024 // 10 MB Limit
    }
  });

  app.register(router);

  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }

    if (error.validation) {
      return reply.status(400).send({
        error: {
          name: 'ValidationError',
          message: error.message,
          details: error.validation
        }
      });
    }

    return reply.status(500).send({
      error: {
        name: 'InternalServerError',
        message: config.nodeEnv === 'production' ? 'An unexpected error occurred' : error.message
      }
    });
  });

  return app;
}
