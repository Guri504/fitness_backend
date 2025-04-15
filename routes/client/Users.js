const express = require('express');
const clientUsersRouter = express.Router();
const clientUsersController = require("../../controller/client/UsersController");
const VerifyToken = require('../../middleware/authmiddleware')

clientUsersRouter.post('/client/user/add',clientUsersController.add);
clientUsersRouter.get('/client/user/view', VerifyToken.verifyToken, clientUsersController.detail);
clientUsersRouter.put('/client/user/edit', VerifyToken.verifyToken, clientUsersController.update);
clientUsersRouter.put('/client/user/editPassword', VerifyToken.verifyToken, clientUsersController.updatePassword);
clientUsersRouter.post('/client/user/forgotPassword', clientUsersController.forgotPassword);
clientUsersRouter.post('/client/user/otp/:tempToken', clientUsersController.otpVerification);
clientUsersRouter.put('/client/user/resetPassword/:tempToken', clientUsersController.resetPassword);

module.exports = clientUsersRouter;