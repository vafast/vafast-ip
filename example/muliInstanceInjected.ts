import { Server, createRouteHandler } from "vafast";
import { ip } from "../src/index";

const ipMiddleware = ip();

const aInstance = {
  method: "GET",
  path: "/a",
  handler: createRouteHandler(() => {
    return "a";
  }),
  middleware: [ipMiddleware],
};

const bInstance = {
  method: "GET",
  path: "/b",
  handler: createRouteHandler(() => {
    return "b";
  }),
  middleware: [ipMiddleware],
};

const routes = [
  aInstance,
  bInstance,
  {
    method: "GET",
    path: "/",
    handler: createRouteHandler(() => {
      return "hello";
    }),
  },
];

const app = new Server(routes);

export default {
  fetch: (req: Request) => app.fetch(req),
};
