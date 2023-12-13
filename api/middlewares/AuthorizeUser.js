const jwt = require('jsonwebtoken');
const { json } = require('sequelize');

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;


async function authorizeAcceess(req, res, next){

    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (accessToken) {

      try {
        const verifyAccessToken = await jwt.verify(accessToken, ACCESS_SECRET) 
        next();

      } catch (err) {
        res.status(401).send();
       
      }
      
    } else {
      res.status(403).send();
    }


  }

  async function authorizeRefresh(req, res) {
    const refreshToken = req.cookies.refreshToken || '';

    if (refreshToken) {
      try {
        const verifyRefreshToken = await jwt.verify(refreshToken, REFRESH_SECRET);
        console.log(verifyRefreshToken.user_id + ' ' + verifyRefreshToken.role);
        const userCredentials = { user_id: verifyRefreshToken.user_id, role: verifyRefreshToken.role}
        const accessToken = jwt.sign(userCredentials, ACCESS_SECRET, { expiresIn: '30s' });
        res.status(200).json({accessToken: accessToken, user: userCredentials});

      } catch (err) {
        res.status(403);
       
      }
      
    } else {
      res.status(403);
    }

  }


 module.exports = {

    authorizeAcceess,
    authorizeRefresh

 }