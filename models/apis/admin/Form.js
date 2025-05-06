const { ObjectId } = require('mongodb');
const db = require('../../index');


const getListing = async (req, res) => {
    const listing = await db.form.find({ isDeleted: false }).toArray();
    return listing;
}

const insert = async (data) => {
    const timestamp = new Date().toLocaleString();
    const makeData = {
        ...data,
        slug: null,
        status: 1,
        isDeleted: false,
        created_at: timestamp,
        updated_at: timestamp,
        deleted_at: null
    }
    try {
        let resp = await db.form.insertOne(makeData);
        if (resp) {
            let record = await getById(resp.insertedId.toString());
            return record;
        }
        else {
            return false
        }
    }
    catch (error) {
        return false
    }
}

const getById = async (id, select) => {
    try {
        let record = await db.form.findOne({ _id: new ObjectId(`${id}`) }, { projection: select });
        return record
    }
    catch (error) {
        return false
    }
}

module.exports = {
    getListing,
    insert,
    getById
}