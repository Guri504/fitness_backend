const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.nutrition_advisor.find({ isDeleted: false }).toArray();
    return listing;
}

const insert = async (data) => {
    let timeStamp = new Date().toLocaleString();
    let makeData = {
        ...data,
        status: 1,
        created_at: timeStamp,
        updated_at: timeStamp,
        deleted_at: null,
        isDeleted: false,
    }
    try {
        let resp = await db.nutrition_advisor.insertOne(makeData);
        return resp;
    } catch (error) {
        console.log("error", error)
        return error
    }
}

module.exports = {
    getListingForAdmin,
    insert
}