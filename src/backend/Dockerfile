# Build stage
FROM docker.io/library/node:22.14.0-alpine@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944 AS build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev bash vips-dev git > /dev/null 2>&1

WORKDIR /app/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm install -g node-gyp pnpm
RUN pnpm config set fetch-retry-maxtimeout 600000 -g && pnpm ci

COPY ./config/ ./config
COPY ./database/migrations/.gitkeep ./database/migrations/.gitkeep
COPY ./public/uploads/.gitkeep ./public/uploads/.gitkeep
COPY ./public/robots.txt ./public/robots.txt
COPY ./src ./src
COPY ./favicon.png ./favicon.png
COPY ./tsconfig.json ./tsconfig.json

# Uncomment the following lines to pin the admin panel URL at build time.
# Without them the admin panel calls the origin it is served from, which is
# what you want behind a proxy; pin it only when the admin is served from a
# different origin than the API.
# ARG STRAPI_ADMIN_BACKEND_URL
# ENV STRAPI_ADMIN_BACKEND_URL=${STRAPI_ADMIN_BACKEND_URL}
ENV NODE_ENV=production
RUN pnpm build

# # Production stage
# FROM docker.io/library/node:22.14.0-alpine@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944
# RUN apk add --no-cache vips-dev
# ENV NODE_ENV=production
# 
# WORKDIR /opt/
# COPY --from=build /opt/package.json /opt/pnpm-lock.yaml /opt/pnpm-workspace.yaml ./
# RUN npm install -g pnpm
# RUN pnpm ci && pnpm cache delete
# ENV PATH=/opt/node_modules/.bin:$PATH
# 
# WORKDIR /opt/app
# COPY --from=build /opt/package.json /opt/pnpm-lock.yaml /opt/pnpm-workspace.yaml ./
# COPY --from=build /opt/app ./
# RUN pnpm build

RUN chown -R node:node /app
USER node
EXPOSE 1337
CMD ["pnpm", "start"]