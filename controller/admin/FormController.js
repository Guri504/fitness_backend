const formModel = require('../../models/apis/admin/Form')


const index = async (req, res) => {
    let listing = await formModel.getListing(req);
    res.send({
        status: true,
        message: listing
    })
}

const  add = async (req, res) => {
    let data = req.body;
    let resp = await formModel.insert(data);
    if (resp) {
        res.send({
            status: true,
            message: "Form have been submitted successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not abe to submit the form. Try again later",
            data: []
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let select = {
        "_id": 0,
        "firstName": 1,
        "lastName": 1 
    }
    let resp = await formModel.getById(id, select);
    if (resp) {
        res.send({
            status: true,
            message: "Form found successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to found form. Try again later",
            data: []
        })
    }
}

module.exports = {
    index,
    add,
    detail
}