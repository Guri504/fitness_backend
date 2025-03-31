const { ObjectId } = require('mongodb');
const db = require('../../index');

const getListing = async (req) => {
    const listing = await db.pages.find({ 'status': 1 }).toArray();

    return listing;
}

const insert = async (data) => {
    try {
        let resp = await db.pages.insertOne(data);
        // return resp
        // if(resp)
        // {
        //     let record = await getById(resp.insertedId.toString());
        //     return record;
        // }
        if (resp && resp.insertedId) {
            return {
                ...data
            }
        }
        else {
            return false
        }
    }
    catch (error) {
        //console.log('error', error);
        return false;
    }
}

const update = async () => {
    try {
        let resp = await db.pages.updateOne();

        if (resp) {
            return resp;
        }
    }
    catch (error) {
        //console.log('error', error);
        return false;
    }
}

const remove = async () => {
    try {
        let resp = await db.pages.deleteOne();

        if (resp) {
            return resp;
        }
    }
    catch (error) {
        console.log('error', error);
        return false;
    }
}

const getById = async () => {
    try
    {
        let record = await db.pages.findOne( { _id : new ObjectId(`${id}`)}, {projection :select});
        return record;
    }
    catch (error)
    {
        console.log('error', error);
        return false;
    }
}

module.exports = {
    getListing,
    insert,
    update,
    remove,
    getById
}