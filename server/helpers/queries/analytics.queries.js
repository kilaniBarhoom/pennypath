import ObjectID from "../../utils/ObjectID.js";
export const getAnalyticsOfExpenses = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return [];
    }

    const now = new Date();

    // Get start of the current year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    const filter = [
        // Match expenses for the logged-in user
        {
            $match: {
                user: ObjectID(loggedInUser.id),
                createdAt: { $gte: startOfYear }, // Filter for expenses from the start of the year
            },
        },
        // Group by month to calculate monthly totals
        {
            $group: {
                _id: { month: { $month: "$createdAt" } }, // Group by the month of `createdAt`
                total: { $sum: "$amount" },
            },
        },
        // Sort by month in ascending order
        {
            $sort: {
                "_id.month": 1,
            },
        },
        // Ensure all months are included using $bucket
        {
            $bucket: {
                groupBy: "$_id.month",
                boundaries: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                default: null,
                output: {
                    total: { $sum: "$total" },
                },
            },
        },
        // Map month numbers to names
        {
            $addFields: {
                monthName: {
                    $arrayElemAt: [
                        [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ],
                        { $subtract: ["$_id", 1] },
                    ],
                },
                total: { $ifNull: ["$total", 0] }, // Ensure a default total of 0
            },
        },
        // Final projection to format the output
        {
            $group: {
                _id: null,
                monthlyTotals: {
                    $push: {
                        k: "$monthName",
                        v: "$total",
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totals: {
                    $arrayToObject: "$monthlyTotals",
                },
            },
        },
    ];

    return filter;
};

export const getRecentExpensesTransactions = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return [];
    }

    const filter = [
        // Match expenses for the logged-in user
        {
            $match: {
                user: ObjectID(loggedInUser.id),
            },
        },
        // Sort by date in descending order
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $lookup: {
                from: "categories", // Replace with your categories collection name
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails",
            },
        },

        {
            $unwind: {
                path: "$categoryDetails",
                preserveNullAndEmptyArrays: true, // Allow null if no category is matched
            },
        },
        {
            $addFields: {
                "category.id": "$categoryDetails._id",
                "category.name": "$categoryDetails.name",
            }
        },

        {
            $project: {
                categoryDetails: 0, // Remove the temporary joined category data
            }
        },

        {
            $limit: 5,
        },
        // get only the categories of the latest transaction
        {
            $project: {
                _id: 0,
                name: "$name",
                amount: "$amount",
                category: "$category",
            },
        }
    ];
    return filter;
}

export const getExpensesGroupedByDateAndWeekLimited = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return [];
    }

    const filter = [];

    filter.push({
        $match: {
            user: ObjectID(loggedInUser.id),
        },
    })

    filter.push({
        $group: {
            _id: {
                $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                }
            },
            amount: {
                $sum: "$amount"
            },
        }
    })

    filter.push({
        $sort: {
            _id: -1,
        }
    })

    filter.push({
        $limit: 7,
    })

    filter.push({
        $project: {
            _id: 0,
            date: "$_id",
            amount: 1,
            name: 1,
        }
    })
    return filter;
}

export const getExpensesGroupedByCategory = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return [];
    }

    const filter = [];

    filter.push({
        $match: {
            user: ObjectID(loggedInUser.id),
        },
    })

    //    no category table, the expense have categories as array of objects, name and amount, so we need to group by name and sum the amount, so take all the categories and group by name and sum the amount, then sort by amount descending, limit to 5, and project only the name and amount
    filter.push({
        $unwind: "$categories",
    })
    filter.push({
        $group: {
            _id: "$categories.name",
            amount: {
                $sum: "$categories.amount"
            },
        }
    })
    filter.push({
        $sort: {
            amount: -1,
        }
    })
    filter.push({
        $project: {
            _id: 0,
            name: "$_id",
            amount: 1,
        }
    })
    filter.push({
        $group: {
            _id: null,
            categories: {
                $push: {
                    k: "$name",
                    v: "$amount",
                },
            },
        },
    })

    filter.push({
        $project: {
            _id: 0,
            categories: {
                $arrayToObject: "$categories",
            },
        },
    })

    filter.push({
        $project: {
            categories: 1,
        }
    })

    return filter;
}
