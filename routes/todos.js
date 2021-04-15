
const {todoValidation , Todo}  = require('../models/todoMode') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const Joi = require('joi')
const authMiddleware = require('../middlewares/authmiddleware');
const { User } = require('../models/authModel');
// const {Todo , todoValidation} =
router.post('/api/add' , authMiddleware, async (req , res) => {
    const todoReq = req.body;
    const userId = req.user.verf._id
    const newtodo = new Todo({
        text : todoReq.text,
        owner : userId
    })
    
    try {
        const todo = await newtodo.save();
        res.send(todo)
    } catch (ex) {
        res.status(400).send('some thing wrong with save..' , ex.message)
    }
})
router.get('/api/getall', authMiddleware, async (req , res) => {
    const {_id} = req.user.verf
    try {
       const allTodos = await Todo.find({owner : _id})
       res.send(allTodos)
       
    } catch (ex) {
        res.status(400).send('some thing wrong with save..' , ex.message)
    }
})

module.exports = router;
