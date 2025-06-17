import { neon, neonConfig, type NeonQueryFunction } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

export type NeonDBClient = NeonHttpDatabase<typeof schema> & {
  $client: NeonQueryFunction<false, false>
}

let db: NeonDBClient | null = null

export const getDb = (
  connectionString: string,
) => {
  if (db != null) {
    return db;
  }
  if ( connectionString === 'postgresql://postgres:postgres@db.localtest.me:5432/test' ) {
    console.log('here')
    neonConfig.fetchEndpoint = 'http://db.localtest.me:4445'
    neonConfig.useSecureWebSocket = false;
   }

  // const sql = neon('postgres://neon:npg@db:5432/neondb');
  const sql = neon(connectionString);
  db = drizzle(sql, { schema });
  return db;
};