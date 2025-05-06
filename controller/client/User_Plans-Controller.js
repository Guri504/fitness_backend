const { ObjectId } = require('mongodb');
const UserPlanModel = require('../../models/apis/admin/User_Plans');
const rozarpay = require('../../helper/Rozarpay');

const add = async (req, res) => {
    let data = req.body;
    const timeStamp = new Date();
    data.userId = new ObjectId(`${data.userId}`)
    data.planId = new ObjectId(`${data.planId}`)
    const checkActivePlan = await UserPlanModel.getPlanByUserIdAndCheckExpiry(data.userId, data.category);
    if (!checkActivePlan) {
        try {
            const payment = await rozarpay.payments.fetch(data.paymentId);
            if (payment.status === 'authorized') {
                await rozarpay.payments.capture(data.paymentId, payment.amount);
            }

            const updatedPayment = await rozarpay.payments.fetch(data.paymentId);
            if (updatedPayment.status !== 'captured') {
                return res.send({
                    status: false,
                    message: 'Payment not captured or failed',
                    payment: updatedPayment,
                });
            }

            // // make transaction object in collection
            let expiryTime = new Date();
            expiryTime.setDate(expiryTime.getDate() + 7);
            let makeTransaction = {
                ...data,
                isDeleted: false,
                deleted_at: null,
                created_at: timeStamp,
                expired_at: expiryTime,
                amount: updatedPayment.amount / 100,
                paymentStatus: updatedPayment.status,
                transactionId: updatedPayment.acquirer_data.bank_transaction_id,
                customerEmail: updatedPayment.email,
                customerContact: updatedPayment.contact,
                method: updatedPayment.method,
            }
            let transactionResp = await UserPlanModel.insert(makeTransaction);
            if (!transactionResp) {
                return res.send({
                    status: false,
                    message: "Payment Unsuccessfull",
                })
            }

            return (
                res.send({
                    status: true,
                    message: 'Payment Successfull',
                    data: transactionResp
                })
            )
        } catch (error) {
            return res.send({ status: false, message: 'payment not completed', data: error })
        }
    }

    else {
        const payment = await rozarpay.payments.fetch(data.paymentId);
        if (payment.status === 'authorized') {
            await rozarpay.payments.capture(data.paymentId, payment.amount);
        }

        const updatedPayment = await rozarpay.payments.fetch(data.paymentId);
        if (updatedPayment.status !== 'captured') {
            return res.send({
                status: false,
                message: 'Payment not captured or failed',
                payment: updatedPayment,
            });
        }

        // update User plan
        let expiryTime = new Date();
        expiryTime.setDate(expiryTime.getDate() + 7);
        const { category, userId, planId, paymentId } = data
        let makeTransaction = {
            planId: planId,
            paymentId: paymentId,
            updated_at: timeStamp,
            amount: updatedPayment.amount / 100,
            paymentStatus: updatedPayment.status,
            transactionId: updatedPayment.acquirer_data.bank_transaction_id,
            method: updatedPayment.method,
            expired_at: expiryTime
        }
        let planUpdate = await UserPlanModel.update(checkActivePlan._id, makeTransaction);
        if (!planUpdate) {
            return res.send({
                status: false,
                message: "Payment Unsuccessfull",
            })
        }
        return (
            res.send({
                status: true,
                message: 'Plan Updated Successfully',
                data: planUpdate
            })
        )
    }
}

const getPlan = async (req, res) => {
    let { id } = req.params;
    let resp = await UserPlanModel.getListingForClient(id);
    if (!resp) { return res.send({ status: false, message: 'No plan listing found' }) }

    planIds = resp?.length > 0 && resp.map(p => p.planId)
    categories = resp?.length > 0 && resp.map(p => p.category)

    let planResp = await UserPlanModel.getPlanById(planIds, categories);
    if (!planResp) { return res.send({ status: false, message: 'No plan listing found' }) }
    return (
        res.send({
            status: true,
            messgae: "Plan Listing Found Successfully",
            data: resp,
            planDetail: planResp
        })
    )
}

module.exports = {
    add,
    getPlan
}