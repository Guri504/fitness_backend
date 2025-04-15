const MembershipPlansModel = require('../../models/apis/admin/MembershipPlans')

const index = async (req, res) => {
    let listing = await MembershipPlansModel.getListingForClient(req);
    res.send({
        status: true,
        message: "PLan Listing",
        data: listing
    })
}

module.exports  = { 
    index
}