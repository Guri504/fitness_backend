// const jwt = require('jsonwebtoken');
const userModel = require('../models/apis/admin/Users')
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return (
                res.send({
                    status: false,
                    message: "Access Denied. No Token Provided!"
                })
            );
        }

        const tokenValue = authHeader.split(" ")[1] // Extract token after "Bearer "
        let user = await userModel.getUserFromToken(tokenValue);
        if (!user) {
            return (
                res.send({
                    status: false,
                    message: "User not find by token"
                })
            );
        }
       req.user = user  ;   // Attach user data to request 
        next();   // proceed to the next middleware/route
    } catch (error) {
        console.log({ error })
        return (
            res.send({
                status: false,
                message: "Server Fetching Error", error
            })
        );
    }
};

module.exports = {
    verifyToken,
}