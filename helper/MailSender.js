const nodemailer = require('nodemailer');
const db = require('../models');

const createTransport = async (log) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: log.to,
        subject: log.subject,
        text: log.description,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Email sending failed", error);
        return false;
    }
};

const sendMail = async ({ to, subject, description, cc = null, bcc = null }) => {
    console.log("to", to)
    const timeStamp = new Date()
    const log = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject ? subject : '',
        description: description ? description : '',
        created_at: timeStamp,
        updated_at: null,
        cc: cc,
        bcc: bcc,
        sent: 0,
        open: 0
    }
    try {
        const addLog = await db.email_logs.insertOne(log);
        if (!log) {
            return res.send({ status: false, message: 'Email log is not created' });
        }

        const mailSending = await createTransport(log);
        if (!mailSending) {
            return res.send({ status: false, message: 'Not able to send mail' })
        }

        const updateLogStatus = await db.email_logs.findOneAndUpdate(
            { _id: addLog.insertedId },
            { $set: { sent: 1, updated_at: timeStamp } },
            { new: true, returnDocument: 'after' }
        )
        if (!updateLogStatus) {
            return res.send({ status: false, message: 'Not able to update to email log status after sending email' })
        }

        return updateLogStatus;

    } catch (error) {
        return false
    }

}

module.exports = {
    createTransport,
    sendMail
}