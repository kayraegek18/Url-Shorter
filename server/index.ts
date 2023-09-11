import { Application } from "https://deno.land/x/oak/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const client = new Client({
  user: "postgres",
  password: "admin1453",
  database: "urlshorter",
  hostname: "localhost",
  port: 5432,
});

const app = new Application();

import HomeRouter from "./routes/HomeRouter.ts";
import UserRouter from "./routes/UserRouter.ts";

app.use(oakCors());

app.use(HomeRouter.routes());
app.use(HomeRouter.allowedMethods());

app.use(UserRouter.routes());
app.use(UserRouter.allowedMethods());

await client.connect();
console.log("Connected to database");
app.addEventListener("listen", () => {
    console.log("Listening on localhost:8000");
});
await app.listen({ port: 8000 });

export {
    client,
    app
}