import { Server, json } from "tirne";
import { ip } from "../src/index";

const ipMiddleware = ip();

const aInstance = {
  method: "GET",
  path: "/a",
  handler: () => {
    console.log("A");
    return json("a");
  },
  middleware: [ipMiddleware],
};

const bInstance = {
  method: "GET",
  path: "/b",
  handler: () => {
    console.log("B");
    return json("b");
  },
  middleware: [ipMiddleware],
};

const routes = [
  aInstance,
  bInstance,
  {
    method: "GET",
    path: "/",
    handler: () => {
      console.log("Hello");
      return json("hello");
    },
  },
];

const app = new Server(routes);

export default {
  fetch: (req: Request) => app.fetch(req),
};
