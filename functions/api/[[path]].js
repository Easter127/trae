const ROUTES = {
  'clist': { host: 'push2.eastmoney.com', path: '/api/qt/clist/get' },
  'slist': { host: 'push2.eastmoney.com', path: '/api/qt/slist/get' },
  'stock': { host: 'push2.eastmoney.com', path: '/api/qt/stock/get' },
  'ulist': { host: 'push2.eastmoney.com', path: '/api/qt/ulist/get' },
  'ulist.np': { host: 'push2.eastmoney.com', path: '/api/qt/ulist.np/get' },
  'trends': { host: 'push2.eastmoney.com', path: '/api/qt/stock/trends/get' },
  'trends2': { host: 'push2.eastmoney.com', path: '/api/qt/stock/trends2/get' },
  'ztpool': { host: 'push2ex.eastmoney.com', path: '/getTopicZTPool' },
  'zbpool': { host: 'push2ex.eastmoney.com', path: '/getTopicZBPool' },
  'dtpool': { host: 'push2ex.eastmoney.com', path: '/getTopicDTPool' },
  'qspool': { host: 'push2ex.eastmoney.com', path: '/getTopicQSPool' },
  'zdfb': { host: 'push2ex.eastmoney.com', path: '/getTopicZDFenBu' },
  'zdcount': { host: 'push2ex.eastmoney.com', path: '/getTopicZDTCount' },
  'kline': { host: 'push2his.eastmoney.com', path: '/api/qt/stock/kline/get' },
  'fflow': { host: 'push2his.eastmoney.com', path: '/api/qt/stock/fflow/daykline/get' },
  'datacenter': { host: 'datacenter-web.eastmoney.com', path: '/api/data/v1/get' },
};

export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);
  
  // params.path 是 [[path]] 匹配到的路径部分
  const endpoint = params.path || '';
  
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': '*' }
    });
  }
  
  const route = ROUTES[endpoint];
  if (!route) {
    return new Response(JSON.stringify({ 
      error: 'Unknown endpoint', 
      endpoint: endpoint,
      available: Object.keys(ROUTES) 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
  
  const targetUrl = 'https://' + route.host + route.path + '?' + url.searchParams.toString();
  
  try {
    const resp = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://quote.eastmoney.com/',
      },
    });
    const data = await resp.text();
    return new Response(data, {
      status: resp.status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
