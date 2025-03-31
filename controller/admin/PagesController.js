const pagesModel = require("../../models/apis/admin/Pages")

const index = async (req, res) => {
    let Listing = await pagesModel.getListing(req);

    return res.send({
        status: true,
        message: Listing
    })
}

const add = async (req, res) => {
    let data = req.body;

    let resp = await pagesModel.insert(data);

    if (resp) {
        return res.send({
            status: true,
            message: 'Record has been saved successfully.',
            data: resp
        })
    }
    else {
        return res.send({
            status: false,
            message: 'Not able to save record. Please try again later.',
            data: []
        })
    }
}

const update = async (req, res) => {
    let resp = await pagesModel.update();

    if (resp) {
        return res.send({
            status: true,
            message: 'Record has been updated successfully.',
            data: resp
        })
    }
    else {
        return res.send({
            status: false,
            message: 'Not able to save record. Please try again later.',
            data: []
        })
    }
}

const deleteRow = async (req, res) => {
    let resp = await pagesModel.remove();

    if (resp) {
        return res.send({
            status: true,
            message: 'Record has been deleted successfully.',
            data: resp
        })
    }
    else {
        return res.send({
            status: false,
            message: 'Not able to delete record. Please try again later.',
            data: []
        })
    }
}

const detail = async (req, res) => {
    let resp = await pagesModel.getById();

    if (resp) {
        return res.send({
            status: true,
            message: 'Record has been fetch successfully.',
            data: resp
        })
    }
    else {
        return res.send({
            status: false,
            message: 'Not able to fetch record. Please try again later.',
            data: []
        })
    }
}

module.exports = {
    index,
    add,
    update,
    deleteRow,
    detail
}