export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  const route = { host: 'push2ex.eastmoney.com', path: '/getTopicZBPool' };
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
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({error: err.message}), {status: 502});
  }
}
