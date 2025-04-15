const ProductSizesModel = require('../../models/apis/admin/Products_Sizes');


const index = async (req, res) => {
    let resp = await ProductSizesModel.getListingForAdmin(req);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Products Sizes Listing",
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
    let resp = await ProductSizesModel.insert( data);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Product Size Added Successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to add product size, Try again"
            })
        )
    }
}

const update = async (req, res) => {
    let data = req.body;
    let { id } = req.params;
    let resp = await ProductSizesModel.update(id, data);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Product Size Updated Successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to update product size, Try again"
            })
        )
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await ProductSizesModel.remove(id);
    if (resp) {
        res.send({
            status: true,
            message: "Product Size is deleted successfully",
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete Product Size"
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await ProductSizesModel.getById(id);
    if (resp) {
        res.send({
            status: true,
            message: "Product Size find successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to find Product Size",
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