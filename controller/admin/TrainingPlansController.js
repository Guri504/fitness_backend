const TrainingPlansModel = require('../../models/apis/admin/TrainingPlans')

const index = async (req, res) => {
    let listing = await TrainingPlansModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "PLan Listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await TrainingPlansModel.insert(data);
    if (resp) {
        res.send({
            status: true,
            message: "Plan Added",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to add plan",
        })
    }
}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await TrainingPlansModel.update(id, data);
    if (resp) {
        res.send({
            status: true,
            message: "Plan Updated",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to update Plan."
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await TrainingPlansModel.view(id);
    if (resp) {
        res.send({
            status: true,
            message: "Plan Find",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to Find Plan."
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await TrainingPlansModel.remove(id);
    if (resp) {
        res.send({
            status: true,
            message: "Plan Deleted",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete Plan."
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