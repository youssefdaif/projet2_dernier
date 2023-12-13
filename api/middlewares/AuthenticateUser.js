const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;


function authentication(req, res){ 

    const accessToken = jwt.sign(req.user, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(req.user, REFRESH_SECRET, { expiresIn: '1d' });

    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
    }).status(200).json({accessToken: accessToken, user: req.user , message: "Logged in successfully 😊 👌" });

}



module.exports = {

    authentication

}