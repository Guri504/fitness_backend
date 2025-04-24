const { ObjectId } = require('mongodb');
const db = require('../../index');

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

module.exports = {
    insert,
    bulkOperation,
    emptyCartAfterOrdered
}