FROM node:12

LABEL Maintainer="teeliny@gmail.com"

WORKDIR /home/teelinc

COPY . .

RUN npm install

RUN npx tsc

EXPOSE 3001

CMD npm start