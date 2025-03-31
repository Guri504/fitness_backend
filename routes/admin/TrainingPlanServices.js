const express = require("express");
const AdminTrainingPlanServicesRouter = express.Router();
const AdminTrainingPlanServicesController = require("../../controller/admin/TrainingPlanServicesController");

AdminTrainingPlanServicesRouter.get('/admin/trainingPlanServices', AdminTrainingPlanServicesController.index);
AdminTrainingPlanServicesRouter.post('/admin/trainingPlanService/add', AdminTrainingPlanServicesController.add);
AdminTrainingPlanServicesRouter.put('/admin/trainingPlanService/edit/:id', AdminTrainingPlanServicesController.update);
AdminTrainingPlanServicesRouter.get('/admin/trainingPlanService/view/:id', AdminTrainingPlanServicesController.detail);
AdminTrainingPlanServicesRouter.delete('/admin/trainingPlanService/delete/:id', AdminTrainingPlanServicesController.deleteRow);

module.exports = AdminTrainingPlanServicesRouter;