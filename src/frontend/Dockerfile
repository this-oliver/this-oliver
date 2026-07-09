FROM node:26.5.0-alpine@sha256:e88a35be04478413b7c71c455cd9865de9b9360e1f43456be5951032d7ac1a66

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY assets/ ./assets/
COPY components/ ./components/
COPY composables/ ./composables/
COPY pages/ ./pages/
COPY plugins/ ./plugins/
COPY public/ ./public/
COPY server/ ./server/
COPY stores/ ./stores/
COPY types/ ./types/
COPY app.vue ./
COPY nuxt.config.ts ./
COPY tsconfig.json ./

RUN npm run build

EXPOSE 3000

RUN chown -R 1001:1001 /app
USER 1001

CMD ["npm", "start"]
