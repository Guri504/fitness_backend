const TrainingPlanServicesModel = require('../../models/apis/admin/TrainingPlanServices')

const index = async (req, res) => {
    let listing = await TrainingPlanServicesModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "Services Listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await TrainingPlanServicesModel.insert(data);
    if (resp) {
        res.send({
            status: true,
            message: "Service Added",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to add service",
        })
    }
}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await TrainingPlanServicesModel.update(id, data);
    if (resp) {
        res.send({
            status: true,
            message: "Service Updated",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to update service."
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await TrainingPlanServicesModel.view(id);
    if (resp) {
        res.send({
            status: true,
            message: "Service Find",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to Find service."
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await TrainingPlanServicesModel.remove(id);
    if (resp) {
        res.send({
            status: true,
            message: "Service Deleted",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete service."
        })
    }
}

module.exports = {
    index,
    add,
    update,
    detail,
    deleteRow
}