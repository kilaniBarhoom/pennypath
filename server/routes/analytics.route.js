import express from "express";
import { OK } from '../constants/status.constants.js';
import { getAnalytics } from "../controllers/analytics.controller.js";
import { auth, hasRole } from "../middleware/auth.middleware.js";
import catcher from '../middleware/catcher.middleware.js';
import Roles from "../utils/authRoles.js";
const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});


router.route('/')
    .all(auth, hasRole(Roles.ADMIN, Roles.SUPERADMIN))
    .get(catcher(getAnalytics))

export default router;