const { ObjectId, ReturnDocument } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.products.find({ isDeleted: false }).toArray();
    return listing;
}

const getListingForClient = async (req, res) => {
    let listing = await db.products.find({ status: 1, isDeleted: false }).toArray();
    return listing;
}

const insert = async (slug, data) => {
    let timeStamp = new Date();
    let makeData = {
        ...data,
        slug: slug,
        status: 1,
        isDeleted: false,
        deleted_at: null,
        created_at: timeStamp,
        updated_at: timeStamp,
    }
    try {
        let resp = await db.products.insertOne(makeData);
        return resp
    } catch (error) {
        return false
    }
}

const insertVarient = async (data) => {
    let timeStamp = new Date();
    let makeData = data.map(variantData => ({
        ...variantData,
        status: 1,
        isDeleted: false,
        deleted_at: null,
        created_at: timeStamp,
        updated_at: timeStamp,
    }))
    try {
        let resp = await db.product_variants.insertMany(makeData);
        return resp
    } catch (error) {
        return false
    }
}

const update = async (id, data) => {
    let timeStamp = new Date().toLocaleString();
    let updatedData = {
        ...data,
        updated_at: timeStamp,
    }
    try {
        let resp = await db.products.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: updatedData },
            { new: true, ReturnDocument: "after" }
        );
        return resp
    } catch (error) {
        return false
    }
}

const remove = async (id) => {
    try {
        let resp = await db.products.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } },
            { returnDocument: "after" })
        return resp;
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        let record = await db.products.findOne({ _id: new ObjectId(`${id}`) });
        return record
    }
    catch (error) {
        return false
    }

}

const removeVariantByProductId = async (id) => {
    try {
        let resp = await db.product_variants.updateMany({ productId: new ObjectId(`${id}`) },
            { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } });
        return resp;
    } catch (error) {
        return false;
    }
}

const getVariantsByProductId = async (id) => {
    let variantListing = await db.product_variants.find({ productId: new ObjectId(`${id}`) }).toArray();
    return variantListing;
}

const removeVariant = async (deletedIds) => {
    let resp = await db.product_variants.updateMany(
        { _id: { $in: deletedIds.map(id => new ObjectId(`${id}`)) } },
        { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } });
    return resp
}

const bulkOperation = async (bulkOps) => {
    if (bulkOps.length > 0) {
        let resp = await db.product_variants.bulkWrite(bulkOps)
        return resp;
    }
}

const getVariants = async (req, res) => {
    let listing = await db.product_variants.find(
        { stock: { $lte: 10 } },
        { projection: { _id: 1, productId: 1, stock: 1, size: 1 } }).sort({ stock: 1 }).limit(10).toArray();
    return listing
}

const getProductsByIds = async (ids) => {
    try {
        let resp = await db.products.find({ _id: { $in: ids } }, { projection: { _id: 1, productName: 1 } }).toArray()
        return resp;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getListingForAdmin,
    getListingForClient,
    insert,
    insertVarient,
    update,
    remove,
    getById,
    removeVariantByProductId,
    getVariantsByProductId,
    removeVariant,
    bulkOperation,
    getVariants,
    getProductsByIds
}