const express = require('express');
const clientNutritionAdvisorRouter = express.Router();
const clientNutritionAdvisorController = require('../../controller/client/Nutrition_Advisor_Controller');

clientNutritionAdvisorRouter.post('/client/advisor-form/add', clientNutritionAdvisorController.add)

module.exports = clientNutritionAdvisorRouter