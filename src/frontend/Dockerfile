FROM node:26.11.1-alpine@sha256:143494b1da2945f061539253adc65e4f1569ddf07da2d384c022c791a9d90a4a

# Set the working directory
WORKDIR /web

# Copy package.json and package-lock.json
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Install dependencies
RUN npm install -g pnpm@11.5.0 && pnpm install

# Build-time args for provenance
ARG APP_VERSION
ARG APP_COMMIT_SHA
ARG APP_BUILD_TIMESTAMP

ENV NUXT_PUBLIC_APP_VERSION=$APP_VERSION \
    NUXT_PUBLIC_APP_COMMIT_SHA=$APP_COMMIT_SHA \
    NUXT_PUBLIC_APP_BUILD_TIMESTAMP=$APP_BUILD_TIMESTAMP

# Copy the rest of the application code
COPY app/ ./app/
COPY public/ ./public/
COPY server/ ./server/
COPY shared/ ./shared/
COPY nuxt.config.ts ./
COPY tsconfig.json ./

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Set user to run the application and give them permissions to the app directory
RUN chown -R node:node /web
USER node

# Start the application
ENTRYPOINT ["node", ".output/server/index.mjs"]
