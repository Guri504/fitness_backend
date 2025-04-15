const db = require('../../index');

const insert = async (data) => {
    try {
        let resp = await db.transactions.insertOne(data);
        return resp;
    } catch (error) {
        return error;
    }
}

module.exports = {
    insert
}