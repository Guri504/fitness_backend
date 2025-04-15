const express = require("express");
const ClientMembershipPlansRouter = express.Router();
const ClientMembershipPlansController = require("../../controller/client/MembershipPlansController");

ClientMembershipPlansRouter.get('/client/membershipPlans', ClientMembershipPlansController.index);

module.exports = ClientMembershipPlansRouter;