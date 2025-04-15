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
        let resp = await db.Product_Variants.find({ _id: { $in: variantIds } }).toArray();
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

// const bulkOperation = async (stockUpdate) => {
//     try {
//         let resp = await db.Product_Variants.bulkWrite(stockUpdate);
//         return resp;
//     } catch (error) {
//         return error
//     }
// }

// const emptyCartAfterOrdered = async (userId) => {
//     try {
//         let resp = await db.user_cart.findOneAndUpdate(
//             { userId: new ObjectId(`${userId}`) },
//             { $set: { products: [] } },
//             { returnDocument: "after" }
//         )
//         return resp;
//     } catch (error) {
//         return error;
//     }
// }

module.exports = {
    insert,
    getVariantsById,
    getOrderById
    // bulkOperation,
    // emptyCartAfterOrdered
}