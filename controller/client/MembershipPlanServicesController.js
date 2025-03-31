const MembershipPlanServicesModel = require('../../models/apis/admin/MembershipPlanServices')

const index = async (req, res) => {
    let listing = await MembershipPlanServicesModel.getListingForClient(req);
    res.send({
        status: true,
        message: "Service Listing",
        data: listing
    })
}

module.exports = { index }