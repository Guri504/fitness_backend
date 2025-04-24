const { ObjectId } = require('mongodb');
const { generateSlug, generateString } = require('../../helper/General');
const ProductsModel = require('../../models/apis/admin/Products');


const index = async (req, res) => {
    let resp = await ProductsModel.getListingForAdmin(req);
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

const add = async (req, res) => {
    let data = req.body;
    const { variants, ...productDetail } = data
    const slug = generateSlug(productDetail.productName) + '-' + generateString(5);
    let resp = await ProductsModel.insert(slug, productDetail);
    if (!resp) {
        return (
            res.send({
                status: false,
                message: "Not able to add product, Try again"
            })
        )
    }

    const variantWithId = variants.map(variant => ({
        ...variant,
        productId: resp.insertedId
    }))

    let record = await ProductsModel.insertVarient(variantWithId);
    if (!record) {
        return (
            res.send({
                status: false,
                message: "Not able to add product variants, Try again"
            })
        )
    }

    return (
        res.send({
            status: true,
            message: "Product And Variants Added Successfully"
        })
    )


}

const update = async (req, res) => {
    let data = req.body;
    let { id } = req.params;
    const { variants, ...productDetail } = data
    let resp = await ProductsModel.update(id, productDetail);
    if (!resp) {
        return (
            res.send({
                status: false,
                message: "Not able to update product, Try again"
            })
        )
    }

    const existingVariants = await ProductsModel.getVariantsByProductId(id);
    const existVariantsId = existingVariants.map(v => v._id.toString());
    const updatedvariantsId = variants.filter(v => v._id).map(v => v._id.toString());

    // Delete variants not send by frontend
    const deletedIds = existVariantsId.filter(id => !updatedvariantsId.includes(id));

    if (deletedIds.length > 0) {
        await ProductsModel.removeVariant(deletedIds);
    }

    // Update Present Variants Data
    const updateVarinats = variants.filter(v => v._id).map(data => {
        const { _id, ...rest } = data;
        return {
            updateOne: {
                filter: { _id: new ObjectId(`${data._id}`) },
                update: { $set: { ...rest, updated_at: new Date().toLocaleString() } }
            }
        }
    });

    // Insert New Variants 
    const newVariants = variants.filter(v => !v._id).map(data => ({
        insertOne: {
            document: {
                ...data,
                productId: new ObjectId(`${id}`),
                isDeleted: false,
                deleted_at: null,
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString()
            }
        }
    }));

    const bulkOps = [...updateVarinats, ...newVariants];
    const finishData = await ProductsModel.bulkOperation(bulkOps);

    return (
        res.send({
            status: true,
            message: "Product And Its Variants Updated Successfully",
            data: finishData
        })
    )
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let delVariant = await ProductsModel.removeVariantByProductId(id);
    if (!delVariant) {
        res.send({
            status: false,
            message: "Not able to delete Product Variants"
        })
    }
    let resp = await ProductsModel.remove(id);
    if (!resp) {
        res.send({
            status: false,
            message: "Not able to delete Product",
        })
    }
    return (
        res.send({
            status: true,
            message: "Product and its variants deleted successfully"
        })
    )
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
    add,
    update,
    index,
    deleteRow,
    detail
}