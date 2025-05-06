const express = require('express');
const clientOrdersRouter = express.Router();
const clientOrdersController = require('../../controller/client/Orders_Controller');
const verifyToken = require('../../middleware/authmiddleware');

clientOrdersRouter.post('/client/order/add', verifyToken.verifyToken, clientOrdersController.addOrder);
clientOrdersRouter.get('/client/order-listing/:id', verifyToken.verifyToken, clientOrdersController.getOrders)

module.exports = clientOrdersRouter