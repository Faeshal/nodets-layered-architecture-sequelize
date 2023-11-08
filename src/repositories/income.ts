import db from "../models";
import log4js from "log4js";
const log = log4js.getLogger("repository:income");
log.level = "info";

export const create = async (body: any) => {
  const data = await db.income.create(body)
  return data
};

export const findAll = async (limit: number, offset: number, filter: any) => {
  const data = await db.category.findAndCountAll({
    where: filter,
    attributes: { exclude: ["deletedAt"] },
    limit,
    offset,
    include: [
      {
        model: db.user,
        attributes: ["email"],
      },
      {
        model: db.category,
        attributes: ["tag"],
      },
    ],
  });
  return data;
};

export const findOne = async (filter: any) => {
  const data = await db.income.findOne({ where: filter });
  return data
};

export const update = async (id: number, body: any) => {
  const data = await db.income.update({ body }, {
    where: { id },
  });
  return data;
};

export const destroy = async (id: number) => {
  const data = await db.income.delete({ where: { id } });
  return data;
};