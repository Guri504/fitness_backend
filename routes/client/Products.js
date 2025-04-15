const express = require('express');
const clientProductRouter = express.Router();
const clientProductController = require('../../controller/client/Products_Controller');
const verifyToken = require('../../middleware/authmiddleware')

clientProductRouter.get('/client/products', verifyToken.verifyToken, clientProductController.index);
clientProductRouter.get('/client/product-variants/:id', verifyToken.verifyToken, clientProductController.detail);

module.exports = clientProductRouter;