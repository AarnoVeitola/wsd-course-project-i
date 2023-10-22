import { sql } from "../database/database.js";

const create = async (list_id, name) => {
    await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${ list_id }, ${ name })`;
};

const findAllCollected = async (list_id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE collected = true AND shopping_list_id = ${ list_id } ORDER BY name`;
};

const findAllNonCollected = async (list_id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE collected = false AND shopping_list_id = ${ list_id } ORDER BY name`;
};

const collect = async (id, list_id) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id } AND shopping_list_id = ${ list_id }`;
};

export { create, findAllCollected, findAllNonCollected, collect };