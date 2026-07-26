# @vafast/ip

Vafast 客户端 IP 中间件：从请求头解析 IP，并通过 `next({ ip })` 注入 handler 上下文（不写 `req.ip`）。

## Installation

```bash
npm install @vafast/ip
```

## Quick start

```typescript
import { Server, defineRoute, defineRoutes, json, serve } from 'vafast'
import { ip } from '@vafast/ip'

const routes = defineRoutes([
  defineRoute({
    method: 'GET',
    path: '/whoami',
    middleware: [ip()],
    handler: ({ ip: clientIp }) => json({ ip: clientIp }),
  }),
])

const server = new Server(routes)
serve({
  fetch: server.fetch,
  port: 3000,
  trustProxy: true,
})
```

优先使用 handler 参数中的 `ip`。

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `checkHeaders` | 常见代理 / CDN 头列表 | 按顺序检查的请求头 |
| `headersOnly` | `false` | **未使用**（类型兼容） |
| `injectServer` | `() => null` | **未使用**（类型兼容） |

也导出 `getIP(headers, checkHeaders?)` 供单独解析。

## Docs

See [IP middleware docs](https://vafast.huyooo.com/middleware/ip.html).
