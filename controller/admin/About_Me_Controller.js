const AboutMeModel = require("../../models/apis/admin/About_Me");

const indexOfAdmin = async (req, res) => {
    let listing = await AboutMeModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "Data listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await AboutMeModel.insert(data);
    if (resp) {
        res.send({
            status: true,
            message: "Data have been saved successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to save Data. Try again later",
        })
    }
}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await AboutMeModel.update(id, data);
    console.log("ggg", resp)
    if (resp) {
        res.send({
            status: true,
            message: "Data have been updated successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to update Data. Try again later",
            data: []
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await AboutMeModel.remove(id);
    if (resp) {
        res.send({
            status: true,
            message: "Data is deleted successfully",
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete Data"
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await AboutMeModel.getById(id);
    if (resp) {
        res.send({
            status: true,
            message: "Data find successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to find Data",
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