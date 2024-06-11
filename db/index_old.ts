import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import schema from '.';

const db_url: string = process.env.DATABASE_URL as string;
 
const client = createClient({ url: db_url, authToken: '...'});
 
export const db = drizzle(client, { schema });
