const { ObjectId, ReturnDocument } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.products_category.find({ isDeleted: false }).toArray();
    return listing;
}

const insert = async (slug, data) => {
    let timeStamp = new Date().toLocaleString();
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
        let resp = await db.products_category.insertOne(makeData);
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
        let resp = await db.products_category.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: updatedData },
            { new: true, returnDocument: "after" }
        );
        return resp;
    } catch (error) {
        return false;
    }
}

const remove = async (id) => {
    try {
        let resp = await db.products_category.findOneAndUpdate(
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
        let record = await db.products_category.findOne({ _id: new ObjectId(`${id}`) });
        return record
    }
    catch (error) {
        return false
    }

}

module.exports = {
    getListingForAdmin,
    insert,
    update,
    remove,
    getById
}