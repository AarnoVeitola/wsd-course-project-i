import { serve } from "./deps.js";
import { configure } from "./deps.js";
import { renderFile } from "./deps.js";
import * as listController from "./controllers/listController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    const data = {};
    return new Response(await renderFile("main.eta", data), requestUtils.responseDetails);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  // } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
  //   // VIEWING INDIVIDUAL LISTS
  // } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
  //   // MARK ITEM AS COLLECTED
  // } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
  //   // ADD AN ITEM
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });