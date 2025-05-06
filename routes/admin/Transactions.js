const express = require('express');
const adminTransactionsRouter = express.Router();
const adminTransactionsController = require('../../controller/admin/Transaction_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminTransactionsRouter.get('/admin/transactions', adminVerifyToken, adminTransactionsController.listing);
adminTransactionsRouter.get('/admin/transaction/view/:id', adminVerifyToken, adminTransactionsController.getTransaction);

module.exports = adminTransactionsRouter;