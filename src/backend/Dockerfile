FROM node:25.1.0-alpine

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
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY config/ ./config/
COPY public/favicon.png ./public/favicon.png
COPY public/robots.txt ./public/robots.txt
COPY src/ ./src/
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE $PORT

# Set user to run the application and give them permissions to the app directory
RUN chown -R 1001:1001 /app
USER 1001

# Start the application
CMD ["npm", "start"]