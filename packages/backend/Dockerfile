FROM node:22.17.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY config/ ./config/
COPY public/ ./public/
COPY src/ ./src/
COPY types/ ./types/
COPY favicon.png ./
COPY tsconfig.json ./

# Define build arguments (with defaults) and set environment variables
ARG HOST=0.0.0.0
ENV HOST=$HOST
ARG DATABASE_CLIENT=sqlite
ENV DATABASE_CLIENT=$DATABASE_CLIENT
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Build the application
RUN npm run build

# Expose the port the app runs on
ARG PORT=1337
EXPOSE $PORT

# Set non-root user and group for the backend
RUN chown -R 1001:1001 /app
USER 1001

# Start the application
CMD [ "npm", "start" ]
