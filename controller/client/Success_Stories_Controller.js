const SuccessStoriesModel = require("../../models/apis/admin/Success_Stories");

const index = async (req, res) => {
    let listing = await SuccessStoriesModel.getListingForClient(req);
    res.send({
        status: true,
        message: "PLan Listing",
        data: listing
    })
}

module.exports ={ 
    index
}