const { ObjectId, ReturnDocument } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.Products_Category.find().toArray();
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
        let resp = await db.Products_Category.insertOne(makeData);
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
        let resp = await db.Products_Category.findOneAndUpdate(
            {_id: new ObjectId(`${id}`)},
            { $set: updatedData},
            { new:true, returnDocument: "after"}
        );
        return resp;
    } catch (error) {
        return false;
    }
}

const remove = async (id) => {
    try {
        let resp = await db.Products_Category.deleteOne({ _id: new ObjectId(`${id}`) })
        return resp;
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        let record = await db.Products_Category.findOne({ _id: new ObjectId(`${id}`) });
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