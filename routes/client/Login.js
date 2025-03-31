const express = require("express");
const clientloginRouter = express.Router();
const clientLoginController = require('../../controller/client/LoginController');

clientloginRouter.post('/client/login', clientLoginController.login);

module.exports = clientloginRouter;