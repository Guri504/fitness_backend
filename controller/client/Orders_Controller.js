const { ObjectId } = require('mongodb');
const OrdersModel = require('../../models/apis/admin/Orders');
const TransactionModel = require('../../models/apis/admin/Transactions');


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

        const getOrder = await OrdersModel.getOrderById(resp.insertedId);
        if (!getOrder) {
            return res.send({
                status: false,
                message: 'Order not found'
            })
        }

        // // make transaction object in collection
        // let makeTransaction = {
        //     orderId: resp.insertedId,
        //     created_at: timeStamp,
        //     amount: data.totalAmount,
        //     status: 'success',
        //     currency: 'INR'
        // }
        // let transactionResp = await TransactionModel.insert(makeTransaction);
        // if (!transactionResp) {
        //     return res.send({
        //         status: false,
        //         message: "Payment Unsuccessfull",
        //     })
        // }

        // // update stock in product variant by decresing the order quantity
        // const stockUpdate = variants?.length > 0 && variants.map((item) => {
        //     console.log(typeof item.quantity)
        //     return {
        //         updateOne: {
        //             filter: { _id: new ObjectId(`${item.variantId}`), stock: { $gte: item.quantity } },
        //             update: { $inc: { stock: -item.quantity } }
        //         }
        //     }
        // })
        // const variantStockUpdate = await OrdersModel.bulkOperation(stockUpdate);
        // console.log("variantStockUpdate", variantStockUpdate)
        // if (!variantStockUpdate || variantStockUpdate.modifiedCount === 0) {
        //     return (
        //         res.send({
        //             status: false,
        //             message: "Not able to update stock in after placing order"
        //         })
        //     )
        // }

        // // empty user cart after order successfully done
        // const emptyArray = await OrdersModel.emptyCartAfterOrdered(data.userId);
        // if (!emptyArray) {
        //     return (
        //         res.send({
        //             status: true,
        //             message: "Unable to make cart empty after placing order"
        //         })
        //     )
        // }

        return (
            res.send({
                status: true,
                message: "Order and Payment are successfully done",
                order: getOrder,
                // transactionId: transactionResp.insertedId
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