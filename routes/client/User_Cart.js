const express = require('express');
const clientUserCartRouter = express.Router();
const clientUserCartController = require('../../controller/client/User_Cart_Controller');
const verifyToken = require('../../middleware/authmiddleware');

clientUserCartRouter.get('/client/user-cart/:id', verifyToken.verifyToken, clientUserCartController.index);
clientUserCartRouter.post('/client/user-cart/add/:id', verifyToken.verifyToken, clientUserCartController.add);
clientUserCartRouter.put('/client/user-cart/update/:id', verifyToken.verifyToken, clientUserCartController.update);
clientUserCartRouter.put('/client/user-cart/delete-variant/:id', verifyToken.verifyToken, clientUserCartController.removeVariant);
clientUserCartRouter.put('/client/user-cart/updateAddress/:id', verifyToken.verifyToken, clientUserCartController.addressUpdate);

module.exports = clientUserCartRouter