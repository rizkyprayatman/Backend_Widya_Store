const jwt = require("../utils/jwt");

const getToken = (headers, res) => {
    const authHeader = headers;

    if (!authHeader) {
        res.status(401).json({ message: "Authorization header is missing. Please provide a valid token." });
        return;
    }

    const token = authHeader && authHeader.split(" ");
    if (token.length !== 2 || token[0].toLowerCase() !== "bearer") {
        res.status(401).json({ message: "Invalid token format. Please provide a valid Bearer token." });
        return;
    }

    const checkToken = jwt.checkTokenJwt(token[1]);

    if (checkToken === "invalid_token") {
        res.status(401).json({ message: "Token Invalid!" });
        return;
    }

    return checkToken;
};


module.exports = { getToken };