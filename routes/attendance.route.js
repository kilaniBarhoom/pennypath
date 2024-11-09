import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/attendance.controller.js';
import { auth, hasRole } from '../middleware/auth.middleware.js';
import catcher from '../middleware/catcher.middleware.js';
import Roles from "../utils/authRoles.js";

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});


router.route('/')
    .all(auth)
    .get(catcher(controller.getAllAttendances))
    .post(hasRole(Roles.ADMIN, Roles.SUPERADMIN), catcher(controller.createAttendance))

router.get('/analytics', auth, hasRole(Roles.ADMIN, Roles.SUPERADMIN), catcher(controller.getAnalytics))
router.route('/:attendanceId')
    .all(auth, hasRole(Roles.ADMIN, Roles.SUPERADMIN))
    .get(catcher(controller.getSingleAttendance))
    .delete(catcher(controller.deleteAttendance))
    .put(catcher(controller.editAttendance))




export default router