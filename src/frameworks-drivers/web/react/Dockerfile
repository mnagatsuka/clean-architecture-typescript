# syntax=docker/dockerfile:1.4

# === 1. Build Stage ===
FROM node:22-slim AS builder

ARG PNPM_VERSION=10.11.0

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# 必要なファイルだけコピー
# COPY tsconfig.base.json ./tsconfig.base.json
COPY tsconfig.base.json ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY src/frameworks-drivers/web/react/package.json ./src/frameworks-drivers/web/react/package.json
COPY src/frameworks-drivers/web/react/pnpm-lock.yaml ./src/frameworks-drivers/web/react/pnpm-lock.yaml

# Reactプロジェクトのコードと設定をコピー
COPY src/frameworks-drivers/web/react ./src/frameworks-drivers/web/react

# 依存関係インストール（reactのみ対象）
RUN pnpm install --filter ./src/frameworks-drivers/web/react... --frozen-lockfile

WORKDIR /app/src/frameworks-drivers/web/react

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN pnpm run build

# === 2. Serve Stage (静的ファイルサーバ) ===
FROM nginx:1.27-alpine AS runner

WORKDIR /usr/share/nginx/html

# ビルド成果物をnginxへコピー
COPY --from=builder /app/src/frameworks-drivers/web/react/dist ./

# 任意: nginx.confをカスタムする場合
# COPY src/frameworks-drivers/web/react/nginx.conf /etc/nginx/nginx.conf

# 必要に応じて環境変数のためのエントリポイントスクリプト等を追加可能

EXPOSE 80

