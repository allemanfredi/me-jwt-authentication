
const { sendResponse } = require('../utils/utils');

const User = require('../controllers/user');

const getUserData = async (req,res) => {
    try { 
        const user = await User.getByAccessToken(req.body.token);
        const data = {
            email : user[0].email,
            id : user[0]._id,
            name : user[0].name,
            surname : user[0].surname,
        }
        sendResponse(res,200,data,null);

    }catch(err){
        sendResponse(res,500,null,err.message);
    }
}


module.exports = {
    getUserData
}