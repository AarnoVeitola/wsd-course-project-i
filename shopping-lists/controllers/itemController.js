import { renderFile  } from "../deps.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";

const addItem = async (request) => {
    const url = new URL(request.url);
    const formData = await request.formData();
    const name = formData.get("name");

    const list_id = url.pathname.split("/")[2];
    await itemService.create(list_id, name);

    return requestUtils.redirectTo(`/lists/${ list_id }`);
};

const viewItems = async (request) => {
    const url = new URL(request.url);
    const list_id = url.pathname.split("/")[2];
    const rows = await listService.listName(list_id);
    const list_name = rows[0].name;
    const data = {
        list_id: list_id,
        list_name: list_name,
        collected: await itemService.findAllCollected(list_id),
        noncollected: await itemService.findAllNonCollected(list_id),
    };

    return new Response(await renderFile("items.eta", data), requestUtils.responseDetails);
};

const collectItem = async (request) => {
    const url = new URL(request.url);
    const list_id = url.pathname.split("/")[2];
    const id = url.pathname.split("/")[4];

    await itemService.collect(id, list_id);

    return requestUtils.redirectTo(`/lists/${ list_id }`);
};

export { addItem, viewItems, collectItem };