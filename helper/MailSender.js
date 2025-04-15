const nodemailer = require('nodemailer');

const sendOtpMail = async (toEmail, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "OTP for reset your password is here:",
        text: `Your OTP is ${otp}. It will expire in 5 minutes`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent", info.response);
        return true;
    } catch (error) {
        console.error("Email sending failed", error);
        return false;
    }
};

module.exports = { 
    sendOtpMail
}