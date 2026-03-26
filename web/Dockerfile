FROM node:lts-alpine
WORKDIR /code

COPY package*.json /code/
RUN npm install --no-fund --no-audit
RUN npm install -g serve@14.2.4 --no-fund --no-audit

COPY index.html /code/
COPY public /code/public
COPY src /code/src
COPY vite.config.mjs vitest.setup.js /code/

RUN npm run build
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
