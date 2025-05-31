# BASE Stage
FROM node AS base
WORKDIR /usr/src/app
# copy package.json
COPY ./package.json .
# install dependencies
RUN npm install
# copy project
COPY . .


# DEV Stage
FROM base AS dev
# start the app
COPY .env .
ENV PORT=3001
CMD [ "npm", "run", "start" ]
EXPOSE 3001


# BUILD Stage
FROM base AS build
# build the app
RUN npm run build
