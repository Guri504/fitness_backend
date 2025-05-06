const express = require('express');
const adminOrdersRouter = express.Router();
const adminOrdersController = require('../../controller/admin/Orders_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminOrdersRouter.get('/admin/orders-listing', adminVerifyToken, adminOrdersController.orderListing);
adminOrdersRouter.get('/admin/order/view/:id', adminVerifyToken, adminOrdersController.getOrder);
adminOrdersRouter.put('/admin/order-status/update/:id', adminVerifyToken, adminOrdersController.updateOrderStatus)

module.exports = adminOrdersRouter;