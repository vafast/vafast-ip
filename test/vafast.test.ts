import { Server, createHandler, json } from "vafast";
import { ip } from "../src/index";
import { describe, expect, it } from "vitest";

describe("Vafast IP Plugin", () => {
  it("should extract IP from X-Real-IP header", async () => {
    const ipMiddleware = ip();

    const app = new Server([
      {
        method: "GET",
        path: "/",
        handler: createHandler(({ req }: { req: Request }) => {
          return json({ ip: (req as any).ip });
        }),
        middleware: [ipMiddleware],
      },
    ]);

    const req = new Request("http://localhost/", {
      headers: {
        "X-Real-IP": "192.168.1.100",
      },
    });

    const res = await app.fetch(req);
    const data = await res.json();

    expect(data.ip).toBe("192.168.1.100");
  });

  it("should extract IP from X-Forwarded-For header", async () => {
    const ipMiddleware = ip();

    const app = new Server([
      {
        method: "GET",
        path: "/",
        handler: createHandler(({ req }: { req: Request }) => {
          return json({ ip: (req as any).ip });
        }),
        middleware: [ipMiddleware],
      },
    ]);

    const req = new Request("http://localhost/", {
      headers: {
        "X-Forwarded-For": "203.0.113.1, 192.168.1.100",
      },
    });

    const res = await app.fetch(req);
    const data = await res.json();

    // X-Forwarded-For 应该返回第一个 IP（最原始的客户端 IP）
    expect(data.ip).toBe("203.0.113.1");
  });

  it("should extract IP from Cloudflare header", async () => {
    const ipMiddleware = ip();

    const app = new Server([
      {
        method: "GET",
        path: "/",
        handler: createHandler(({ req }: { req: Request }) => {
          return json({ ip: (req as any).ip });
        }),
        middleware: [ipMiddleware],
      },
    ]);

    const req = new Request("http://localhost/", {
      headers: {
        "CF-Connecting-IP": "104.16.123.456",
      },
    });

    const res = await app.fetch(req);
    const data = await res.json();

    expect(data.ip).toBe("104.16.123.456");
  });

  it("should handle custom headers configuration", async () => {
    const ipMiddleware = ip({
      checkHeaders: ["X-Custom-IP", "X-Real-IP"],
    });

    const app = new Server([
      {
        method: "GET",
        path: "/",
        handler: createHandler(({ req }: { req: Request }) => {
          return json({ ip: (req as any).ip });
        }),
        middleware: [ipMiddleware],
      },
    ]);

    const req = new Request("http://localhost/", {
      headers: {
        "X-Custom-IP": "10.0.0.1",
        "X-Real-IP": "192.168.1.100",
      },
    });

    const res = await app.fetch(req);
    const data = await res.json();

    // 应该优先使用 X-Custom-IP，因为它在数组中的位置更靠前
    expect(data.ip).toBe("10.0.0.1");
  });

  it("should return empty string when no IP headers found", async () => {
    const ipMiddleware = ip();

    const app = new Server([
      {
        method: "GET",
        path: "/",
        handler: createHandler(({ req }: { req: Request }) => {
          return json({ ip: (req as any).ip });
        }),
        middleware: [ipMiddleware],
      },
    ]);

    const req = new Request("http://localhost/");
    const res = await app.fetch(req);
    const data = await res.json();

    expect(data.ip).toBe("");
  });

  it("should work with multiple routes and middleware", async () => {
    const ipMiddleware = ip();

    const app = new Server([
      {
        method: "GET",
        path: "/a",
        handler: createHandler(({ req }: { req: Request }) => {
          return json({ route: "a", ip: (req as any).ip });
        }),
        middleware: [ipMiddleware],
      },
      {
        method: "GET",
        path: "/b",
        handler: createHandler(({ req }: { req: Request }) => {
          return json({ route: "b", ip: (req as any).ip });
        }),
        middleware: [ipMiddleware],
      },
    ]);

    const req = new Request("http://localhost/a", {
      headers: {
        "X-Real-IP": "192.168.1.100",
      },
    });

    const res = await app.fetch(req);
    const data = await res.json();

    expect(data.route).toBe("a");
    expect(data.ip).toBe("192.168.1.100");
  });
});
