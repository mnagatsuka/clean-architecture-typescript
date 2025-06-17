# postgres

Node.js依存のPostgresを利用する場合。

以下コマンドは `src/frameworks-drivers/db/postgres/` 直下で実行します。


## Local environment

### 🐘 Postgresコンテナの起動

```bash
docker compose -f docker-compose.local.yml --env-file .env.local up -d
```

> `--env-file` により `.env.local` の環境変数（ユーザー名、DB名、ポートなど）を適用して起動します。


### Shat down local environment

```bash
docker compose -f docker-compose.local.yml down
```

### Shat down local environment and delete volumes
```bash
docker compose -f docker-compose.local.yml down -v
```

### 🔁 スキーマからマイグレーションファイルを生成（`generate`）

```bash
dotenv -e .env.local -- drizzle-kit generate --config=drizzle.config.ts
```

### 🚀 DBにマイグレーションを適用（`push`）

```bash
dotenv -e .env.local -- drizzle-kit push --config=drizzle.config.ts
```

### 📜 マイグレーションファイルを適用（`migrate`）

```bash
dotenv -e .env.local -- drizzle-kit migrate --config=drizzle.config.ts
```


## Test environment

### 🐘 Postgresコンテナの起動

```bash
docker compose -f docker-compose.test.yml --env-file .env.test up -d
```

### Shat down test environment

```bash
docker compose -f docker-compose.test.yml down
```

### Shat down test environment and delete volumes
```bash
docker compose -f docker-compose.test.yml down -v
```


### 🔁 スキーマからマイグレーションファイルを生成（`generate`）

```bash
dotenv -e .env.test -- drizzle-kit generate --config=drizzle.config.ts
```

### 🚀 DBにマイグレーションを適用（`push`）

```bash
npx dotenv -e .env.test -- drizzle-kit push --config=drizzle.config.ts
```

### 📜 マイグレーションファイルを適用（`migrate`）

```bash
dotenv -e .env.test -- drizzle-kit migrate --config=drizzle.config.ts
```


## 📦 補足情報

* `.env.local` に定義すべき例：

```dotenv
POSTGRES_URL=postgres://postgres:postgres@localhost:5433/local
```

* `drizzle.config.ts` の中では `process.env.POSTGRES_URL` をそのまま使う構成になっている前提です。
