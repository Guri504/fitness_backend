const VideosModel = require('../../models/apis/admin/Videos');

const index = async (req, res) => {
    let listing = await VideosModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "Videos Listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await VideosModel.insert(data);
    if (!resp) {
        return (res.send({ status: false, message: 'Not able to add data' }));
    }
    return (
        res.send({
            status: true,
            message: 'Data added successfully',
            data: resp
        })
    )
}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await VideosModel.update(id, data);
    if (!resp) {
        return (res.send({ status: false, message: 'Not able to update data' }));
    }
    return (
        res.send({
            status: true,
            message: 'Data updated successfully',
            data: resp
        })
    )
}

const view = async (req, res) => {
    let { id } = req.params;
    console.log("id", id)
    let resp = await VideosModel.getById(id);
    if (!resp) { return res.send({ status: false, message: 'Not able to get data' }) }
    return (
        res.send({
            status: true,
            message: 'Data Viewed',
            data: resp
        })
    )
}

const softDelete = async (req, res) => {
    let { id } = req.params;
    let resp = await VideosModel.putInTrashById(id);
    if (!resp) { return res.send({ status: false, message: 'Not able to soft delete data' }) }
    return (
        res.send({
            status: true,
            message: 'Data deleted successfully',
            data: resp
        })
    )
}

module.exports = {
    index,
    add,
    update,
    view,
    softDelete
}