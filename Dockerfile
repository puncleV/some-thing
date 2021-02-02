FROM node:12.13.1-alpine as build
ENV NODE_ENV=production
WORKDIR /opt
COPY . .
RUN npm i
RUN npm run build


FROM node:12.13.1-alpine

WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /opt/package.json package.json
COPY --from=build --chown=node:node /opt/dist dist
COPY --from=build --chown=node:node /opt/node_modules node_modules

CMD ["node", "dist/main.js"]
LABEL MAINTAINER="Kozlov Viktor <victor@kozlov.io>" VERSION="v1.0.0"

USER node
