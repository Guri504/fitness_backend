const userModel = require('../../models/apis/admin/Users');

const index =async (req,res) => {
    let resp = await userModel.getListing(req);
    res.send({
        status: true,
        message: resp
    })
}

const detail = async (req, res) => {
    let { id } = req.params;
     let resp = await userModel.getById(id)
    if (resp) {
        res.send({
            status: true,
            message: "User has been found successfully",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "User does not exist",
            data: []
        })
    }
}

const deleteRow = async (req, res) => {
    let { id } = req.params;
    let resp = await userModel.remove(id);
    if(resp){
        res.send({
            status: true,
            message: "User deleted successfully"
        })
    }
    else{
        res.send({
            status: false,
            message: "Unable to delete User"
        })
    }
}

module.exports = {
    index,
    detail,
    deleteRow
}