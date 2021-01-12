const mongoose = require('mongoose')
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        max : 255,
        min: 2
    },
    email : {
        type : String,
        required : true,
        max : 255,
        min: 5
    },
    password : {
        type : String,
        required : true,
        max : 1024,
        min: 5
    },
    
})
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id : this._id} , process.env.TOKEN_SECRET ,
        {expiresIn : 300})
    return token;
}

const User = mongoose.model('user' , userSchema)
function validateUserRege(user) {
    const userRegeVal = Joi.object({
        userName : Joi.string().max(255).min(2).required(),
        email : Joi.string().max(255).min(6).required().email(),
        password : Joi.string().max(255).min(5).required(),
    })
    return userRegeVal.validate(user);
}
function validateUserLogIn(user) {
    const userLogVal = Joi.object({
        email : Joi.string().max(255).min(6).required().email(),
        password : Joi.string().max(255).min(5).required(),
    })
    return userLogVal.validate(user);
}

module.exports = {
    validateUserRege , validateUserLogIn, User
}