FROM node:14.18.1 AS builder
COPY . .
RUN npm install
RUN npm run build


FROM alpine
RUN apk add nodejs npm

COPY --from=builder *.js ./
COPY package* ./
RUN npm install --production

EXPOSE 8080
CMD npm start

