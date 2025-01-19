import ObjectID from "../../utils/ObjectID.js";

export const findExpenses = ({ from, to, search, amount, loggedInUser, pageNumber, limit }) => {
    const filter = [];


    if (!loggedInUser) {
        return filter;
    }
    filter.push({ $match: { user: ObjectID(loggedInUser.id) } });

    if (from)
        filter.push({
            $match: {
                date: { $gte: from },
            },
        });
    if (to)
        filter.push({
            $match: {
                date: { $lte: to },
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
        $project: {
            _id: 0,
            id: "$_id",
            amount: 1,
            description: 1,
            date: 1,
            name: 1,
            user: 1,
            createdAt: 1,
            category: 1,
        },
    });


    filter.push({
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
        },
    });

    filter.push({
        $unwind: "$userDetails",
    });

    filter.push({
        $addFields: {
            "user.id": "$userDetails._id",
            "user.fullNameEnglish": "$userDetails.fullNameEnglish",
            "user.fullNameArabic": "$userDetails.fullNameArabic",
            "user.email": "$userDetails.email",
            "user.role": "$userDetails.role",
        },
    });

    // Populate category details
    filter.push({
        $lookup: {
            from: "categories", // Replace with your categories collection name
            localField: "category",
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
        },
    });

    filter.push({
        $project: {
            userDetails: 0, // Remove the temporary joined user data
            categoryDetails: 0, // Remove the temporary joined category data
        },
    });



    // Sort all expenses by createdAt (latest first)
    filter.push({
        $sort: { date: -1 },
    });


    filter.push({
        $skip: pageNumber * limit,
    });

    filter.push({
        $limit: limit,
    });

    return filter;
};

// export const findExpensesGroupedByDay = ({ from, to, search, amount, loggedInUser, pageNumber, limit }) => {
// const filter = [];

// if (!loggedInUser) {
//     return filter;
// }
// filter.push({ $match: { user: ObjectID(loggedInUser.id) } });

// if (from)
//     filter.push({
//         $match: {
//             _id: { $gte: from },
//         },
//     });
// if (to)
//     filter.push({
//         $match: {
//             _id: { $lte: to },
//         },
//     });
// if (search)
//     filter.push({
//         $match: {
//             $or: [
//                 { description: { $regex: search, $options: "i" } },
//                 { name: { $regex: search, $options: "i" } },
//             ],
//         },
//     });
// if (amount) {
//     filter.push({
//         $match: {
//             amount: { $eq: amount },
//         },
//     });
// }

// filter.push({
//     $project: {
//         _id: 0,
//         id: "$_id",
//         amount: 1,
//         description: 1,
//         date: 1,
//         name: 1,
//         user: 1,
//         createdAt: 1,
//         category: 1,
//     },
// });


// filter.push({
//     $lookup: {
//         from: "users",
//         localField: "user",
//         foreignField: "_id",
//         as: "userDetails",
//     },
// });

// filter.push({
//     $unwind: "$userDetails",
// });

// filter.push({
//     $addFields: {
//         "user.id": "$userDetails._id",
//         "user.fullNameEnglish": "$userDetails.fullNameEnglish",
//         "user.fullNameArabic": "$userDetails.fullNameArabic",
//         "user.email": "$userDetails.email",
//         "user.role": "$userDetails.role",
//     },
// });

// // Populate category details
// filter.push({
//     $lookup: {
//         from: "categories", // Replace with your categories collection name
//         localField: "category",
//         foreignField: "_id",
//         as: "categoryDetails",
//     },
// });

// filter.push({
//     $unwind: {
//         path: "$categoryDetails",
//         preserveNullAndEmptyArrays: true, // Allow null if no category is matched
//     },
// });

// filter.push({
//     $addFields: {
//         "category.id": "$categoryDetails._id",
//         "category.name": "$categoryDetails.name",
//     },
// });

// filter.push({
//     $project: {
//         userDetails: 0, // Remove the temporary joined user data
//         categoryDetails: 0, // Remove the temporary joined category data
//     },
// });

// // Add formattedDate
// filter.push({
//     $addFields: {
//         formattedDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//     },
// });

// // Sort all expenses by createdAt (latest first)
// filter.push({
//     $sort: { date: -1 },
// });

// // Group by the same day
// filter.push({
//     $group: {
//         _id: "$formattedDate",
//         totalAmount: { $sum: "$amount" },
//         expenses: { $push: "$$ROOT" },
//     },
// });

// // Sort grouped dates
// filter.push({
//     $sort: { _id: -1 }, // Sort dates in ascending order (earliest first); change to -1 for descending
// });

// filter.push({
//     $skip: pageNumber * limit,
// });

// filter.push({
//     $limit: limit,
// });

// return filter;
// };


export const findSumOfExpenses = ({ _id = null, loggedInUser }) => {
    const filter = [
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ];


    if (!loggedInUser) {
        return [];
    }
    filter.unshift({ $match: { user: ObjectID(loggedInUser.id) } });

    if (_id)
        filter.unshift({
            $match: {
                _id: { $in: _id },
            },
        });

    return filter;
};


// Get the total sum of expenses grouped by week / month / most spend in a day / all time 
export const findAnalyticsOfExpenses = ({ _id, loggedInUser }) => {

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


