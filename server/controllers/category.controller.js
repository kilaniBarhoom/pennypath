import * as statusCodes from '../constants/status.constants.js';

import Category from '../models/category.js';
import { CategorySchema } from '../schemas/index.js';
import ResponseError from '../utils/respErr.js';


export const getAllCategories = async (req, res, next) => {
    const categories = await Category.find();

    return res.status(statusCodes.OK).json({
        success: true,
        data: categories
    });
}

export const createCategory = async (req, res, next) => {
    const isValidationError = CategorySchema.safeParse(req.body);

    if (!isValidationError.success) {
        return next(new ResponseError(
            statusCodes.BAD_REQUEST,
            isValidationError.error.errors
        ));
    }

    await Category.create(req.body);

    return res.status(statusCodes.CREATED).json({
        success: true,
        message: "Category created successfully",
    });
}

export const editCategory = async (req, res, next) => {
    const isValidationError = CategorySchema.safeParse(req.body);

    if (!isValidationError.success) {
        return next(new ResponseError(
            statusCodes.BAD_REQUEST,
            isValidationError.error.errors
        ));
    }

    await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true });

    if (!category) {
        return next(new ResponseError(
            statusCodes.NOT_FOUND,
            "Category not found"
        ));
    }

    return res.status(statusCodes.OK).json({
        success: true,
        message: "Category updated successfully",
    });
}

export const deleteCategory = async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.categoryId);

    if (!category) {
        return next(new ResponseError(
            statusCodes.NOT_FOUND,
            "Category not found"
        ));
    }

    return res.status(statusCodes.OK).json({
        success: true,
        data: {}
    });
}


