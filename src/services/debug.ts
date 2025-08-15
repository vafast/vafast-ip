import { debuglog } from "node:util";

export const debug = (message: string) => {
  debuglog("@huyooo/elysia-ip")(message);
};
