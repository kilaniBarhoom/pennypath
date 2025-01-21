import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/payment.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import catcher from '../middleware/catcher.middleware.js';

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});


router.route('/')
    .all(auth)
    .get(catcher(controller.getAllPayments))
    .post(catcher(controller.createPayment))

// router.get('/analytics', auth, hasRole(Roles.ADMIN, Roles.SUPERADMIN), catcher(controller.getAnalytics))

router.route('/:paymentId')
    .all(auth)
    .get(catcher(controller.getSinglePayment))
    .delete(catcher(controller.deletePayment))
    .put(catcher(controller.editPayment))




export default router