FROM node:14 AS build-env
ADD . /app
WORKDIR /app

RUN npm ci --only=production && npm install -g rimraf @nestjs/cli && npm i --save-dev @types/express

COPY . .
RUN npm run build

FROM node:14-slim

COPY --from=build-env /app /app

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /app

EXPOSE 80
CMD ["npm","run","start:prod"]
