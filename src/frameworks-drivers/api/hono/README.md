# Hono 

Adoption is on hold due to the inability to directly connect to the RDB.
Cloudflare Workers is not able to run on Node.js environment which has dependecies to RDB (e.q. PostgreSQL Driver).

Though We tried to use Supabase Postgres and Neon Postgres, they didn't work on local environment.

### Boot local environment
```
docker-compose -f docker-compose.local.yaml up
```

### Boot test environment
```
docker-compose -f docker-compose.test.yaml up
```

### Deploy to production environment
```
cd src/hono
pnpm wrangler deploy --config wrangler.production.jsonc
```

---

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
