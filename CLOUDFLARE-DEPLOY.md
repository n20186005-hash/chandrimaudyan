# Cloudflare

The configured Worker is `chandrimaudyan`. Build the static output with `pnpm run build`; the existing deployment script pins Wrangler 4.128.0. `wrangler.jsonc` uses the Worker entry before static assets for canonical redirects and error responses. Validate deployment configuration and final domains separately before release.
