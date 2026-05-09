# Eastmoney API Proxy

Simple API proxy for Eastmoney data endpoints.

## Deploy to Cloudflare Pages

1. Create GitHub repository `eastmoney-proxy-pages`
2. Upload `_worker.js` to repository root
3. Deploy via Cloudflare Pages (Connect to Git)
4. Get your `*.pages.dev` URL

## Endpoints

- `/health` - Health check
- `/api/slist` - Sector list
- `/api/stock` - Stock info
- `/api/ulist` - Batch quotes
- `/api/ztpool` - Limit-up stocks
- `/api/datacenter` - Data center API

## Usage

```bash
curl https://your-site.pages.dev/health
curl "https://your-site.pages.dev/api/slist?pn=1&pz=10&fs=m:90+t:3&fields=f12,f14,f3"
```
