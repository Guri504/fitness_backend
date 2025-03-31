const blogsModel = require("../../models/apis/admin/Blogs")

const indexOfAdmin = async (req, res) => {
    let listing = await blogsModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "Blog listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    console.log("data", data)

    let resp = await blogsModel.insert(data);
    if (resp) {
        res.send({
            status: true,
            message: "Blogs have been saved successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to save blogs. Try again later",
            data: []
        })
    }

}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await blogsModel.update(id,data);
    console.log("ggg", resp)
    if (resp) {
        res.send({
            status: true,
            message: "Blog have been updated successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to update blog. Try again later",
            data: []
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await blogsModel.remove(id);
    if(resp) {
        res.send({
            status: true,
            message: "Blog is deleted successfully",
        })
    }
    else {
        res.send({
            status: false,
            message: "NOPt able to delete blog"
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    // let select = {
    //     "_id": 0,
    //     "title": 1,
    //     "subHeading": 1,
    //     "category": 1,
    //     "description": 1,
    //     "publishedOn": 1
    // }
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
    indexOfAdmin,
    add,
    detail,
    update,
    deleteRow
}