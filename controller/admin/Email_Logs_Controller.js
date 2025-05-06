const EmailLogsModel = require('../../models/apis/admin/Email_Logs');

const listing = async (req, res) => {
    let resp = await EmailLogsModel.getListingForAdmin(req);
    if (!resp) {
        return res.send({ status: false, message: 'Not able to find listing' })
    }
    return (
        res.send({
            status: true,
            message: "Email Logs Listing",
            data: resp
        })
    )
}

const view = async (req, res) => {
    let { id } = req.params;
    let resp = await EmailLogsModel.getById(id);
    if (!resp) {
        return res.send({ status: false, message: 'Not able to find Log' })
    }
    return (
        res.send({
            status: true,
            message: "Log found successfully",
            data: resp
        })
    )
}

module.exports = {
    listing,
    view
}