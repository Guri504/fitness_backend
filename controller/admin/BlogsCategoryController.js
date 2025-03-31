const BlogsCategoryModel = require('../../models/apis/admin/BlogsCategory');

const index = async (req, res) => {
    let listing = await BlogsCategoryModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: listing
    });
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await BlogsCategoryModel.insert(data);
    if (resp) {
        res.send({
            status: true,
            message: "Blogs Category Added Successfully",
            data: resp
        });
    }
    else {
        res.send({
            status: false,
            message: "Not able to add blog category. Try again.",
            data: []
        });
    }
}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await BlogsCategoryModel.update(id, data)
    if (resp) {
        res.send({
            status: true,
            message: "Blog Category updated successfiully",
            data: resp
        })
    }
    else { 
        res.send({
            status: false,
            message: "not able to update blog category. Try again later",
            data: []
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await BlogsCategoryModel.remove(id)
    console.log("====", resp)
    if (resp) {
        res.send({
            status: true,
            message: "Blog Category is deleted"
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete Blog Category;"
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    // let select = {
    //     "_id": 0,
    //     "blogCategoryTitle": 1,
    //     "blogCategoryDesc": 1,
    //     "blogCategoryCreatorName": 1,
    // }
    let resp = await BlogsCategoryModel.getById(id);
    console.log("kji", resp)
    if (resp) {
        res.send({
            status: true,
            message: " Blog Category Find Successfully",
            data: resp
        });
    }
    else {
        res.send({
            status: false,
            message: "Not able to find blog category. Try again.",
            data: []
        })
    }
}

module.exports = {
    index,
    add,
    detail,
    update,
    deleteRow
}