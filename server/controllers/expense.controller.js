import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/expense.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import { buildPDF } from '../helpers/buildPDF.js';
import Expense from '../models/expense.js';
import { ExpenseSchema } from '../schemas/index.js';
import cloudinary from '../utils/cloudinary.js';
import ResponseError from '../utils/respErr.js';

// create a new expense, edit a expense, delete a expense, get all expenses, get a single expense, delete a expense after 1 day
export const getAllExpenses = async (req, res, next) => {
    const { from, to, search, amount, pageNumber } = ReqQueryHelper(req.query);

    const expenseDocuments = await Expense.countDocuments();

    const totalPages = Math.ceil(expenseDocuments / 10);

    const expenses = await Expense.aggregate(queryHelper.findExpenses({ from, to, search, amount, loggedInUser: req.user, pageNumber, limit: 7 }));

    const _id = expenses.map(({ _id }) => _id);

    let allTimeTotal = (await Expense.aggregate(queryHelper.findValueSum()))[0];
    const allTimeTotalValue = allTimeTotal ? allTimeTotal.total : 0;

    let totalSumCategorizedAmounts = (await Expense.aggregate(queryHelper.totalSumCategorizedQuery({ loggedInUser: req.user })))[0];


    const weekTotal = totalSumCategorizedAmounts ? totalSumCategorizedAmounts.weekTotal : 0;
    const monthTotal = totalSumCategorizedAmounts ? totalSumCategorizedAmounts.monthTotal : 0;
    const mostSpentInADay = totalSumCategorizedAmounts ? totalSumCategorizedAmounts.mostSpentInADay : 0;

    let rangeTotal = (await Expense.aggregate(queryHelper.findValueSum(_id)))[0];
    const rangeTotalValue = rangeTotal ? rangeTotal.total : 0;

    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            expenses,
            allTimeTotalValue,
            rangeTotalValue,
            weekTotal,
            monthTotal,
            mostSpentInADay,
            from,
            to,
            search,
            pageNumber,
            totalPages
        },
    });
}

export const createExpense = async (req, res, next) => {

    const { date: oldDate } = req.body;


    const isValidationError = ExpenseSchema.safeParse({ ...req.body, date: new Date(oldDate) });

    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }

    const { date, name, description, amount, categories } = ExpenseSchema.parse(req.body);

    const isValidUser = await User.findById(user);
    if (!isValidUser) {
        return next(new ResponseError('User not found', statusCodes.NOT_FOUND));
    }

    await Expense.create({
        name,
        description,
        amount,
        date,
        categories,
        user: req.user.id,
    });
    res.status(statusCodes.CREATED).json({
        status: 'success',
        message: 'Expense created successfully',
    });
}

export const editExpense = async (req, res, next) => {

    const { date: oldDate } = req.body;

    const isValidationError = ExpenseSchema.safeParse(
        { ...req.body, date: new Date(oldDate) }
    );
    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }

    const { name, description, amount, date, categories } = ExpenseSchema.parse(req.body);

    const user = req.user.id;

    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }


    const expense = await Expense.findByIdAndUpdate(req.params.expenseId, {
        name,
        description,
        amount,
        date,
        user,
        categories
    }, { new: true, runValidators: true, strict: false });

    if (!expense) {
        return next(new ResponseError('Expense not found', statusCodes.NOT_FOUND));
    }

    res.status(statusCodes.OK).json({
        status: 'success',
        message: 'Expense updated successfully',
    });
}

export const deleteExpense = async (req, res, next) => {
    await Expense.findByIdAndDelete(req.params.expenseId);
    res.status(statusCodes.OK).json({
        status: true,
        message: 'Expense deleted successfully',
    });
}

// export const uploadExpenseImage = async (req, res, next) => {
//     const { file } = req;
//     if (!file) {
//         return next(
//             new ResponseError(
//                 "Please upload a file",
//                 statusCodes.BAD_REQUEST
//             )
//         )
//     }

//     const { path } = file;
//     const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
//         folder: process.env.CLOUDINARY_POSTS_FOLDER
//     });
//     // return the res as a string not a json
//     res.status(statusCodes.OK).send(secure_url);
// }

export const getSingleExpense = async (req, res, next) => {
    const expense = await Expense.findById(req.params.expenseId).populate('user', 'fullNameEnglish fullNameArabic email role');
    if (!expense) {
        return next(new ResponseError('Expense not found', statusCodes.NOT_FOUND));
    }
    res.status(statusCodes.OK).json({
        status: 'success',
        data: expense,
    });
}

// export const createExpensePDF = (req, res, next) => {
//     const { expenses, from, to, rangeTotalValue, allTimeTotalValue } = req.body;
//     const pdfBuffer = buildPDF(expenses, from, to, rangeTotalValue, allTimeTotalValue);

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=expenses.pdf');
//     res.send(Buffer.concat(pdfBuffer));
// }