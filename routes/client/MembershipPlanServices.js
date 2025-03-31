const express = require("express");
const ClientMembershipPlanServicesRouter = express.Router();
const ClientMembershipPlanServicesController = require("../../controller/client/MembershipPlanServicesController");

ClientMembershipPlanServicesRouter.get('/client/membershipPlanServices', ClientMembershipPlanServicesController.index);

module.exports = ClientMembershipPlanServicesRouter