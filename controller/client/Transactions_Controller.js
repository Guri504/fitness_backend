const { ObjectId } = require('mongodb');
const TransactionModel = require('../../models/apis/admin/Transactions');
const rozarpay = require('../../helper/Rozarpay');

const add = async (req, res) => {
    let data = req.body;
    let timeStamp = new Date().toLocaleString();
    const { variants, userId, ...TrsData } = data
    TrsData.orderId = new ObjectId(`${TrsData.orderId}`)

    try {
        const payment = await rozarpay.payments.fetch(TrsData.paymentId);

        if (payment.status === 'authorized') {
            await rozarpay.payments.capture(TrsData.paymentId, payment.amount);
        }

        const updatedPayment = await rozarpay.payments.fetch(TrsData.paymentId);
        if (updatedPayment.status !== 'captured') {
            return res.send({
                status: false,
                message: 'Payment not captured or failed',
                payment: updatedPayment,
            });
        }

        // // make transaction object in collection
        let makeTransaction = {
            ...TrsData,
            isDeleted: false,
            deleted_at: null,
            created_at: timeStamp,
            paymentStatus: updatedPayment.status,
            transactionId: updatedPayment.acquirer_data.bank_transaction_id,
            customerEmail: updatedPayment.email,
            customerContact: updatedPayment.contact,
            method: updatedPayment.method,
            status: 'success',
        }
        let transactionResp = await TransactionModel.insert(makeTransaction);
        if (!transactionResp) {
            return res.send({
                status: false,
                message: "Payment Unsuccessfull",
            })
        }

        // update stock in product variant by decresing the order quantity
        const stockUpdate = variants?.length > 0 && variants.map((item) => {
            console.log(typeof item.quantity)
            return {
                updateOne: {
                    filter: { _id: new ObjectId(`${item.variantId}`), stock: { $gte: item.quantity } },
                    update: { $inc: { stock: -item.quantity } }
                }
            }
        })

        const variantStockUpdate = await TransactionModel.bulkOperation(stockUpdate);
        console.log("variantStockUpdate", variantStockUpdate)
        if (!variantStockUpdate || variantStockUpdate.modifiedCount === 0) {
            return (
                res.send({
                    status: false,
                    message: "Not able to update stock in after placing order"
                })
            )
        }

        // // empty user cart after order successfully done
        const emptyArray = await TransactionModel.emptyCartAfterOrdered(userId);
        if (!emptyArray) {
            return (
                res.send({
                    status: true,
                    message: "Unable to make cart empty after placing order"
                })
            )
        }

        return (
            res.send({
                status: true,
                message: 'Payment Successfull and stock updated succesfully',
                data: transactionResp,
                payment: updatedPayment,
            })
        )
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    add
}