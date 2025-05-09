const { ObjectId } = require("mongodb");
const db = require('../../index')

const getByEmail = async (email) => {
    try {
        let record = await db.admin.findOne({ email: email });
        return record;
    } catch (error) {
        return error;
    }
};

const updateToken = async (adminId, token, expiresAt) => {
    try {
        let record = await db.admin.updateOne(
            { _id: new ObjectId(`${adminId}`) },
            { $set: { token: token, expiresAt: expiresAt } }
        );
        return record;
    } catch (error) {
        return error;
    }
};

const getAdminFromToken = async (token) => {
    try {
        let record = await db.admin.findOne({
            token: token,
            expiresAt: { $gte: Date.now() },
        });
        return record;
    } catch (error) {
        return error;
    }
};

const updateOtp = async (id, token, expiresAt) => {
    try {
        let record = await db.admin.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    tempToken: token,
                    tempTokenExpiry: expiresAt,
                },
            }
        );
        return record;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const resetPassword = async (tempToken, newPassword) => {
    try {
        let resp = await db.admin.findOneAndUpdate(
            { tempToken: tempToken, tempTokenExpiry: { $gte: Date.now() } },
            { $set: { password: newPassword } },
            { new: true, returnDocument: "after" }
        )
        if (!resp) {
            return false
        }
        await db.admin.updateOne({ _id: resp._id }, { $unset: { tempToken: null, tempTokenExpiry: null } });
        return resp
    } catch (error) {
        return false
    }
}

module.exports = {
    getByEmail,
    updateToken,
    getAdminFromToken,
    updateOtp,
    resetPassword
}