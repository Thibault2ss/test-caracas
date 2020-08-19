FROM node:alpine

WORKDIR /opt/app
COPY --chown=node:node . .

RUN npm install

# Run linting
RUN npm run lint

# build app for production with minification
RUN npm run build

# Run unit tests
RUN npm run test:unit

EXPOSE 8000
USER node
ENTRYPOINT ["node"]
CMD ["server/index.js"]
