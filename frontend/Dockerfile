FROM node:24.12-alpine AS base

WORKDIR /app

FROM base AS dependencies

COPY package*.json ./

RUN npm ci --verbose

FROM base AS build

COPY package*.json ./

RUN npm ci --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

