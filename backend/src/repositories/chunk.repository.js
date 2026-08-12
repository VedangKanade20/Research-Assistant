import { db } from '../db/index.js';
import { documentChunks } from '../db/schema/documentChunks.js';
import { eq, and } from 'drizzle-orm';

export class ChunkRepository {
  async insertBatch(chunksData) {
    if (!chunksData || chunksData.length === 0) return [];
    return await db.insert(documentChunks).values(chunksData).returning();
  }

  async findByDocumentId(documentId, userId) {
    return await db
      .select({
        id: documentChunks.id,
        chunkIndex: documentChunks.chunkIndex,
        content: documentChunks.content,
        createdAt: documentChunks.createdAt
      })
      .from(documentChunks)
      .where(and(eq(documentChunks.documentId, documentId), eq(documentChunks.userId, userId)));
  }
}
