const express = require("express");
const ClientTrainingPlansRouter = express.Router();
const ClientTrainingPlansController = require("../../controller/client/TrainingPlansController");

ClientTrainingPlansRouter.get('/client/trainingPlans', ClientTrainingPlansController.index);

module.exports = ClientTrainingPlansRouter;