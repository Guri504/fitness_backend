const { ObjectId, ReturnDocument } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.Products_Sizes.find().toArray();
    return listing;
}

const insert = async (data) => {
    let timeStamp = new Date().toLocaleString();
    let makeData = {
        ...data,
        slug: null,
        status: 1,
        created_at: timeStamp,
        updated_at: timeStamp,
    }
    try {
        let resp = await db.Products_Sizes.insertOne(makeData);
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
        let resp = await db.Products_Sizes.findOneAndUpdate(
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
        let resp = await db.Products_Sizes.deleteOne({ _id: new ObjectId(`${id}`) })
        return resp;
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        let record = await db.Products_Sizes.findOne({ _id: new ObjectId(`${id}`) });
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