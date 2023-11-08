import db from "../models";
import log4js from "log4js";
const log = log4js.getLogger("repository:category");
log.level = "info";

export const create = async (body: any) => {
    const data = await db.category.create(body)
    return data;
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    const data = await db.category.findAndCountAll({
        where: filter,
        attributes: { exclude: ["deletedAt"] },
        limit,
        offset
    });
    return data;
};
