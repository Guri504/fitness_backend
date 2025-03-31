const blogsModel = require("../../models/apis/admin/Blogs")

const index = async (req, res) => {
    let listing = await blogsModel.getListingForClient(req);
    res.send({
        status: true,
        message: listing
    })
}

module.exports = { 
    index
}