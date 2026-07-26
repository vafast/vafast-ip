import { defineMiddleware } from 'vafast'
import { getIP } from "./getip";
import { defaultOptions } from "../constants";
import type { Options } from "../types";

export const plugin = function ipPlugin(userOptions?: Partial<Options>) {
  const options: Options = {
    ...defaultOptions,
    ...userOptions,
  };

  return defineMiddleware<{ ip: string }>(async (request, next) => {
    // 仅从请求头解析；不要写 req.ip（Node/undici Request 的 ip 可能是只读 getter）
    const clientIP = getIP(request.headers, options.checkHeaders) || "";
    return next({ ip: clientIP });
  });
};
