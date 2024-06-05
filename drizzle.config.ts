import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: './db/schema/*',
  out: './drizzle',
  // driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  dialect: 'sqlite'
});
