FROM node:lts-alpine AS nodebuilder
RUN npm install -g serve
WORKDIR /code

COPY package.json yarn.lock /code/
RUN yarn install
COPY public /code/public
COPY src /code/src

RUN yarn build
EXPOSE 3000

CMD ["serve", "-s", "build"]