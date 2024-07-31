let plugin_name = "node-red-dashboard-2-cloudflare-auth";
module.exports = function (RED) {
  RED.plugins.registerPlugin(plugin_name, {
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
        if (!msg._client) {
          console.log(
            `${plugin_name}: msg._client is not found, not adding user info. This sometimes happens when the editor is refreshed with stale connections to the dashboard.`
          );
          return msg;
        }
        var user = {};
        const headers = conn.request.headers;
        const user_email =
          headers["cf-access-authenticated-user-email"] || null;
        if (!user_email) {
          console.warn(
            `${plugin_name}: Session is not authenticated by Cloudflare Access; no user email detected. See headers: ${JSON.stringify(
              headers
            )}`
          );
        } else {
          console.log(
            `${plugin_name}: Dashboard interacted with by ${user_email}`
          );
        }
        user.userId = user_email;
        user.email = user_email;
        user.host = headers["host"] || null;
        user.ip = headers["cf-connecting-ip"] || null;
        user.agent = headers["user-agent"] || null;
        user.provider = "Cloudflare Access";
        msg._client["user"] = user;
        return msg;
      },
    },
  });
};
