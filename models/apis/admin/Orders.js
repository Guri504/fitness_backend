const { ObjectId } = require('mongodb');
const db = require('../../index');

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

module.exports = {
    insert,
    getVariantsById,
    getOrderById
}