import 'dotenv/config';
import { defineConfig } from "drizzle-kit";
import { db } from './db';

const db_url: string = process.env.DATABASE_URL as string;
const db_sync_url: string = process.env.DATABASE_SYNC_URL as string;
const db_auth: string = process.env.DATABASE_AUTH_TOKEN as string;

console.log(`drizzle.config.ts > DATABASE_URL: `, db_url);
console.log(`drizzle.config.ts > DATABASE_SYNC_URL: `, db_sync_url);
console.log(`drizzle.config.ts > DATABASE_AUTH_TOKEN: `, db_auth);

export default defineConfig({
  schema: './db/schema/*',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
      // SQLite3 Local
      // url: db_url,
      // authToken: '',
      // Turso Hosted
      url: db_sync_url,
      authToken: db_auth,
  },
  dialect: 'sqlite'
});
