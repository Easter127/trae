/**
 * 东方财富API代理 - Cloudflare Pages Functions
 */

const ROUTES = {
  'clist': { host: 'push2.eastmoney.com', path: '/api/qt/clist/get' },
  'slist': { host: 'push2.eastmoney.com', path: '/api/qt/slist/get' },
  'stock': { host: 'push2.eastmoney.com', path: '/api/qt/stock/get' },
  'ulist': { host: 'push2.eastmoney.com', path: '/api/qt/ulist/get' },
  'ztpool': { host: 'push2ex.eastmoney.com', path: '/getTopicZTPool' },
  'zdfb': { host: 'push2ex.eastmoney.com', path: '/getTopicZDFenBu' },
  'zdcount': { host: 'push2ex.eastmoney.com', path: '/getTopicZDTCount' },
  'kline': { host: 'push2his.eastmoney.com', path: '/api/qt/stock/kline/get' },
  'datacenter': { host: 'datacenter-web.eastmoney.com', path: '/api/data/v1/get' },
};

export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);
  
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  }

  const pathParts = params.path || [];
  const endpoint = pathParts[0];

  if (!endpoint || endpoint === 'health') {
    return new Response(JSON.stringify({ status: 'ok', endpoints: Object.keys(ROUTES) }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const route = ROUTES[endpoint];
  if (!route) {
    return new Response(JSON.stringify({ error: 'Unknown endpoint' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const targetUrl = `https://${route.host}${route.path}?${url.searchParams.toString()}`;

  try {
    const resp = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://quote.eastmoney.com/',
      },
    });
    const data = await resp.text();
    return new Response(data, {
      status: resp.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=30',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
