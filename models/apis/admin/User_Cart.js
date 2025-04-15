const { ObjectId, ReturnDocument } = require('mongodb');
const db = require('../../index');

const getListingForAdmin = async (req, res) => {
    let listing = await db.user_cart.find().toArray();
    return listing;
}

const getCartByIdAndUpdate = async (id, data) => {
    const { variantId, productId, quantity } = data;
    try {
        let resp = await db.user_cart.findOneAndUpdate(
            {
                _id: new ObjectId(`${id}`),
                "products.productId": new ObjectId(`${productId}`),
                "products.variantId": new ObjectId(`${variantId}`)
            },
            {
                $set: { "products.$.quantity": quantity }
            },
            { new: true, returnDocument: "after" }
        );
        console.log(resp)
        return resp;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const getCartByUserId = async (id) => {
    let listing = await db.user_cart.findOne({ userId: new ObjectId(`${id}`) });
    return listing;
}

const insert = async (id, data) => {
    let timestamp = new Date().toLocaleString();
    const { productId, variantId, quantity } = data
    try {
        let existing = await db.user_cart.findOne(
            {
                userId: new ObjectId(`${id}`),
                "products.productId": productId,
                "products.variantId": variantId
            }
            
        )
        if (existing) {
            let updateQuantity = await db.user_cart.updateOne({
                userId: new ObjectId(`${id}`),
                "products.productId": productId,
                "products.variantId": variantId
            },
                {
                    $inc: { "products.$.quantity": quantity },
                    $set: { updated_at: timestamp }
                }
            );
            return updateQuantity;
        }
        else {
            let updateProduct = await db.user_cart.updateOne(
                { userId: new ObjectId(`${id}`) },
                {
                    $setOnInsert: {
                        userId: new ObjectId(`${id}`),
                        status: 1,
                        created_at: timestamp,
                    },
                    $push: { products: { productId, variantId, quantity } }
                },
                { upsert: true, returnDocument: "after" }
            );
            return updateProduct;
        }
    } catch (error) {
        return error
    }
}

const removeVariantFromcart = async (id, data) => {
    try {
        let resp = await db.user_cart.findOneAndUpdate(
            {
                _id: new ObjectId(`${id}`)
            },
            {
                $pull: {
                    products: {
                        variantId: new ObjectId(`${data.variantId}`)
                    }
                }
            })
        return resp;
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        let record = await db.user_cart.findOne({ _id: new ObjectId(`${id}`) });
        return record
    }
    catch (error) {
        return false
    }

}

const getProductById = async (id) => {
    try {
        let resp = await db.Products.find({ _id: { $in: id } }).toArray();
        return resp;
    } catch (error) {
        return false
    }
}

const getVariantById = async (id) => {
    try {
        let resp = await db.Product_Variants.find({ _id: { $in: id } }).toArray();
        return resp;
    } catch (error) {
        return false
    }
}

const updateAddress = async (userId, address) => {
	try {
		let record = await db.user_cart.findOneAndUpdate(
			{ userId: new ObjectId(`${userId}`) },
			{
				$set: {
					address: address,
					updated_at: new Date().toLocaleString(),
				}
			},
            {returnDocument: "after"}
		);
		return record;
	} catch (error) {
		return error;
	}
};

const updateAddressInUser = async (userId, address) => {
    try {
        let record = await db.users.findOneAndUpdate(
            { _id: new ObjectId(`${userId}`) },
			{
                $set: {
                    address: address,
					updated_at: new Date().toLocaleString(),
				}
			},
            {returnDocument: "after"}
		);
		return record;
	} catch (error) {
		return error;
	}
};

module.exports = {
    getListingForAdmin,
    getCartByUserId,
    insert,
    removeVariantFromcart,
    getById,
    getProductById,
    getVariantById,
    getCartByIdAndUpdate,
    updateAddress,
    updateAddressInUser
}