import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { documents } from './documents.js';
import { users } from './users.js';

export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  documentId: uuid('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').default('Document Chat Session'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
