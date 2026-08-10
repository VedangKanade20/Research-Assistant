import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import { eq } from 'drizzle-orm';

export class UserRepository {
  async findByEmail(email) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  }

  async findById(id) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  }

  async create(userData) {
    const result = await db.insert(users).values(userData).returning({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt
    });
    return result[0];
  }
}
