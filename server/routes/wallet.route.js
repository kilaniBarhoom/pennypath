import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/wallet.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import catcher from '../middleware/catcher.middleware.js';

const router = express.Router();

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

// Wallet routes
router.route('/')
    .all(auth)
    .get(catcher(controller.getAllWallets))
    .post(catcher(controller.createWallet));

router.route('/:walletId')
    .all(auth)
    .get(catcher(controller.getWalletById))
    .put(catcher(controller.updateWallet))
    .delete(catcher(controller.deleteWallet));

// Transaction routes
router.route('/:walletId/transactions')
    .all(auth)
    .get(catcher(controller.getWalletTransactions))
    .post(catcher(controller.addTransaction));

router.route('/:walletId/transactions/:transactionId')
    .all(auth)
    .delete(catcher(controller.deleteTransaction));

// Transfer route
router.post('/transfer', auth, catcher(controller.transferFunds));

// Dashboard/Analytics route
router.get('/dashboard', auth, catcher(controller.getWalletDashboard));

export default router;