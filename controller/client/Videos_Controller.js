const VideosModel = require('../../models/apis/admin/Videos');

const index = async (req, res) => {
    let listing = await VideosModel.getListingForClient(req);
    res.send({
        status: true,
        message: "Videos Listing",
        data: listing
    })
}

module.exports = {
    index
}