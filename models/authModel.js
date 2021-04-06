const Joi = require('joi');



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
    validateUserRege , validateUserLogIn
}