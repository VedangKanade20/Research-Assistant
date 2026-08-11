import { db } from '../db/index.js';
import { documents } from '../db/schema/documents.js';
import { eq, and } from 'drizzle-orm';

export class DocumentRepository {
  async findByUserId(userId) {
    return await db
      .select({
        id: documents.id,
        filename: documents.filename,
        fileType: documents.fileType,
        originalSize: documents.originalSize,
        summary: documents.summary,
        createdAt: documents.createdAt
      })
      .from(documents)
      .where(eq(documents.userId, userId));
  }

  async findById(id, userId) {
    const result = await db
      .select()
      .from(documents)
      .where(and(eq(documents.id, id), eq(documents.userId, userId)))
      .limit(1);
    return result[0] || null;
  }

  async create(docData) {
    const result = await db.insert(documents).values(docData).returning();
    return result[0];
  }

  async deleteById(id, userId) {
    const result = await db
      .delete(documents)
      .where(and(eq(documents.id, id), eq(documents.userId, userId)))
      .returning({ id: documents.id });
    return result[0] || null;
  }
}
