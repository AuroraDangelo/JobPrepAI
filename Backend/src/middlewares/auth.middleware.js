const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")

async function authUser(req, res, next) {

    console.log("=================================");
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;

    console.log("Token:", token);

    if (!token) {
        console.log("NO TOKEN FOUND");

        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlackListed = await tokenBlackListModel.findOne({
        token
    })

    console.log("Blacklisted:", isTokenBlackListed);

    if (isTokenBlackListed) {
        return res.status(401).json({
            message: "Token is invalid."
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch(err) {

        console.log("JWT ERROR:");
        console.log(err);

        return res.status(401).json({
            message : "Invalid token"
        })
    }
}

module.exports = { authUser }
