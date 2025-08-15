import { Options, IPHeaders } from "./types"

export const headersToCheck: IPHeaders[] = [
  "x-real-ip", // Nginx proxy/FastCGI
  "x-client-ip", // Apache https://httpd.apache.org/docs/2.4/mod/mod_remoteip.html#page-header
  "cf-connecting-ip", // Cloudflare
  "fastly-client-ip", // Fastly
  "x-cluster-client-ip", // GCP
  "x-forwarded", // General Forwarded
  "forwarded-for", // RFC 7239
  "forwarded", // RFC 7239
  "x-forwarded", // RFC 7239
  "appengine-user-ip", // GCP
  "true-client-ip", // Akamai and Cloudflare
  "cf-pseudo-ipv4", // Cloudflare
  "fly-client-ip", // Fly.io
]

export const defaultOptions: Options = {
  headersOnly: false,
  checkHeaders: headersToCheck,
  injectServer: (app) => app.server,
}
