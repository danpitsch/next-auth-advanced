import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

console.log(`drizzle.config.ts > DATABASE_URL: ${process.env.DATABASE_URL}`);
console.log(`drizzle.config.ts > DATABASE_AUTH_TOKEN: ${process.env.DATABASE_AUTH_TOKEN}`);

export default defineConfig({
  schema: './db/schema/*',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  dialect: 'sqlite'
});
