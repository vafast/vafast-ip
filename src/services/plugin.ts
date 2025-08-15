import { getIP } from "./getip";
import { defaultOptions } from "../constants";
import { debug } from "./debug";
import type { Options } from "../types";

export const plugin = function ipPlugin(userOptions?: Partial<Options>) {
  return function ipMiddleware(request: Request, context: any): Promise<Response> {
    const options: Options = {
      ...defaultOptions,
      ...userOptions,
    };

    // 获取 IP 地址
    let clientIP: string = "";

    // 从头部获取 IP 地址
    clientIP = getIP(request.headers, options.checkHeaders) || "";

    // 将 IP 添加到请求上下文中
    context.ip = clientIP;

    // 返回一个 resolved promise 表示继续执行
    return Promise.resolve(new Response());
  };
};
