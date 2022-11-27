FROM node:latest

WORKDIR /bot/

LABEL org.opencontainers.image.vendor="ghcr.io"
LABEL org.opencontainers.image.title="timolia-stats"
LABEL org.opencontainers.image.description="Timolia Statistiken Discord Bot"
LABEL org.opencontainers.image.source=https://github.com/l3nnartt/timolia-stats
LABEL org.opencontainers.image.authors="Lennart Lösche <contact@lennartloesche.de>"
LABEL org.opencontainers.image.version="4.3.0"

COPY commands/ commands/
COPY events/ events/
COPY package.json package.json
COPY start.sh start.sh
COPY index.js index.js
COPY deploy-commands.js deploy-commands.js
COPY bot.js bot.js

RUN npm install

RUN chmod +x /bot/start.sh

ENTRYPOINT ["/bot/start.sh"]