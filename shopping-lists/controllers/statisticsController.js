import { renderFile  } from "../deps.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";

const viewStatistics = async (request) => {
    const list_rows = await listService.listCount();
    const item_rows = await itemService.itemCount();
    const list_count = list_rows[0].count;
    const item_count = item_rows[0].count;
    const data = {
        list_count: list_count,
        item_count: item_count,
    };

    return new Response(await renderFile("main.eta", data), requestUtils.responseDetails);
};

export { viewStatistics };