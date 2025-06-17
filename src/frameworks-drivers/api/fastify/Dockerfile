# syntax=docker/dockerfile:1.4

# ===== Builder Stage =====
FROM node:22-slim AS builder

ARG PNPM_VERSION=10.11.0

# Enable Corepack and pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

ENV PNPM_HOME="/usr/local/bin"
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /app

# Copy pnpm configuration and lockfile
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

# Copy all files, including the src directory and its package.json
COPY . .

# Copy only the Fastify package.json to install its specific dependencies
# COPY src/frameworks-drivers/api/fastify/package.json ./src/frameworks-drivers/api/fastify/package.json

# Install dependencies for the Fastify sub-project only
# RUN pnpm install --filter ./src/frameworks-drivers/api/fastify... --frozen-lockfile --prod
RUN pnpm install --filter ./src/frameworks-drivers/api/fastify... --frozen-lockfile

# Build the Fastify application
WORKDIR /app/src/frameworks-drivers/api/fastify
RUN pnpm run build


# ===== Runner Stage =====
FROM node:22-slim AS runner

ARG PNPM_VERSION=10.11.0

# Enable Corepack and pnpm (needed for pnpm start script if not fully standalone)
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ENV PNPM_HOME="/usr/local/bin"
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /app

COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./

# Copy the specific project's package.json (essential for pnpm --filter)
COPY --from=builder /app/src/frameworks-drivers/api/fastify/package.json ./src/frameworks-drivers/api/fastify/package.json

# Copy the built application output to its correct place relative to the workspace root
COPY --from=builder /app/src/frameworks-drivers/api/fastify/dist ./src/frameworks-drivers/api/fastify/dist

# Install ONLY production dependencies for the Fastify app
# This command is now run from the workspace root /app, where pnpm-lock.yaml resides.
RUN pnpm install --filter ./src/frameworks-drivers/api/fastify... --prod --frozen-lockfile

# Set the final working directory to where the app will be run
WORKDIR /app/src/frameworks-drivers/api/fastify

EXPOSE 3030

# Command to run the Fastify application
CMD ["node", "./dist/index.js"]
