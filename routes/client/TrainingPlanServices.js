const express = require("express");
const ClientTrainingPlanServicesRouter = express.Router();
const ClientTrainingPlanServicesController = require("../../controller/client/TrainingPlanServicesController");

ClientTrainingPlanServicesRouter.get('/client/trainingPlanServices', ClientTrainingPlanServicesController.index);

module.exports = ClientTrainingPlanServicesRouter