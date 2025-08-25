import { getIP } from "./getip";
import { defaultOptions } from "../constants";
import { debug } from "./debug";
import type { Options } from "../types";

export const plugin = function ipPlugin(userOptions?: Partial<Options>) {
  return function ipMiddleware(request: Request, next: () => Promise<Response>): Promise<Response> {
    const options: Options = {
      ...defaultOptions,
      ...userOptions,
    };

    // 获取 IP 地址
    let clientIP: string = "";

    // 从头部获取 IP 地址
    clientIP = getIP(request.headers, options.checkHeaders) || "";

    // 将 IP 添加到请求对象中
    (request as any).ip = clientIP;

    // 继续执行下一个中间件或处理器
    return next();
  };
};
