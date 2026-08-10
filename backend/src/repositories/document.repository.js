import { db } from '../db/index.js';
import { documents } from '../db/schema/documents.js';
import { eq } from 'drizzle-orm';

export class DocumentRepository {
  async findByUserId(userId) {
    return await db.select().from(documents).where(eq(documents.userId, userId));
  }

  async create(docData) {
    const result = await db.insert(documents).values(docData).returning();
    return result[0];
  }
}
