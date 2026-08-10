FROM node:26.7.0-alpine@sha256:aadf416b2cdce311a8811ba3f0608a61b77dbf997500e2eafe781b51f6a0b019

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
