const blogsModel = require("../../models/apis/admin/Blogs")

const index = async (req, res) => {
    let listing = await blogsModel.getListingForClient(req);
    res.send({
        status: true,
        message: listing
    })
}

const detail = async (req, res) => {
    let { id } = req.params;
    console.log(id)
    let resp = await blogsModel.getById(id);
    if (resp) {
        res.send({
            status: true,
            message: "Blog find successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to find blog",
            data: []
        })
    }

}


module.exports = {
    index,
    detail
}