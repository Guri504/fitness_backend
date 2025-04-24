const { ObjectId } = require('mongodb');
const OrdersModel = require('../../models/apis/admin/Orders');


const addOrder = async (req, res) => {
    let data = req.body;

    try {  // get all variants array of object by id
        const variantIds = data.orderListing.map(item => new ObjectId(`${item.variantId}`));
        let variantArray = await OrdersModel.getVariantsById(variantIds);
        if (!variantArray || variantArray.length === 0) {
            return (
                res.send({
                    status: false,
                    message: "Not able to find variants"
                })
            )
        }

        // check stock before placing order
        let variants = data.orderListing;
        for (let v of variants) {
            const match = variantArray.find(item => {
                return item._id.toString() === v.variantId.toString() && item.stock >= v.quantity
            });
            if (!match) {
                return res.send({
                    status: false,
                    message: `Cannot purchase more than available stock for variant ${v.variantId}`,
                })
            }
        }

        // place order
        let timeStamp = new Date().toLocaleString()
        let makeOrder = {
            ...data,
            isDeleted: false,
            deleted_at: null,
            created_at: timeStamp,
            orderStatus: 'Order Placed',
            Status: 1
        }
        let resp = await OrdersModel.insert(makeOrder);
        if (!resp) {
            return (
                res.send({
                    status: false,
                    messae: 'Not able to place the order'
                })
            )
        }

        // get newely placed order
        const getOrder = await OrdersModel.getOrderById(resp.insertedId);
        if (!getOrder) {
            return res.send({
                status: false,
                message: 'Order not found'
            })
        }

        return (
            res.send({
                status: true,
                message: "Order are successfully done",
                order: getOrder
            })
        )
    }
    catch (error) {
        console.log('error', error)
        return (
            res.send({
                status: false,
                message: "Something went wrong",
                error: error.message
            })
        )
    }
}

module.exports = {
    addOrder
}