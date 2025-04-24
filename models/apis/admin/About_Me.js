const { ObjectId } = require("mongodb");
const db = require("../../index");

const getListingForAdmin = async (req, res) => {
    let listing = await db.about_me.find({ isDeleted: false }).toArray();
    return listing
}

const getListingForClient = async (req, res) => {
    const listing = await db.about_me.find({ 'status': 1, isDeleted: false }).toArray();
    return listing
}

const insert = async (data) => {
    const timestamp = new Date().toLocaleString();
    const makedata = {
        ...data,
        slug: null,
        status: 1,
        isDeleted: false,
        deleted_at: null,
        created_at: timestamp,
        updated_at: timestamp
    }
    try {
        let resp = await db.about_me.insertOne(makedata);
        return resp;
    } catch (error) {
        return error;
    }
}

const update = async (id, data) => {
    delete data._id
    const timestamp = new Date().toLocaleString();
    const updateData = {
        ...data,
        updated_at: timestamp,
    }
    try {
        let resp = await db.about_me.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: updateData },
            { new: true, returnDocument: "after" });
        return resp
    }
    catch (error) {
        console.log(error)
        return false
    }
}

const remove = async (id) => {
    try {
        let resp = await db.about_me.findOneAndUpdate({ _id: new ObjectId(`${id}`) }, { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } }, {returnDocument: "after"})
        return resp;
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        let record = await db.about_me.findOne({ _id: new ObjectId(`${id}`) });
        return record
    }
    catch (error) {
        return false
    }

}

module.exports = {
    getListingForClient,
    getListingForAdmin,
    insert,
    getById,
    remove,
    update
}