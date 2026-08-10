import { UserRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { ConflictError, UnauthorizedError } from '../utils/errors.js';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ email, password }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const passwordHash = await hashPassword(password);
    const user = await this.userRepository.create({
      email,
      passwordHash
    });

    return user;
  }

  async validateUser({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    return { id: user.id, email: user.email };
  }
}
