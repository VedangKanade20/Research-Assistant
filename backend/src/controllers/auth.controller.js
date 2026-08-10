import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export async function registerHandler(request, reply) {
  const { email, password } = request.body;
  const user = await authService.register({ email, password });
  
  const token = request.server.jwt.sign({ sub: user.id, email: user.email });

  return reply.status(201).send({
    message: 'User registered successfully',
    data: {
      user,
      token
    }
  });
}

export async function loginHandler(request, reply) {
  const { email, password } = request.body;
  const user = await authService.validateUser({ email, password });

  const token = request.server.jwt.sign({ sub: user.id, email: user.email });

  return reply.status(200).send({
    message: 'Login successful',
    data: {
      user,
      token
    }
  });
}

export async function getProfileHandler(request, reply) {
  return reply.status(200).send({
    data: {
      userId: request.user.sub,
      email: request.user.email
    }
  });
}
