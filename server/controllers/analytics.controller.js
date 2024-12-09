import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/analytics.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import Expense from '../models/expense.js';

export const getAnalytics = async (req, res, next) => {
    const { startDate, endDate } = ReqQueryHelper(req.query);
    const analytics = (await Expense.aggregate(queryHelper.getAnalyticsOfExpenses({ startDate, endDate, loggedInUser: req.user })));

    return res.status(statusCodes.OK).json({
        success: true,
        data: analytics,
    });
}