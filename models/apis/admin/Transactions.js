const { ObjectId, MongoGridFSChunkError } = require('mongodb');
const db = require('../../index');
const { response } = require('express');

const getListingForAdmin = async (req, res) => {
    let listing = await db.transactions.find().toArray();
    return listing;
}

const insert = async (data) => {
    try {
        let resp = await db.transactions.insertOne(data);
        return resp;
    } catch (error) {
        return error;
    }
}

const bulkOperation = async (stockUpdate) => {
    try {
        let resp = await db.product_variants.bulkWrite(stockUpdate);
        return resp;
    } catch (error) {
        return error
    }
}

const emptyCartAfterOrdered = async (userId) => {
    try {
        let resp = await db.user_cart.findOneAndUpdate(
            { userId: new ObjectId(`${userId}`) },
            { $set: { products: [] } },
            { returnDocument: "after" }
        )
        return resp;
    } catch (error) {
        return error;
    }
}

const getOrderAndUpdateStatusAndMethod = async (id, method, pstatus) => {
    try {
        let resp = await db.orders.findOneAndUpdate({ _id: id }, { $set: { paymentMethod: method, paymentStatus: pstatus } }, { new: true, returnDocument: 'after' });
        return resp
    } catch (error) {
        return error
    }
}

const getTransactionByUserId = async (id) => {
    try {
        let resp = await db.transactions.find({ userId: new ObjectId(`${id}`) }).toArray();
        return resp;
    } catch (error) {
        return false
    }
}

const getUsersByIds = async (userids) => {
    try {
        let resp = await db.users.find({ _id: { $in: userids } }).toArray();
        return resp;
    } catch (error) {
        return false;
    }
}

const getById = async (id) => {
    try {
        let resp = await db.transactions.findOne({ _id: new ObjectId(`${id}`) });
        return resp
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

module.exports = {
    insert,
    bulkOperation,
    emptyCartAfterOrdered,
    getOrderAndUpdateStatusAndMethod,
    getTransactionByUserId,
    getListingForAdmin,
    getUsersByIds,
    getById,
    getUserById
}