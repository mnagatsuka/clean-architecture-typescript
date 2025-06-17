import { build } from 'esbuild'

// 現在のモジュールURLからディレクトリパスを取得
const currentUrl = import.meta.url
const currentDir = new URL('.', currentUrl).pathname

// NODE_ENV (local/test/prod) に応じて出力先を切り替え
const env = process.env.NODE_ENV || 'local'
const outFile = new URL(`../dist/${env}/worker.js`, currentUrl).pathname
const entryPoint = new URL('../src/app.ts', currentUrl).pathname
const tsconfig = new URL('../tsconfig.json', currentUrl).pathname

await build({
  entryPoints: [entryPoint],
  outfile: outFile,
  bundle: true,
  platform: 'browser',
  target: 'es2022',
  format: 'esm',
  sourcemap: true,
  minify: env === 'prod',
  tsconfig: tsconfig,
  // external: ['pg', 'dotenv', 'path', 'fs', 'crypto', 'os', 'events', 'net', 'tls', 'stream', 'dns'],
})
