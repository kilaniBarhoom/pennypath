import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/expense.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import catcher from '../middleware/catcher.middleware.js';
import fileUpload, { fileValidation } from '../utils/multer.js';

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});


router.route('/')
    .all(auth)
    .get(catcher(controller.getAllExpenses))
    .post(catcher(controller.createExpense))

router.post('/uploadExpenseImage', fileUpload(fileValidation.image).single('file'), catcher(controller.uploadExpenseImage))

router.post('/createPDF', catcher(controller.createExpensePDF))

router.route('/:expenseId')
    .all(auth)
    .get(catcher(controller.getSingleExpense))
    .delete(catcher(controller.deleteExpense))
    .put(catcher(controller.editExpense))



export default router