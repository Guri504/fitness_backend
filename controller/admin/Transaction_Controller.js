const transactionModel = require('../../models/apis/admin/Transactions');

const listing = async (req, res) => {
    let transactions = await transactionModel.getListingForAdmin(req);
    if (!transactions) {
        return res.send({ status: false, message: 'Transaction Listing not found' })
    }

    let userIds = transactions?.length > 0 && transactions.map(t => t.userId);
    let users = await transactionModel.getUsersByIds(userIds);
    if (!users) {
        return res.send({ status: false, message: 'Users Listing not found' })
    }

    let finalData = transactions?.length > 0 && transactions.map(t => {
        const match = users?.find(u => u._id.toString() === t.userId.toString());
        return {
            ...t,
            customerImage: match?.image1,
            customerName: match?.firstName1 + ' ' + match?.lastName1
        }
    })

    return (
        res.send({
            status: true,
            message: 'Transactions Listing',
            data: finalData
        })
    )
}

const getTransaction = async (req, res) => {
    let { id } = req.params;
    let transaction = await transactionModel.getById(id);
    if (!transaction) {
        return res.send({ status: false, message: 'Transaction not found' })
    }

    let user = await transactionModel.getUserById(transaction.userId);
    if (!user) {
        return res.send({ status: false, message: 'User not found' })
    }

    let finalData = { ...transaction, customerName: user.firstName1 + ' ' + user.lastName1, customerImage: user.image1 }

    return (
        res.send({
            status: true,
            message: 'Transaction founded',
            data: finalData
        })
    )
}

module.exports = {
    listing,
    getTransaction
}