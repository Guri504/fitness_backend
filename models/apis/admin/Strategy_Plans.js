const { ObjectId } = require('mongodb');
const db = require('../../index')

const getListingForAdmin = async (req, res) => {
    let listing = await db.Strategy_Plans.find().toArray();
    return listing
}

const getListingForClient = async (req, res) => {
    const listing = await db.Strategy_Plans.find({ 'status': 1 }).toArray();
    return listing
}

const insert = async (data) => {
    let timeStamp = new Date().toLocaleString();
    let makeData = {
        ...data,
        slug: null,
        status: 1,
        created_at: timeStamp,
        updated_at: timeStamp,
        deleted_at: null
    }
    try {
        let resp = await db.Strategy_Plans.insertOne(makeData);
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
        let resp = await db.Strategy_Plans.findOneAndUpdate({_id: new ObjectId(`${id}`)}, {$set: updatedData});
        return resp;
    } catch (error) {
        return error
    }
}

const view = async (id) => {
    try {
        let resp = await db.Strategy_Plans.findOne({_id: new ObjectId(`${id}`)});
        return resp;
    } catch (error) {
        return error
    }
}

const remove = async (id) => {
    try {
        let resp = await db.Strategy_Plans.deleteOne({_id: new ObjectId(`${id}`)});
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