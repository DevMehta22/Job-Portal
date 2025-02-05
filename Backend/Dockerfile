FROM node:22 as builder

WORKDIR /backend

COPY package*.json .

RUN npm i 

COPY . .

FROM node:22-slim

WORKDIR /app

COPY --from=builder /backend .

# COPY .env.sample .env

EXPOSE 8000

CMD ["npm","run","dev"]

