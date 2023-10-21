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

export { create, findAllActive, deactivate };