const { ObjectId } = require('mongodb');
const TransactionModel = require('../../models/apis/admin/Transactions');
const rozarpay = require('../../helper/Rozarpay');
const { isToday, isThisWeek, isThisMonth, isThisYear } = require('../../helper/General');

const add = async (req, res) => {
    let data = req.body;
    let timeStamp = new Date();
    const { variants, ...TrsData } = data
    TrsData.orderId = new ObjectId(`${TrsData.orderId}`)
    TrsData.userId = new ObjectId(`${TrsData.userId}`)

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
            return {
                updateOne: {
                    filter: { _id: new ObjectId(`${item.variantId}`), stock: { $gte: item.quantity } },
                    update: { $inc: { stock: -item.quantity } }
                }
            }
        })

        const variantStockUpdate = await TransactionModel.bulkOperation(stockUpdate);
        if (!variantStockUpdate || variantStockUpdate.modifiedCount === 0) {
            return (
                res.send({
                    status: false,
                    message: "Not able to update stock in after placing order"
                })
            )
        }

        // // empty user cart after order successfully done
        const emptyArray = await TransactionModel.emptyCartAfterOrdered(TrsData.userId);
        if (!emptyArray) {
            return (
                res.send({
                    status: true,
                    message: "Unable to make cart empty after placing order"
                })
            )
        }

        const getTransaction = await TransactionModel.getOrderAndUpdateStatusAndMethod(
            TrsData.orderId, updatedPayment.method, updatedPayment.status);
        if (!getTransaction) {
            return res.send({ status: false, message: 'not able to update order after transaction' });
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

const getTransaction = async (req, res) => {
    let { id } = req.params;
    let limit = parseInt(req.query.limit) || 4;
    let page = parseInt(req.query.page) || 1;
    let { filter } = req.query;
    let skip = (page - 1) * limit;

    let resp = await TransactionModel.getTransactionByUserId(id);

    if (!resp) {
        return res.send({ status: false, message: 'Not abble to find transactions' });
    }
    if (resp.length <= 0) {
        return res.send({ status: false, message: "Currently there is no transactions" })
    }

    let filteredData = []
    if (filter === 'today') {
        filteredData = resp?.filter(r => isToday(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any transaction on today' }) }
    }
    if (filter === 'this_week') {
        filteredData = resp?.filter(r => isThisWeek(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any transaction in this week' }) }
    }
    if (filter === 'this_month') {
        filteredData = resp?.filter(r => isThisMonth(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any transaction in this month' }) }
    }
    if (filter === 'this_year') {
        filteredData = resp?.filter(r => isThisYear(r.created_at))
        if (filteredData.length <= 0) { return res.send({ status: true, message: 'You have not made any transaction in this year' }) }
    }

    let transactionsLength = filteredData.length;
    const paginatedData = filteredData.slice(skip, skip + limit)
    return (
        res.send({
            status: true,
            message: 'Transactions found successfully',
            totalOrders: transactionsLength,
            currentPage: page,
            totalPages: Math.ceil(transactionsLength / limit),
            data: paginatedData
        })
    )
}

module.exports = {
    add,
    getTransaction
}