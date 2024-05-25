console.log("test nodemon");
module.exports = function (RED) {
  RED.plugins.registerPlugin("node-red-dashboard-2-cloudflare-auth", {
    // Tells Node-RED this is a Node-RED Dashboard 2.0 plugin
    type: "node-red-dashboard-2",

    hooks: {
      /**
       * onAddConnectionCredentials - called when a D2.0 is about to send a message in Node-RED
       * @param {object} conn - SocketIO connection object
       * @param {object} msg - Node-RED msg object
       * @returns {object} - Returns Node-RED msg object
       */
      onAddConnectionCredentials: (conn, msg) => {
        // modify msg in anyway you like
        console.log("inbound msg", msg);
        let user = {};
        const headers = conn.request.headers;
        const user_email =
          headers["cf-access-authenticated-user-email"] || null;
        if (!user_email) {
          console.warn(
            "Session is not authenticated by Cloudflare tunnels, no user email detected. See headers for detail.",
            headers
          );
        }
        user.provider = "Cloudflare Access";
        user.email = user_email;
        msg._client.user = user;
        msg._headers = JSON.stringify(headers);
        console.log("outbound msg", msg);
        return msg;
      },
    },
  });
};
