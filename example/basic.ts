import { Server, createRouteHandler } from "vafast";
import { ip } from "../src";

const ipMiddleware = ip();

const routes = [
  {
    method: "GET",
    path: "/",
    handler: createRouteHandler((request: Request) => {
      return { hello: (request as any).ip };
    }),
    middleware: [ipMiddleware],
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};
