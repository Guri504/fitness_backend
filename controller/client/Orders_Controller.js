const { ObjectId } = require('mongodb');
const OrdersModel = require('../../models/apis/admin/Orders');
const { getToday, formateDate, isToday, isThisWeek, isThisMonth, isThisYear } = require('../../helper/General');


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
        let timeStamp = new Date()
        data.userId = new ObjectId(`${data.userId}`)
        let makeOrder = {
            ...data,
            isDeleted: false,
            deleted_at: null,
            created_at: timeStamp,
            orderStatus: 'order_placed',
            updatedStatus: [{ name: "order_placed", time: timeStamp }],
            paymentStatus: 'Pending',
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

const getOrders = async (req, res) => {
    let { id } = req.params;
    let limit = parseInt(req.query.limit) || 4;
    let page = parseInt(req.query.page) || 1;
    let { filter } = req.query;
    let skip = (page - 1) * limit;

    let resp = await OrdersModel.getOrderByUserId(id);

    if (!resp) {
        return res.send({ status: false, message: 'Not abble to find orders' });
    }
    if (resp.length <= 0) {
        return res.send({ status: false, message: "Currently there is no Order" })
    }


    let filteredData = []
    if (filter === 'today') {
        filteredData = resp?.filter(r => isToday(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any order on today' }) }
    }
    if (filter === 'this_week') {
        filteredData = resp?.filter(r => isThisWeek(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any order in this week' }) }
    }
    if (filter === 'this_month') {
        filteredData = resp?.filter(r => isThisMonth(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any order in this month' }) }
    }
    if (filter === 'this_year') {
        filteredData = resp?.filter(r => isThisYear(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any order in this year' }) }
    }

    const variantId = filteredData?.flatMap((r) => r.orderListing.map((v) => new ObjectId(`${v.variantId}`)));
    let variantResp = await OrdersModel.getVariantById(variantId);
    if (!variantResp) {
        return (
            res.send({
                status: false,
                message: "Not able to find Varaint of product"
            })
        )
    }

    const productId = variantResp.length > 0 && variantResp.map(v => new ObjectId(`${v.productId}`));
    let productResp = await OrdersModel.getProductById(productId);
    if (!productResp) {
        return (
            res.send({
                status: false,
                message: "Not able to find Product"
            })
        )
    }

    const finalProducts = filteredData.flatMap((r) => {
        const updatedOrderListing = r.orderListing?.length > 0 && r.orderListing.map(o => {
            const p_match = productResp.find(p => p._id.toString() === o.productId.toString())
            const v_match = variantResp.find(v => v._id.toString() === o.variantId.toString())
            return {
                ...o,
                size: v_match.size.title,
                productName: p_match.productName,
                image: p_match.image
            }
        })
        return {
            ...r,
            orderListing: updatedOrderListing
        }
    }
    )

    let ordersLength = finalProducts.length;
    const paginatedData = finalProducts.slice(skip, skip + limit)
    return (
        res.send({
            status: true,
            message: 'Order found successfully',
            totalOrders: ordersLength,
            currentPage: page,
            totalPages: Math.ceil(ordersLength / limit),
            data: paginatedData
        })
    )
}

module.exports = {
    addOrder,
    getOrders,
}