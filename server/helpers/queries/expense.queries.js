import ObjectID from "../../utils/ObjectID.js";

export const findExpenses = ({ from, to, search, amount, category, groupby, loggedInUser, pageNumber, limit }) => {
    const filter = [];

    if (!loggedInUser) {
        return filter;
    }
    filter.push({ $match: { user: ObjectID(loggedInUser.id) } });

    // --- Other initial match stages ---
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
    if (category) {
        filter.push({
            $match: {
                category: ObjectID(category),
            },
        });
    }

    // --- Grouping Stage ---
    if (groupby) {
        let groupStage = {
            $group: {
                _id: null, // Placeholder, will be replaced below
                totalAmount: { $sum: "$amount" },
                // Push the original documents into an array for each group
                expenses: { $push: "$$ROOT" },
            },
        };

        if (groupby === 'date') {
            // If grouping by date, format the date to group by calendar day
            groupStage.$group._id = {
                $dateToString: { format: "%Y-%m-%d", date: "$date" }
            };
        } else {
            // Otherwise, group by the specified field name (e.g., category)
            // Ensure the field exists before grouping (category ID is used here)
            groupStage.$group._id = `$${groupby}`; // e.g., '$category'
        }
        filter.push(groupStage);

        // --- IMPORTANT CAVEAT ---
        // When grouping, the subsequent stages need to be aware of the new structure.
        // Fields like 'amount', 'description', 'date', 'user', 'category' are now
        // *inside* the 'expenses' array for each group.
        // The $project, $lookup, $unwind, $addFields stages after this $group
        // might NOT work as intended because they expect fields at the top level.

        // Example: Rename _id (which is now the group identifier)
        filter.push({
            $project: {
                _id: 0, // Remove the default _id
                groupKey: "$_id", // Rename the group identifier (e.g., the date string or category ID)
                totalAmount: 1,
                expenses: 1 // Keep the array of expenses for this group
            }
        });

        // If you need user/category details *within* the grouped expenses,
        // you should perform the lookups *before* the $group stage.
        // The current lookups below will likely FAIL or produce unexpected results
        // when grouping is active because 'user' and 'category' fields are now
        // nested within the 'expenses' array.

        // Sort the *groups* (e.g., by date string or total amount)
        // Sorting individual expenses should happen *before* the $group stage if needed.
        filter.push({
            $sort: { groupKey: -1 } // Sort groups by date (descending) or other key
        });

    } else {
        // --- Stages ONLY if NOT Grouping ---

        // Initial projection (can be done earlier too)
        filter.push({
            $project: {
                // _id: 0, // Keep _id for lookups if needed, remove later
                // id: "$_id", // Create 'id' field later if needed
                amount: 1,
                description: 1,
                date: 1,
                name: 1,
                user: 1, // Keep user ID for lookup
                createdAt: 1,
                category: 1, // Keep category ID for lookup
            },
        });

        // Populate user details
        filter.push({
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails",
            },
        });
        filter.push({ $unwind: "$userDetails" }); // Assume user always exists

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
                preserveNullAndEmptyArrays: true, // Keep expenses even if category is missing
            },
        });

        // Add fields and clean up projection
        filter.push({
            $addFields: {
                id: "$_id", // Create id field from _id
                "user.id": "$userDetails._id",
                "user.fullNameEnglish": "$userDetails.fullNameEnglish",
                "user.fullNameArabic": "$userDetails.fullNameArabic",
                "user.email": "$userDetails.email",
                "user.role": "$userDetails.role",
                "category.id": "$categoryDetails._id",
                "category.name": "$categoryDetails.name",
            },
        });

        filter.push({
            $project: {
                userDetails: 0, // Remove temporary lookup data
                categoryDetails: 0,
                _id: 0, // Remove original _id if 'id' is preferred
                // Explicitly list fields to keep if needed, $addFields keeps existing ones
                // id: 1, amount: 1, description: 1, date: 1, name: 1, user: 1, category: 1, createdAt: 1
            },
        });

        // Sort individual expenses by date (latest first)
        filter.push({
            $sort: { date: -1 },
        });
    }

    // --- Pagination (applies to grouped results OR individual expenses) ---
    // Note: When grouping, this paginates the *groups*.
    //       When not grouping, this paginates individual *expenses*.
    if (limit && pageNumber !== undefined) { // Ensure limit and pageNumber are provided
        const skipAmount = Math.max(0, pageNumber * limit); // Ensure skip is not negative
        filter.push({
            $skip: skipAmount,
        });
        filter.push({
            $limit: limit,
        });
    } else if (limit) {
        // Handle case where only limit is provided (defaults to first page)
        filter.push({ $limit: limit });
    }


    return filter;
};

// #region findExpensesGroupedByDay
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

// #endregion

export const findSumOfExpenses = ({ _id, loggedInUser }) => {
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


