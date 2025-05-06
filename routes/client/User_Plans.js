const express = require('express');
const clientUserPlanRouter = express.Router();
const clientUserPlansController = require('../../controller/client/User_Plans-Controller');

clientUserPlanRouter.post('/client/verify-plan-payment', clientUserPlansController.add);
clientUserPlanRouter.get('/client/plan-listing/:id', clientUserPlansController.getPlan);

module.exports = clientUserPlanRouter