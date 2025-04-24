const { ObjectId } = require('mongodb');
const db = require('../../index')

const getListingForAdmin = async (req, res) => {
    let listing = await db.membership_plan_services.find({ isDeleted: false }).toArray();
    return listing
}

const getListingForClient = async (req, res) => {
    const listing = await db.membership_plan_services.find({ 'status': 1, isDeleted: false }).toArray();
    return listing
}

const insert = async (data) => {
    let timeStamp = new Date().toLocaleString();
    let makeData = {
        ...data,
        slug: null,
        status: 1,
        isDeleted: false,
        created_at: timeStamp,
        updated_at: timeStamp,
        deleted_at: null
    }
    try {
        let resp = await db.membership_plan_services.insertOne(makeData);
        return resp;
    } catch (error) {
        return error
    }
}

const update = async (id, data) => {
    let timeStamp = new Date().toLocaleString();
    let updatedData = {
        ...data,
        updated_at: timeStamp
    }
    try {
        let resp = await db.membership_plan_services.findOneAndUpdate({ _id: new ObjectId(`${id}`) }, { $set: updatedData });
        return resp;
    } catch (error) {
        return error
    }
}

const view = async (id) => {
    try {
        let resp = await db.membership_plan_services.findOne({ _id: new ObjectId(`${id}`) });
        return resp;
    } catch (error) {
        return error
    }
}

const remove = async (id) => {
    try {
        let resp = await db.membership_plan_services.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } },
            { returnDocument: "after" });
        return resp;
    } catch (error) {
        return error
    }
}

module.exports = {
    getListingForAdmin,
    getListingForClient,
    insert,
    update,
    view,
    remove
}