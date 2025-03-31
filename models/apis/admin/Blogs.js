const { ObjectId } = require("mongodb");
const db = require("../../index")

const getListingForAdmin = async (req, res) => {
    let listing = await db.blogs.find().toArray();
    return listing
}

const getListingForClient = async (req, res) => {
    const listing = await db.blogs.find({ 'status': 1 }).toArray();
    return listing
}

const insert = async (data) => {
    const timestamp = new Date();
    const makedata = {
        ...data,
        slug: null,
        status: 1,
        deleted_at: null,
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
    const timestamp = new Date();
    const updateData = {
        ...data,
        updated_at: timestamp,
    }

    console.log("Final updateData:", updateData);
    try {
        let resp = await db.blogs.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            { $set: updateData },
            { new: true, returnDocument: "after" });
        console.log("respmodel", resp)
        // if (resp) {
        //     let record = await getById(id);
        //     return record;
        // }
        return resp
    }
    catch (error) {
        console.log(error)
        return false
    }
}

const remove = async (id) => {
    try {
        let resp = await db.blogs.deleteOne({ _id: new ObjectId(`${id}`) })
        console.log("delete", resp)
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