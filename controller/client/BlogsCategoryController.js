const BlogsCategoryModel = require('../../models/apis/admin/BlogsCategory');

const index = async (req, res) => {
    let listing = await BlogsCategoryModel.getListingForClient(req);
    res.send({
        status: true,
        message: listing
    });
}

module.exports = {
    index
}