const { ObjectId } = require('mongodb');
const db = require('../../models/index');

const softDeleteData = async (req, res) => {
    let { type } = req.query;
    let { check } = req.body;
    console.log(type, check)
    try {
        let objectIds = check.map(id => new ObjectId(`${id}`))
        let resp = await db[type].updateMany(
            { _id: { $in: objectIds } },
            { $set: { isDeleted: true, deleted_at: new Date() } },
            { new: true, returnDocument: 'after' }
        )
        console.log(resp, '---')
        if (!resp) {
            return res.send({ status: false, message: 'Unable to delete data' })
        }
        return (
            res.send({
                status: true,
                message: 'Data deleted successully',
                data: resp
            })
        )
    } catch (error) {
        return false
    }
}

module.exports = {
    softDeleteData
}