# ===== 開発・ビルドステージ =====
FROM node:20-slim AS builder

# 作業ディレクトリ
WORKDIR /app

# 必要ファイルをコピー（ビルドコンテキストはプロジェクトルート）
COPY package.json pnpm-lock.yaml ./src/frameworks-drivers/api/hono/
COPY src/ ./src/

# wrangler + esbuild 等の依存をインストール
RUN corepack enable && corepack prepare pnpm@8 --activate
WORKDIR /app/src/frameworks-drivers/api/hono
RUN pnpm install

# 環境変数で指定されたビルドターゲットを使って build.ts を実行（例：local/test/prod）
ARG ENV=local
ENV NODE_ENV=$ENV

# 環境に応じて dist 出力先を変更してビルド（scripts/build.ts 内で分岐）
RUN pnpm exec tsx scripts/build.ts

# ===== 実行ステージ（軽量）=====
FROM node:20-slim AS runner

WORKDIR /app

# wrangler のみグローバルに入れる
RUN corepack enable && corepack prepare pnpm@8 --activate && pnpm add -g wrangler

# ビルド成果物と config のみコピー
COPY --from=builder /app/src/frameworks-drivers/api/hono/dist/$NODE_ENV/worker.js ./worker.js
COPY src/frameworks-drivers/api/hono/wrangler.$NODE_ENV.jsonc ./wrangler.jsonc

# 起動コマンドは docker-compose 側で制御
