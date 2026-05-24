FROM node:26.2.0-alpine@sha256:7c6af15abe4e3de859690e7db171d0d711bf37d27528eddfe625b2fe89e097f8

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
