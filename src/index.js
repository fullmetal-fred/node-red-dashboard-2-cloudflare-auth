module.exports = function(RED) {
    RED.plugins.registerPlugin("node-red-dashboard-2-cloudflare-auth", {

        // Tells Node-RED this is a Node-RED Dashboard 2.0 plugin
        type: "node-red-dashboard-2",

        hooks: {
            /**
             * onInput - called when a node receives a message
             * @param {object} msg - Node-RED msg object
             * @returns {object} - Returns Node-RED msg object
             */ 
            onInput: (msg) => {
                // modify msg in anyway you like
                msg['test'] = "fred"
                msg['_cloudflare']['oninput'] = true
                return msg
            },
             /**
             * onAddConnectionCredentials - called when a D2.0 is about to send a message in Node-RED
             * @param {object} conn - SocketIO connection object
             * @param {object} msg - Node-RED msg object
             * @returns {object} - Returns Node-RED msg object
             */ 
            onAddConnectionCredentials: (conn, msg) => {
                // modify msg in anyway you like
                let client = msg._client || {};
                console.log("inbound client", client)
                const headers = conn.request.headers
                const user_email = headers["cf-access-authenticated-user-email"] || null;
                if (!user_email) {
                    console.warn("Session is not authenticated by Cloudflare tunnels, no user email detected. See headers for detail.", headers)
                }
                client.user = user_email
                client.socketId = conn.id
                client.headers = JSON.stringify(headers)
                client.socketIp = conn.request.socket.remoteAddress
                console.log("outbound client", client)
                msg._client = client
                return msg
            },
            /**
             * onIsValidConnection - Checks whether, given a msg structure and Socket connection,
             * any _client data specified allows for this message to be sent, e.g.
             * if the msg._client.socketid is the same as the connection's ID
             * @param {object} conn - SocketIO connection object
             * @param {object} msg - Node-RED msg object
             * @returns {boolean} - Is a valid connection or not
             */ 
            onIsValidConnection: (conn, msg) => {
                if (msg._client?.socketId) {
                    // if socketId is specified, check that it matches the connection's ID
                    return msg._client.socketId === conn.id
                }
                // if no specifics provided, then allow the message to be sent
                return true
            },

        }


    })
 }