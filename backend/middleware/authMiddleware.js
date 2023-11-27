import jsonWebToken from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    // Read the jsonWebToken from the cookie
    let token = req.cookies.jsonWebToken;

    if (token) {
        try {
            const decoded = jsonWebToken.verify(
                token,
                process.env.JSONWEBTOKEN_SECRET
            );

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as administrator");
    }
};

export { protect, admin };
