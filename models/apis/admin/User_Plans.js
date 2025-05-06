const { ObjectId } = require('mongodb');
const db = require('../../index');


const insert = async (data) => {
    try {
        let resp = await db.user_plans.insertOne(data);
        return resp;
    } catch (error) {
        return error;
    }
}

const getPlanByUserIdAndCheckExpiry = async (id, category) => {
    try {
        let resp = await db.user_plans.findOne(
            {
                userId: new ObjectId(`${id}`),
                category: category,
                isDeleted: false,
                expired_at: { $gt: new Date() }
            }
        )
        return resp;
    } catch (error) {
        console.log("error", error)
        return false
    }
}

const update = async (id, data) => {
    try {
        let resp = await db.user_plans.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true, returnDocument: 'after' }
        )
        return resp;
    } catch (error) {
        console.log("err", error)
        return false;
    }
}

const getListingForClient = async (id) => {
    try {
        let listing = await db.user_plans.find({ userId: new ObjectId(`${id}`), isDeleted: false }).toArray();
        return listing
    } catch (error) {
        console.log("-----", error);
        return false
    }
}

const getPlanById = async (ids, categories) => {
    try {
        let results = [];

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const id = ids[i];

            if (!db[category]) {
                console.log(`Collection ${category} not found.`);
                continue;
            }

            let plan = await db[category].findOne({ _id: id, expired_at: { $gte: new Date() } });

            if (plan) {
                plan._collection = category; // optional: to track from which collection
                results.push(plan);
            }
        }

        return results;
    } catch (error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    getListingForClient,
    insert,
    getPlanByUserIdAndCheckExpiry,
    update,
    getPlanById
}