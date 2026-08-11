import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  fileType: text('file_type').notNull().default('pdf'),
  originalSize: integer('original_size').notNull(),
  extractedText: text('extracted_text'),
  summary: text('summary'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
