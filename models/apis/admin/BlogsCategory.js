const { ObjectId } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.blogs_category.find({ isDeleted: false }).toArray();
    return listing;
}

const getListingForClient = async (req, res) => {
    let listing = await db.blogs_category.find({ 'status': 1, isDeleted: false }).toArray();
    return listing;
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
        let resp = await db.blogs_category.insertOne(makedata);
        if (resp) {
            let record = await getById(resp.insertedId.toString());
            return record
        }
        else {
            return false
        }
    } catch (error) {
        return error
    }
}

const update = async (id, data) => {
    const timestamp = new Date().toLocaleString();
    const updatedData = {
        ...data,
        updated_at: timestamp
    }
    try {
        let resp = await db.blogs_category.updateOne({ _id: new ObjectId(`${id}`) }, { $set: updatedData });
        if (resp) {
            let record = await getById(id)
            return record
        }
    }
    catch (error) {
        console.log("error", error)
        return false
    }
}

const remove = async (id) => {
    try {
        let resp = await db.blogs_category.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } },
            { returnDocument: "after" })
        console.log(resp)
        return resp

    } catch (error) {
        return ("Error in deleting category", error)
    }

}

const getById = async (id) => {
    try {
        let record = await db.blogs_category.findOne({ _id: new ObjectId(`${id}`) });
        console.log(record)
        return record
    } catch (error) {
        return ("Error in finding the data", error)
    }
}

module.exports = {
    getListingForAdmin,
    getListingForClient,
    insert,
    getById,
    update,
    remove
}