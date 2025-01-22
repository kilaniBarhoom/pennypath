// create payments controllers
import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/payment.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import Payment from '../models/payment.js';
import { PaymentSchema } from '../schemas/index.js';
import ResponseError from '../utils/respErr.js';

export const getAllPayments = async (req, res, next) => {
    const { from: startDate, to: endDate, search, filterUser, pageNumber, pageSize } = ReqQueryHelper(req.query);



    const allPayments = await Payment.aggregate(queryHelper.findPayments({ startDate, endDate, search, filterUser, loggedInUser: req.user, pageNumber, limit: 0 }));

    const payments = await Payment.aggregate(queryHelper.findPayments({ startDate, endDate, search, filterUser, loggedInUser: req.user, pageNumber, limit: pageSize }));

    const totalPages = Math.ceil(allPayments.length / pageSize);


    const _id = payments.map(({ id }) => id);

    let allTimeTotal = (await Payment.aggregate(queryHelper.findValueSum({ loggedInUser: req.user })))[0];
    const allTimeTotalValue = allTimeTotal ? allTimeTotal.total : 0;

    let rangeTotal = (await Payment.aggregate(queryHelper.findValueSum({ _id, loggedInUser: req.user })))[0];
    const rangeTotalValue = rangeTotal ? rangeTotal.total : 0;

    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            payments,
            from: startDate,
            to: endDate,
            allTimeTotalValue,
            rangeTotalValue,
            search,
            pageNumber: pageNumber + 1,
            totalPages
        },
    });
}

export const createPayment = async (req, res, next) => {
    const { date: oldDate } = req.body;
    const isValidationError = PaymentSchema.safeParse({
        ...req.body,
        date: new Date(oldDate)
    });
    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }

    let { date, amount, note, type } = req.body;




    const payment = await Payment.create({
        date: new Date(date),
        amount,
        user: req.user,
        note,
        type,
        createdBy: req.user._id,
    });

    res.status(statusCodes.CREATED).json({
        status: 'success',
        message: 'Payment created successfully',
        data: payment,
    });
}

export const editPayment = async (req, res, next) => {
    const { paymentId } = req.params;
    const { date: oldDate, user } = req.body;
    const isValidationError = PaymentSchema.safeParse({
        ...req.body,
        date: new Date(oldDate)
    });
    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }



    const payment = await Payment.findByIdAndUpdate(paymentId, {
        ...req.body,
        date: new Date(req.body.date)
    }, { new: true, runValidators: true });

    res.status(statusCodes.OK).json({
        status: 'success',
        message: 'Payment updated successfully',
        data: payment,
    });
}

export const deletePayment = async (req, res, next) => {
    const { paymentId } = req.params;

    const payment = await Payment
        .findByIdAndDelete(paymentId);

    if (!payment) {
        return next(new ResponseError('Payment not found', statusCodes.NOT_FOUND));
    }

    res.status(statusCodes.OK).json({
        status: 'success',
        message: 'Payment deleted successfully',
    });
}

export const getSinglePayment = async (req, res, next) => {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
        return next(new ResponseError('Payment not found', statusCodes.NOT_FOUND));
    }

    res.status(statusCodes.OK).json({
        status: 'success',
        data: payment,
    });

}