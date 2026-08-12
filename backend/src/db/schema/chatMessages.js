import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { chatSessions } from './chatSessions.js';

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => chatSessions.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // 'user' | 'assistant'
  content: text('content').notNull(),
  tokensUsed: integer('tokens_used').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
