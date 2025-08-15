import { Server, json } from "tirne";
import { ip } from "../src";

const ipMiddleware = ip();

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request: Request, context: any) => {
      return json({ hello: context.ip });
    },
    middleware: [ipMiddleware],
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};
