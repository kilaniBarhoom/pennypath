import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/analytics.queries.js";
import { findSumOfExpenses as expensesSum } from "../helpers/queries/expense.queries.js";
import { findValueSum as paymentsSum } from "../helpers/queries/payment.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import Expense from '../models/expense.js';
import Payment from '../models/payment.js';



export const getAnalytics = async (req, res, next) => {
    const { analytics_interval } = ReqQueryHelper(req.query);
    const totalSpentMonthly = (await Expense.aggregate(queryHelper.getAnalyticsOfExpenses({ loggedInUser: req.user })))[0];

    let allTimeTotalExpenses = (await Expense.aggregate(expensesSum({ _id: null, loggedInUser: req.user })))[0];


    const allTimeTotalExpensesValue = allTimeTotalExpenses ? allTimeTotalExpenses.total : 0;

    const totalPayments = (await Payment.aggregate(paymentsSum({ _id: null, loggedInUser: req.user })))[0];
    const totalPaymentsValue = totalPayments ? totalPayments.total : 0;


    const FIXED_DEDUCTION = +(process.env.FIXED_DEDUCTION ?? 0);

    // get the wallet balance and deduct a static amount if the user has any
    const walletBalance = (allTimeTotalExpensesValue > 0 | totalPaymentsValue > 0) ? (totalPaymentsValue - allTimeTotalExpensesValue - FIXED_DEDUCTION) : (0);

    // get the latest transactions
    const recentExpensesTransactions = (await Expense.aggregate(queryHelper.getRecentExpensesTransactions({ loggedInUser: req.user })));

    // get the categories grouped 
    const expensesGroupedByCategory = (await Expense.aggregate(queryHelper.getExpensesGroupedByCategory({ loggedInUser: req.user })));

    const groupedByDayExpenses = (await Expense.aggregate(queryHelper.getExpensesGroupedByDateAndWeekLimited({ analytics_interval: "week", loggedInUser: req.user })));
    const analytics = {
        totalSpentMonthly: totalSpentMonthly?.totals,
        walletBalance,
        allTimeTotalExpensesValue,
        totalPaymentsValue,
        recentExpensesTransactions,
        groupedByDayExpenses,
        expensesGroupedByCategory,
        analytics_interval
    };

    return res.status(statusCodes.OK).json({
        success: true,
        data: analytics,
    });
}