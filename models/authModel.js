const Joi = require('joi');
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        max : 20,
        required : true,

    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        
    }
})
const User = mongoose.model('User' , userSchema)
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