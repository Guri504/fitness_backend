const { generateToken, generateOtp } = require('../../helper/General');
const { sendOtpMail, sendLinkMail, sendMail } = require('../../helper/MailSender');
const adminModel = require('../../models/apis/admin/Admin');
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await adminModel.getByEmail(email);
        console.log("admin", admin)
        if (!admin) {
            return (
                res.send({
                    status: false,
                    message: "User does not exist"
                })
            );
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return (
                res.send({
                    status: false,
                    message: "Wrong Password"
                })
            );
        }

        const tokenData = generateToken(32, 10800)

        const storeToken = await adminModel.updateToken(admin._id, tokenData.token, tokenData.expiresAt);
        if (!storeToken) {
            res.send({
                status: false,
                message: "Error in storing the tokenData in database"
            });
        }

        return (
            res.send({
                status: true,
                message: "Login Successful",
                admin: {
                    token: tokenData.token,
                    expiresAt: tokenData.expiresAt,
                    _id: admin._id,
                    email: admin.email,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    password: admin.password,
                }
            })
        );

    } catch (error) {
        console.log(error);
        return (
            res.send({
                status: false,
                message: "Server Error"
            })
        );
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const admin = await adminModel.getByEmail(email)
    if (!admin) {
        return (
            res.send({
                status: false,
                message: { email1: "Invalid Email" }
            }))
    }


    const tempToken = generateToken(16, 300);
    const storeToken = await adminModel.updateOtp(admin._id, tempToken.token, tempToken.expiresAt);
    let subject = 'Link for change login password'
    const resetLink = `http://localhost:3000/auth/resetPassword?token=${tempToken.token}`
    const sendLink = await sendMail({ to: email, subject, description: resetLink })
    if (!storeToken || !sendLink) {
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
            admin: {
                email: admin.email,
                tempToken: tempToken.token,
                tempTokenExpiry: tempToken.expiresAt
            }
        })
    )
}

const resetPassword = async (req, res) => {
    let data = req.body;
    let { tokenFromLink } = req.params;
    if (data.password !== data.confirmPassword) {
        return ({
            status: false,
            message: 'Password does not match'
        })
    }
    const saltRounds = 10;
    const newPassword = await bcrypt.hash(data.password, saltRounds);
    try {
        const admin = await adminModel.resetPassword(tokenFromLink, newPassword);
        if (!admin) {
            return (
                res.send({
                    status: false,
                    message: "Admin not find"
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
    login,
    forgotPassword,
    resetPassword
}