FROM node:22 as builder

WORKDIR /frontend

COPY package.json .

COPY . .

RUN npm i

FROM node:22-slim

WORKDIR /app

COPY --from=builder /frontend .

EXPOSE 3000

CMD [ "npm","start" ]
 


