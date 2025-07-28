FROM node:22.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src/
COPY nuxt.config.ts ./
COPY tsconfig.json ./

RUN npm run build

EXPOSE 3000

RUN chown -R 1001:1001 /app
USER 1001

CMD ["npm", "start"]
