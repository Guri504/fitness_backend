const isJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    }
    catch (e) {
        return false;
    }
}

const foreach = (obj, callback) => {
    for (let [key, value] of Object.entries(obj)) {
        callback(key, value);
    }
    return true;
}

const generateToken = (length = 32, expiresInSeconds = 3600) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const expiresAt = Date.now() + (expiresInSeconds * 1000); // Expiration time in milliseconds
    return { token, expiresAt };
}

const generateOtp = (expireInMinutes = 5) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + (expireInMinutes * 60 * 1000);
    return { otp, otpExpire }
}

const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^a-z0-9\-]/g, '') // Remove special chars
        .replace(/\-{2,}/g, '-')     // Replace multiple - with single -
        .replace(/^-+|-+$/g, '');    // Trim - from start/end
}

const generateString = (length = 5) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let string = '';
    for (let i = 0; i < length; i++) {
        string += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return string
}

module.exports = {
    isJSON,
    foreach,
    generateToken,
    generateOtp,
    generateSlug,
    generateString
}