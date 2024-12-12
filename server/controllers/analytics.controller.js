import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/analytics.queries.js";
import { findValueSum as expensesSum } from "../helpers/queries/expense.queries.js";
import { findValueSum as paymentsSum } from "../helpers/queries/payment.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import Expense from '../models/expense.js';
import Payment from '../models/payment.js';

const FIXED_DEDUCTION = 1035;

export const getAnalytics = async (req, res, next) => {
    const { startDate, endDate } = ReqQueryHelper(req.query);
    const totalSpentMonthly = (await Expense.aggregate(queryHelper.getAnalyticsOfExpenses({ startDate, endDate, loggedInUser: req.user })))[0];

    let allTimeTotalExpenses = (await Expense.aggregate(expensesSum()))[0];
    const allTimeTotalExpensesValue = allTimeTotalExpenses ? allTimeTotalExpenses.total : 0;

    const totalPayments = (await Payment.aggregate(paymentsSum()))[0];
    const totalPaymentsValue = totalPayments ? totalPayments.total : 0;


    const walletBalance = totalPaymentsValue - allTimeTotalExpensesValue - FIXED_DEDUCTION;
    const last3DaysExpenses = (await Expense.aggregate(queryHelper.getRencentExpensesTransactions({ loggedInUser: req.user })));

    for (let i = 0; i < last3DaysExpenses.length - 1; i++) {
        last3DaysExpenses[i]["diff"] = last3DaysExpenses[i + 1]["amount"] - last3DaysExpenses[i]["amount"];
    }

    const analytics = {
        totalSpentMonthly: totalSpentMonthly.totals,
        walletBalance,
        last3DaysExpenses,
    };

    return res.status(statusCodes.OK).json({
        success: true,
        data: analytics,
    });
}