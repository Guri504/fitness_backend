const { generateSlug } = require('../../helper/General');
const ProductsCategoryModel = require('../../models/apis/admin/Products_Category');
const Validator = require('validatorjs');


const index = async (req, res) => {
    let resp = await ProductsCategoryModel.getListingForAdmin(req);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Products Listing",
                data: resp
            })
        )
    }
    else{
        return(
            res.send({
                status: false,
                message: "Error in fetching listing"
            })
        )
    }
}

const add = async (req, res) => {
    let data = req.body;

    const rules = {
        categoryTitle: 'required|min:3',
        description: 'required|min:20',
    }
    const categoryValidation = new Validator(data, rules);
    if (categoryValidation.fails()) {
        return res.send({
            status: false,
            message: "Validated Failed",
            errors: categoryValidation.errors.all()
        })
    } else {
        console.log("Validation passed!");
    }

    const slug = generateSlug(data.categoryTitle);

    let resp = await ProductsCategoryModel.insert(slug, data);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Product Category Added Successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to add product catgeory, Try again"
            })
        )
    }
}

const update = async (req, res) => {
    let data = req.body;
    let { id } = req.params;
    if (data.categoryTitle) {
        data.slug = generateSlug(data.categoryTitle);
    }
    let resp = await ProductsCategoryModel.update(id, data);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Product Category Updated Successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to update product category, Try again"
            })
        )
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await ProductsCategoryModel.remove(id);
    if (resp) {
        res.send({
            status: true,
            message: "Product Category is deleted successfully",
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to delete Product Category"
        })
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await ProductsCategoryModel.getById(id);
    if (resp) {
        res.send({
            status: true,
            message: "Product Category find successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to find Product Category",
            data: []
        })
    }

}

module.exports = {
    add,
    update,
    index,
    deleteRow,
    detail
}