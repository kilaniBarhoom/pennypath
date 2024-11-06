import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/user.controller.js';
import { auth, hasRole } from '../middleware/auth.middleware.js';
import catcher from '../middleware/catcher.middleware.js';
import Roles from "../utils/authRoles.js";

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

router.route('/')
    .all(auth)
    .get(catcher(controller.getOwnProfile))
    .delete(catcher(controller.deleteOwnProfile))

router.get('/all', auth, hasRole(Roles.ADMIN, Roles.SUPERADMIN), catcher(controller.getAllUsers))
router.put("/toggle-activate/:userId", auth, hasRole(Roles.SUPERADMIN), catcher(controller.toggleActivateUser))

router.put('/update-password', auth, catcher(controller.updatePassword))

export default router