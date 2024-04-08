module.exports = function(RED) {
    RED.plugins.registerPlugin("node-red-dashboard-2-cloudflare-auth", {

        // Tells Node-RED this is a Node-RED Dashboard 2.0 plugin
        type: "node-red-dashboard-2",

        hooks: {
            /**
             * onSetup - called when the Dashboard 2.0 is instantiated
             * @param {object} RED - Node-RED runtime
             * @param {object} config - UI Base Node Configuration
             * @param {object} req - ExpressJS request object
             * @param {object} res - ExpressJS response object
             * @returns {object} - Setup object passed to the Client
             */ 
            onSetup: (RED, config, req, res) => {
                return {
                    // must ALWAYS return socketio.path if using this hook
                    socketio: {
                        path: `${config.path}/socketio`, 
                    }
                }
            },
            /**
             * onInput - called when a node receives a message
             * @param {object} msg - Node-RED msg object
             * @returns {object} - Returns Node-RED msg object
             */ 
            onInput: (msg) => {
                // modify msg in anyway you like
                return msg
            },
            /**
             * onAction - called when a D2.0 widget emits the `widget-action` event via SocketIO
             * @param {object} conn - SocketIO connection object
             * @param {object} id - Unique Node/Widget ID
             * @param {object} msg - Node-RED msg object
             * @returns {object} - Returns Node-RED msg object
             */ 
            onAction: (conn, id, msg) => {
                // modify msg in anyway you like
                return msg
            },
            /**
             * onChange - called when a D2.0 widget emits the `widget-change` event via SocketIO
             * @param {object} conn - SocketIO connection object
             * @param {object} id - Unique Node/Widget ID
             * @param {object} msg - Node-RED msg object
             * @returns {object} - Returns Node-RED msg object
             */ 
            onChange: (conn, id, msg) => {
                // modify msg in anyway you like
                return msg
            },
            /**
             * onLoad - called when a D2.0 widget emits the `widget-load` event via SocketIO
             * @param {object} conn - SocketIO connection object
             * @param {object} id - Unique Node/Widget ID
             * @param {object} msg - Node-RED msg object
             * @returns {object} - Returns Node-RED msg object
             */ 
            onLoad: (conn, id, msg) => {
                // modify msg in anyway you like
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
                console.log("inbound msg", msg)
                let user = {}
                const headers = conn.request.headers
                const user_email = headers["cf-access-authenticated-user-email"] || null;
                if (!user_email) {
                    console.warn("Session is not authenticated by Cloudflare tunnels, no user email detected. See headers for detail.", headers)
                }
                user.authSource = "Cloudflare Access"
                user.userId = user_email
                user.username = user_email
                user.email = user_email
                user.name = user_email
                user.image = null
                msg._client.user = user
                msg._headers = JSON.stringify(headers)
                console.log("outbound msg", msg)
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
            /**
             * onCanSaveInStore - Checks whether, given a msg structure, the msg can be saved in the store
             * Saving into a store is generally a bad idea if we're dealing with messages only intended for
             * particular clients (e.g. a msg._client.socketId is specified)
             * @param {object} msg - Node-RED msg object
             * @returns {boolean} - Is okay to store this, or not
             */
            onCanSaveInStore: (msg) => {
                if (msg._client?.socketId) {
                    // if socketId is specified, then don't save in store
                    return false
                }
                return true
            },

        }


    })
 }