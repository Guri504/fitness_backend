const { generateToken } = require('../../helper/General');
const userModel = require('../../models/apis/admin/Users');
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    try {
        const { email1, password1 } = req.body

        const user = await userModel.getByEmail(email1);
        if (!user) {
            return (
                res.send({
                    status: false,
                    message: "User does not exist"
                })
            );
        }

        const isMatch = await bcrypt.compare(password1, user.password1);
        if (!isMatch) {
            return (
                res.send({
                    status: false,
                    message: "Wrong Password"
                })
            );
        }

        const tokenData = generateToken(32, 10800)

        const storeToken = await userModel.updateToken(user._id, tokenData.token, tokenData.expiresAt);
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
                user: {
                    token: tokenData.token,
                    expiresAt: tokenData.expiresAt,
                    id: user._id,
                    email1: user.email1,
                    mobileNumber: user.mobileNumber,
                    username1: user.username1,
                    firstName1: user.firstName1,
                    lastName1: user.lastName1,
                    password1: user.password1,
                    country1: user.country1,
                    image1: user.image1,
                    address: user.address
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

module.exports = {
    login
}