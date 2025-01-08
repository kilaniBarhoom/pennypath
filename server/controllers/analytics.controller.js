import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/analytics.queries.js";
import { findValueSum as expensesSum } from "../helpers/queries/expense.queries.js";
import { findValueSum as paymentsSum } from "../helpers/queries/payment.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import Expense from '../models/expense.js';
import Payment from '../models/payment.js';



export const getAnalytics = async (req, res, next) => {
    const { startDate, endDate } = ReqQueryHelper(req.query);
    const totalSpentMonthly = (await Expense.aggregate(queryHelper.getAnalyticsOfExpenses({ startDate, endDate, loggedInUser: req.user })))[0];

    let allTimeTotalExpenses = (await Expense.aggregate(expensesSum()))[0];
    const allTimeTotalExpensesValue = allTimeTotalExpenses ? allTimeTotalExpenses.total : 0;

    const totalPayments = (await Payment.aggregate(paymentsSum()))[0];
    const totalPaymentsValue = totalPayments ? totalPayments.total : 0;


    const FIXED_DEDUCTION = +(process.env.FIXED_DEDUCTION ?? 0);

    const walletBalance = totalPaymentsValue - allTimeTotalExpensesValue - FIXED_DEDUCTION;
    const recentExpensesTransactions = (await Expense.aggregate(queryHelper.getRecentExpensesTransactions({ loggedInUser: req.user })))[0];

    const expensesGroupedByCategory = (await Expense.aggregate(queryHelper.getExpensesGroupedByCategory({ loggedInUser: req.user })));

    const groupedByDayExpenses = (await Expense.aggregate(queryHelper.getExpensesGroupedByDateAndWeekLimited({ loggedInUser: req.user })));
    const analytics = {
        totalSpentMonthly: totalSpentMonthly.totals,
        walletBalance,
        allTimeTotalExpensesValue,
        totalPaymentsValue,
        recentExpensesTransactions,
        groupedByDayExpenses,
        expensesGroupedByCategory
    };

    return res.status(statusCodes.OK).json({
        success: true,
        data: analytics,
    });
}