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
