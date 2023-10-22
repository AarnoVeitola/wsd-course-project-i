import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  console.log("Using a local database.");
  sql = postgres({});
}

export { sql };