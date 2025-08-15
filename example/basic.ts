import { Elysia } from "@huyooo/elysia";

import { ip } from "../src";

const app = new Elysia()
  .use(swagger())
  .use(ip())
  .get("/", ({ ip }) => ({ hello: ip }))
  .listen(3000, () => {
    console.log("🦊 Swagger is active at: http://localhost:3000/swagger");
  });
