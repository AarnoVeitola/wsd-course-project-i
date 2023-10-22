import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllActive = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const deactivate = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
};

const listName = async (id) => {
    return await sql`SELECT name FROM shopping_lists WHERE id = ${ id }`;
};

const listCount = async () => {
    return await sql`SELECT COUNT(id) AS count FROM shopping_lists`;
};

export { create, findAllActive, deactivate, listName, listCount };