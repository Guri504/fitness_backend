const ProductColorsModel = require('../../models/apis/admin/Products_Color');


const index = async (req, res) => {
    let resp = await ProductColorsModel.getListingForAdmin(req);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Products Colors Listing",
                data: resp
            })
        )
    }
    else{
        return(
            res.send({
                status: false,
                message: "Error in fetching listing"
            })
        )
    }
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await ProductColorsModel.insert( data);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Product color Added Successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to add product color, Try again"
            })
        )
    }
}

const update = async (req, res) => {
    let data = req.body;
    let { id } = req.params;
    let resp = await ProductColorsModel.update(id, data);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Product color Updated Successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to update product color, Try again"
            })
        )
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await ProductColorsModel.remove(id);
    if (resp) {
        res.send({
            status: true,
            message: "Product color is deleted successfully",
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete Product color"
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await ProductColorsModel.getById(id);
    if (resp) {
        res.send({
            status: true,
            message: "Product color find successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to find Product color",
        })
    }

}

module.exports = {
    add,
    update,
    index,
    deleteRow,
    detail
}