import asyncHandler from "express-async-handler";
import * as categoryService from "../services/category"
import { validationResult } from "express-validator";
import { ErrorResponse } from "../middleware/errorHandler";
import { paginate } from "../utils/paginate";
import log4js from "log4js";
const log = log4js.getLogger("controllers:category");
log.level = "info";


// * @route GET /api/v1/categories
// @desc    get categories
// @access  public
export const getCategories = asyncHandler(async (req, res, next) => {
    const { name } = req.query
    let filter: any = {}
    if (name) {
        filter.name = name
    }

    const data = await categoryService.getCategories({
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
        totalData: data.count,
        totalPage: pagin?.totalPage,
        currentPage: pagin?.currentPage,
        nextPage: pagin?.nextPage,
        data: data.rows || [],
    });
});

// * @route POST /api/v1/categories
// @desc    add new categories
// @access  public
export const addCategory = asyncHandler(async (req, res, next) => {
    log.info("body:", req.body);

    // *Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
        );

    }
    await categoryService.addCategory(req.body);
    res.status(201).json({ success: true, message: "category create" });
});