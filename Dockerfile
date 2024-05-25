FROM nodered/node-red:3.1.9-debian

# Change to root and install additional dependencies, then change back to node-red
USER root
RUN apt-get update && apt-get install -y iproute2
USER node-red

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
WORKDIR /data

COPY package.json /data
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production
WORKDIR /usr/src/node-red

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
COPY flows.json /data/flows.json