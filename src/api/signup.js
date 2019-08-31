const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { sendResponse,isEmptyObject } = require('../utils/utils');

//MongoDB 
const User = require('../controllers/user');

const signup = async (req, res) => {
    
    try{
        //check that this email does not exist yet
        const user = await User.getByEmail(req.body.email);
        if ( user.length > 0 ){
            sendResponse(res, 500, null , 'User already exists' );
            return;
        }

        const sha256 = crypto.createHash('sha256');
        const salt = crypto.randomBytes(256);
        const hpsw = sha256.update(req.body.password + salt).digest();

        //generate the login token
        const payload = { email : req.body.email };
        const token = jwt.sign(payload, 'mysecretsshhh', {}); //generate a random number instead of hardcoding the secret value,

        const query = {
            name : req.body.name,
            surname : req.body.surname,
            email : req.body.email,
            password : hpsw.toString('utf-8'),
            salt : salt,
            secret : 'mysecretsshhh', //generate a random number instead of hardcoding the secret value,
            currentAccessToken : token,
        }

        const data = await User.add(query);
        if ( data === undefined ){
            sendResponse(res, 500, null , 'Impossible to create the user' );
            return;
        }

        //customize data
        const content = {
            email : data.email,
            name : data.name,
            surname : data.surname,
            id : data._id,
        }

        res.cookie('token', token, { httpOnly: false });;
        sendResponse(res, 200, content , null);
        
    }catch(err){
        console.log(err);
        sendResponse(res, 500, null , err.message );
    }
}


module.exports = {
    signup
}