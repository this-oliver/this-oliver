FROM node:22.23.3-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402

# Define build arguments (with defaults) and set environment variables
ARG HOST=0.0.0.0
ENV HOST=$HOST
ARG DATABASE_CLIENT=sqlite
ENV DATABASE_CLIENT=$DATABASE_CLIENT
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG PORT=1337

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Install dependencies
RUN npm install -g pnpm@11.5.0 \
  && pnpm install

# Copy the rest of the application code
COPY config/ ./config/
COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.json ./

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE $PORT

# Set user to run the application and give them permissions to the app directory
RUN chown -R node:node /app
USER node

# Start the application
ENTRYPOINT ["pnpm", "start"]
