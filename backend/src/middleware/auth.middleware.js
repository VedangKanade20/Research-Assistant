import { UnauthorizedError } from '../utils/errors.js';

export async function authenticate(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired authentication token');
  }
}
