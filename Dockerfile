FROM node:20 AS build

WORKDIR /app

COPY ./*.json /app/

RUN npm ci

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/ /app/
COPY . /app/

EXPOSE 3000

CMD ["npm", "run", "dev"]