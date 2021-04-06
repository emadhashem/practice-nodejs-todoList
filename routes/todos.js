
const {todoValidation , Todo}  = require('../models/todoMode') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const Joi = require('joi')
const authMiddleware = require('../middlewares/authmiddleware')
router.post('/api/add' , (req , res) => {
    const userReq = req.body;
    try {
        res.status(200).send(userReq)
    } catch (ex) {
        res.status(400).send(`some thing wrong with req ${ex.message}`)
        
    } 
})
module.exports = router;
