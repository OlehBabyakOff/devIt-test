# Stage 1: Base
FROM node:20-alpine as base

WORKDIR /app

# root files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# backend files
COPY apps/backend/package.json ./apps/backend/

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

RUN pnpm build

# ----------------------------------------------------------
# Stage 2: Prod
FROM node:20-alpine

WORKDIR /app

COPY --from=base /app/apps/backend/dist ./dist
COPY --from=base /app/apps/backend/package.json .

RUN npm install --omit-dev

EXPOSE 3000

CMD [ "node", "dist/server.js" ]

