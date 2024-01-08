const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const encodeTokenJwt = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '24h'});
};

const forgotPasswordToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '25m'});
};

const checkTokenJwt = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return "invalid_token"
    }
};

module.exports = {encodeTokenJwt, checkTokenJwt, forgotPasswordToken};