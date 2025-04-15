const express = require("express");
const ClientStrategyPlansRouter = express.Router();
const ClientStrategyPlansController = require("../../controller/client/Strategy_Plans_Controller");

ClientStrategyPlansRouter.get('/client/strategy_plans', ClientStrategyPlansController.index);

module.exports = ClientStrategyPlansRouter