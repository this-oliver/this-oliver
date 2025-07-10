FROM node:20-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN chown -R 1001:10001 /backend
USER 1001:1001

CMD ["npm", "start"]
