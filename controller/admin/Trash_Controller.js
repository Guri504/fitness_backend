const { ObjectId } = require('mongodb');
const db = require('../../models/index');

const getTrashListing = async (req, res) => {
    let { type } = req.params;

    try {
        if (!db[type]) {
            return res.send({ status: false, message: `Collection ${type} does not exist.` });
        }
        let listing = await db[type].find({ isDeleted: true }).toArray();
        if (!listing) {
            return res.send({ status: false, message: `Not able to find ${type} listing` })
        }

        return (
            res.send({
                status: true,
                message: `${type} Listing`,
                data: listing
            })
        )
    }
    catch (error) {
        console.log(error);
        return error
    }
}

const undoDelete = async (req, res) => {
    let { type } = req.params;
    let { id } = req.body;
    try {
        if (!db[type]) {
            return res.send({ status: false, message: `Collection ${type} does not exist.` });
        }
        let undo = await db[type].findOneAndUpdate(
            { _id: new ObjectId(`${id}`), isDeleted: true },
            { $set: { isDeleted: false } },
            { returnDocument: "after" }
        );
        if (!undo) {
            return res.send({ status: false, message: `Not able to Undo deleted ${type}` })
        }

        return (
            res.send({
                status: true,
                message: `${type} undo successfully`,
                data: undo
            })
        )
    } catch (error) {
        res.send({
            status: false,
            message: `Server Error`,
        })
    }
}

const deletePermanently = async (req, res) => {
    let { type } = req.params;
    let { data } = req.body;
    console.log("id", data, "type", type)
    try {
        if (!db[type]) {
            return res.send({ status: false, message: `Collection ${type} does not exist.` });
        }
        let undo = await db[type].deleteOne(
            { _id: new ObjectId(`${data.id}`) });
        if (!undo) {
            return res.send({ status: false, message: `Not able to delete ${type}` })
        }

        return (
            res.send({
                status: true,
                message: `${type} deleted successfully`,
            })
        )
    } catch (error) {
        res.send({
            status: false,
            message: `Server Error`,
        })
    }
}

module.exports = {
    getTrashListing,
    undoDelete,
    deletePermanently
}