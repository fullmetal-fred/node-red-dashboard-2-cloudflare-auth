# node-red-dashboard-2-cloudflare-auth

Enables Cloudflare Access user auth information to be passed to Node-RED.

This authentication plugin was made for the fantastic [Node-RED Dashboard 2](https://github.com/FlowFuse/node-red-dashboard) project by [FlowFuse](https://github.com/FlowFuse). 
It enables those using [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/) to receive user information such as email address in Node-RED anytime they interact with Dashboard elements. This can be useful for configuring authorization (authz) rules, or for per-user scoped reads/writes, etc. 

## Getting Started

Pre-requisites:
- A Cloudflare account
- A Cloudflare [tunnel configured for your Node-RED instance](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
- A Cloudflare [access policy configured for your Node-RED instance](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/)

Steps:
1. Install @flowfuse/node-red-dashboard 

2. Install `@fullmetal-fred/node-red-dashboard-2-cloudflare-auth` via npm or flows.nodered.org

3. Create a Dashboard element and wire it up to a debug node set to display the whole msg object (not just payload)

4. Navigate to your Node-RED dashboard instance via your Cloudflare tunnel, authenticate with Access, and click on the button in your Node-RED dashboard

5. Navigate back to the Node-RED editor's debug window and see information provided under msg._client.user


## Contributing

Pull requests and issues welcome! 

In order to develop:

1. Clone the repo
2. Optionally run the devcontainer in vscode
3. 'npm run dev' for local Node-RED instance with the module installed

