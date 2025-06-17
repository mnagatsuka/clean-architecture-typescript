import { envSchema, type EnvConfig } from './env-schema'

export const env: EnvConfig = envSchema.parse(process.env)
