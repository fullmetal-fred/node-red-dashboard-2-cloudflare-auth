# node-red-dashboard-2-cloudflare-auth

This authentication plugin was made for the fantastic [Node-RED Dashboard 2](https://github.com/FlowFuse/node-red-dashboard) project by [FlowFuse](https://github.com/FlowFuse). 
It enables those using [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/) to receive user information such as email address in Node-RED anytime they interact with Dashboard elements. This can be useful for configuring authorization (authz) rules, or for per-user scoped reads/writes, etc. 

## Quickstart

Pre-requisites:
- A Cloudflare account
- A Cloudflare tunnel configured for your Node-RED instance

1. Install @flowfuse/node-red-dashboard 

