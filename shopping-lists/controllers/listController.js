import { renderFile  } from "../deps.js";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.create(name);

    return requestUtils.redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
        lists: await listService.findAllActive(),
    };

    return new Response(await renderFile("lists.eta", data), requestUtils.responseDetails);
};

export { addList, viewLists }