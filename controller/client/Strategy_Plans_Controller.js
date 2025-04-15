const StrategyPlansModel = require('../../models/apis/admin/Strategy_Plans')

const index = async (req, res) => {
    let listing = await StrategyPlansModel.getListingForClient(req);
    res.send({
        status: true,
        message: "Plans Listing",
        data: listing
    })
}

module.exports = { index }