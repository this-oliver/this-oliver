FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

# Install dependencies for bcrypt, Python, and C++ (use python3 if you are targeting Python 3)
RUN apk add --update \
    python3 \
    make \
    g++

# Remove APK cache
RUN rm -rf /var/cache/apk/*

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
