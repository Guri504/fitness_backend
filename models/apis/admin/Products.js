const { ObjectId, ReturnDocument } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.Products.find().toArray();
    return listing;
}

const getListingForClient = async (req, res) => {
    let listing = await db.Products.find({ status: 1}).toArray();
    return listing;
}

const insert = async (slug, data) => {
    let timeStamp = new Date().toLocaleString();
    let makeData = {
        ...data,
        slug: slug,
        status: 1,
        created_at: timeStamp,
        updated_at: timeStamp,
    }
    try {
        let resp = await db.Products.insertOne(makeData);
        return resp
    } catch (error) {
        return false
    }
}

const insertVarient = async (data) => {
    let timeStamp = new Date().toLocaleString();
    let makeData = data.map(variantData => ({
        ...variantData,
        status: 1,
        created_at: timeStamp,
        updated_at: timeStamp,
    }))
    try {
        let resp = await db.Product_Variants.insertMany(makeData);
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
        let resp = await db.Products.findOneAndUpdate(
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
        let resp = await db.Products.deleteOne({ _id: new ObjectId(`${id}`) })
        return resp;
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        let record = await db.Products.findOne({ _id: new ObjectId(`${id}`) });
        return record
    }
    catch (error) {
        return false
    }

}

const removeVariantByProductId = async (id) => {
    try {
        let resp = await db.Product_Variants.deleteMany({productId: new ObjectId(`${id}`)});
        return resp;
    } catch (error) {
        return false;
    }
}

const getVariantsByProductId = async (id) => {
    let variantListing = await db.Product_Variants.find({productId: new ObjectId(`${id}`)}).toArray();
    return variantListing;
}

const removeVariant = async (deletedIds) => {
    console.log('deletedIds')
    let resp = await db.Product_Variants.deleteMany({_id: {$in: deletedIds.map(id => new ObjectId(`${id}`))}});
    // console.log("resp", resp)
    return resp
}

const bulkOperation = async (bulkOps) => {
    if(bulkOps.length > 0){
        let resp = await db.Product_Variants.bulkWrite(bulkOps)
        return resp;
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
    bulkOperation
}