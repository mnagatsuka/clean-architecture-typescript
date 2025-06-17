import Fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './config/env'
import { registerRoutes } from './routes'
import { injectDependencies } from './config/di'

const app = Fastify({ logger: true })

// CORS settings
const ALLOWED_ORIGINS = [
  'http://localhost:5173', //local
  'http://localhost:5174', //test
//   'http://127.0.0.1:5174',
//   env.REACT_URL, // Get from an env var
  'https://www.your-production-app.com'
].filter(Boolean);

const dummyCorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {}
};

type CorsOriginFunction = typeof dummyCorsOptions['origin'];

const corsOriginFunction: CorsOriginFunction = (origin, callback) => {
  if (!origin || ALLOWED_ORIGINS.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error(`Not allowed by CORS: ${origin}`));
  }
};

app.register(cors, {
  origin: corsOriginFunction,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
})

// Dependency settings
await injectDependencies(app, env)

// Route settings
await registerRoutes(app)

// app.listen({ host: '0.0.0.0', port: 3030 })

// Running App
const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3030 })
    app.log.info(`Fastify server listening on ${app.server.address()}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()