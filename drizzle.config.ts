import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

const db_url: string = 'file:' + process.env.DATABASE_URL as string;

export default defineConfig({
  schema: './db/schema/*',
  out: './drizzle',
  // driver: 'turso',
  dbCredentials: {
    url: db_url,
    authToken: '...',
  },
  dialect: 'sqlite'
});
