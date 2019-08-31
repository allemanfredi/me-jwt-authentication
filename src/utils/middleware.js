// middleware.js
const jwt = require('jsonwebtoken');
const {sendResponse} = require('./utils')

const User = require('../controllers/user');


const withAuth = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  

  if (!token) {
    sendResponse(res,401,null,'Unauthorized: No token provided');
  } else {

    //get user secret
    try{
        //stare attenti perchè in questo modo facendo un brute force sul accessToken è possibile entrare => possibile soluzione mettere un timeout (da pensare)
        const user = await User.getByAccessToken(token);
        jwt.verify(token, user[0].secret, function(err, decoded) {
            console.log(err);
            if (err) {
              sendResponse(res,401,null,'Unauthorized: Invalid token');
            } else {
              next();
            }
          });
    }catch(err){
        console.log(err);
        sendResponse(res,500,null,err.message);
    }

  }
}
module.exports = withAuth;