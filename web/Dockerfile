FROM node:lts-alpine AS nodebuilder
WORKDIR /code

COPY --link package.json yarn.lock /code/
RUN yarn install --frozen-lockfile
COPY --link public /code/public
COPY --link src /code/src
RUN yarn build

FROM node:lts-alpine AS final

RUN npm install -g serve
WORKDIR /code
COPY --link --from=nodebuilder /code/build /code/build

EXPOSE 3000

CMD ["serve", "-s", "build"]