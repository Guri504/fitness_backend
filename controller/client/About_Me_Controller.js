const AboutMeModel = require("../../models/apis/admin/About_Me");

const index = async (req, res) => {
    let listing = await AboutMeModel.getListingForClient(req);
    res.send({
        status: true,
        message: "Winners Listing",
        data: listing
    })
}

module.exports ={ 
    index
}