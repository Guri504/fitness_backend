const express = require('express');
const clientTransactionRouter = express.Router();
const clientTransactionController = require('../../controller/client/Transactions_Controller');
const verifyToken = require('../../middleware/authmiddleware');

clientTransactionRouter.post('/api/verify-payment', verifyToken.verifyToken, clientTransactionController.add);
clientTransactionRouter.get('/client/transaction-listing/:id', verifyToken.verifyToken, clientTransactionController.getTransaction);

module.exports = clientTransactionRouter