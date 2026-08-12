import { db } from '../db/index.js';
import { chatSessions } from '../db/schema/chatSessions.js';
import { chatMessages } from '../db/schema/chatMessages.js';
import { documentChunks } from '../db/schema/documentChunks.js';
import { eq, and, asc } from 'drizzle-orm';

/**
 * Calculates Cosine Distance between two float arrays
 * Distance = 1 - (A · B / (||A|| * ||B||))
 */
function cosineDistance(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 1;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 1;
  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return 1 - similarity;
}

export class ChatRepository {
  async getOrCreateSession(documentId, userId) {
    const existing = await db
      .select()
      .from(chatSessions)
      .where(and(eq(chatSessions.documentId, documentId), eq(chatSessions.userId, userId)))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    const created = await db
      .insert(chatSessions)
      .values({ documentId, userId })
      .returning();

    return created[0];
  }

  async addMessage({ sessionId, role, content, tokensUsed = 0 }) {
    const result = await db
      .insert(chatMessages)
      .values({ sessionId, role, content, tokensUsed })
      .returning();
    return result[0];
  }

  async getSessionMessages(sessionId) {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt));
  }

  /**
   * Vector Cosine Similarity Search
   * Fetches document chunks and ranks top K by Cosine Distance
   */
  async findTopKChunks(documentId, userId, queryEmbedding, topK = 3) {
    const chunks = await db
      .select({
        id: documentChunks.id,
        chunkIndex: documentChunks.chunkIndex,
        content: documentChunks.content,
        embedding: documentChunks.embedding
      })
      .from(documentChunks)
      .where(and(eq(documentChunks.documentId, documentId), eq(documentChunks.userId, userId)));

    if (chunks.length === 0) return [];

    // Calculate Cosine Distance for each chunk
    const rankedChunks = chunks.map(chunk => {
      const distance = cosineDistance(queryEmbedding, chunk.embedding);
      return { ...chunk, distance };
    });

    // Sort by smallest distance (highest similarity)
    rankedChunks.sort((a, b) => a.distance - b.distance);

    return rankedChunks.slice(0, topK);
  }
}
