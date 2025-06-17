# clean-architecture-typescript

## Docker

### Local environment
Boot local environment
```
docker compose --env-file .env.local -f docker-compose.local.yml up -d
```

Shat down local environment
```
docker compose -f docker-compose.local.yml down
```

Shat down local environment and delete volumes
```
docker compose -f docker-compose.local.yml down -v
```

Connect local DB
```
docker exec -it postgres-local psql -U postgres -d local
```

### Test environment

Boot test environment
```
docker compose --env-file .env.test -f docker-compose.test.yml up -d --build
```

Shat down test environment
```
docker compose -f docker-compose.test.yml down
```

Shat down test environment and delete volumes
```
docker compose -f docker-compose.test.yml down -v
```


## Drizzle
```
pnpm drizzle-kit generate
```

```
pnpm drizzle-kit push
```