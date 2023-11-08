import asyncHandler from "express-async-handler";
import * as incomeService from "../services/income"
import { ErrorResponse } from "../middleware/errorHandler";
import { validationResult } from "express-validator";
import { paginate } from "../utils/paginate";
import log4js from "log4js";
const log = log4js.getLogger("controllers:income");
log.level = "info";

// * @route GET /api/v1/incomes
// @desc    get incomes
// @access  public
export const getIncomes = asyncHandler(async (req, res, next) => {
  const { name } = req.query
  let filter: any = {}
  if (name) {
    filter.name = name
  }

  const data = await incomeService.getIncomes({
    limit: req.query.limit,
    offset: req.skip,
    filter
  });

  // * pagination
  const pagin = await paginate({
    length: data.count,
    limit: req.query.limit,
    page: req.query.page,
    req,
  });

  res.status(200).json({
    success: true,
    totalData: data.data.count,
    totalPage: pagin?.totalPage,
    currentPage: pagin?.currentPage,
    nextPage: pagin?.nextPage,
    data: data.rows || [],
  });
});

// * @route POST /api/v1/incomes
// @desc    add new incomes
// @access  public
export const addIncomes = asyncHandler(async (req, res, next) => {
  log.info("body:", req.body);
  const { name, value, userId, categories } = req.body

  // *Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }

  let fmtIncome = {
    name, value, userId, categories: {
      create: categories
    },
  }
  log.info("fmtIncome", fmtIncome)

  const data = await incomeService.addIncome(fmtIncome);

  res.status(201).json({ success: true, message: "created", data });
});

// * @route GET /api/v1/incomes/:id
// @desc    get income by id
// @access  public
export const getIncome = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // *Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }
  const data = await incomeService.getIncome(parseInt(id));
  res.status(200).json({ success: true, data: data || {} });
});

// * @route PUT /api/v1/incomes/:id
// @desc    update income by id
// @access  public
export const updateIncome = asyncHandler(async (req, res, next) => {
  log.info("body:", req.body);
  const { id } = req.params;

  // *Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }

  // * check valid id
  const isValid = await incomeService.getIncome(parseInt(id));
  if (!isValid) {
    return next(
      new ErrorResponse("invalid id", 400)
    );
  }

  // * call update service
  await incomeService.update(parseInt(id), req.body);

  res.status(200).json({ success: true, message: "update success" });
});

// * @route DELETE /api/v1/incomes/:id
// @desc    delete income by id
// @access  public
export const deleteIncome = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // * check valid id
  const isValid = await incomeService.getIncome(parseInt(id));
  if (!isValid) {
    return next(
      new ErrorResponse("invalid id", 400)
    );
  }

  // * call delete service
  await incomeService.destroy(parseInt(id));

  res.status(200).json({ success: true, message: "deleted" });
});
