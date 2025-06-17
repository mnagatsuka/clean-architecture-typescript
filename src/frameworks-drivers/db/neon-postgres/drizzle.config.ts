import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

const NODE_ENV = process.env.NODE_ENV ?? 'local'
dotenv.config({ path: `.env.${NODE_ENV}` })

export default defineConfig({
  schema: './schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DRIZZLEKIT_CONNECTION_STRING || '',
  },
})
