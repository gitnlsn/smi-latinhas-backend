FROM node:20-alpine

ENV DIR=/app
WORKDIR ${DIR}
COPY . ${DIR}

RUN yarn
RUN npx nest build

CMD node dist/main