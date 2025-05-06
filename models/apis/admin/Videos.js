const { ObjectId } = require('mongodb');
const { generateSlug, generateString } = require('../../../helper/General');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.videos.find({ isDeleted: false }).toArray();
    return listing;
}

const getListingForClient = async (req, res) => {
    let listing = await db.videos.find({ status: 1, isDeleted: false }).toArray();
    return listing;
}

const insert = async (data) => {
    let timeStamp = new Date().toLocaleString();
    let slug = generateSlug(data.title) + '-' + generateString(7)
    let makeData = {
        ...data,
        status: 1,
        slug: slug,
        isDeleted: false,
        deleted_at: null,
        created_at: timeStamp,
        updated_at: timeStamp
    }
    try {
        let resp = await db.videos.insertOne(makeData);
        return resp;
    } catch (error) {
        return error
    }
}

const update = async (id, data) => {
    let timeStamp = new Date().toLocaleString();
    if (data.title) {
        data.slug = generateSlug(data.title) + '-' + generateString(7)
    }
    let updatedData = {
        ...data,
        updated_at: timeStamp
    }
    try {
        let resp = await db.videos.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: updatedData },
            { new: true, returnDocument: 'after' }
        );
        return resp;
    } catch (error) {
        return error
    }
}

const getById = async (id) => {
    try {
        let resp = await db.videos.findOne({ _id: new ObjectId(`${id}`) });
        return resp;
    } catch (error) {
        return error
    }
}

const putInTrashById = async (id) => {
    try {
        let resp = await db.videos.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } },
        );
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
    getById,
    putInTrashById
}