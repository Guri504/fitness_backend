const TrainingPlansModel = require('../../models/apis/admin/TrainingPlans')

const index = async (req, res) => {
    let listing = await TrainingPlansModel.getListingForClient(req);
    res.send({
        status: true,
        message: "PLan Listing",
        data: listing
    })
}

module.exports  = { 
    index
}