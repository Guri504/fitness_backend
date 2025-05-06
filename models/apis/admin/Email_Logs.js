const { ObjectId } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req) => {
    let listing = await db.email_logs.find().toArray();
    return listing;
}

const getById = async (id) => {
    try {
        let resp = await db.email_logs.findOne({ _id: new ObjectId(`${id}`) });
        return resp;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getListingForAdmin,
    getById
}