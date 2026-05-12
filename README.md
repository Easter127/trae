# Eastmoney API Proxy

Simple API proxy for Eastmoney data endpoints.

## Deploy to Cloudflare Pages

1. Create GitHub repository `eastmoney-proxy-pages`
2. Upload `_worker.js` to repository root
3. Deploy via Cloudflare Pages (Connect to Git)
4. Get your `*.pages.dev` URL

## Endpoints

### push2.eastmoney.com - 实时行情/列表
- `/api/clist` - 板块列表
- `/api/slist` - 行业列表
- `/api/stock` - 个股信息
- `/api/ulist` - 批量行情
- `/api/ulist.np` - 批量行情(.np)
- `/api/trends` - 分时走势
- `/api/trends2` - 分时走势2

### push2ex.eastmoney.com - 涨停池/涨跌分布
- `/api/ztpool` - 涨停池
- `/api/zbpool` - 炸板池
- `/api/dtpool` - 跌停池
- `/api/qspool` - 强势股池
- `/api/zdfb` - 涨跌分布
- `/api/zdcount` - 涨跌统计

### push2his.eastmoney.com - K线/历史数据/资金流
- `/api/kline` - K线数据
- `/api/fflow` - 资金流向

### datacenter-web.eastmoney.com - 数据中心/龙虎榜
- `/api/datacenter` - 数据中心API

## Usage

```bash
curl https://your-site.pages.dev/health

# 获取个股行情
curl "https://your-site.pages.dev/api/ulist?fltt=2&fields=f12,f14,f2,f3&secids=0.000001"

# 获取涨停池
curl "https://your-site.pages.dev/api/ztpool?ut=7eea3edcaed734bea9cbfc24409ed989&pn=1&pz=100"

# 获取K线
curl "https://your-site.pages.dev/api/kline?secid=0.000001&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=101&fqt=1&lmt=60"

# 获取资金流
curl "https://your-site.pages.dev/api/fflow?secid=0.000001&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63&lmt=10&klt=101"
```

## 更新日志

### 2026-05-12
- 新增 `/api/ulist.np` - 批量行情(.np格式)
- 新增 `/api/trends` - 分时走势
- 新增 `/api/trends2` - 分时走势2
- 新增 `/api/zbpool` - 炸板池
- 新增 `/api/dtpool` - 跌停池
- 新增 `/api/qspool` - 强势股池
- 新增 `/api/fflow` - 资金流向
