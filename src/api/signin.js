const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { sendResponse,isEmptyObject } = require('../utils/utils');

//MongoDB 
const User = require('../controllers/user');

const signin = async (req,res) => {

    try{

        const user = await User.getByEmail(req.body.email);
        if ( user.length === 0 ){
            sendResponse(res, 500, null , 'User does not exists' );
            return;
        }

        const sha256 = crypto.createHash('sha256');
        const hpsw = sha256.update(req.body.password + user[0].salt).digest();
        const ubuf = Buffer.from(user[0].password, 'utf-8');
        
        if ( hpsw.toString('utf-8') === ubuf.toString('utf-8')){
            const content = {
                email : user[0].email,
                name : user[0].name,
                surname : user[0].surname,
                id : user[0]._id,
                amount : user[0].amount
            }
            
            //reset access token
            const payload = { email : user[0].email };
            const newToken = jwt.sign(payload, user[0].secret, {});
            console.log(newToken);

            //update token in the database
            await User.updateAccessToken(user[0]._id,newToken);

            res.cookie('token', newToken, { httpOnly: false });;
            sendResponse(res, 200, content , null);
        }else{
            sendResponse(res, 500, null , 'Username or password wrong'); 
        }
        
    }catch(err){
        console.log(err);
        sendResponse(res, 500, null , err.message);
    }
}


module.exports = {
    signin
}