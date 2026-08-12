import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { config } from '../config/env.js';
import * as usersSchema from './schema/users.js';
import * as documentsSchema from './schema/documents.js';
import * as documentChunksSchema from './schema/documentChunks.js';
import * as chatSessionsSchema from './schema/chatSessions.js';
import * as chatMessagesSchema from './schema/chatMessages.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.databaseUrl
});

export const db = drizzle(pool, {
  schema: {
    ...usersSchema,
    ...documentsSchema,
    ...documentChunksSchema,
    ...chatSessionsSchema,
    ...chatMessagesSchema
  }
});
