# Dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bullseye
USER node
WORKDIR /home/node
RUN mkdir .node-red && \
    npm install -g --unsafe-perm \
    node-red \
    nodemon
COPY flows.json /home/node/.node-red/flows.json
COPY settings.js /home/node/.node-red/settings.js