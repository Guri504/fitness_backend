const MembershipPlansModel = require('../../models/apis/admin/MembershipPlans')

const index = async (req, res) => {
    let listing = await MembershipPlansModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "PLan Listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await MembershipPlansModel.insert(data);
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
    let resp = await MembershipPlansModel.update(id, data);
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
    let resp = await MembershipPlansModel.view(id);
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
    let resp = await MembershipPlansModel.remove(id);
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