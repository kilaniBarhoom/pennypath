import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/category.controller.js';
import { auth, hasRole } from '../middleware/auth.middleware.js';
import catcher from '../middleware/catcher.middleware.js';
import Roles from "../utils/authRoles.js";

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});


router.route('/')
    .all(auth)
    .get(catcher(controller.getAllCategories))
    .post(hasRole(Roles.ADMIN, Roles.SUPERADMIN), catcher(controller.createCategory))

// router.get('/analytics', auth, hasRole(Roles.ADMIN, Roles.SUPERADMIN), catcher(controller.getAnalytics))

router.route('/:categoryId')
    .all(auth, hasRole(Roles.ADMIN, Roles.SUPERADMIN))
    .delete(catcher(controller.deleteCategory))
    .put(catcher(controller.editCategory))




export default router