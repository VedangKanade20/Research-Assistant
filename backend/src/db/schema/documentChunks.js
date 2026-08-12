import { customType, pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { documents } from './documents.js';
import { users } from './users.js';

// Custom pgvector type for 768-dimensional float arrays
export const vector768 = customType({
  dataType() {
    return 'vector(768)';
  },
  toDriver(value) {
    if (!value) return null;
    return Array.isArray(value) ? `[${value.join(',')}]` : value;
  },
  fromDriver(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return typeof value === 'string'
      ? value.replace(/[\[\]]/g, '').split(',').map(Number)
      : [];
  }
});

export const documentChunks = pgTable('document_chunks', {
  id: uuid('id').defaultRandom().primaryKey(),
  documentId: uuid('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  chunkIndex: integer('chunk_index').notNull(),
  content: text('content').notNull(),
  embedding: vector768('embedding'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
