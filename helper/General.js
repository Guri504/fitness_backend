const isJSON = (str) => {
    try
    {
        JSON.parse(str);
        return true;
    }
    catch(e)
    {
        return false;
    }
}

const foreach = (obj, callback) => {
    for (let [key, value] of Object.entries(obj))
    {
        callback(key, value);
    }
    return true;
}

const generateToken =  (length = 32, expiresInSeconds = 3600) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const expiresAt = Date.now() + (expiresInSeconds * 1000); // Expiration time in milliseconds
    return { token, expiresAt };
}

const generateOtp = ( expireInMinutes = 5) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + (expireInMinutes * 60 * 1000);
    return { otp, otpExpire}
}

module.exports ={
    isJSON,
    foreach,
    generateToken,
    generateOtp,
}