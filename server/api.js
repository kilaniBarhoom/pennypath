import express from "express";
import { NOT_FOUND, OK } from "./constants/status.constants.js";
const router = express.Router();

//Cookie pasrser

// Routes and Authorizations
import analyticsRoutes from "./routes/analytics.route.js";
import attendanceRoutes from "./routes/attendance.route.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import expenseRoutes from "./routes/expense.route.js";
import paymentRoutes from "./routes/payment.route.js";
import sessionRoutes from "./routes/session.route.js";
import settingsRoutes from "./routes/settings.route.js";
import userRoutes from "./routes/user.route.js";
import walletRoutes from "./routes/wallet.route.js";


//	Routes

//  Health Check route, used for monitoring
router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});


//  Auth Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/user", userRoutes);

// Posts routes
router.use("/expense", expenseRoutes)

//session Routes
router.use("/session", sessionRoutes);

//attendance Routes
router.use("/attendance", attendanceRoutes);

//payment Routes
router.use("/payment", paymentRoutes);

//settings Routes
router.use("/settings", settingsRoutes);
//analytics Routes
router.use("/analytics", analyticsRoutes);

//category Routes
router.use("/category", categoryRoutes);

//category Routes
router.use("/wallet", walletRoutes);


//  Undefined Routes
router.route("*").all((req, res) => {
    return res.status(NOT_FOUND).json({
        success: false,
        message: "Oops, you have reached an undefined route, please check your request and try again",
    });
});

export default router;