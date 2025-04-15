const StrategyPlansModel = require('../../models/apis/admin/Strategy_Plans')

const index = async (req, res) => {
    let listing = await StrategyPlansModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "Plans Listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;
    let resp = await StrategyPlansModel.insert(data);
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
    let resp = await StrategyPlansModel.update(id, data);
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
            message: "Not able to update plan."
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await StrategyPlansModel.view(id);
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
            message: "Not able to Find plan."
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await StrategyPlansModel.remove(id);
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
            message: "Not able to delete plan."
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