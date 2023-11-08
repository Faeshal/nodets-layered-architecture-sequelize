import db from "../models";
import log4js from "log4js";
const log = log4js.getLogger("repository:user");
log.level = "info";

export const create = async (body: any) => {
    const data = await db.user.create(body);
    return data
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    const data = await db.user.findAndCountAll({
        where: filter,
        attributes: { exclude: ["deletedAt"] },
        limit,
        offset
    });
    return data;
};

export const findOne = async (filter: any) => {
    const data = await db.user.findOne({
        where: filter
    })
    return data
};
