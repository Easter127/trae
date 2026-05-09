/**
 * 东方财富API代理 - Cloudflare Pages (_worker.js)
 * 
 * 在 Pages 根目录放置此文件，即可实现 Worker 功能
 * 部署地址: https://你的项目.pages.dev
 */

const ROUTES = {
  '/api/clist': { host: 'push2.eastmoney.com', path: '/api/qt/clist/get' },
  '/api/slist': { host: 'push2.eastmoney.com', path: '/api/qt/slist/get' },
  '/api/stock': { host: 'push2.eastmoney.com', path: '/api/qt/stock/get' },
  '/api/ulist': { host: 'push2.eastmoney.com', path: '/api/qt/ulist/get' },
  '/api/ztpool': { host: 'push2ex.eastmoney.com', path: '/getTopicZTPool' },
  '/api/zdfb': { host: 'push2ex.eastmoney.com', path: '/getTopicZDFenBu' },
  '/api/zdcount': { host: 'push2ex.eastmoney.com', path: '/getTopicZDTCount' },
  '/api/kline': { host: 'push2his.eastmoney.com', path: '/api/qt/stock/kline/get' },
  '/api/datacenter': { host: 'datacenter-web.eastmoney.com', path: '/api/data/v1/get' },
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // 健康检查
    if (path === '/health') {
      return jsonResponse({ status: 'ok', time: new Date().toISOString() });
    }

    // 路由匹配
    const route = ROUTES[path];
    if (!route) {
      return jsonResponse({
        name: '东方财富API代理 (Pages)',
        endpoints: Object.keys(ROUTES),
      });
    }

    // 构建目标URL
    const targetUrl = `https://${route.host}${route.path}?${url.searchParams.toString()}`;

    try {
      const resp = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://quote.eastmoney.com/',
          'Accept': '*/*',
        },
      });

      const data = await resp.text();
      return new Response(data, {
        status: resp.status,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=30',
          'X-Proxy-Host': route.host,
        },
      });
    } catch (err) {
      return jsonResponse({ error: err.message }, 502);
    }
  },
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
