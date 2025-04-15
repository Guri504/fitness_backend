const ProductsModel = require('../../models/apis/admin/Products');


const index = async (req, res) => {
    let resp = await ProductsModel.getListingForClient(req);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Products Listing",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Error in fetching listing"
            })
        )
    }
}

const detail = async (req, res) => {
    let { id } = req.params;
    let resp = await ProductsModel.getById(id);
    if (!resp) {
        res.send({
            status: false,
            message: "Not able to Find Product",
        })
    }

    let variantResp = await ProductsModel.getVariantsByProductId(id);
    if (!variantResp) {
        res.send({
            status: false,
            message: "not able to find variants"
        })
    }

    return res.send({
        status: true,
        message: "Product and Its variants Find Successfully",
        data: resp,
        variants: variantResp
    })
}

module.exports = {
    index,
    detail
}