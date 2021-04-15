const Joi = require('joi')
const mongoose = require('mongoose')
const Todo = mongoose.model( 'todo' , new mongoose.Schema({
    text : {
        type : String,
        required : true,
        minlength : 1
    },
    date : {
        type : Date,
        default : Date.now
    },
    owner : {
        type : String
    }

}))

function todoValidation(todo) {
    const todoSchema = Joi.object({
        text : Joi.string().required()
    })
    return todoSchema.validate(todo);
}

module.exports =  {Todo ,  todoValidation}