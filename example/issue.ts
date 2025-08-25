import { Server, createRouteHandler } from "vafast";
import { ip } from "../src/index";

const ipMiddleware = ip();

const aInstance = {
  method: "GET",
  path: "/a",
  handler: createRouteHandler(() => {
    console.log("A");
    return "a";
  }),
  middleware: [ipMiddleware],
};

const bInstance = {
  method: "GET",
  path: "/b",
  handler: createRouteHandler(() => {
    console.log("B");
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
      console.log("Hello");
      return "hello";
    }),
  },
];

const app = new Server(routes);

export default {
  fetch: (req: Request) => app.fetch(req),
};
