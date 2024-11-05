import express from "express";
import { NOT_FOUND, OK } from "./constants/status.constants.js";
const router = express.Router();

//Cookie pasrser

// Routes and Authorizations
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import expenseRoutes from "./routes/expense.route.js";
import sessionRoutes from "./routes/session.route.js";
import attendanceRoutes from "./routes/attendance.route.js";


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


//  Undefined Routes
router.route("*").all((req, res) => {
    return res.status(NOT_FOUND).json({
        success: false,
        message: "Oops, you have reached an undefined route, please check your request and try again",
    });
});

export default router;