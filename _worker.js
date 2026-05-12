const ROUTES = {
  '/api/clist': { host: 'push2.eastmoney.com', path: '/api/qt/clist/get' },
  '/api/slist': { host: 'push2.eastmoney.com', path: '/api/qt/slist/get' },
  '/api/stock': { host: 'push2.eastmoney.com', path: '/api/qt/stock/get' },
  '/api/ulist': { host: 'push2.eastmoney.com', path: '/api/qt/ulist/get' },
  '/api/ulist.np': { host: 'push2.eastmoney.com', path: '/api/qt/ulist.np/get' },
  '/api/trends': { host: 'push2.eastmoney.com', path: '/api/qt/stock/trends/get' },
  '/api/trends2': { host: 'push2.eastmoney.com', path: '/api/qt/stock/trends2/get' },
  '/api/ztpool': { host: 'push2ex.eastmoney.com', path: '/getTopicZTPool' },
  '/api/zbpool': { host: 'push2ex.eastmoney.com', path: '/getTopicZBPool' },
  '/api/dtpool': { host: 'push2ex.eastmoney.com', path: '/getTopicDTPool' },
  '/api/qspool': { host: 'push2ex.eastmoney.com', path: '/getTopicQSPool' },
  '/api/zdfb': { host: 'push2ex.eastmoney.com', path: '/getTopicZDFenBu' },
  '/api/zdcount': { host: 'push2ex.eastmoney.com', path: '/getTopicZDTCount' },
  '/api/kline': { host: 'push2his.eastmoney.com', path: '/api/qt/stock/kline/get' },
  '/api/fflow': { host: 'push2his.eastmoney.com', path: '/api/qt/stock/fflow/daykline/get' },
  '/api/datacenter': { host: 'datacenter-web.eastmoney.com', path: '/api/data/v1/get' },
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': '*' } });
    }
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', endpoints: Object.keys(ROUTES) }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
    const route = ROUTES[path];
    if (!route) {
      return new Response(JSON.stringify({ error: 'Unknown endpoint', endpoints: Object.keys(ROUTES) }), { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
    const targetUrl = 'https://' + route.host + route.path + '?' + url.searchParams.toString();
    try {
      const resp = await fetch(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Referer': 'https://quote.eastmoney.com/' } });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' } });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
  },
};
