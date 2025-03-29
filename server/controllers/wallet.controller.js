import * as statusCodes from '../constants/status.constants.js';
import * as queryHelper from "../helpers/queries/wallet.queries.js";
import ReqQueryHelper from "../helpers/reqQuery.helper.js";

import Transaction from '../models/transaction.js';
import Wallet from '../models/wallet.js';
import { TransactionSchema, WalletSchema } from '../schemas/index.js';
import ObjectID from '../utils/ObjectID.js';
import ResponseError from '../utils/respErr.js';

// Get all wallets with filters
export const getAllWallets = async (req, res, next) => {
    const { search, pageNumber, pageSize, currency } = ReqQueryHelper(req.query);

    // Get all wallets for counting
    const allWallets = await Wallet.aggregate(queryHelper.findWallets({
        search,
        currency,
        loggedInUser: req.user,
        pageNumber,
        limit: 0
    }));

    // Get paginated wallets
    const wallets = await Wallet.aggregate(queryHelper.findWallets({
        search,
        currency,
        loggedInUser: req.user,
        pageNumber,
        limit: pageSize
    }));

    const totalPages = Math.ceil(allWallets.length / pageSize);

    // Get wallet analytics
    const analytics = await Wallet.aggregate(queryHelper.getWalletAnalytics({
        loggedInUser: req.user
    }));

    const totalBalance = analytics.length > 0 ? analytics[0].totalBalance : 0;
    const currencySummary = analytics.length > 0 ? analytics[0].currencies : [];

    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            wallets,
            totalBalance,
            currencySummary,
            search,
            currency,
            pageNumber,
            pageSize,
            totalPages,
            count: wallets.length,
        },
    });
};

// Get a single wallet by ID
export const getWalletById = async (req, res, next) => {
    const wallet = await Wallet.aggregate(queryHelper.findWalletById({
        id: req.params.walletId,
        loggedInUser: req.user
    }));

    if (!wallet || wallet.length === 0) {
        return next(new ResponseError('Wallet not found', statusCodes.NOT_FOUND));
    }

    res.status(statusCodes.OK).json({
        success: true,
        data: wallet[0],
    });
};

// Create a new wallet
export const createWallet = async (req, res, next) => {
    const isValidationError = WalletSchema.safeParse(req.body);

    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message,
            statusCodes.BAD_REQUEST
        ));
    }

    const { name, balance, currency } = req.body;

    await Wallet.create({
        name,
        balance,
        currency,
        user: req.user.id,
        transactions: []
    });

    res.status(statusCodes.CREATED).json({
        success: true,
        message: 'Wallet created successfully',
    });
};

// Update a wallet
export const updateWallet = async (req, res, next) => {
    const isValidationError = WalletSchema.safeParse(req.body);

    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message,
            statusCodes.BAD_REQUEST
        ));
    }

    const { name, currency } = req.body;

    // Find wallet and verify ownership
    const wallet = await Wallet.findOne({
        _id: req.params.walletId,
        user: req.user.id
    });

    if (!wallet) {
        return next(new ResponseError('Wallet not found', statusCodes.NOT_FOUND));
    }

    // Update wallet fields
    wallet.name = name || wallet.name;
    wallet.currency = currency || wallet.currency;

    await wallet.save();

    res.status(statusCodes.OK).json({
        success: true,
        message: 'Wallet updated successfully',
    });
};

// Delete a wallet
export const deleteWallet = async (req, res, next) => {
    // Find wallet and verify ownership
    const wallet = await Wallet.findOne({
        _id: req.params.walletId,
        user: req.user.id
    });

    if (!wallet) {
        return next(new ResponseError('Wallet not found', statusCodes.NOT_FOUND));
    }

    // Delete associated transactions
    if (wallet.transactions && wallet.transactions.length > 0) {
        await Transaction.deleteMany({
            _id: { $in: wallet.transactions }
        });
    }

    // Delete the wallet
    await Wallet.findByIdAndDelete(req.params.walletId);

    res.status(statusCodes.OK).json({
        success: true,
        message: 'Wallet and its transactions deleted successfully',
    });
};

// Add a transaction to a wallet
export const addTransaction = async (req, res, next) => {
    // Validate transaction data
    const isValidationError = TransactionSchema.safeParse({
        ...req.body,
        date: new Date(req.body.date)
    });

    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message,
            statusCodes.BAD_REQUEST
        ));
    }

    // Find wallet and verify ownership
    const wallet = await Wallet.findOne({
        _id: req.params.walletId,
        user: req.user.id
    });

    if (!wallet) {
        return next(new ResponseError('Wallet not found', statusCodes.NOT_FOUND));
    }

    const { date, description, amount, type, category } = req.body;

    // Create the transaction
    const transaction = await Transaction.create({
        date: new Date(date).setUTCHours(0, 0, 0, 0),
        description,
        amount,
        type,
        category
    });

    // Update wallet balance based on transaction type
    if (type === 'income') {
        wallet.balance += amount;
    } else if (type === 'expense') {
        wallet.balance -= amount;
    }
    // For transfers, the balance is managed in the transferFunds endpoint

    // Add transaction to wallet
    wallet.transactions.push(transaction._id);
    await wallet.save();

    res.status(statusCodes.CREATED).json({
        success: true,
        message: 'Transaction added successfully',
        data: {
            transactionId: transaction._id,
            newBalance: wallet.balance
        }
    });
};

// Get wallet transactions
export const getWalletTransactions = async (req, res, next) => {
    const { from, to, type, category, pageNumber, pageSize } = ReqQueryHelper(req.query);

    // Verify wallet exists and belongs to user
    const wallet = await Wallet.findOne({
        _id: req.params.walletId,
        user: req.user.id
    });

    if (!wallet) {
        return next(new ResponseError('Wallet not found', statusCodes.NOT_FOUND));
    }

    // Get all transactions for counting
    const allTransactions = await Wallet.aggregate(queryHelper.findWalletTransactions({
        walletId: req.params.walletId,
        from,
        to,
        type,
        category,
        loggedInUser: req.user,
        pageNumber: 0,
        limit: 0
    }));

    // Get paginated transactions
    const transactions = await Wallet.aggregate(queryHelper.findWalletTransactions({
        walletId: req.params.walletId,
        from,
        to,
        type,
        category,
        loggedInUser: req.user,
        pageNumber,
        limit: pageSize
    }));

    const totalPages = Math.ceil(allTransactions.length / pageSize);

    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            transactions,
            walletId: req.params.walletId,
            walletName: wallet.name,
            walletBalance: wallet.balance,
            walletCurrency: wallet.currency,
            from: from ? from.toISOString().substring(0, 10) : "",
            to: to ? to.toISOString().substring(0, 10) : "",
            type,
            category,
            pageNumber,
            pageSize,
            totalPages,
            count: transactions.length,
        }
    });
};

// Delete a transaction
export const deleteTransaction = async (req, res, next) => {
    // Verify wallet exists and belongs to user
    const wallet = await Wallet.findOne({
        _id: req.params.walletId,
        user: req.user.id
    });

    if (!wallet) {
        return next(new ResponseError('Wallet not found', statusCodes.NOT_FOUND));
    }

    // Check if transaction exists in the wallet
    if (!wallet.transactions.includes(ObjectID(req.params.transactionId))) {
        return next(new ResponseError('Transaction not found in this wallet', statusCodes.NOT_FOUND));
    }

    // Get transaction details to adjust balance
    const transaction = await Transaction.findById(req.params.transactionId);

    if (!transaction) {
        return next(new ResponseError('Transaction not found', statusCodes.NOT_FOUND));
    }

    // Adjust wallet balance
    if (transaction.type === 'income') {
        wallet.balance -= transaction.amount;
    } else if (transaction.type === 'expense') {
        wallet.balance += transaction.amount;
    }

    // Remove transaction from wallet
    wallet.transactions = wallet.transactions.filter(
        id => id.toString() !== req.params.transactionId
    );

    await wallet.save();

    // Delete the transaction
    await Transaction.findByIdAndDelete(req.params.transactionId);

    res.status(statusCodes.OK).json({
        success: true,
        message: 'Transaction deleted successfully',
        data: {
            newBalance: wallet.balance
        }
    });
};

// Transfer funds between wallets
export const transferFunds = async (req, res, next) => {
    const { sourceWalletId, destinationWalletId, amount, description } = req.body;

    if (!sourceWalletId || !destinationWalletId || !amount || amount <= 0) {
        return next(new ResponseError('Please provide valid source wallet, destination wallet, and amount', statusCodes.BAD_REQUEST));
    }

    // Verify both wallets exist and belong to user
    const sourceWallet = await Wallet.findOne({
        _id: sourceWalletId,
        user: req.user.id
    });

    if (!sourceWallet) {
        return next(new ResponseError('Source wallet not found', statusCodes.NOT_FOUND));
    }

    if (sourceWallet.balance < amount) {
        return next(new ResponseError('Insufficient funds in source wallet', statusCodes.BAD_REQUEST));
    }

    const destinationWallet = await Wallet.findOne({
        _id: destinationWalletId,
        user: req.user.id
    });

    if (!destinationWallet) {
        return next(new ResponseError('Destination wallet not found', statusCodes.NOT_FOUND));
    }

    // Create outgoing transaction for source wallet
    const sourceTransaction = await Transaction.create({
        date: new Date().setUTCHours(0, 0, 0, 0),
        description: description || `Transfer to ${destinationWallet.name}`,
        amount,
        type: 'transfer',
        category: 'Transfer Out'
    });

    // Create incoming transaction for destination wallet
    const destinationTransaction = await Transaction.create({
        date: new Date().setUTCHours(0, 0, 0, 0),
        description: description || `Transfer from ${sourceWallet.name}`,
        amount,
        type: 'transfer',
        category: 'Transfer In'
    });

    // Update balances
    sourceWallet.balance -= amount;
    destinationWallet.balance += amount;

    // Add transactions to respective wallets
    sourceWallet.transactions.push(sourceTransaction._id);
    destinationWallet.transactions.push(destinationTransaction._id);

    await sourceWallet.save();
    await destinationWallet.save();

    res.status(statusCodes.OK).json({
        success: true,
        message: 'Funds transferred successfully',
        data: {
            sourceWallet: {
                id: sourceWallet._id,
                name: sourceWallet.name,
                newBalance: sourceWallet.balance
            },
            destinationWallet: {
                id: destinationWallet._id,
                name: destinationWallet.name,
                newBalance: destinationWallet.balance
            }
        }
    });
};

// Get wallet dashboard/analytics
export const getWalletDashboard = async (req, res, next) => {
    // Get wallet analytics
    const analytics = await Wallet.aggregate(queryHelper.getWalletAnalytics({
        loggedInUser: req.user
    }));

    // Get recent activity
    const recentActivity = await Wallet.aggregate(queryHelper.getRecentActivitySummary({
        loggedInUser: req.user,
        limit: 10
    }));

    // Get wallets by balance (highest to lowest)
    const walletsByBalance = await Wallet.aggregate(queryHelper.findWalletsByTotalBalance({
        loggedInUser: req.user,
        sortOrder: -1
    }));

    const analyticsData = analytics.length > 0 ? {
        totalBalance: analytics[0].totalBalance,
        totalWallets: analytics[0].totalWallets,
        totalTransactions: analytics[0].totalTransactions,
        incomeTransactions: analytics[0].incomeTransactions,
        expenseTransactions: analytics[0].expenseTransactions,
        transferTransactions: analytics[0].transferTransactions,
        totalIncome: analytics[0].totalIncome,
        totalExpense: analytics[0].totalExpense,
        currencies: analytics[0].currencies
    } : {};

    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            analytics: analyticsData,
            recentActivity,
            walletsByBalance
        }
    });
};