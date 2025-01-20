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
                date: { $gte: startOfYear }, // Filter for expenses from the start of the year
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
                date: -1,
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

export const getExpensesGroupedByDateAndWeekLimited = ({ analytics_interval, loggedInUser }) => {
    if (!loggedInUser) {
        return [];
    }

    const filter = [];

    filter.push({
        $match: {
            user: ObjectID(loggedInUser.id),
        },
    });

    if (analytics_interval === 'week') {
        // Adjust the starting day of the week to Saturday
        filter.push({
            $addFields: {
                adjustedDate: {
                    $dateFromParts: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: {
                            $subtract: [
                                { $dayOfWeek: "$date" }, // MongoDB dayOfWeek starts from Sunday (1)
                                1, // Adjust to start from Saturday
                            ],
                        },
                    },
                },
            },
        });

        filter.push({
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$adjustedDate",
                    },
                },
                amount: {
                    $sum: "$amount",
                },
            },
        });

        filter.push({
            $sort: {
                _id: -1,
            },
        });

        filter.push({
            $limit: 7,
        });

        filter.push({
            $project: {
                _id: 0,
                date: "$_id",
                amount: 1,
            },
        });
    } else if (analytics_interval === 'month') {
        filter.push({
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$date",
                    },
                },
                amount: {
                    $sum: "$amount",
                },
            },
        });

        filter.push({
            $sort: {
                _id: -1,
            },
        });

        filter.push({
            $limit: 7,
        });

        filter.push({
            $project: {
                _id: 0,
                date: "$_id",
                amount: 1,
            },
        });
    }

    return filter;
};
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

    filter.push({
        $group: {
            _id: "$category",
            amount: {
                $sum: "$amount"
            },
        }
    })

    filter.push({
        $lookup: {
            from: "categories", // Replace with your categories collection name
            localField: "_id",
            foreignField: "_id",
            as: "categoryDetails",
        },
    });

    filter.push({
        $unwind: {
            path: "$categoryDetails",
            preserveNullAndEmptyArrays: true, // Allow null if no category is matched
        },
    });

    filter.push({
        $addFields: {
            "category.id": "$categoryDetails._id",
            "category.name": "$categoryDetails.name",
        }
    });

    filter.push({
        $sort: {
            amount: -1,
        }
    })

    filter.push({
        $project: {
            _id: 0,
            category: 1,
            amount: 1,
        }
    });

    return filter;
}
