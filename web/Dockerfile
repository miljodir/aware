FROM node:lts-alpine AS nodebuilder
WORKDIR /code

COPY --link package.json yarn.lock /code/
RUN yarn config set strict-ssl false && yarn install --frozen-lockfile
COPY --link public /code/public
COPY --link src /code/src
RUN yarn build

FROM nginxinc/nginx-unprivileged:stable-alpine-otel AS final

# Copy nginx configuration
COPY --link nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files to nginx html directory
COPY --link --from=nodebuilder /code/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
