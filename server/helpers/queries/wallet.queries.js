import ObjectID from "../../utils/ObjectID.js";

export const findWallets = ({ search, currency, loggedInUser, pageNumber, limit }) => {
    const filter = [];

    if (!loggedInUser) {
        return filter;
    }

    // Filter by user
    filter.push({ $match: { user: ObjectID(loggedInUser.id) } });

    // Search by name
    if (search) {
        filter.push({
            $match: {
                name: { $regex: search, $options: "i" }
            },
        });
    }

    // Filter by currency
    if (currency) {
        filter.push({
            $match: {
                currency: currency
            },
        });
    }

    // Project fields and rename _id to id
    filter.push({
        $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            balance: 1,
            currency: 1,
            transactions: 1,
            createdAt: 1,
            updatedAt: 1,
            user: 1
        },
    });

    // Lookup user details
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

    // Lookup transaction details
    filter.push({
        $lookup: {
            from: "transactions",
            localField: "transactions",
            foreignField: "_id",
            as: "transactionDetails",
        },
    });

    // Project to clean up the response
    filter.push({
        $project: {
            userDetails: 0,
        },
    });

    // Sort wallets by createdAt (latest first)
    filter.push({
        $sort: { createdAt: -1 },
    });

    // Pagination
    if (limit) {
        filter.push({
            $skip: pageNumber * limit,
        });

        filter.push({
            $limit: limit,
        });
    }

    return filter;
};

export const findWalletById = ({ id, loggedInUser }) => {
    const filter = [];

    if (!loggedInUser) {
        return filter;
    }

    // Match by ID and user
    filter.push({
        $match: {
            _id: ObjectID(id),
            user: ObjectID(loggedInUser.id)
        }
    });

    // Project fields and rename _id to id
    filter.push({
        $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            balance: 1,
            currency: 1,
            transactions: 1,
            createdAt: 1,
            updatedAt: 1,
            user: 1
        },
    });

    // Lookup user details
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

    // Lookup transaction details
    filter.push({
        $lookup: {
            from: "transactions",
            localField: "transactions",
            foreignField: "_id",
            as: "transactionDetails",
        },
    });

    // Format transaction data
    filter.push({
        $addFields: {
            "transactionDetails": {
                $map: {
                    input: "$transactionDetails",
                    as: "transaction",
                    in: {
                        id: "$$transaction._id",
                        date: "$$transaction.date",
                        description: "$$transaction.description",
                        amount: "$$transaction.amount",
                        type: "$$transaction.type",
                        category: "$$transaction.category"
                    }
                }
            }
        }
    });

    // Project to clean up the response
    filter.push({
        $project: {
            userDetails: 0,
        },
    });

    return filter;
};

export const findWalletTransactions = ({ walletId, from, to, type, category, loggedInUser, pageNumber, limit }) => {
    const filter = [];

    if (!loggedInUser) {
        return filter;
    }

    // Find wallet first to ensure it belongs to the user
    filter.push({
        $match: {
            _id: ObjectID(walletId),
            user: ObjectID(loggedInUser.id)
        }
    });

    // Lookup all transactions
    filter.push({
        $lookup: {
            from: "transactions",
            localField: "transactions",
            foreignField: "_id",
            as: "transactionList"
        }
    });

    // Unwind to process each transaction
    filter.push({
        $unwind: "$transactionList"
    });

    // Date filter
    if (from) {
        filter.push({
            $match: {
                "transactionList.date": { $gte: from }
            }
        });
    }

    if (to) {
        filter.push({
            $match: {
                "transactionList.date": { $lte: to }
            }
        });
    }

    // Transaction type filter
    if (type) {
        filter.push({
            $match: {
                "transactionList.type": type
            }
        });
    }

    // Category filter
    if (category) {
        filter.push({
            $match: {
                "transactionList.category": category
            }
        });
    }

    // Format transaction data
    filter.push({
        $project: {
            _id: 0,
            walletId: "$_id",
            walletName: "$name",
            transaction: {
                id: "$transactionList._id",
                date: "$transactionList.date",
                description: "$transactionList.description",
                amount: "$transactionList.amount",
                type: "$transactionList.type",
                category: "$transactionList.category"
            }
        }
    });

    // Sort by transaction date
    filter.push({
        $sort: { "transaction.date": -1 }
    });

    // Pagination
    if (limit) {
        filter.push({
            $skip: pageNumber * limit
        });

        filter.push({
            $limit: limit
        });
    }

    return filter;
};

export const getWalletAnalytics = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return [];
    }

    const filter = [
        // Match wallets for the logged-in user
        {
            $match: {
                user: ObjectID(loggedInUser.id)
            }
        },
        // Get total balance across all wallets
        {
            $group: {
                _id: null,
                totalBalance: { $sum: "$balance" },
                totalWallets: { $sum: 1 },
                wallets: { $push: "$$ROOT" }
            }
        },
        // Look up transactions for all wallets
        {
            $lookup: {
                from: "transactions",
                localField: "wallets.transactions",
                foreignField: "_id",
                as: "allTransactions"
            }
        },
        // Calculate transaction statistics
        {
            $project: {
                totalBalance: 1,
                totalWallets: 1,
                currencies: {
                    $map: {
                        input: {
                            $setUnion: "$wallets.currency"
                        },
                        as: "currency",
                        in: {
                            currency: "$$currency",
                            count: {
                                $size: {
                                    $filter: {
                                        input: "$wallets",
                                        as: "wallet",
                                        cond: { $eq: ["$$wallet.currency", "$$currency"] }
                                    }
                                }
                            },
                            totalBalance: {
                                $sum: {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$wallets",
                                                as: "wallet",
                                                cond: { $eq: ["$$wallet.currency", "$$currency"] }
                                            }
                                        },
                                        as: "filteredWallet",
                                        in: "$$filteredWallet.balance"
                                    }
                                }
                            }
                        }
                    }
                },
                totalTransactions: { $size: "$allTransactions" },
                incomeTransactions: {
                    $size: {
                        $filter: {
                            input: "$allTransactions",
                            as: "transaction",
                            cond: { $eq: ["$$transaction.type", "income"] }
                        }
                    }
                },
                expenseTransactions: {
                    $size: {
                        $filter: {
                            input: "$allTransactions",
                            as: "transaction",
                            cond: { $eq: ["$$transaction.type", "expense"] }
                        }
                    }
                },
                transferTransactions: {
                    $size: {
                        $filter: {
                            input: "$allTransactions",
                            as: "transaction",
                            cond: { $eq: ["$$transaction.type", "transfer"] }
                        }
                    }
                },
                totalIncome: {
                    $sum: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$allTransactions",
                                    as: "transaction",
                                    cond: { $eq: ["$$transaction.type", "income"] }
                                }
                            },
                            as: "income",
                            in: "$$income.amount"
                        }
                    }
                },
                totalExpense: {
                    $sum: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$allTransactions",
                                    as: "transaction",
                                    cond: { $eq: ["$$transaction.type", "expense"] }
                                }
                            },
                            as: "expense",
                            in: "$$expense.amount"
                        }
                    }
                }
            }
        }
    ];

    return filter;
};

export const getRecentActivitySummary = ({ loggedInUser, limit = 5 }) => {
    if (!loggedInUser) {
        return [];
    }

    const filter = [
        // Match wallets for the logged-in user
        {
            $match: {
                user: ObjectID(loggedInUser.id)
            }
        },
        // Lookup the most recent transactions
        {
            $lookup: {
                from: "transactions",
                localField: "transactions",
                foreignField: "_id",
                as: "recentTransactions"
            }
        },
        // Unwind the transactions array
        {
            $unwind: {
                path: "$recentTransactions",
                preserveNullAndEmptyArrays: true
            }
        },
        // Project wallet and transaction data together
        {
            $project: {
                walletId: "$_id",
                walletName: "$name",
                walletCurrency: "$currency",
                transaction: {
                    id: "$recentTransactions._id",
                    date: "$recentTransactions.date",
                    description: "$recentTransactions.description",
                    amount: "$recentTransactions.amount",
                    type: "$recentTransactions.type",
                    category: "$recentTransactions.category"
                }
            }
        },
        // Sort by transaction date
        {
            $sort: {
                "transaction.date": -1
            }
        },
        // Limit to the most recent transactions
        {
            $limit: limit
        }
    ];

    return filter;
};

export const findWalletsByTotalBalance = ({ loggedInUser, sortOrder = -1 }) => {
    if (!loggedInUser) {
        return [];
    }

    const filter = [
        // Match wallets for the logged-in user
        {
            $match: {
                user: ObjectID(loggedInUser.id)
            }
        },
        // Project necessary fields
        {
            $project: {
                _id: 0,
                id: "$_id",
                name: 1,
                balance: 1,
                currency: 1,
                createdAt: 1
            }
        },
        // Sort by balance
        {
            $sort: {
                balance: sortOrder // 1 for ascending, -1 for descending
            }
        }
    ];

    return filter;
};