const { ObjectId } = require('mongodb');
const db = require('../../index');
const Joi = require('joi')

const validExtensions = /\.(jpg|jpeg|png|gif|svg)$/i;
const signUpSchema = Joi.object(
    {
        username1: Joi.string()
            .min(3).message("User name must be at least 3 characters")
            .max(20).message("User name must be at most 20 characters")
            .regex(/^[A-Za-z0-9]+$/).message("No special character allowed")
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        firstName1: Joi.string()
            .min(3).message("First name must be at least 3 characters")
            .max(10).message("First name must be at most 10 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]+$/).message("First letter must be uppercase and contain both uppercase and lowercase letters")
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        lastName1: Joi.string()
            .min(3).message("Last name must be at least 3 characters")
            .max(10).message("Last name must be at most 10 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]+$/).message("First letter must be uppercase and contain both uppercase and lowercase letters")
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        email1: Joi.string().email().message("enter valid email format")
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        password1: Joi.string()
            .min(8).message("password must be minimum 8 characters")
            .regex(/^(?=.*[A-Z])(?=.*[._@%$&+#?])[a-zA-Z0-9._@%$&+#?]+$/).message("password includes at least 1 uppercae , 1 lower case letter and 1 specil character")
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.forbidden()
            }),

        confirmPassword1: Joi.string().valid(Joi.ref("password1"))
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.forbidden()
            }).messages({
                "any.only": "Password does not match",
                "any.required": "Confirm password is required"
            }),

        country1: Joi.string()
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        image1: Joi.string().regex(validExtensions).message("allowed image ext. are .jpg/.jpeg/.png/.svg/.gif")
            .when("$isEdit", {
                is: false,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        oldPassword1: Joi.string()
            .when("$ispasswordChange", {
                is: true,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        newPassword1: Joi.string()
            .min(8).message("password must be minimum 8 characters")
            .regex(/^(?=.*[A-Z])(?=.*[._@%$&+#?])[a-zA-Z0-9._@%$&+#?]+$/).message("password includes at least 1 uppercae , 1 lower case letter and 1 specil character")
            .when("$ispasswordChange", {
                is: true,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        confirmNewPassword1: Joi.string()
            .valid(Joi.ref("newPassword1"))
            .messages({
                "any.only": "Password does not match",
                "any.required": "Confirm password is required"
            })
            .when("$ispasswordChange", {
                is: true,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        password: Joi.string()
            .min(8).message("password must be minimum 8 characters")
            .regex(/^(?=.*[A-Z])(?=.*[._@%$&+#?])[a-zA-Z0-9._@%$&+#?]+$/).message("password includes at least 1 uppercae , 1 lower case letter and 1 specil character")
            .when("$isresetPassword", {
                is: true,
                then: Joi.required(),
                otherwise: Joi.forbidden()
            }),
        confirmPassword: Joi.string()
            .valid(Joi.ref("password"))
            .messages({
                "any.only": "Password does not match",
                "any.required": "Confirm password is required"
            })
            .when("$isresetPassword", {
                is: true,
                then: Joi.required(),
                otherwise: Joi.forbidden()
            }),
    })

const getListing = async (req, res) => {
    let listing = await db.users.find({ 'status': 1 }).toArray();
    return listing
}

const insert = async (data) => {
    //custom validation
    // const { username1, firstName1, lastName1, email1, country1, image1, password1, confirmPassword1 } = data;

    // if (!username1 || username1.length < 3 || username1.length > 20) {
    //     return { error: "Username must be between 3 to 20 characters" }
    // }

    // if (!firstName1 || firstName1.length < 3 || firstName1.length > 10 || !/^[a-zA-Z]+$/.test(firstName1)) {
    //     return { error: "First Name must be alphabets and between 3 to 10 characters " }
    // }

    // if (!lastName1 || lastName1.length < 3 || lastName1.length > 10 || !/^[a-zA-Z]+$/.test(lastName1)) {
    //     return { error: "Last Name must be alphabets and between 3 to 10 characters " }
    // }

    // if (!email1 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email1)) {
    //     return { error: "Invalid Email Format" }
    // }

    // if (!country1) {
    //     return { error: "Country must be required" }
    // }

    // const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/blob", "image/svg"];
    // const maxSize = 2 * 1024 * 1024
    // const base64Data = image1.includes(",") ? image1.split(",")[1] : image1;   //  "data:image/...;base64," base 64 vicho is part nu remove krda va 
    // const decodedSize = Buffer.from(base64Data, 'base64').length;     // buffer.from base64 data nu actual size vich convert krda va (mb vich)

    // if (!image1 || typeof image1 !== "string") {
    //     return { error: "Image is required" };
    // }
    // console.log("hjvdj", image1)
    // if (!validTypes.includes(image1.ext)) {
    //     console.log("Invalid image format. Allowed formats: jpeg, png, gif, blob, svg");
    // }

    // if (decodedSize > maxSize) {
    //     return { error: "Image size must be less than 2MB" };
    // }

    // const hasUpperCase = /[A-Z]/.test(password1);
    // const hasLowerCase = /[a-z]/.test(password1);
    // const hasNumber = /[0-9]/.test(password1);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password1);
    // if (!password1 || password1.length < 8 || !(hasUpperCase || hasLowerCase || hasNumber || hasSpecialChar)) {
    //     return { error: "Password has minimum 8 digits has 1 uppercase, 1 lowercase, 1 number, 1 special character" }
    // }

    // if (!confirmPassword1 || confirmPassword1 !== password1) {
    //     return { error: "Password does not match" }
    // }
    const timestamp = new Date().toLocaleString();
    const makeData = {
        ...data,
        slug: null,
        status: 1,
        created_at: timestamp,
        updated_at: timestamp,
        deleted_at: null,
    }
    try {
        let resp = await db.users.insertOne(makeData);
        if (resp) {
            let record = await getById(resp.insertedId.toString());
            return record
        }
        else {
            return false

        }
    }
    catch (error) {
        return false
    }
}

const update = async (id, data) => {
    const timestamp = new Date().toLocaleString();
    const updatedData = {
        ...data,
        updated_at: timestamp
    }
    try {
        let resp = await db.users.findOneAndUpdate(
            { _id: id },
            { $set: updatedData },
            { new: true, returnDocument: "after" }
        );
        return resp;
    } catch (error) {
        console.log(error);
        return false
    }
}

const updatePassword = async (id, newPassword) => {
    try {
        let resp = await db.users.findOneAndUpdate(
            { _id: id },
            { $set: { password1: newPassword } },
            { new: true, returnDocument: "after" }
        );
        return resp;
    } catch (error) {
        console.log(error)
        return false
    }
}

const getById = async (id) => {
    try {
        let record = await db.users.findOne({ _id: new ObjectId(`${id}`) });
        return record
    } catch (error) {
        return error
    }
}

const getByEmail = async (email1) => {
    console.log("email", email1)
    try {
        let record = await db.users.findOne({ email1: email1 });
        console.log("record", record)
        return record;
    } catch (error) {
        return error
    }
}

const updateToken = async (userId, token, expiresAt) => {
    try {
        let record = await db.users.updateOne(
            { _id: new ObjectId(`${userId}`) },
            { $set: { token: token, expiresAt: expiresAt } });
        return record;
    } catch (error) {
        return error
    }
}

const getUserFromToken = async (token) => {
    console.log("kk", token)
    try {
        let record = await db.users.findOne({ 'token': token, expiresAt: { $gte: Date.now() } })
        return record;
    } catch (error) {
        return error
    }
}

const updateOtp = async (id, token, expiresAt, otp, otpExpires) => {
    try {
        let record = await db.users.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    tempToken: token,
                    tempTokenExpiry: expiresAt,
                    otp: otp,
                    otpExpires: otpExpires
                }
            }
        )
        return record;
    } catch (error) {
        console.log(error);
        return false
    }
}

const getUserFromTempToken = async (tempToken) => {
    console.log("kk", tempToken)
    try {
        let user = await db.users.findOne({ 'tempToken': tempToken, tempTokenExpiry: { $gte: Date.now() } });
        console.log(user)
        if (!user) {
            return null
        }
        await db.users.updateOne(
            { _id: user._id },
            { $unset: { otp: "", otpExpires: "" } }
        );
        return user;
    } catch (error) {
        return error
    }
}

const resetPassword = async (tempToken, newPassword) => {
    try {
        let user = await db.users.findOneAndUpdate(
            { "tempToken": tempToken, tempTokenExpiry: { $gte: Date.now() } },
            { $set: { password1: newPassword } },
            { new: true, returnDocument: "after" });
            if (!user) {
                return null
            }
            await db.users.updateOne(
                { _id: user._id },
                { $unset: { tempToken: null, tempTokenExpiry: null } },            );
        return user;
    } catch (error) {
        console.log(error);
        return false
    }
}

const remove = async (id) => {
    try {
        let resp = await db.users.deleteOne({ _id: new ObjectId(`${id}`) });
        if (resp) {
            return resp;
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    signUpSchema,
    getListing,
    insert,
    getById,
    getByEmail,
    updateToken,
    getUserFromToken,
    update,
    updatePassword,
    remove,
    updateOtp,
    getUserFromTempToken,
    resetPassword
}