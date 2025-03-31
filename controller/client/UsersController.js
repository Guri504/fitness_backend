const { generateToken, generateOtp } = require('../../helper/General');
const userModel = require('../../models/apis/admin/Users');
const bcrypt = require('bcryptjs')


const add = async (req, res) => {
    let data = req.body;

    // this code for Joi validation
    const { error } = userModel.signUpSchema.validate(data, { abortEarly: false, context: { isEdit: false } });
    if (error) {
        const errors = {}
        error.details.forEach(err => {
            errors[err.path[0]] = err.message;
        });
        return res.send({
            status: false,
            message: errors
        });
    }

    try {

        const saltRounds = 10;
        data.password1 = await bcrypt.hash(data.password1, saltRounds);

        delete data.confirmPassword1;

        let resp = await userModel.insert(data);
        if (resp.error) {
            res.send({
                status: false,
                message: resp.error,
                data: []
            })
            console.log(resp.error)
        }

        else if (resp) {
            res.send({
                status: true,
                message: "User has been Registered Successfully",
                data: resp
            })
        }

        else {
            res.send({
                status: false,
                message: "Not able to register the user",
                data: []
            })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const update = async (req, res) => {
    let data = req.body;
    // this code for Joi validation
    const { error } = userModel.signUpSchema.validate(data, { abortEarly: false, context: { isEdit: true } });
    if (error) {
        const errors = {}
        error.details.forEach(err => {
            errors[err.path[0]] = err.message;
        });
        return res.send({
            status: false,
            message: errors
        });
    }
    let id = req.user._id;
    let resp = await userModel.update(id, data);
    if (resp.error) {
        res.send({
            status: false,
            message: resp.error,
            data: []
        })
        console.log(resp.error)
    }
    else if (resp) {
        return (
            res.send({
                status: true,
                message: "Data has been updated successfully",
                user: resp,
            })
        );
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to update data",
                data: []
            })
        );
    }
}

const updatePassword = async (req, res) => {
    let data = req.body;
    // this code for Joi validation
    const { error } = userModel.signUpSchema.validate(data, { abortEarly: false, context: { passwordChange: true } });
    if (error) {
        const errors = {}
        error.details.forEach(err => {
            errors[err.path[0]] = err.message;
        });
        return res.send({
            status: false,
            message: errors
        });
    }
    try {
        let password = req.user.password1;
        console.log("Password", password)
        const matchPassword = await bcrypt.compare(data.oldPassword1, password);
        if (!matchPassword) {
            return (
                res.send({
                    status: false,
                    message: {
                        oldPassword1: "Old password is incorrect"
                    }
                })
            )
        }

        const saltRounds = 10;
        const newPassword = await bcrypt.hash(data.newPassword1, saltRounds);

        let id = req.user._id;
        let resp = await userModel.updatePassword(id, newPassword);
        if (resp.error) {
            res.send({
                status: false,
                message: resp.error,
                data: []
            })
            console.log(resp.error)
        }
        else if (resp) {
            return (
                res.send({
                    status: true,
                    message: "Data has been updated successfully",
                    user: resp
                })
            );
        }
        else {
            return (
                res.send({
                    status: false,
                    message: "Not able to update data",
                    data: []
                })
            );
        }
    }
    catch (error) {
        console.log(error);
        return false
    }
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

const forgotPassword = async (req, res) => {
    const { email1 } = req.body;
    const user = await userModel.getByEmail(email1)
    if (!user) {
        return (
            res.send({
                status: false,
                message: { email1: "Invalid Email" }
            }))
    }

    const tempToken = generateToken(16, 300);
    const tempOtp = generateOtp(5);
    const storeOtpAndToken = await userModel.updateOtp(user._id, tempToken.token, tempToken.expiresAt, tempOtp.otp, tempOtp.otpExpire);
    if (!storeOtpAndToken) {
        return (
            res.send({
                status: false,
                message: "Unable to store otp"
            })
        )
    }
    return (
        res.send({
            status: true,
            message: "User Find successfully",
            user: {
                email1: user.email1,
                tempToken: tempToken.token,
                tempTokenExpiry: tempToken.expiresAt
            }
        })
    )
}

const otpVerification = async (req, res) => {
    let { newOtp } = req.body;
    let { tempToken } = req.params;
    const user = await userModel.getUserFromTempToken(tempToken)
    if (!user) {
        return (
            res.send({
                status: false,
                message: "User not find"
            }))
    }
    if (!newOtp) {
        return (
            res.send({
                status: false,
                message: "Please enter a valid otp"
            }));
    }
    if (newOtp !== user.otp || Date.now() > user.otpExpires) {
        return (
            res.send({
                status: false,
                message: "Invalid OTP ot OTP Expired"
            })
        )
    }
    return (
        res.send({
            status: true,
            message: "OTP verified successfully"
        })
    )
}

const resetPassword = async (req, res) => {
    let data = req.body;
    const { error } = userModel.signUpSchema.validate(data, { abortEarly: false, context: { isresetPassword: true } });
    if (error) {
        const errors = {}
        error.details.forEach(err => {
            errors[err.path[0]] = err.message;
        });
        return res.send({
            status: false,
            message: errors
        });
    }
    let { tempToken } = req.params;
    const saltRounds = 10;
    const newPassword = await bcrypt.hash(data.password, saltRounds);
    try {
        const user = await userModel.resetPassword(tempToken, newPassword);
        if (user.error) {
            res.send({
                status: false,
                message: user.error,
            })
            console.log(user.error)
        }
        if (!user) {
            return (
                res.send({
                    status: false,
                    message: "User not find"
                }))
        }
        else {
            return (
                res.send({
                    status: true,
                    message: "Password Changed Successfully"
                })
            )
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    add,
    detail,
    update,
    updatePassword,
    forgotPassword,
    otpVerification,
    resetPassword
}