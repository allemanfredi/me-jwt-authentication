const mongoose = require('mongoose');

const UserModel = require('../models/user')

const add = async data => {
    try{
        const user = new UserModel(data);
        const doc = await user.save();
        return doc;
    }catch(err){
        console.log(err);
        throw new Error (err.message);
    }
}

const getByEmail = async email => {
    try{
        const user = await UserModel.find({'email':email});
        return user;
    }catch(err){
        console.log(err);
        throw new Error (err.message);
    }
}

const getById = async id => {
    try{
        const user = await UserModel.find({'_id':id});
        return user;
    }catch(err){
        console.log(err);
        throw new Error (err.message);
    }
}

const getByAccessToken = async token => {
    try{
        const user = await UserModel.find({'currentAccessToken':token});
        return user;
    }catch(err){
        console.log(err);
        throw new Error (err.message);
    }
}

const updateAccessToken = async (userId,newToken) => {
     try{
         const newDataUser = await UserModel.updateOne({'_id':userId},{ $set: {'currentAccessToken': newToken } });
         return newDataUser;
     }catch(err){
        console.log(err);
        throw new Error (err.message);
     }
}


module.exports = {
    add,
    getByEmail,
    getById,
    getByAccessToken,
    updateAccessToken
}