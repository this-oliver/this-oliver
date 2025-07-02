FROM node:22.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Install dependencies for bcrypt, Python, and C++ (use python3 if you are targeting Python 3)
RUN apk add --update --no-cache \
    python3 \
    make \
    g++

# Copy the rest of the application code
COPY config/ ./config/
COPY public/ ./public/
COPY src/ ./src/
COPY types/ ./types/
COPY favicon.png ./
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Define build arguments (with defaults) and set environment variables
ARG HOST=0.0.0.0
ENV HOST=$HOST
ARG DATABASE_CLIENT=sqlite
ENV DATABASE_CLIENT=$DATABASE_CLIENT
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Create an entrypoint script that starts up the application based on the NODE_ENV variable
RUN echo '#!/bin/sh\n\
if [ "$NODE_ENV" = "production" ]; then\n\
  npm start\n\
else\n\
  npm run dev\n\
fi' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Expose the port the app runs on
ARG PORT=1337
EXPOSE $PORT

# Set non-root user and group for the backend
RUN chown -R 1001:1001 /app
USER 1001:1001

# Start the application
ENTRYPOINT ["/app/entrypoint.sh"]
