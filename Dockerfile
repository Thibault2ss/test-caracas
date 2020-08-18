FROM node:alpine

WORKDIR /opt/app
COPY . .
COPY --chown=node:node . .
WORKDIR /opt/app

RUN npm install

EXPOSE 8000
USER node
ENTRYPOINT ["node"]
CMD ["server/index.js"]
