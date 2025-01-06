import ObjectID from "../../utils/ObjectID.js";

export const findExpenses = ({ startDate, endDate, search, amount, loggedInUser, pageNumber, limit }) => {
    const filter = [];

    if (!loggedInUser) {
        return filter;
    }
    filter.push({ $match: { user: ObjectID(loggedInUser.id) } });

    if (startDate)
        filter.push({
            $match: {
                createdAt: { $gte: startDate },
            },
        });
    if (endDate)
        filter.push({
            $match: {
                createdAt: { $lte: endDate },
            },
        });
    if (search)
        filter.push({
            $match: {
                $or: [
                    { description: { $regex: search, $options: "i" } },
                    { name: { $regex: search, $options: "i" } },
                ],
            },
        });
    if (amount) {
        filter.push({
            $match: {
                amount: { $eq: amount },
            },
        });
    }
    filter.push({
        $sort: {
            createdAt: -1,
        },
    });
    filter.push({
        $project: {
            _id: 0,
            id: "$_id",
            createdAt: 1,
            amount: 1,
            description: 1,
            name: 1,
            user: 1,
            date: 1,
            categories: 1,
        },
    });

    filter.push({
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails'
        }
    });

    filter.push({
        $unwind: '$userDetails'
    });

    filter.push({
        $addFields: {
            'user.id': '$userDetails._id',
            'user.fullNameEnglish': '$userDetails.fullNameEnglish',
            'user.fullNameArabic': '$userDetails.fullNameArabic',
            'user.email': '$userDetails.email',
            'user.role': '$userDetails.role',
        }
    });

    filter.push({
        $project: {
            userDetails: 0
        }
    });
    filter.push({
        $skip: pageNumber * limit
    },
        { $limit: limit })

    return filter;
};

export const findValueSum = (_id) => {
    const filter = [
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ];

    if (_id)
        filter.unshift({
            $match: {
                _id: { $in: _id },
            },
        });

    return filter;
};

export const totalSumCategorizedQuery = ({ _id, loggedInUser }) => {

    if (!loggedInUser) {
        return [];
    }

    // Get start of current month and week
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);

    // set the date of the start of the week to the prev saturday
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() + 1) % 7);

    startOfWeek.setHours(0, 0, 0, 0);



    const filter = [
        // Match expenses for the logged-in user
        {
            $match: {
                user: ObjectID(loggedInUser.id)
            }
        },
        // Create aggregation stages for monthly and weekly totals
        {
            $facet: {
                monthlyExpenses: [
                    {
                        $match: {
                            createdAt: { $gte: startOfMonth }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$amount" },
                            count: { $sum: 1 }
                        }
                    }
                ],
                weeklyExpenses: [
                    {
                        $match: {
                            createdAt: { $gte: startOfWeek }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$amount" },
                            count: { $sum: 1 }
                        }
                    }
                ],
                mostSpentInADay: [
                    {
                        $group: {
                            _id: "$createdAt",
                            total: { $sum: "$amount" }
                        }
                    },
                    {
                        $sort: {
                            total: -1
                        }
                    },
                    {
                        $limit: 1
                    }
                ]
            }
        },
        // Unwind results to flatten the output
        {
            $project: {
                monthTotal: { $arrayElemAt: ["$monthlyExpenses.total", 0] },
                monthlyCount: { $arrayElemAt: ["$monthlyExpenses.count", 0] },
                weekTotal: { $arrayElemAt: ["$weeklyExpenses.total", 0] },
                weeklyCount: { $arrayElemAt: ["$weeklyExpenses.count", 0] },
                mostSpentInADay: { $arrayElemAt: ["$mostSpentInADay.total", 0] }
            }
        }
    ];

    if (_id)
        filter.unshift({
            $match: {
                _id: { $in: _id },
            },
        });


    return filter;
};


