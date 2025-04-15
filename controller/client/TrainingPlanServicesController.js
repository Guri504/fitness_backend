const TrainingPlanServicesModel = require('../../models/apis/admin/TrainingPlanServices')

const index = async (req, res) => {
    let listing = await TrainingPlanServicesModel.getListingForClient(req);
    res.send({
        status: true,
        message: "Services Listing",
        data: listing
    })
}

module.exports = { 
    index
 }