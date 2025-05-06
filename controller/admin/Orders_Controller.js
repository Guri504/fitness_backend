const { ObjectId } = require('mongodb');
const ordersModel = require('../../models/apis/admin/Orders');

const orderListing = async (req, res) => {
    let { limit } = req.query;
    let resp = await ordersModel.getOrderListing(req);
    if (!resp) {
        return res.send({ status: false, message: 'Not able to find Orders Listing' })
    }

    const userIds = resp?.length > 0 && resp.map(o => o.userId);
    const user = await ordersModel.getUsersByIds(userIds);
    if (!user) { return res.send({ status: false, message: 'User not find' }) }

    const updatedResp = resp.map(o => {
        const match = user?.find(u => u._id.toString() === o.userId.toString());
        return {
            ...o,
            customerName: match?.firstName1 + ' ' + match?.lastName1,
            customerEmail: match?.email1,
            customerImage: match?.image1,
        }
    })

    const finalData = updatedResp.slice(0, limit)

    return (
        res.send({
            status: true,
            message: 'Orders Listing Found Successfully',
            data: finalData
        })
    )
}

const getOrder = async (req, res) => {
    let { id } = req.params;
    id = new ObjectId(`${id}`)
    let order = await ordersModel.getOrderById(id);
    if (!order) {
        return res.send({ status: false, message: 'Not able to get order' });
    }

    const variantId = order?.orderListing.map((v) => new ObjectId(`${v.variantId}`));
    let variantResp = await ordersModel.getVariantById(variantId);
    if (!variantResp) {
        return (
            res.send({
                status: false,
                message: "Not able to find Varaint of product"
            })
        )
    }

    const productId = variantResp.length > 0 && variantResp.map(v => new ObjectId(`${v.productId}`));
    let productResp = await ordersModel.getProductById(productId);
    if (!productResp) {
        return (
            res.send({
                status: false,
                message: "Not able to find Product"
            })
        )
    }

    const user = await ordersModel.getUserById(order?.userId);
    if (!user) { return res.send({ status: false, message: 'User not find' }) }

    const ordersLength = await ordersModel.getOrdersLengthByUserId(user?._id);
    if (!ordersLength) { return res.send({ status: false, message: 'Not able to find orders length of the user' }) }

    const finalProducts = order.orderListing?.length > 0 && order.orderListing.map(o => {
        const p_match = productResp.find(p => p._id.toString() === o.productId.toString())
        const v_match = variantResp.find(v => v._id.toString() === o.variantId.toString())
        return {
            ...o,
            size: v_match.size.title,
            productName: p_match.productName,
            image: p_match.image
        }
    })

    let lastData = {
        ...order,
        orderListing: finalProducts,
        customerName: user?.firstName1 + ' ' + user?.lastName1,
        customerEmail: user?.email1,
        customerImage: user?.image1,
        customerMobileNumber: user?.mobileNumber,
        ordersLength: ordersLength
    }

    return (
        res.send({
            status: true,
            message: 'Order Found Successfully',
            data: lastData
        })
    )
}

const updateOrderStatus = async (req, res) => {
    let { id } = req.params;
    let { data } = req.body;
    let resp = await ordersModel.updateOrderStatusById(id, data);
    if (!resp) {
        return res.send({ status: false, message: ' Not able to update order status' })
    }
    return (
        res.send({
            status: true,
            message: 'Order status updated successfully',
            updatedStatus: resp.updatedStatus,
            orderStatus: resp.orderStatus
        })
    )
}



module.exports = {
    orderListing,
    getOrder,
    updateOrderStatus
}