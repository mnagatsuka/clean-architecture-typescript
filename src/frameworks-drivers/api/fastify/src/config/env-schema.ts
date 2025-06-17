import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  DB_TYPE: z.string().default('inmemory'),
  // DB_TYPE: z.enum(['inmemory', 'postgres', 'neon-postgres']).default('inmemory'),
  DB_URL: z.string().default(''),
})

export type EnvConfig = z.infer<typeof envSchema>
