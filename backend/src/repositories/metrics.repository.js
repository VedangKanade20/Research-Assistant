import { db } from '../db/index.js';
import { documents } from '../db/schema/documents.js';
import { chatSessions } from '../db/schema/chatSessions.js';
import { chatMessages } from '../db/schema/chatMessages.js';
import { eq, sql } from 'drizzle-orm';

export class MetricsRepository {
  async getUserMetrics(userId) {
    // 1. Total Documents & Total Storage Bytes
    const docStats = await db
      .select({
        totalDocuments: sql`COUNT(${documents.id})`,
        totalStorageBytes: sql`COALESCE(SUM(${documents.originalSize}), 0)`
      })
      .from(documents)
      .where(eq(documents.userId, userId));

    // 2. Total User Questions & Total Gemini Tokens Consumed
    const chatStats = await db
      .select({
        totalQuestions: sql`COUNT(CASE WHEN ${chatMessages.role} = 'user' THEN 1 END)`,
        totalTokensUsed: sql`COALESCE(SUM(${chatMessages.tokensUsed}), 0)`
      })
      .from(chatMessages)
      .innerJoin(chatSessions, eq(chatMessages.sessionId, chatSessions.id))
      .where(eq(chatSessions.userId, userId));

    const totalDocs = Number(docStats[0]?.totalDocuments || 0);
    const totalBytes = Number(docStats[0]?.totalStorageBytes || 0);
    const totalQuestions = Number(chatStats[0]?.totalQuestions || 0);
    const totalTokens = Number(chatStats[0]?.totalTokensUsed || 0);

    return {
      totalDocuments: totalDocs,
      totalStorageBytes: totalBytes,
      totalQuestions: totalQuestions,
      totalTokensUsed: totalTokens
    };
  }
}
