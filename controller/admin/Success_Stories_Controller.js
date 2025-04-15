const SuccessStoriesModel = require("../../models/apis/admin/Success_Stories");
const Validator = require('validatorjs');

const indexOfAdmin = async (req, res) => {
    let listing = await SuccessStoriesModel.getListingForAdmin(req);
    res.send({
        status: true,
        message: "Success Stories listing",
        data: listing
    })
}

const add = async (req, res) => {
    let data = req.body;

    const rules = {
        title: 'required|min:3',
        name: 'required|min:3',
        description: 'required|min:25|max:500',
        speciality: 'required|min:3',
        image: ["required"]
    }

    const storiesValidation = new Validator(data, rules);

    if (storiesValidation.fails()) {
        return res.send({
            status: false,
            message: "Validated Failed",
            errors: storiesValidation.errors.all()
        })
    } else {
        console.log("Validation passed!");
    }


    let resp = await SuccessStoriesModel.insert(data);
    if (resp) {
        res.send({
            status: true,
            message: "Success Story have been saved successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to save Success Story. Try again later",
        })
    }
}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await SuccessStoriesModel.update(id, data);
    console.log("ggg", resp)
    if (resp) {
        res.send({
            status: true,
            message: "Success Story have been updated successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to update Success Story. Try again later",
            data: []
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await SuccessStoriesModel.remove(id);
    if (resp) {
        res.send({
            status: true,
            message: "Success Story is deleted successfully",
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete Success Story"
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await SuccessStoriesModel.getById(id);
    if (resp) {
        res.send({
            status: true,
            message: "Success Story find successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to find Success Story",
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