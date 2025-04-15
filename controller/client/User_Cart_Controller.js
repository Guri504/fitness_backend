const { ObjectId } = require('mongodb');
const userCartModel = require('../../models/apis/admin/User_Cart');

const index = async (req, res) => {
    let { id } = req.params;
    let resp = await userCartModel.getCartByUserId(id);
    if (resp) {
        const variantId = resp.products.length > 0 && resp.products.map(p => p.variantId);
        
        let variantResp = await userCartModel.getVariantById(variantId);
        if(!variantResp){
            return ( 
                res.send({
                    status: false,
                    message: "Not able to find Varaint of product"
                })
            )
        }
        const productId = variantResp.length > 0 && variantResp.map(v => v.productId);
        let productResp = await userCartModel.getProductById(productId);
        if(!productResp){
            return(
                res.send({
                    status: false,
                    message: "Not able to find Product"
                })
            )
        }
        return (
            res.send({
                status: true,
                message: "User Product Listing",
                data: resp,
                products: productResp,
                variants: variantResp
            })
        )
    }

    return (
        res.send({
            status: false,
            message: "Not able to find user products"
        })
    )

}

const add = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    finalData = {
        ...data,
       productId: new ObjectId(`${data.productId}`),
       variantId: new ObjectId(`${data.variantId}`)
    }
    let resp = await userCartModel.insert(id, finalData);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Product added in cart successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to add product in cart"
            })
        )
    }
}

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await userCartModel.getCartByIdAndUpdate(id, data);
    if(resp){
        return(
            res.send({
                status: true,
                message: "quantity updated successfully",
                data: resp
            })
        )
    }
    else{
        return(
            res.send({
                status: false,
                message: "not able to update cart quantity",
            })
        )
    }
}

const removeVariant = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    try {
        let resp = await userCartModel.removeVariantFromcart(id, data);
        if(resp){
            return(
                res.send({
                    status: true,
                    message: "Variant deleted Succesfully"
                })
            )
        }
        else{
            return(
                res.send({
                    status: false,
                    message: "Not able to delete variant"
                })
            )
        }
    } catch (error) {
        
    }
}

const addressUpdate = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    let resp = await userCartModel.updateAddress(id, data);
    let respUser = await userCartModel.updateAddressInUser(id, data);
    if(resp && respUser){
        return(
            res.send({
                status: true,
                message: "Address updated successfully",
                data: resp, respUser
            })
        )
    }
    else{
        return(
            res.send({
                status: false,
                message: "Not able to update address, try again later"
            })
        )
    }
}

module.exports = {
    add,
    index,
    update,
    removeVariant,
    addressUpdate
}