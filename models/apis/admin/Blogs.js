const { ObjectId } = require("mongodb");
const db = require("../../index")

const getListingForAdmin = async (req, res) => {
    let listing = await db.blogs.find({ isDeleted: false }).toArray();
    return listing
}

const getListingForClient = async (req, res) => {
    const listing = await db.blogs.find({ 'status': 1, isDeleted: false }).toArray();
    return listing
}

const insert = async (data) => {
    const timestamp = new Date().toLocaleString();
    const makedata = {
        ...data,
        slug: null,
        status: 1,
        deleted_at: null,
        isDeleted: false,
        created_at: timestamp,
        updated_at: timestamp
    }
    try {
        let resp = await db.blogs.insertOne(makedata);
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
    delete data._id
    const timestamp = new Date().toLocaleString();
    const updateData = {
        ...data,
        updated_at: timestamp,
    }

    try {
        let resp = await db.blogs.findOneAndUpdate(
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
        let resp = await db.blogs.findOneAndUpdate({ _id: new ObjectId(`${id}`) }, { $set: { isDeleted: true, deleted_at: new Date().toLocaleString() } }, { returnDocument: "after" })
        return resp
    } catch (error) {
        return ("Error in deleting the blog ", error)
    }
}

const getById = async (id) => {
    try {
        let record = await db.blogs.findOne({ _id: new ObjectId(`${id}`) });
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