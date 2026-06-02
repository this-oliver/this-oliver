FROM node:26.3.0-alpine@sha256:144769ec3f32e8ee36b3cfde91e82bee25d9367b20f31a151f3f7eea3a2a8541

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
