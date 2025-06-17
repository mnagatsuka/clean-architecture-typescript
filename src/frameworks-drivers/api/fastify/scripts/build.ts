// src/frameworks-drivers/api/fastify/scripts/build.ts
import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entryFile = path.resolve(__dirname, '../src/index.ts');
const monorepoRoot = path.resolve(__dirname, '../../../../../');

await build({
  entryPoints: [entryFile],
  bundle: true,
  platform: 'node',
  target: 'node22',
  outdir: path.resolve(__dirname, '../dist'),
  tsconfig: path.resolve(__dirname, '../tsconfig.json'),
  external: [
    'fastify',
    '@fastify/sensible',
    '@fastify/cors',
    '@fastify/env',
    'drizzle-orm',
    'pg',
    'uuid',
    'zod',
    'dotenv', // <-- IMPORTANT: Make dotenv external as well!
    // Node.js built-in modules that might be dynamically required
    'fs',
    'path',
    'url', // fileURLToPath/dirname etc. related
    'util',
    'buffer',
    'stream',
    'crypto',
    'events', // Common for various libraries
    'http',
    'https',
    'net',
    'tls',
    // ... add any other Node.js built-ins or packages from your fastify/package.json
    // dependencies that you don't want bundled.
  ],
  format: 'esm',
  sourcemap: true,
  alias: {
    '@src': path.resolve(monorepoRoot, 'src'),
    '@entities': path.resolve(monorepoRoot, 'src/entities'),
    '@usecases': path.resolve(monorepoRoot, 'src/usecases'),
    '@interface-adapters': path.resolve(monorepoRoot, 'src/interface-adapters'),
    '@frameworks-drivers': path.resolve(monorepoRoot, 'src/frameworks-drivers'),
    '@react': path.resolve(monorepoRoot, 'src/frameworks-drivers/web/react/src'),
    '@test': path.resolve(monorepoRoot, 'test'),
    '@shared': path.resolve(monorepoRoot, 'shared'),
  },
  logLevel: 'info',
}).then(() => {
  console.log('Fastify build complete!');
}).catch((error) => {
  console.error('Fastify build failed:', error);
  process.exit(1);
});