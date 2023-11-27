import jsonWebToken from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jsonWebToken.sign(
        { userId },
        process.env.JSONWEBTOKEN_SECRET,
        { expiresIn: "30d" }
    );

    // Set jsonWebToken as HTTP-only cookie
    res.cookie("jsonWebToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
};

export default generateToken;
