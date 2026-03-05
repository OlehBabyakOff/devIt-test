# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

RUN pnpm build

# ----------------------------------------------------------
# Stage 2: nginx
FROM nginx:alpine

COPY ./infrastructure/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# copy static to nginx
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html