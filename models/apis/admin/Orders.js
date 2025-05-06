const { ObjectId } = require('mongodb');
const db = require('../../index');

const getOrderListing = async (req, res) => {
    let listing = await db.orders.find({ isDeleted: false }).toArray();
    return listing
}

const insert = async (data) => {
    try {
        let resp = await db.orders.insertOne(data);
        return resp;
    } catch (error) {
        return error;
    }
}

const getVariantsById = async (variantIds) => {
    try {
        let resp = await db.product_variants.find({ _id: { $in: variantIds } }).toArray();
        return resp
    }
    catch (error) {
        return false
    }
}

const getOrderById = async (id) => {
    try {
        let resp = await db.orders.findOne({ _id: id });
        return resp;
    } catch (error) {
        return error;
    }
}

const getOrderByUserId = async (id) => {
    try {
        let resp = await db.orders.find({ userId: new ObjectId(`${id}`), isDeleted: false }).toArray();
        return resp;
    } catch (error) {
        console.log(error)
        return false
    }
}

const getVariantById = async (id) => {
    try {
        let resp = await db.product_variants.find({ _id: { $in: id } }).toArray();
        return resp;
    } catch (error) {
        console.log('error', error)
        return false
    }
}

const getProductById = async (id) => {
    try {
        let resp = await db.products.find({ _id: { $in: id } }).toArray();
        return resp;
    } catch (error) {
        return false
    }
}

const getUsersByIds = async (id) => {
    try {
        let resp = await db.users.find({ _id: { $in: id } }).toArray();
        return resp;
    } catch (error) {
        return false
    }
}

const getUserById = async (id) => {
    try {
        let resp = await db.users.findOne({ _id: id });
        return resp;
    } catch (error) {
        return false
    }
}

const getOrdersLengthByUserId = async (id) => {
    try {
        let resp = await db.orders.find({ userId: id, paymentStatus: 'captured', isDeleted: false }).toArray()
        return resp?.length;
    } catch (error) {
        return false
    }
}

const updateOrderStatusById = async (id, status) => {
    try {
        let newStatus = status?.length > 0 && status.map(s => {
            return {
                name: s,
                time: new Date()
            }
        })
        let resp = await db.orders.findOneAndUpdate(
            { _id: new ObjectId(`${id}`) },
            {
                $push: { updatedStatus: { $each: newStatus } },
                $set: { orderStatus: status[status.length - 1] }
            },
            { new: true, returnDocument: "after" }
        )
        return resp;
    } catch (error) {
        return false;
    }
}

module.exports = {
    insert,
    getVariantsById,
    getOrderById,
    getOrderByUserId,
    getVariantById,
    getProductById,
    getOrderListing,
    getUsersByIds,
    getUserById,
    getOrdersLengthByUserId,
    updateOrderStatusById
}