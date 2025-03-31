const MembershipPlanServicesModel = require('../../models/apis/admin/MembershipPlanServices')

const index = async (req, res) => {
    let listing = await MembershipPlanServicesModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "Service Listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await MembershipPlanServicesModel.insert(data);
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
    let resp = await MembershipPlanServicesModel.update(id, data);
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
    let resp = await MembershipPlanServicesModel.view(id);
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
    let resp = await MembershipPlanServicesModel.remove(id);
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