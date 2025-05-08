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

    let finalData = updatedResp

    limit ? finalData = updatedResp.slice(0, limit) : finalData

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

const orderByCategory = async (req, res) => {
    try {

        let orders = await ordersModel.getOrderListing(req);
        if (!orders) {
            return res.send({ status: false, message: 'OrderListing not found' })
        }

        let productIds = [...new Set(orders?.flatMap(o => { return o?.orderListing.map(ol => new ObjectId(`${ol.productId}`)) }))];
        let products = await ordersModel.getProductById(productIds);
        if (!products || products.length === 0) {
            return res.send({ status: false, message: 'Products not found' })
        }

        let categoryIds = [...new Set(products.flatMap(p => { return p?.productCategory.map(pc => new ObjectId(`${pc}`)) }))]
        let categories = await ordersModel.getCategoriesByIds(categoryIds);
        if (!categories || categories.length === 0) {
            return res.send({ status: false, message: 'Category not found' })
        }

        let productCategoryMap = new Map();
        products.forEach(p => {
            p.productCategory.forEach(catId => {
                productCategoryMap.set(p._id.toString(), catId.toString())
            });
        });

        let categoryNameMap = new Map();
        categories.forEach(ct => {
            categoryNameMap.set(ct._id.toString(), ct.categoryTitle);
        });

        let categorySalesMap = new Map();
        orders.forEach(order => {
            const orderMonth = new Date(order.created_at).toLocaleString('default', { month: 'short' });
            order.orderListing.forEach(ol => {
                const productId = ol.productId.toString();
                const categoryId = productCategoryMap.get(productId);
                const price = parseInt(ol.price);
                const quantity = parseInt(ol.quantity);
                const total = price * quantity;

                const key = `${categoryId}_${orderMonth}`;
                const currentTotal = categorySalesMap.get(key) || 0;
                categorySalesMap.set(key, currentTotal + total)
            });
        });

        let finalOrders = [];
        categorySalesMap.forEach((total, combinedKey) => {
            const [categoryId, month] = combinedKey.split('_');
            finalOrders.push({
                category: categoryNameMap.get(categoryId),
                totalRevenue: total,
                month: month,
            });
        });

        return (
            res.send({
                status: true,
                message: 'Sales get by Category',
                data: finalOrders
            })
        )
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: 'Server error' });
    }
}

module.exports = {
    orderListing,
    getOrder,
    updateOrderStatus,
    orderByCategory
}