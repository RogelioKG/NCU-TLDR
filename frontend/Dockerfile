FROM node:22-alpine AS base

WORKDIR /app/

RUN corepack enable pnpm


FROM base AS dev

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . ./

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]


FROM base AS build

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . ./

RUN pnpm run build


FROM nginxinc/nginx-unprivileged:alpine-slim AS prod

COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

COPY --chown=nginx:nginx --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 8080

USER nginx

CMD ["nginx", "-g", "daemon off;"]
